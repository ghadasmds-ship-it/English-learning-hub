import { collection, doc, getDocs, query, where, addDoc, serverTimestamp, type DocumentData } from 'firebase/firestore';
import { createCloudServices } from './firebaseClient';
import type { ClassRoom } from '../types';

/**
 * Authenticated teacher-scoped Firestore access.
 * Firestore security rules remain the authoritative tenant boundary.
 * This module does not read or write localStorage.
 */
function requireTeacher(teacherId: string) {
  const { auth, db } = createCloudServices();
  const uid = auth.currentUser?.uid;
  if (!uid || uid !== teacherId) throw new Error('A matching authenticated teacher account is required.');
  return db;
}

export interface CloudClass {
  id: string;
  teacherId: string;
  name: string;
  stageLevel: string;
  grade: string;
  section: string;
  academicYear: string;
  classCode: string;
}

export async function listTeacherClasses(teacherId: string): Promise<CloudClass[]> {
  const db = requireTeacher(teacherId);
  const snapshot = await getDocs(query(collection(db, 'classes'), where('teacherId', '==', teacherId)));
  return snapshot.docs.map(record => {
    const data = record.data();
    if (data.teacherId !== teacherId) throw new Error('Tenant mismatch in class record');
    return {
      id: record.id,
      teacherId,
      name: String(data.name ?? ''),
      stageLevel: String(data.stageLevel ?? ''),
      grade: String(data.grade ?? ''),
      section: String(data.section ?? ''),
      academicYear: String(data.academicYear ?? ''),
      classCode: String(data.classCode ?? ''),
    };
  });
}

export async function createTeacherClass(teacherId: string, input: Omit<CloudClass, 'id' | 'teacherId'>): Promise<string> {
  const db = requireTeacher(teacherId);
  for (const key of ['name', 'stageLevel', 'grade', 'section', 'academicYear', 'classCode'] as const) {
    if (!input[key].trim()) throw new Error(`Missing class field: ${key}`);
  }
  const result = await addDoc(collection(db, 'classes'), {
    ...input,
    teacherId,
    createdAt: serverTimestamp(),
  });
  return result.id;
}

export interface CloudStudentSummary {
  id: string;
  teacherId: string;
  classId: string;
  fullName: string;
  avatarId: string;
}

export async function listTeacherStudents(teacherId: string, classId?: string): Promise<CloudStudentSummary[]> {
  const db = requireTeacher(teacherId);
  const constraints = [where('teacherId', '==', teacherId)];
  // Filtering by class client-side avoids requiring a compound index for this read.
  const snapshot = await getDocs(query(collection(db, 'students'), ...constraints));
  return snapshot.docs.filter(record => !classId || record.data().classId === classId).map(record => {
    const data = record.data();
    if (data.teacherId !== teacherId) throw new Error('Tenant mismatch in student record');
    return {
      id: record.id,
      teacherId,
      classId: String(data.classId ?? ''),
      fullName: String(data.fullName ?? ''),
      avatarId: String(data.avatarId ?? ''),
    };
  });
}
