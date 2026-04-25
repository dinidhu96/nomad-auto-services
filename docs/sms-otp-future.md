# Future SMS OTP Integration

Current MVP behavior uses OTP `123456`.

To add real SMS:

1. Replace `/api/demo-otp/start` with a provider call that creates an OTP and sends SMS.
2. Store only hashed OTPs or use the provider verification API.
3. Replace `/api/demo-otp/verify` with provider verification.
4. After verification, create or fetch the Supabase customer profile.
5. Replace the demo cookie with a real Supabase auth session or supported phone auth flow.

Candidate providers: Twilio Verify, MessageBird, Vonage, or a local SMS aggregator.
