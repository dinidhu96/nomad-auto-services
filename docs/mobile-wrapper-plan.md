# Mobile Wrapper Plan

The mobile browser UI is designed to work inside a WebView or Capacitor shell.

Recommended future steps:

1. Deploy the web app to Vercel.
2. Create a Capacitor app that loads the Vercel URL.
3. Keep `viewport-fit=cover` and safe-area CSS active.
4. Map native call/location permissions to the booking and contact flows.
5. Add push notifications for booking status updates.

The current PWA manifest and bottom navigation prepare the app for this path.
