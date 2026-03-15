# DSTP Backend - CORE MODULE DOCUMENTATION & IMPLEMENTATION GUIDE

## Overview

The **Core Module** is responsible for visitor tracking, analytics, and session management. It captures anonymous user behavior before registration and links that history to their account when they register.

---

## 📊 MODULE STRUCTURE

```
dstp_backend/apps/core/
├── models.py              # VisitorSession, PageVisit models
├── views.py               # 3 API endpoints for tracking
├── serializers.py         # Data serialization for API responses
├── urls.py                # URL routing (3 endpoints)
├── pagination.py          # StandardResultsPagination class
├── exceptions.py          # Global exception handlers
├── admin.py               # Empty (no admin registration)
├── permissions.py         # Empty (no custom permissions)
└── __init__.py            # Empty init file
```

---

## 🗄️ DATABASE MODELS

### 1. **VisitorSession** (Table: `visitor_tracking`)

Represents a unique visitor to the site, even if anonymous.

**Fields:**

- `session_key` (CharField, unique, indexed): Unique ID stored in browser cookie
- `user` (ForeignKey → CustomUser, nullable): Links to registered user after signup
- `ip_address` (GenericIPAddressField): Visitor's IP address
- `user_agent` (TextField): Browser/device info string
- `device_type` (CharField): "Mobile", "Tablet", "Desktop"
- `browser` (CharField): "Chrome", "Firefox", "Safari", etc.
- `os` (CharField): Operating system
- `referrer` (URLField): Website they came from
- `utm_source` (CharField): Marketing source (Google, Facebook, etc.)
- `utm_medium` (CharField): Traffic type (cpc, email, organic)
- `utm_campaign` (CharField): Campaign name
- `total_visits` (IntegerField): How many times they return
- `total_pages_viewed` (IntegerField): Total pages viewed
- `first_seen` (DateTimeField): Initial visit timestamp
- `last_seen` (DateTimeField): Most recent activity timestamp
- `is_registered` (BooleanField): True if user has signed up
- `is_active` (BooleanField): True if session active

**Key Methods:**

- `mark_as_registered(user)`: Link session to user account after registration

**Ordering:** `-last_seen` (most recent first)

---

### 2. **PageVisit** (Table: `page_tracking`)

Records each page viewed during a visitor session.

**Fields:**

- `visitor` (ForeignKey → VisitorSession): Which visitor
- `page_url` (CharField): URL path (e.g., "/services/web-development")
- `page_title` (CharField): Page title (sent from frontend)
- `referrer_page` (CharField): Previous page URL
- `time_spent_seconds` (IntegerField): Duration on page in seconds
- `visited_at` (DateTimeField): When the page was viewed

**Ordering:** `-visited_at` (most recent first)

---

## 🔌 API ENDPOINTS

All endpoints mounted at: `/api/v1/track/`

### 1. **Track Time Spent on Page**

```
POST /api/v1/track/time-spent/
Permission: AllowAny (anonymous users allowed)

Request Body:
{
    "page_url": "/services/web-development",
    "seconds": 47
}

Response (200 OK):
{
    "success": true,
    "message": "Time tracked: 47s on /services/web-development"
}

Error (400):
{
    "success": false,
    "message": "page_url is required" | "No visitor cookie found"
}
```

**Flow:**

1. Frontend tracks when user leaves a page
2. Sends page_url and time_spent in seconds
3. Backend updates last PageVisit record for that URL
4. Used for analytics: bounce rates, engagement metrics

---

### 2. **Link Session to User (Post-Registration)**

```
POST /api/v1/track/link-session/
Permission: IsAuthenticated (logged-in users only)

Request Body: {} (empty, uses authentication from header)

Response (200 OK):
{
    "success": true,
    "message": "Session linked to user@example.com",
    "data": {
        "total_visits": 5,
        "total_pages_viewed": 18,
        "first_seen": "2024-03-14T10:23:45.123456Z"
    }
}

Error (400):
{
    "success": false,
    "message": "No visitor session found"
}
```

**Flow:**

1. User registers/logs in
2. Frontend calls this endpoint
3. Backend finds the anonymous visitor session from cookie
4. Links session.user to the authenticated user
5. Sets is_registered = True
6. All previous browsing history is now associated with the registered account

---

### 3. **Get Visitor Statistics**

```
GET /api/v1/track/my-stats/
Permission: AllowAny (anonymous + authenticated)

Query Parameters: None

Response (200 OK):
{
    "success": true,
    "data": {
        "session_key": "a1b2c3d4...",
        "total_visits": 5,
        "total_pages_viewed": 18,
        "first_seen": "2024-03-14T10:23:45.123456Z",
        "last_seen": "2024-03-14T14:52:30.654321Z",
        "device_type": "Desktop",
        "browser": "Chrome",
        "os": "Windows",
        "ip_address": "192.168.1.1",
        "is_registered": false,
        "recent_pages": [
            {
                "page_url": "/services/web-development",
                "page_title": "Web Development Services",
                "visited_at": "2024-03-14T14:50:00.000000Z",
                "time_spent_seconds": 47
            },
            ... (up to 10 most recent)
        ]
    }
}

Error (400):
{
    "success": false,
    "message": "No visitor session found"
}
```

**Flow:**

1. Frontend requests visitor's own stats
2. Backend retrieves session from cookie
3. Aggregates statistics
4. Returns last 10 pages visited with engagement data

---

## 📡 SERIALIZERS

### 1. **VisitorSessionSerializer** (ReadOnly)

Converts VisitorSession model to JSON.

**Output Fields:**

- `id`, `session_key`, `ip_address`, `device_type`, `browser`, `os`
- `total_visits`, `total_pages_viewed`
- `first_seen`, `last_seen`
- `is_registered`, `is_active`
- `full_name` (method field: "FirstName LastName" or "Anonymous")

---

### 2. **PageVisitSerializer** (ReadOnly)

Converts PageVisit model to JSON.

**Output Fields:**

- `id`, `page_url`, `page_title`, `referrer_page`
- `time_spent_seconds`, `visited_at`
- `visitor_info` (method field: session key + registration status)

---

### 3. **VisitorAnalyticsSerializer** (ReadOnly)

Aggregated analytics data.

**Output Fields:**

- `total_visits` (IntegerField)
- `total_pages_viewed` (IntegerField)
- `average_time_per_page` (FloatField)
- `device_profile` (DictField)
- `traffic_sources` (DictField)
- `recent_pages` (ListField)

---

## 🛠️ PAGINATION

### StandardResultsPagination

- **Page Size:** 20 results per page
- **Query Param:** `?page_size=X` (max: 100)
- **Used For:** List endpoints that return multiple records

---

## ⚠️ EXCEPTION HANDLERS (exceptions.py)

Global error handlers for the entire application:

```python
custom_exception_handler(exc, context)     # Wraps DRF default, adds status_code
bad_request_handler(request, exception)     # 400 Bad Request
permission_denied_handler(request, exception) # 403 Forbidden
not_found_handler(request, exception)       # 404 Not Found
server_error_handler(request)                # 500 Internal Server Error
```

**Usage in settings.py:**

```python
EXCEPTION_HANDLERS = {
    'EXCEPTION_HANDLER': 'apps.core.exceptions.custom_exception_handler',
}

handler400 = 'apps.core.exceptions.bad_request_handler'
handler403 = 'apps.core.exceptions.permission_denied_handler'
handler404 = 'apps.core.exceptions.not_found_handler'
handler500 = 'apps.core.exceptions.server_error_handler'
```

---

## 🔐 PERMISSIONS

**File:** `permissions.py` (currently empty)

**Notes:**

- RBAC permissions defined in `authentication/permissions.py`
- Core module uses IsAuthenticated and AllowAny from DRF
- Custom permissions can be added here for core-specific access control

---

## 📍 URL ROUTING

**File:** `urls.py` (app_name = 'core')

```python
urlpatterns = [
    path('time-spent/', views.TrackTimeSpentView.as_view(), name='time-spent'),
    path('link-session/', views.LinkSessionToUserView.as_view(), name='link-session'),
    path('my-stats/', views.GetVisitorStatsView.as_view(), name='my-stats'),
]
```

**Mounted in root `config/urls.py` as:**

```python
path('api/v1/track/', include('apps.core.urls')),
```

---

## 🔄 FRONTEND INTEGRATION FLOW

### Anonymous User Journey:

1. User lands on site → Frontend creates `dstp_visitor_id` cookie
2. User browses pages → Frontend logs pagse views
3. User leaves page → Frontend calls `POST /api/v1/track/time-spent/` with duration
4. User registers → Frontend calls `POST /api/v1/track/link-session/`
5. Backend links anonymous history to registered account

### Registered User Journey:

1. User logs in → Frontend retrieves `dstp_visitor_id` from cookie
2. User browses pages → Frontend logs page views
3. VisitorSession already linked to user → All activity tracked under user account

### Dashboard / Analytics:

1. Admin/user requests stats → Calls `GET /api/v1/track/my-stats/`
2. Returns visitor profile + page history

---

## 🛑 CURRENT LIMITATIONS & FUTURE ENHANCEMENTS

**Limitations:**

1. No authentication in admin.py (visitors not visible in Django admin)
2. No mass export of analytics data
3. No chart/visualization aggregation
4. Simple pagination (no nested pagination for pages under sessions)
5. No geolocation tracking (only IP stored)
6. No session timeout logic (sessions kept indefinitely)

**Enhancement Ideas:**

1. Add AdminAuditLog model to track admin-level events (part of security implementation)
2. Create admin dashboard serializer with aggregated stats
3. Implement session expiry (30 days default)
4. Add geographic location lookup (GeoIP2)
5. Create analytics report generator (export to PDF/CSV)
6. Add bounce rate calculation
7. Implement funnel analysis (series of pages users follow)
8. Add heat mapping endpoints (which elements users interact with)

---

## 🗂️ ADMIN INTERFACE

**File:** `admin.py` (Empty - no registrations)

**To View Visitors in Django Admin:**

```python
from django.contrib import admin
from .models import VisitorSession, PageVisit

@admin.register(VisitorSession)
class VisitorSessionAdmin(admin.ModelAdmin):
    list_display = ('session_key', 'user', 'total_visits', 'last_seen', 'is_registered')
    list_filter = ('is_registered', 'device_type', 'browser', 'os')
    search_fields = ('session_key', 'ip_address', 'user__email')
    readonly_fields = ('session_key', 'first_seen')

@admin.register(PageVisit)
class PageVisitAdmin(admin.ModelAdmin):
    list_display = ('page_url', 'visitor', 'time_spent_seconds', 'visited_at')
    list_filter = ('visited_at',)
    search_fields = ('page_url', 'visitor__session_key')
    readonly_fields = ('visited_at',)
```

---

## 🔗 INTEGRATION WITH OTHER MODULES

**Authentication Module (`apps/authentication`):**

- Uses CustomUser model for VisitorSession.user ForeignKey
- Calls `mark_as_registered()` after user signup/registration

**Middleware (`middleware/`):**

- Visitor tracking middleware likely creates VisitorSession and PageVisit records
- Extracts device/browser info, IP address, UTM parameters

---

## 📝 ADMIN.PY CURRENT STATE

```python
# EMPTY - No Django Admin registration
```

**Should contain:**

- VisitorSession admin with filters/search
- PageVisit admin with filters/search
- Inline PageVisit display under VisitorSession

---

## 🚀 QUICK START FOR DEVELOPERS

**To add new tracking field to VisitorSession:**

1. Add field to model in `models.py`
2. Create migration: `python manage.py makemigrations`
3. Run migration: `python manage.py migrate`
4. Update serializer in `serializers.py`
5. Update admin if needed in `admin.py`

**To add new analytics endpoint:**

1. Create view in `views.py` inheriting from APIView
2. Implement `get()` or `post()` method
3. Add URL pattern in `urls.py`
4. Write serializer if needed in `serializers.py`

**To modify pagination:**

1. Edit `StandardResultsPagination` in `pagination.py`
2. Apply to views: `pagination_class = StandardResultsPagination`

---

## 📊 DATABASE INDEXES

**Currently Indexed:**

- VisitorSession.session_key (unique index via `db_index=True`)

**Recommended for Performance:**

- PageVisit.visitor (for quick lookup of visitor's pages)
- PageVisit.visited_at (for queryset ordering)
- VisitorSession.last_seen (for "active today" queries)

**To add:**

```python
class Meta:
    db_table = 'page_tracking'
    indexes = [
        models.Index(fields=['visitor', '-visited_at']),
        models.Index(fields=['-visited_at']),
    ]
```

---

## 💡 IMPLEMENTATION NOTES FOR CLAUDE

When working on the Core Module:

1. **Always use DRF APIView** for consistency
2. **Add proper error handling** with meaningful messages
3. **Include docstrings** explaining each endpoint
4. **Use read_only_fields** in serializers for protection
5. **Add proper pagination** to list endpoints
6. **Test with cookies** (visitor_id must exist)
7. **Handle missing sessions gracefully** (return 400, not 500)
8. **Update admin.py** when adding models
9. **Keep migrations descriptive** for future reference
10. **Document new endpoints** in this file

---

## Current Status: ✅

- ✅ Models well-designed
- ✅ 3 core endpoints implemented
- ✅ Serializers complete
- ✅ Error handling in place
- ✅ Pagination configured
- ⚠️ Admin not yet registered
- ⚠️ No database indexes beyond unique constraint
- ⚠️ No geolocation or advanced analytics
