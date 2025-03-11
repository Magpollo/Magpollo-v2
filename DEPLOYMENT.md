# Magpollo Website Deployment Guide

This guide provides step-by-step instructions for deploying the Magpollo website with the form submission functionality to Vercel.

## Prerequisites

- A Vercel account
- Git repository with your project code
- SendInBlue/Brevo account for email sending

## Deployment Steps

### 1. Set up Environment Variables in Vercel

In your Vercel project settings, add the following environment variables:

- `SMTP_HOST`: smtp-relay.brevo.com
- `SMTP_PORT`: 587
- `SMTP_USER`: Your SendInBlue/Brevo SMTP username
- `SMTP_PASSWORD`: Your SendInBlue/Brevo SMTP password
- `EMAIL_FROM`: noreply@magpollo.com
- `EMAIL_TO`: salesteam@magpollo.com
- `EMAIL_CC`: (Optional) Comma-separated list of CC recipients

> **Important**: Keep your SMTP credentials secure! Never commit them to your repository.

### 2. Deploy to Vercel

#### Option 1: Connect Git Repository (Recommended)

1. Log in to your Vercel account
2. Click "Add New..." > "Project"
3. Select your Git repository
4. Configure the project:
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Environment Variables: Add the ones mentioned above
5. Click "Deploy"

#### Option 2: Manual Deployment

```bash
# Install Vercel CLI
npm install -g vercel

# Login to Vercel
vercel login

# Deploy from project directory
cd /path/to/magpollo-v2.1
vercel
```

Follow the prompts to configure your project.

### 3. Verify Deployment

After deployment:

1. Visit your deployed site
2. Test the contact form
3. Check that emails are being received
4. Verify file attachments are working

### 4. Troubleshooting

If you encounter issues:

- Check Vercel function logs for errors (Vercel Dashboard > Functions)
- Verify environment variables are set correctly
- Test SMTP credentials are valid
- Ensure your SendInBlue/Brevo account has sufficient email sending capacity

### 5. Domain Configuration

To use a custom domain:

1. Go to your Vercel project settings
2. Navigate to "Domains"
3. Add your domain (e.g., magpollo.com)
4. Follow the instructions to configure DNS records

## Maintenance

- Monitor email sending limits
- Update SMTP credentials if they change
- Check Vercel logs periodically for any errors

## Additional Resources

- [Vercel Documentation](https://vercel.com/docs)
- [SendInBlue/Brevo SMTP Documentation](https://help.brevo.com/hc/en-us/articles/209462765-Set-up-and-use-SMTP-relay)
- [Nodemailer Documentation](https://nodemailer.com/) 