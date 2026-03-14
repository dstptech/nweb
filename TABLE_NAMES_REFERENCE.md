# Database Table Naming Reference
## Simplified Names for Easy Management

| Category | Old Name | New Name | Purpose |
|----------|----------|----------|---------|
| **👤 User Management** | | | |
| | `auth_users` | `users` | User accounts and login info |
| | `auth_user_profile` | `user_profiles` | Extended user profile data |
| | `auth_password_reset_token` | `password_reset_tokens` | Password reset tokens |
| **📝 Content Management** | | | |
| | `blog_blog` | `blog_posts` | Blog articles and posts |
| | `services_service` | `services` | Services offered |
| | `services_servicecategory` | `service_categories` | Service categories |
| | `services_servicefeature` | `service_features` | Service features/details |
| | `projects_project` | `projects` | Client projects |
| **🏢 Business Information** | | | |
| | `careers_career` | `job_listings` | Job openings and careers |
| | `industries_industry` | `industries` | Industries served |
| | `testimonials_testimonial` | `testimonials` | Client testimonials |
| **📞 Customer Relations** | | | |
| | `contact_contact` | `contact_messages` | Contact form submissions |
| **🏠 Website** | | | |
| | `homepage_homepage` | `homepage_content` | Homepage content/settings |
| **📊 Analytics & Tracking** | | | |
| | `visitor_sessions` | `visitor_tracking` | Visitor session tracking |
| | `page_visits` | `page_tracking` | Individual page visits |

## Quick Summary
- **Total Tables**: 26
- **User-Facing Tables**: 15 (simplified names for easy management)
- **System Tables**: 11 (Django internal tables)

## Features of New Names
✅ **Easy to understand** - No technical prefixes or abbreviations  
✅ **Business-friendly** - Names match business concepts  
✅ **Intuitive** - No confusion for non-technical managers  
✅ **Organized** - Grouped by functionality  
