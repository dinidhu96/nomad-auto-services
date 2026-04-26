# Nomad Auto Services

Production-ready responsive Next.js App Router application for Nomad Auto Services. Desktop renders as a polished automotive service website; mobile renders as an app-like WebView/PWA surface with call, WhatsApp, booking, pricing, and profile actions.

Stage 01 is preserved as git tag `stage-01` and archive `snapshots/stage-01-nomad-auto-services.zip`.

## Tech Stack

- Next.js App Router, TypeScript, Tailwind CSS
- shadcn-inspired local UI primitives and Lucide React icons
- Supabase Auth, Postgres, Storage-ready asset structure, RLS SQL
- Vercel-ready deployment configuration
- PWA manifest and safe-area mobile layout support
- API routes for contact, checkout, rego lookup, and lube guide lookup
- Local JSON content files for business data, service pages, packages, FAQs, and blog placeholders

## Local Setup

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open `http://localhost:3000`.

## Business Data

Core business content is stored under `src/content/` and consumed through `src/lib/site.ts`.

- Website: `https://nomadautoservices.com.au`
- Phone: `0456 616 256`
- Email: `hello@nomadautoservices.com.au`
- MRB: `12902`
- Lubricant partner: `SPRINT LUBRICANTS`
- Facebook and WhatsApp links are shown in the header/footer and mobile CTAs.

## Runtime Features

### Contact Form

`/contact` submits to `/api/contact` with `name`, `email`, `mobile`, and `message`. Validation is server-side through Zod. If Gmail SMTP variables are configured, the API sends email with Nodemailer. If SMTP is not configured, it returns a mock success response for local development.

### Buy Service Online

`/buy` lets customers choose a fixed-price package, quantity 1 to 5, and optional customer details. The selection is saved only in browser `localStorage`. `/api/checkout` validates the package, creates an order reference like `NAS-[timestamp]-[random]`, and redirects to `PAYMENT_GATEWAY_CHECKOUT_URL` if configured. Otherwise it redirects to `/payment-gateway/mock`.

### Rego Check

`/rego-check` normalizes Australian plates, saves the last lookup in browser `localStorage`, and submits to `/api/rego`. The API keeps `BLUEFLAG_API_KEY` server-side and rate limits by IP to 10 requests per minute. Without Blue Flag credentials, it returns a safe mock response.

### Lube Guide

`/lube-guide` submits to `/api/lube/rego`. `LUBE_PROVIDER=mock` returns Toyota Hilux 2019 recommendations across engine oil, transmission, differential, brake fluid, coolant, power steering, hydraulics, and other checks. `LUBE_PROVIDER=infomedia` is a placeholder until real Infomedia API docs and credentials are supplied.

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

Required private server variables:

- `GMAIL_USER`
- `GMAIL_APP_PASSWORD`
- `CONTACT_TO_EMAIL`
- `BLUEFLAG_BASE_URL`
- `BLUEFLAG_API_KEY`
- `PAYMENT_GATEWAY_CHECKOUT_URL`
- `INFOMEDIA_BASE_URL`
- `INFOMEDIA_API_KEY`

## GitHub Auto-Deploy

Connect the GitHub repo to Vercel. Every pull request gets a preview deployment; merges to the production branch deploy production.

## Future Integrations

- SMS gateway: replace demo OTP with Twilio, MessageBird, or a local provider.
- Maps: replace the mock map block in the booking flow with geocoding and technician tracking.
- Payments: replace the mock payment gateway with the real hosted checkout URL.
- Blue Flag NEVDIS: configure production base URL and API key server-side.
- Infomedia NetLube: replace the placeholder once API documentation is supplied.
- Mobile wrapper: wrap the deployed URL in Capacitor/WebView and keep safe-area CSS active.

## Security Notes

- Do not expose `SUPABASE_SERVICE_ROLE_KEY` in browser code.
- Do not expose Gmail, Blue Flag, payment gateway, or Infomedia credentials in browser code.
- Protected pages re-check roles server-side.
- RLS is the final database access boundary.
- Admin registration is available for MVP setup; restrict or remove it before public launch.

## Known MVP Limitations

- OTP is simulated.
- ETA and map are mocked.
- Admin CRUD forms are UI-ready but intentionally minimal until Supabase credentials are configured.
- Payment, Blue Flag, and Infomedia integrations have clean server-side placeholders until real provider credentials are supplied.
