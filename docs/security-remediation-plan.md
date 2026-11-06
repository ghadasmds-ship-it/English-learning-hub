# Authentication and tenant isolation remediation — draft

Status: audit and implementation plan; no production security guarantees yet.
Branch: fix/auth-tenant-isolation. Main is unchanged.

## Verified in current source
- src/App.tsx initializes a student as signed in and uses UI state to select student, teacher or admin. Teacher selection can switch between sample teacher accounts.
- src/components/common/Navbar.tsx exposes a role tester, including Owner, without identity verification.
- src/components/student/StudentLogin.tsx pre-fills a sample class code, username and PIN, and provides one-click sample login.
- src/services/storageService.ts persists teachers, classes, students and progress in browser localStorage, including sample student PINs.
- src/services/firebaseConfig.ts checks environment variables but does not initialize Firebase Auth or Firestore. Its live_cloud mode is only a configuration label.
- firestore.rules permits a teacher to create their own teachers document and alter fields other than licenseExpiresAt and isReadOnly; it does not freeze class/student teacherId or classId on updates. Parent report link documents have public read access.
- firestore.rules studentProgress write uses resource.data for both create and update, so creation cannot work as intended.

## Safe implementation sequence
1. Design verified Firebase Auth teacher/admin sessions and server-assigned admin claims. Never authorize roles from a UI switch or client-written role field.
2. Define student sign-in using server-side credential verification; do not store plaintext PINs in client-readable documents.
3. Add Firestore-backed repository scoped by authenticated teacher UID, class and student. Enforce ownership in Firestore rules for create/update/delete, and validate cross-references.
4. Restrict licensing and subscription changes to trusted server-side code; make teacher ownership and privileged fields immutable.
5. Replace public parent-report-token records with the approved teacher-generated, unit-specific PDF download flow. Keep achievements portfolio separate.
6. Migrate sample/local pilot data carefully, without silently importing demo identities or erasing existing browser data.
7. Add Firestore emulator rule tests for cross-teacher access, role escalation, and student writes; run build and tests before any merge.

Do not deploy current firestore.rules to production. Do not merge this branch without review. Preserve the current learning UI and features.
