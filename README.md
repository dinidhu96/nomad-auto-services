# Nomad Auto Services

Production-ready responsive Next.js App Router application for a premium roadside assistance brand. Desktop renders as a polished marketing and booking site; mobile renders as an app-like WebView/PWA surface.

## Tech Stack

- Next.js App Router, TypeScript, Tailwind CSS
- shadcn-inspired local UI primitives and Lucide React icons
- Supabase Auth, Postgres, Storage-ready asset structure, RLS SQL
- Vercel-ready deployment configuration
- PWA manifest and safe-area mobile layout support

## Local Setup

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open `http://localhost:3000`.

## Supabase Setup

1. Create a Supabase project.
2. Copy `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` into `.env.local`.
3. Copy the service role key into `SUPABASE_SERVICE_ROLE_KEY`. Keep it server-only.
4. Run `supabase/migrations/202604260001_initial_schema.sql` in the Supabase SQL editor or via the Supabase CLI.
5. Configure Auth email/password for admin users.

## Database and RLS

The migration creates `profiles`, `services`, `vehicles`, `bookings`, `booking_status_events`, `contact_messages`, `pricing_plans`, and `customer_otp_sessions`. RLS is enabled on all public tables. Customers can only access their own profile, vehicles, and bookings. Admins/dispatchers can manage operational data. Technicians can see assigned bookings. Anonymous users can create contact messages only.

## Demo OTP

Customer login uses a simulated OTP for MVP testing:

- Enter any valid phone number.
- Use OTP `123456`.
- The API stores a demo OTP session if Supabase service role is configured.
- A secure demo cookie is set so customer routes work locally.

Replace this later with a real SMS provider in `src/app/api/demo-otp/start/route.ts` and `src/app/api/demo-otp/verify/route.ts`.

## Vercel Deployment

1. Push this project to GitHub.
2. Import the repository in Vercel.
3. Add all `.env.example` variables in Vercel Project Settings.
4. Deploy. Vercel auto-detects Next.js.

## GitHub Auto-Deploy

Connect the GitHub repo to Vercel. Every pull request gets a preview deployment; merges to the production branch deploy production.

## Future Integrations

- SMS gateway: replace demo OTP with Twilio, MessageBird, or a local provider.
- Maps: replace the mock map block in the booking flow with geocoding and technician tracking.
- Payments: add Stripe Checkout or invoices after request acceptance.
- Mobile wrapper: wrap the deployed URL in Capacitor/WebView and keep safe-area CSS active.

## Security Notes

- Do not expose `SUPABASE_SERVICE_ROLE_KEY` in browser code.
- Protected pages re-check roles server-side.
- RLS is the final database access boundary.
- Admin registration is available for MVP setup; restrict or remove it before public launch.

## Known MVP Limitations

- OTP is simulated.
- ETA and map are mocked.
- Admin CRUD forms are UI-ready but intentionally minimal until Supabase credentials are configured.
- No payment integration is included.
