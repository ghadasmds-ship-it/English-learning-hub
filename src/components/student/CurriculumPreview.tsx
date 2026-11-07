import React, { useState } from 'react';
import { TOP_GOAL_2_TARGET_VOCABULARY } from '../../data/topGoal2TargetVocabulary';

/** Public curriculum preview only. No student identity, grades or cloud writes. */
export function CurriculumPreview() {
  const [unitId, setUnitId] = useState('welcome');
  const [wordIndex, setWordIndex] = useState(0);
  const [showSpelling, setShowSpelling] = useState(false);
  const [answer, setAnswer] = useState('');
  const [feedback, setFeedback] = useState('');
  const unit = TOP_GOAL_2_TARGET_VOCABULARY.find(u => u.id === unitId)!;
  const word = unit.teachingOf[wordIndex] ?? '';
  const isGroup = word === 'months of the year' || word === 'numbers 101–1000';
  const check = () => {
    const normalized = (value: string) => value.toLocaleLowerCase().replace(/\s+/g, ' ').trim();
    setFeedback(normalized(answer) === normalized(word) ? 'Great work! ⭐' : 'Try again! Listen and practice.');
  };
  const speak = () => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      setFeedback('Audio is not available in this browser.');
      return;
    }
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(word);
    utterance.lang = 'en-US';
    utterance.rate = 0.85;
    window.speechSynthesis.speak(utterance);
  };
  const selectUnit = (id: string) => {
    setUnitId(id); setWordIndex(0); setShowSpelling(false); setAnswer(''); setFeedback('');
  };
  const next = () => {
    setWordIndex(i => (i + 1) % unit.teachingOf.length);
    setAnswer(''); setFeedback(''); setShowSpelling(false);
  };
  return <section className="max-w-4xl mx-auto px-4 py-8 space-y-6">
    <header className="space-y-2">
      <h1 className="text-2xl font-bold">Explore Top Goal 2 Vocabulary</h1>
      <p className="text-sm text-slate-600">Curriculum preview only — no account, saved scores, microphone grading or completed story yet.</p>
    </header>
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3" aria-label="Learning units">
      {TOP_GOAL_2_TARGET_VOCABULARY.map(u => <button key={u.id} type="button" onClick={() => selectUnit(u.id)}
        aria-pressed={u.id === unitId}
        className={`rounded-xl border p-3 font-semibold text-sm text-left ${u.id === unitId ? 'bg-indigo-100 border-indigo-500' : 'bg-white'}`}>
        <span aria-hidden="true">📚 </span>{u.title}
      </button>)}
    </div>
    <article className="bg-white border rounded-2xl p-6 space-y-5">
      <div className="flex items-center justify-between gap-2">
        <h2 className="font-bold text-lg">{unit.title}</h2>
        <span className="text-sm text-slate-500">{wordIndex + 1} / {unit.teachingOf.length}</span>
      </div>
      <div className="text-center py-8 rounded-xl bg-sky-50">
        <p className="text-3xl font-bold break-words">{word}</p>
        {isGroup && <p className="text-sm mt-3 text-slate-600">This topic will have its own learning activities.</p>}
      </div>
      <div className="flex flex-wrap gap-3">
        <button type="button" onClick={speak} className="rounded-xl bg-sky-700 text-white px-4 py-3 font-semibold">🔊 Listen</button>
        <button type="button" onClick={() => { setShowSpelling(v => !v); setFeedback(''); }} className="rounded-xl border px-4 py-3 font-semibold">✍️ Spelling practice</button>
        <button type="button" onClick={next} className="rounded-xl bg-indigo-700 text-white px-4 py-3 font-semibold">Next →</button>
      </div>
      {showSpelling && <div className="space-y-3">
        <label className="block text-sm font-semibold" htmlFor="preview-spelling">Type the word you heard</label>
        <input id="preview-spelling" value={answer} onChange={e => setAnswer(e.target.value)} autoComplete="off" className="border rounded-xl p-3 w-full" />
        <button type="button" onClick={check} className="rounded-xl bg-indigo-700 text-white px-4 py-2">Check</button>
        {feedback && <p role="status">{feedback}</p>}
      </div>}
    </article>
  </section>;
}
