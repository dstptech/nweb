import os
base = r"c:\Projects\DSTP\Company Portfolio"

paths = [
"dstp_backend/manage.py",
"dstp_backend/requirements.txt",
"dstp_backend/requirements.dev.txt",
"dstp_backend/.env",
"dstp_backend/.env.example",
"dstp_backend/backend/__init__.py",
"dstp_backend/backend/asgi.py",
"dstp_backend/backend/wsgi.py",
"dstp_backend/backend/urls.py",
"dstp_backend/backend/settings/__init__.py",
"dstp_backend/backend/settings/base.py",
"dstp_backend/backend/settings/dev.py",
"dstp_backend/backend/settings/prod.py",
# apps
"dstp_backend/apps/authentication/__init__.py",
"dstp_backend/apps/authentication/tests/test_models.py",
"dstp_backend/apps/authentication/tests/test_views.py",
"dstp_backend/apps/authentication/tests/test_services.py",
"dstp_backend/apps/core/__init__.py",
"dstp_backend/apps/services/__init__.py",
"dstp_backend/apps/projects/__init__.py",
"dstp_backend/apps/blog/__init__.py",
"dstp_backend/apps/testimonials/__init__.py",
"dstp_backend/apps/careers/__init__.py",
"dstp_backend/apps/contact/__init__.py",
"dstp_backend/apps/industries/__init__.py",
"dstp_backend/apps/homepage/__init__.py",
# middleware, utils
"dstp_backend/middleware/__init__.py",
"dstp_backend/utils/__init__.py",
"dstp_backend/tests/conftest.py",
"dstp_backend/tests/integration/test_auth_flow.py",
"dstp_backend/tests/integration/test_api_flow.py",
"dstp_backend/docs/api_schema.yaml",
"dstp_backend/docs/architecture.md",

# frontend
"dstp_frontend/package.json",
"dstp_frontend/.gitignore",

"dstp_frontend/client/package.json",
"dstp_frontend/client/vite.config.js",
"dstp_frontend/client/tailwind.config.js",
"dstp_frontend/client/index.html",

# client src structure
"dstp_frontend/client/src/main.jsx",
"dstp_frontend/client/src/App.jsx",
"dstp_frontend/client/src/api/axiosInstance.js",
"dstp_frontend/client/src/api/services.js",
"dstp_frontend/client/src/api/projects.js",
"dstp_frontend/client/src/api/blog.js",
"dstp_frontend/client/src/api/careers.js",
"dstp_frontend/client/src/api/contact.js",

"dstp_frontend/client/src/components/layout/Header.jsx",
"dstp_frontend/client/src/components/layout/Footer.jsx",
"dstp_frontend/client/src/components/layout/Navigation.jsx",
"dstp_frontend/client/src/components/layout/MobileMenu.jsx",

"dstp_frontend/client/src/components/ui/Button.jsx",
"dstp_frontend/client/src/components/ui/Card.jsx",
"dstp_frontend/client/src/components/ui/Badge.jsx",
"dstp_frontend/client/src/components/ui/Modal.jsx",
"dstp_frontend/client/src/components/ui/Spinner.jsx",

"dstp_frontend/client/src/components/sections/SectionHeader.jsx",
"dstp_frontend/client/src/components/sections/ServiceCard.jsx",
"dstp_frontend/client/src/components/sections/ProjectCard.jsx",
"dstp_frontend/client/src/components/sections/BlogCard.jsx",
"dstp_frontend/client/src/components/sections/TestimonialCard.jsx",

"dstp_frontend/client/src/pages/Home/index.jsx",
"dstp_frontend/client/src/pages/Home/HomeHero.jsx",
"dstp_frontend/client/src/pages/Home/HomeServices.jsx",
"dstp_frontend/client/src/pages/Home/HomeStats.jsx",
"dstp_frontend/client/src/pages/Home/HomeTestimonials.jsx",
"dstp_frontend/client/src/pages/Home/HomeIndustries.jsx",

# other pages skeleton
"dstp_frontend/client/src/pages/About/index.jsx",
"dstp_frontend/client/src/pages/About/AboutMission.jsx",
"dstp_frontend/client/src/pages/About/AboutTeam.jsx",
"dstp_frontend/client/src/pages/About/AboutTimeline.jsx",

"dstp_frontend/client/src/pages/Services/index.jsx",
"dstp_frontend/client/src/pages/Services/ServiceDetail.jsx",

"dstp_frontend/client/src/pages/Projects/index.jsx",
"dstp_frontend/client/src/pages/Projects/ProjectDetail.jsx",

"dstp_frontend/client/src/pages/Blog/index.jsx",
"dstp_frontend/client/src/pages/Blog/BlogPost.jsx",

"dstp_frontend/client/src/pages/Industries/index.jsx",
"dstp_frontend/client/src/pages/Industries/IndustryDetail.jsx",

"dstp_frontend/client/src/pages/Careers/index.jsx",
"dstp_frontend/client/src/pages/Careers/JobDetail.jsx",
"dstp_frontend/client/src/pages/Careers/ApplicationForm.jsx",

"dstp_frontend/client/src/pages/Contact/index.jsx",

"dstp_frontend/client/src/hooks/useServices.js",
"dstp_frontend/client/src/hooks/useProjects.js",
"dstp_frontend/client/src/hooks/useBlog.js",
"dstp_frontend/client/src/hooks/useContact.js",

"dstp_frontend/client/src/utils/formatDate.js",
"dstp_frontend/client/src/utils/slugify.js",
"dstp_frontend/client/src/utils/truncate.js",

# admin
"dstp_frontend/admin/package.json",
"dstp_frontend/admin/vite.config.js",
"dstp_frontend/admin/tailwind.config.js",
"dstp_frontend/admin/index.html",

"dstp_frontend/admin/src/main.jsx",
"dstp_frontend/admin/src/App.jsx",

"dstp_frontend/admin/src/api/axiosInstance.js",
"dstp_frontend/admin/src/api/auth.js",
"dstp_frontend/admin/src/api/services.js",
"dstp_frontend/admin/src/api/projects.js",
"dstp_frontend/admin/src/api/blog.js",
"dstp_frontend/admin/src/api/careers.js",
"dstp_frontend/admin/src/api/contact.js",
"dstp_frontend/admin/src/api/users.js",

"dstp_frontend/admin/src/context/AuthContext.jsx",

"dstp_frontend/admin/src/components/layout/AdminLayout.jsx",
"dstp_frontend/admin/src/components/layout/Sidebar.jsx",
"dstp_frontend/admin/src/components/layout/TopBar.jsx",
"dstp_frontend/admin/src/components/layout/Breadcrumb.jsx",

"dstp_frontend/admin/src/components/tables/DataTable.jsx",
"dstp_frontend/admin/src/components/tables/TableActions.jsx",
"dstp_frontend/admin/src/components/tables/TablePagination.jsx",

"dstp_frontend/admin/src/components/forms/FormField.jsx",
"dstp_frontend/admin/src/components/forms/RichTextEditor.jsx",
"dstp_frontend/admin/src/components/forms/ImageUpload.jsx",

"dstp_frontend/admin/src/components/modals/ConfirmDeleteModal.jsx",
"dstp_frontend/admin/src/components/modals/FormModal.jsx",

"dstp_frontend/admin/src/components/ui/StatsCard.jsx",
"dstp_frontend/admin/src/components/ui/Badge.jsx",
"dstp_frontend/admin/src/components/ui/Spinner.jsx",
"dstp_frontend/admin/src/components/ui/Toast.jsx",

# admin pages
"dstp_frontend/admin/src/pages/Auth/LoginPage.jsx",
"dstp_frontend/admin/src/pages/Dashboard/index.jsx",

"dstp_frontend/admin/src/pages/Services/index.jsx",
"dstp_frontend/admin/src/pages/Services/ServiceForm.jsx",

"dstp_frontend/admin/src/pages/Projects/index.jsx",
"dstp_frontend/admin/src/pages/Projects/ProjectForm.jsx",

"dstp_frontend/admin/src/pages/Blog/index.jsx",
"dstp_frontend/admin/src/pages/Blog/BlogEditor.jsx",
"dstp_frontend/admin/src/pages/Blog/CategoryManager.jsx",

"dstp_frontend/admin/src/pages/Testimonials/index.jsx",
"dstp_frontend/admin/src/pages/Testimonials/TestimonialForm.jsx",

"dstp_frontend/admin/src/pages/Careers/index.jsx",
"dstp_frontend/admin/src/pages/Careers/JobForm.jsx",
"dstp_frontend/admin/src/pages/Careers/ApplicationsList.jsx",

"dstp_frontend/admin/src/pages/Contact/index.jsx",
"dstp_frontend/admin/src/pages/Contact/InquiryDetail.jsx",

"dstp_frontend/admin/src/pages/Users/index.jsx",
"dstp_frontend/admin/src/pages/Users/UserForm.jsx",

"dstp_frontend/admin/src/pages/Homepage/HomepageEditor.jsx",

"dstp_frontend/admin/src/pages/Settings/index.jsx",

"dstp_frontend/admin/src/hooks/useAuth.js",
"dstp_frontend/admin/src/hooks/useToast.js",
"dstp_frontend/admin/src/hooks/useTable.js",
]

for p in paths:
    full = os.path.join(base,p)
    d = os.path.dirname(full)
    if not os.path.exists(d):
        os.makedirs(d, exist_ok=True)
    # create empty file
    open(full,'a').close()

print("Created structure and placeholder files")
