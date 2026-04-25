# Vercel Deployment

1. Push the repository to GitHub.
2. Import the project in Vercel.
3. Set the build command to `npm run build` and install command to `npm install`.
4. Add environment variables from `.env.example`.
5. Deploy.

For GitHub auto-deploy, keep the Vercel Git integration enabled. Pull requests will receive preview deployments and the production branch will deploy to production.

Do not add `SUPABASE_SERVICE_ROLE_KEY` to any public/client variable.
