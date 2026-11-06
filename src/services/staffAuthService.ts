import { onAuthStateChanged, signInWithEmailAndPassword, signOut, type Unsubscribe, type User } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { createCloudServices } from './firebaseClient';
import type { TeacherAccount } from '../types';

export type StaffSession =
  | { role: 'teacher'; user: User; teacher: TeacherAccount }
  | { role: 'admin'; user: User };

/**
 * Staff identities are verified by Firebase Auth. Roles are never taken from
 * localStorage, email-address allowlists or a client-controlled UI selector.
 * Admin roles must be provisioned with trusted custom claims.
 */
export async function resolveStaffSession(user: User): Promise<StaffSession | null> {
  const { db } = createCloudServices();
  const token = await user.getIdTokenResult(true);
  if (token.claims.role === 'admin') {
    return { role: 'admin', user };
  }
  const teacherDoc = await getDoc(doc(db, 'teachers', user.uid));
  if (!teacherDoc.exists()) return null;
  const data = teacherDoc.data() as TeacherAccount;
  if (data.id && data.id !== user.uid) return null;
  return { role: 'teacher', user, teacher: { ...data, id: user.uid } };
}

export async function signInStaff(email: string, password: string): Promise<StaffSession> {
  const { auth } = createCloudServices();
  const credential = await signInWithEmailAndPassword(auth, email.trim(), password);
  try {
    const session = await resolveStaffSession(credential.user);
    if (!session) throw new Error('No authorized staff profile is assigned to this account.');
    return session;
  } catch (error) {
    await signOut(auth);
    throw error;
  }
}

export function observeStaffSession(
  onChange: (session: StaffSession | null) => void,
  onError: (error: Error) => void
): Unsubscribe {
  const { auth } = createCloudServices();
  return onAuthStateChanged(auth, async user => {
    if (!user) {
      onChange(null);
      return;
    }
    try {
      onChange(await resolveStaffSession(user));
    } catch (error) {
      onError(error instanceof Error ? error : new Error(String(error)));
      onChange(null);
    }
  }, onError);
}

export async function signOutStaff(): Promise<void> {
  await signOut(createCloudServices().auth);
}
