# Form Email Notification Setup

## Email for form submissions
**Email:** dilloncharles17@icloud.com

## Setup Instructions for Netlify

After deploying to Netlify, configure email notifications:

1. Go to your Netlify dashboard
2. Navigate to: Site Settings → Forms → Form notifications
3. Click "Add notification" → "Email notification"
4. Set the email to: **dilloncharles17@icloud.com**
5. Choose which forms to notify for:
   - `contact` (homepage contact form)
   - `contact-page` (contact page form)

## Forms on the site

1. **Homepage Contact Form** (`index.html`)
   - Form name: `contact`
   - Located in the contact section

2. **Contact Page Form** (`pages/contact.html`)
   - Form name: `contact-page`
   - Dedicated contact page with detailed form

Both forms are configured with:
- Netlify Forms integration (`data-netlify="true"`)
- Spam protection (honeypot field)
- Hidden form-name field for proper submission handling
