import React, { useState } from 'react';
import { signInStaff, type StaffSession } from '../../services/staffAuthService';

export function StaffLogin({ onSuccess, onCancel }: {
  onSuccess: (session: StaffSession) => void;
  onCancel: () => void;
}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [pending, setPending] = useState(false);
  const [error, setError] = useState('');
  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    setPending(true);
    setError('');
    try {
      onSuccess(await signInStaff(email, password));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to sign in.');
    } finally {
      setPending(false);
    }
  };
  return (
    <section className="max-w-md mx-auto my-12 p-7 rounded-3xl bg-white border border-slate-200 shadow-sm">
      <h1 className="text-2xl font-bold mb-2">Teacher &amp; Owner Sign In</h1>
      <p className="text-sm text-slate-600 mb-6">Use your authorized platform account.</p>
      <form onSubmit={submit} className="space-y-4">
        <label className="block text-sm font-semibold">Email
          <input required type="email" autoComplete="username" value={email} onChange={e => setEmail(e.target.value)}
            className="mt-1 block w-full rounded-xl border p-3" />
        </label>
        <label className="block text-sm font-semibold">Password
          <input required type="password" autoComplete="current-password" value={password} onChange={e => setPassword(e.target.value)}
            className="mt-1 block w-full rounded-xl border p-3" />
        </label>
        {error && <p role="alert" className="text-red-700 text-sm">{error}</p>}
        <button disabled={pending} type="submit" className="w-full bg-indigo-700 text-white rounded-xl p-3 font-bold disabled:opacity-50">
          {pending ? 'Signing in…' : 'Sign In'}
        </button>
      </form>
      <button type="button" onClick={onCancel} className="mt-4 text-sm text-slate-600 underline">Back to student login</button>
    </section>
  );
}
