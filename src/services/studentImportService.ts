import { collection, doc, getDoc, getDocs, query, where, writeBatch } from 'firebase/firestore';
import { createCloudServices } from './firebaseClient';

/** Names are entered by the teacher; student login credentials are NOT generated here. */
export function parseStudentNames(input: string): string[] {
  const names = input.split(/[\r\n,،;؛]+/).map(name => name.replace(/\s+/g, ' ').trim()).filter(Boolean);
  if (names.length > 300) throw new Error('Please import at most 300 students per batch.');
  const unique = new Map<string, string>();
  for (const name of names) {
    if (name.length < 2 || name.length > 120 || /[<>\u0000-\u001f]/.test(name)) {
      throw new Error('Invalid student name: ' + name);
    }
    const normalized = name.toLocaleLowerCase();
    if (!unique.has(normalized)) unique.set(normalized, name);
  }
  return [...unique.values()];
}

export async function importStudentNames(teacherId: string, classId: string, input: string): Promise<number> {
  const { auth, db } = createCloudServices();
  if (!auth.currentUser || auth.currentUser.uid !== teacherId) throw new Error('Teacher sign-in required.');
  const names = parseStudentNames(input);
  if (!names.length) throw new Error('Enter student names first.');
  const classRecord = await getDoc(doc(db, 'classes', classId));
  if (!classRecord.exists() || classRecord.data().teacherId !== teacherId) throw new Error('Class does not belong to your account.');
  const existing = await getDocs(query(collection(db, 'students'), where('teacherId', '==', teacherId)));
  const existingNames = new Set(existing.docs.filter(d => d.data().classId === classId).map(d => String(d.data().fullName || '').toLocaleLowerCase()));
  const toCreate = names.filter(name => !existingNames.has(name.toLocaleLowerCase()));
  // Firestore batched writes: keep each operation below the 500-write limit.
  for (let offset = 0; offset < toCreate.length; offset += 200) {
    const batch = writeBatch(db);
    for (const name of toCreate.slice(offset, offset + 200)) {
      const record = doc(collection(db, 'students'));
      batch.set(record, {
        id: record.id,
        teacherId,
        classId,
        fullName: name,
        avatarId: 'default',
        createdAt: new Date().toISOString(),
      });
    }
    await batch.commit();
  }
  return toCreate.length;
}
