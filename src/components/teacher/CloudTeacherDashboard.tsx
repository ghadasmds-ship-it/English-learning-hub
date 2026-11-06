import React, { useEffect, useState } from 'react';
import { createTeacherClass, listTeacherClasses, listTeacherStudents, type CloudClass, type CloudStudentSummary } from '../../services/teacherCloudRepository';

export function CloudTeacherDashboard({ teacherId }: { teacherId: string }) {
  const [classes, setClasses] = useState<CloudClass[]>([]);
  const [students, setStudents] = useState<CloudStudentSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [name, setName] = useState('');
  const [stageLevel, setStageLevel] = useState('primary');
  const [grade, setGrade] = useState('1');
  const [section, setSection] = useState('A');
  const [academicYear, setAcademicYear] = useState('2026-2027');
  const [classCode, setClassCode] = useState('');

  async function reload() {
    setLoading(true);
    setError('');
    try {
      const [nextClasses, nextStudents] = await Promise.all([listTeacherClasses(teacherId), listTeacherStudents(teacherId)]);
      setClasses(nextClasses);
      setStudents(nextStudents);
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e));
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { void reload(); }, [teacherId]);

  async function submit(event: React.FormEvent) {
    event.preventDefault();
    setSaving(true);
    setError('');
    try {
      await createTeacherClass(teacherId, { name, stageLevel, grade, section, academicYear, classCode });
      setName('');
      setClassCode('');
      await reload();
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e));
    } finally {
      setSaving(false);
    }
  }

  return (
    <section className="max-w-5xl mx-auto px-4 py-10 space-y-7">
      <div>
        <h1 className="text-2xl font-bold">My Classes</h1>
        <p className="text-sm text-slate-600 mt-2">Your authenticated Firestore records only. Student enrollment and assessments are being migrated.</p>
      </div>
      {error && <p role="alert" className="p-3 rounded-lg bg-red-50 text-red-800">{error}</p>}
      <form onSubmit={submit} className="bg-white border rounded-2xl p-5 space-y-4">
        <h2 className="font-bold">Create a Class</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <label className="text-sm">Class name<input required value={name} onChange={e => setName(e.target.value)} className="block border rounded-lg p-2 w-full mt-1" /></label>
          <label className="text-sm">Stage<select value={stageLevel} onChange={e => setStageLevel(e.target.value)} className="block border rounded-lg p-2 w-full mt-1"><option value="primary">Primary</option><option value="intermediate">Intermediate</option><option value="secondary">Secondary</option></select></label>
          <label className="text-sm">Grade<select value={grade} onChange={e => setGrade(e.target.value)} className="block border rounded-lg p-2 w-full mt-1">{Array.from({length: stageLevel === 'primary' ? 6 : 3}, (_, i) => <option key={i+1} value={String(i+1)}>Grade {i+1}</option>)}</select></label>
          <label className="text-sm">Section<input required value={section} onChange={e => setSection(e.target.value)} className="block border rounded-lg p-2 w-full mt-1" /></label>
          <label className="text-sm">Academic year<input required value={academicYear} onChange={e => setAcademicYear(e.target.value)} className="block border rounded-lg p-2 w-full mt-1" /></label>
          <label className="text-sm">Class code<input required value={classCode} onChange={e => setClassCode(e.target.value)} className="block border rounded-lg p-2 w-full mt-1" /></label>
        </div>
        <button disabled={saving} type="submit" className="rounded-xl bg-indigo-700 text-white px-5 py-2 font-bold disabled:opacity-50">{saving ? 'Saving…' : 'Add Class'}</button>
      </form>
      <div className="bg-white border rounded-2xl p-5">
        <h2 className="font-bold mb-3">Class roster overview</h2>
        {loading ? <p>Loading…</p> : classes.length === 0 ? <p className="text-slate-600">No classes yet.</p> : (
          <ul className="space-y-2">{classes.map(item => <li key={item.id} className="border-b py-3 flex justify-between gap-3">
            <span>{item.name} — {item.stageLevel}, grade {item.grade}, {item.section}</span>
            <span className="text-sm text-slate-500">{students.filter(s => s.classId === item.id).length} students</span>
          </li>)}</ul>
        )}
      </div>
    </section>
  );
}
