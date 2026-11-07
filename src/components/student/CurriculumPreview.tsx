import React, { useEffect, useRef, useState } from 'react';
import { TOP_GOAL_2_TARGET_VOCABULARY } from '../../data/topGoal2TargetVocabulary';
import { TOP_GOAL_2_STORIES } from '../../data/topGoal2Stories';

const visual: Record<string, string> = {
  calendar:'🗓️', month:'📅', date:'📆', early:'🌅', late:'⌛',
  friendly:'🤝', funny:'😄', lucky:'🍀', noisy:'📣', tidy:'🧹', ride:'🚲',
  architect:'🏠', basement:'🏡', entrance:'🚪', fridge:'🧊', gate:'🚪',
  key:'🔑', oven:'🍞', phone:'📱', screen:'🖥️', cushion:'🛋️', shelf:'📚',
  artist:'🎨', driver:'🚗', engineer:'🛠️', mechanic:'🔧', pilot:'✈️',
  singer:'🎤', waiter:'🍽️', airport:'🛫', factory:'🏭', office:'🏢',
  bake:'🧁', butter:'🧈', cookies:'🍪', flour:'🌾', honey:'🍯',
  recipe:'📖', snack:'🥨', sugar:'🍬', yogurt:'🥣', mix:'🥄', stir:'🥄',
  cartoon:'🎞️', comedy:'😄', mystery:'🔍', character:'🧑', whisper:'🤫',
  camping:'🏕️', canoe:'🛶', helmet:'⛑️', hiking:'🥾', tent:'⛺',
  backpack:'🎒', campfire:'🔥', flashlight:'🔦', raft:'🛶',
  suitcase:'🧳', passenger:'🧍', station:'🚉', taxi:'🚕', subway:'🚇',
  passport:'🛂', arrive:'🚉', belt:'👖', bracelet:'📿', crown:'👑',
  earrings:'💎', necklace:'📿', purse:'👜', umbrella:'☂️', uniform:'👔'
};
type SpeechResult = { results?: ArrayLike<ArrayLike<{transcript:string}>> };
type Recognition = { lang:string; interimResults:boolean; onresult:((e:SpeechResult)=>void)|null; onerror:((e:{error:string})=>void)|null; onend:(()=>void)|null; start:()=>void; stop:()=>void };
type SpeechWindow = Window & { SpeechRecognition?:new()=>Recognition; webkitSpeechRecognition?:new()=>Recognition };
const normalize = (s:string) => s.toLocaleLowerCase().replace(/[^a-z0-9 ]/g,' ').replace(/\s+/g,' ').trim();
function say(text:string, onError:(message:string)=>void) {
  if (!('speechSynthesis' in window)) { onError('Audio is not supported on this device.'); return; }
  window.speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(text);
  u.lang='en-US'; u.rate=0.83;
  window.speechSynthesis.speak(u);
}

/** Public, stateless preview. Never stores identifiable student data or scores. */
export function CurriculumPreview() {
  const [unitId,setUnitId]=useState('welcome');
  const [index,setIndex]=useState(0);
  const [mode,setMode]=useState<'learn'|'write'|'speak'|'story'>('learn');
  const [answer,setAnswer]=useState('');
  const [feedback,setFeedback]=useState('');
  const [page,setPage]=useState(0);
  const recognition=useRef<Recognition|null>(null);
  const unit=TOP_GOAL_2_TARGET_VOCABULARY.find(u=>u.id===unitId)!;
  const word=unit.teachingOf[index]||'';
  const story=TOP_GOAL_2_STORIES.find(s=>s.unitId===unitId);
  const storyText=story?.pages[page]||'';
  const isTopic=word==='months of the year'||word==='numbers 101–1000';
  const reset=(nextMode:typeof mode='learn')=>{
    recognition.current?.stop(); recognition.current=null;
    setAnswer('');setFeedback('');setMode(nextMode);
  };
  useEffect(()=>()=>{recognition.current?.stop();if('speechSynthesis' in window)window.speechSynthesis.cancel();},[]);
  const check=(response:string)=>{
    const ok=normalize(response)===normalize(word);
    setFeedback(ok?'Great work! ⭐':'Try again. Listen and repeat the word.');
  };
  const startMic=()=>{
    const w=window as SpeechWindow;
    const Constructor=w.SpeechRecognition||w.webkitSpeechRecognition;
    if(!Constructor){setFeedback('Microphone speech recognition is unavailable in this browser. Try Chrome, and allow microphone access.');return;}
    recognition.current?.stop();
    try {
      const instance=new Constructor();recognition.current=instance;
      instance.lang='en-US';instance.interimResults=false;
      instance.onresult=e=>{
        const heard=e.results?.[0]?.[0]?.transcript||'';
        setAnswer(heard);check(heard);
      };
      instance.onerror=e=>setFeedback('Microphone error: '+e.error+'. Check browser permission.');
      instance.onend=()=>{recognition.current=null;};
      setFeedback('Listening… say the word clearly.');
      instance.start();
    }catch{setFeedback('Unable to start the microphone. Check browser permission.');}
  };
  const next=()=>{reset();setIndex(i=>(i+1)%unit.teachingOf.length);};
  const selectUnit=(id:string)=>{reset();setUnitId(id);setIndex(0);setPage(0);};
  const sentence=storyText.split(/(\b[a-z]+\b)/gi).map((part,i)=>
    unit.teachingOf.some(w=>normalize(w)===normalize(part))?
      <mark key={i} className="bg-yellow-200 rounded px-1">{part}</mark>:<React.Fragment key={i}>{part}</React.Fragment>);
  return <section className="max-w-4xl mx-auto px-4 py-8 space-y-6">
    <header><h1 className="text-2xl font-bold">Top Goal 2 Vocabulary</h1>
      <p className="text-sm text-slate-600 mt-2">Practice preview — no accounts or scores saved. Microphone transcription is approximate, not a verified pronunciation assessment.</p>
    </header>
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3" aria-label="Learning units">
      {TOP_GOAL_2_TARGET_VOCABULARY.map(u=><button type="button" key={u.id} onClick={()=>selectUnit(u.id)} aria-pressed={unitId===u.id}
        className={`rounded-xl border p-3 font-semibold text-sm text-left ${unitId===u.id?'bg-indigo-100 border-indigo-500':'bg-white'}`}>📚 {u.title}</button>)}
    </div>
    <article className="bg-white border rounded-2xl p-5 space-y-5">
      <h2 className="font-bold text-lg">{unit.title}</h2>
      <nav className="flex flex-wrap gap-2" aria-label="Practice modes">
        {(['learn','write','speak','story'] as const).map(m=><button key={m} type="button" aria-pressed={mode===m}
          className={`px-4 py-2 rounded-xl border font-semibold capitalize ${mode===m?'bg-sky-100 border-sky-500':''}`}
          onClick={()=>{reset(m);setPage(0);}}>{m==='story'?'📖 Story':m==='speak'?'🎙️ Speak':m==='write'?'✍️ Write':'🔊 Learn'}</button>)}
      </nav>
      {mode==='story' ? <div className="space-y-5">
        <div className="bg-amber-50 rounded-xl p-6 text-center min-h-48 flex flex-col items-center justify-center gap-4">
          <span role="img" aria-label="Story illustration placeholder" className="text-6xl">📖</span>
          <p className="text-xl font-semibold leading-relaxed">{sentence}</p>
          <p className="text-xs text-slate-500">Page {page+1} / {story?.pages.length||0}</p>
        </div>
        <button type="button" onClick={()=>say(storyText,setFeedback)} className="bg-sky-700 text-white px-4 py-3 rounded-xl">🔊 Listen to the sentence</button>
        <div className="flex gap-3">
          <button type="button" disabled={page===0} onClick={()=>setPage(p=>p-1)} className="border px-4 py-2 rounded-xl disabled:opacity-40">← Previous</button>
          <button type="button" disabled={page>=(story?.pages.length||1)-1} onClick={()=>setPage(p=>p+1)} className="border px-4 py-2 rounded-xl disabled:opacity-40">Next page →</button>
        </div>
      </div> : <div className="space-y-4">
        <div className="rounded-xl bg-sky-50 text-center p-7">
          <div className="text-6xl mb-4" role="img" aria-label="Vocabulary visual">{visual[word.toLowerCase()]||'🌟'}</div>
          <p className="text-3xl font-bold break-words">{word}</p>
          {isTopic&&<p className="text-sm text-slate-500 mt-3">Topic practice is under development.</p>}
          <p className="text-xs text-slate-500 mt-2">{index+1} / {unit.teachingOf.length}</p>
        </div>
        <button type="button" onClick={()=>say(word,setFeedback)} className="bg-sky-700 text-white px-4 py-3 rounded-xl">🔊 Listen</button>
        {(mode==='write'||mode==='speak')&&<div className="space-y-3">
          {mode==='write'?<label className="block font-semibold">Write the word<input className="block w-full border p-3 rounded-xl mt-2" value={answer} onChange={e=>setAnswer(e.target.value)} autoComplete="off"/></label>:
          <p className="text-sm">Press the microphone and say the word. Recognition may not judge pronunciation accurately.</p>}
          {mode==='write'?<button type="button" onClick={()=>check(answer)} className="bg-indigo-700 text-white px-4 py-2 rounded-xl">Check</button>:
          <button type="button" onClick={startMic} className="bg-indigo-700 text-white px-4 py-2 rounded-xl">🎙️ Start microphone</button>}
          {mode==='speak'&&answer&&<p>You said: {answer}</p>}
        </div>}
        <button type="button" onClick={next} className="border rounded-xl px-4 py-3 font-semibold">Next word →</button>
      </div>}
      {feedback&&<p role="status" className="text-sm font-semibold">{feedback}</p>}
    </article>
  </section>;
}
