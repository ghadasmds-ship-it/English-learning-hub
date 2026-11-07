# Firebase setup — English Learning Hub

Project ID: `english-learning-hub-44e55`

## Web application configuration

Configure the Vite deployment environment (do not commit private service-account keys):

```dotenv
VITE_FIREBASE_API_KEY=AIzaSyDbAEQ-NpZpilpVJC_SRrz6b2XoqgawiPw
VITE_FIREBASE_AUTH_DOMAIN=english-learning-hub-44e55.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=english-learning-hub-44e55
VITE_FIREBASE_STORAGE_BUCKET=english-learning-hub-44e55.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=555926100
VITE_FIREBASE_APP_ID=1:555926100:web:ec019b7a0d08dbf342a3c1
```

These values are **public Firebase web-app identifiers**, not admin credentials. Never place service-account private keys in Vite variables or the repository. Configure API-key restrictions and App Check as appropriate.

## Current state and next steps

- Firestore default database was created in the Firebase console.
- Firebase Authentication Email/Password provider was enabled.
- Firebase web app was registered.
- Firestore rules in this repository are **not automatically deployed**. The console's initial deny-all rules remain until a reviewed ruleset is explicitly published.
- A Firebase Auth user alone is not an authorized teacher. Teacher profile documents and license expiry timestamps must be provisioned by a trusted administrator; do not self-assign roles from the browser.
- Do not enable public sign-up or create real student accounts until student authentication and server-side scoring are implemented and tested.
- Before deploying: verify the security rules in the Firebase emulator with two separate teacher identities and verify the CI TypeScript build.
- The current cloud dashboard is an in-progress implementation, not a production-ready commercial product.
