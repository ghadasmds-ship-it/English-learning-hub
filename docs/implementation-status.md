# Secure migration status (development branch)

## Implemented
- Firebase SDK dependency and fail-closed initialization.
- Staff sign-in form and Firebase Authentication session verification.
- Admin requires a trusted Firebase custom claim `role: admin`.
- Teacher account must be a Firestore document at `teachers/{auth.uid}` with matching email.
- Outside an explicitly enabled development demo, the app does not display browser-local teacher/admin dashboards. Those dashboards currently depend on untrusted localStorage and **must not** be exposed as secure cloud data.
- Firestore rules now restrict public report token reads, immutable ownership, and license activation.
- Speech scoring uses ordered recognized-word alignment; it is **not** phoneme-level pronunciation scoring.

## Important: not ready to sell or deploy
- Migrate all teacher dashboards, class/student management, learning progress, reports and subscription workflows from localStorage to authenticated Firestore operations.
- Implement secure student authentication. Current demo student PINs are plaintext browser-local samples; never deploy them for real students.
- Replace public parent token workflow with the approved teacher-downloaded unit PDF.
- Implement server-side license issuance and redemption with trusted backend code.
- Test Firestore rules in the Firebase Emulator with positive and negative cross-tenant cases.
- Install dependencies and refresh `bun.lock` (package.json changed); run `bun install`, `bun run lint`, `bun run build` and browser integration tests.
- Configure Firebase project credentials and deploy rules only after tests.

## Developer-only demo
Set `VITE_ENABLE_DEMO=true` when running Vite in development. The sample teacher switcher and localStorage teacher dashboards remain available **only** in this explicit local development mode. Do not put this flag in a production deployment.

No Firebase credentials, service account keys, passwords or payment secrets should be committed to this repository.
