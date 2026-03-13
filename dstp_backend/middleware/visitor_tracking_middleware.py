''' This middleware runs on EVERY single request.
# It's the core of the tracking system.'''

import uuid
import logging
from django.utils import timezone

logger = logging.getLogger(__name__)

#  __init__ runs once when server starts
#    __call__ runs on every request

# URLs we do NOT want to track
# (static files, admin, API calls — we only track frontend page views)

SKIP_TRACKING_PREFIXES = [
    '/static/', '/media/', '/admin/',
    '/api/', '/favicon.ico',
]


# Cookie settings
VISITOR_COOKIE_NAME   = 'dstp_visitor_id'  # name of cookie stored in browser
VISITOR_COOKIE_AGE    = 60 * 60 * 24 * 365 # 1 year in seconds

class VisitorTrackingMiddleware:

    def __init__(self, get_response):
        self.get_response = get_response
        # runs once when server starts
        print("VisitorTrackingMiddleware loaded")

    # Before the View RUNS
    def __call__(self, request):
        # Check if we should trrack this request
        if not self.should_track(request):
            return self.get_response(request)
        
        # Get or create visitor sessions

        visitor = self.get_or_create_visitor(request)

        # Attach the visitor to request so views can access it
        request.visitor = visitor
        
        # run the View

        response = self.get_response(request)

        # After the View Runs 

        #set/refresh the cookie on response

        if visitor:
            response.set_cookie(
                key      = VISITOR_COOKIE_NAME,
                value    = visitor.session_key,
                max_age  = VISITOR_COOKIE_AGE,
                httponly = True,   # JavaScript cannot read this (security)
                samesite = 'Lax',  # protects against CSRF attacks
                # secure = True    # uncomment in production (HTTPS only)
            )
            
        return response
    
    def should_track(self, request):
        # don't track static files, API calls, admin panel etc
        for prefix in SKIP_TRACKING_PREFIXES:
            if request.path.startswith(prefix):
                return False
        return True
    
#       Step 1: Check if visitor has our cookie in their browser
        # Step 2: If yes  → find their existing session in DB
        # Step 3: If no   → create a brand new session for them
    def get_or_create_visitor(self, request):

        from apps.core.models import VisitorSession , PageVisit

        # Read Visitor Cookie From Browser
        session_key = request.COOKIES.get(VISITOR_COOKIE_NAME)
        visitor = None
        if session_key:
            #visitor has been here before # Find their session
            try:
                visitor = VisitorSession.objects.get(session_key=session_key)
                # update their last seen time and visit count

                visitor.last_seen = timezone.now()
                visitor.total_visits += 1
                visitor.save()

                logger.info(F"Returning Visitor: {session_key[:8]}...")
            
            except VisitorSession.DoesNotExist:
                # Cookies exists but sessions deleted from db
                # treat them as a new visitor
                visitor = None

        if not visitor:
            visitor = self.create_new_session(request)

            # track this specific page visit
        self.track_page_visit(request, visitor)

        return visitor
    

    def create_new_session(self, request):
        from apps.core.models import VisitorSession

        # generate a unique session key for this visitor
        new_key = str(uuid.uuid4()).replace('-', '')  # 32 character unique string

        # get visitor's IP address
        ip = self.get_ip_address(request)

        # get browser and device info from User-Agent header
        user_agent = request.META.get('HTTP_USER_AGENT', '')
        device_type, browser, os_name = self.parse_user_agent(user_agent)

        # get UTM params from URL (e.g. ?utm_source=google&utm_medium=cpc)
        utm_source   = request.GET.get('utm_source',   '')
        utm_medium   = request.GET.get('utm_medium',   '')
        utm_campaign = request.GET.get('utm_campaign', '')

        # get referrer — which website sent them here
        referrer = request.META.get('HTTP_REFERER', '')

        # create session record in database
        visitor = VisitorSession.objects.create(
            session_key  = new_key,
            ip_address   = ip,
            user_agent   = user_agent,
            device_type  = device_type,
            browser      = browser,
            os           = os_name,
            referrer     = referrer,
            utm_source   = utm_source,
            utm_medium   = utm_medium,
            utm_campaign = utm_campaign,
        )

        logger.info(f"New visitor created: {new_key[:8]}... from {ip}")

        return visitor


    def track_page_visit(self, request, visitor):
        # record this specific page visit
        from apps.core.models import PageVisit

        # get page title from request headers if frontend sends it
        page_title = request.META.get('HTTP_X_PAGE_TITLE', '')

        # get previous page from referer header
        referrer_page = request.META.get('HTTP_REFERER', '')

        PageVisit.objects.create(
            visitor       = visitor,
            page_url      = request.path,
            page_title    = page_title,
            referrer_page = referrer_page,
        )

        # update total pages viewed count on the session
        visitor.total_pages_viewed += 1
        visitor.save()


    def get_ip_address(self, request):
        # some servers sit behind a proxy or load balancer
        # in that case real IP is in HTTP_X_FORWARDED_FOR header
        x_forwarded = request.META.get('HTTP_X_FORWARDED_FOR')
        if x_forwarded:
            # X_FORWARDED_FOR can have multiple IPs: "client, proxy1, proxy2"
            # the first one is the real client IP
            ip = x_forwarded.split(',')[0].strip()
        else:
            # direct connection — IP is in REMOTE_ADDR
            ip = request.META.get('REMOTE_ADDR')
        return ip


    def parse_user_agent(self, user_agent):
        # ─────────────────────────────────────────────────────────────────────
        # User-Agent string looks like:
        # "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36
        #  (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
        #
        # We just do simple string checks — good enough for basic tracking.
        # (You can replace with the 'user-agents' library later for more accuracy)
        # ─────────────────────────────────────────────────────────────────────

        ua = user_agent.lower()

        # device type
        if 'mobile' in ua or 'android' in ua:
            device_type = 'mobile'
        elif 'tablet' in ua or 'ipad' in ua:
            device_type = 'tablet'
        else:
            device_type = 'desktop'

        # browser 
        if 'edg' in ua:
            browser = 'Edge'
        elif 'chrome' in ua:
            browser = 'Chrome'
        elif 'firefox' in ua:
            browser = 'Firefox'
        elif 'safari' in ua:
            browser = 'Safari'
        elif 'opera' in ua:
            browser = 'Opera'
        else:
            browser = 'Other'

        # operating system 
        if 'windows' in ua:
            os_name = 'Windows'
        elif 'android' in ua:
            os_name = 'Android'
        elif 'iphone' in ua or 'ipad' in ua:
            os_name = 'iOS'
        elif 'mac' in ua:
            os_name = 'macOS'
        elif 'linux' in ua:
            os_name = 'Linux'
        else:
            os_name = 'Other'

        return device_type, browser, os_name


        
