// Audio Service: Web SpeechSynthesis + Web Audio API synthesizer for child-friendly feedback

class AudioService {
  private audioCtx: AudioContext | null = null;
  private currentUtterance: SpeechSynthesisUtterance | null = null;

  private getAudioContext(): AudioContext | null {
    if (typeof window === 'undefined') return null;
    if (!this.audioCtx) {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioContextClass) {
        this.audioCtx = new AudioContextClass();
      }
    }
    if (this.audioCtx && this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }
    return this.audioCtx;
  }

  private highlightInterval: any = null;

  // Play natural speech pronunciation using browser SpeechSynthesis with word-by-word tracking
  public speak(
    text: string,
    onEnd?: () => void,
    rate: number = 0.88,
    onWordBoundary?: (wordIndex: number, charIndex: number) => void
  ): void {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      if (onEnd) onEnd();
      return;
    }

    this.stop();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US';
    utterance.rate = rate; // Slightly slower for young learners
    utterance.pitch = 1.05; // Friendly and clear

    // Pick a high quality US English voice if available
    const voices = window.speechSynthesis.getVoices();
    const usVoice = voices.find(v => v.lang.startsWith('en-US') && (v.name.includes('Natural') || v.name.includes('Google') || v.name.includes('Samantha') || v.name.includes('Karen')));
    if (usVoice) {
      utterance.voice = usVoice;
    }

    // Split text into words to track word index
    const words = text.split(/\s+/).filter(Boolean);
    let boundaryFired = false;

    if (onWordBoundary) {
      utterance.onboundary = (event: SpeechSynthesisEvent) => {
        if (event.name === 'word' || event.charIndex !== undefined) {
          boundaryFired = true;
          // Find which word index corresponds to charIndex
          let charAccumulator = 0;
          let matchedWordIdx = 0;
          for (let i = 0; i < words.length; i++) {
            if (charAccumulator >= event.charIndex) {
              matchedWordIdx = Math.max(0, i);
              break;
            }
            charAccumulator += words[i].length + 1;
          }
          onWordBoundary(matchedWordIdx, event.charIndex);
        }
      };

      // Fallback timer if browser doesn't emit onboundary
      const approxDurationPerWordMs = (60000 / (150 * rate)); // ~150 wpm adjusted by rate
      let currentIdx = 0;
      this.highlightInterval = setInterval(() => {
        if (!boundaryFired && currentIdx < words.length) {
          onWordBoundary(currentIdx, 0);
          currentIdx++;
        }
      }, approxDurationPerWordMs);
    }

    const cleanup = () => {
      if (this.highlightInterval) {
        clearInterval(this.highlightInterval);
        this.highlightInterval = null;
      }
      if (onEnd) onEnd();
    };

    utterance.onend = cleanup;
    utterance.onerror = cleanup;

    this.currentUtterance = utterance;
    window.speechSynthesis.speak(utterance);
  }

  public stop(): void {
    if (this.highlightInterval) {
      clearInterval(this.highlightInterval);
      this.highlightInterval = null;
    }
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
  }

  // Melodic chime for correct answer
  public playSuccessChime(): void {
    try {
      const ctx = this.getAudioContext();
      if (!ctx) return;
      const now = ctx.currentTime;

      // Note 1: E5 (659Hz)
      const osc1 = ctx.createOscillator();
      const gain1 = ctx.createGain();
      osc1.type = 'triangle';
      osc1.frequency.setValueAtTime(659.25, now);
      gain1.gain.setValueAtTime(0.18, now);
      gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.35);
      osc1.connect(gain1);
      gain1.connect(ctx.destination);
      osc1.start(now);
      osc1.stop(now + 0.35);

      // Note 2: A5 (880Hz)
      const osc2 = ctx.createOscillator();
      const gain2 = ctx.createGain();
      osc2.type = 'triangle';
      osc2.frequency.setValueAtTime(880, now + 0.12);
      gain2.gain.setValueAtTime(0.2, now + 0.12);
      gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.6);
      osc2.connect(gain2);
      gain2.connect(ctx.destination);
      osc2.start(now + 0.12);
      osc2.stop(now + 0.6);
    } catch {
      // AudioContext unavailable or blocked
    }
  }

  // Gentle boing/try-again tone for errors (encouraging, not harsh)
  public playEncouragingTone(): void {
    try {
      const ctx = this.getAudioContext();
      if (!ctx) return;
      const now = ctx.currentTime;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(329.63, now); // E4
      osc.frequency.linearRampToValueAtTime(261.63, now + 0.25); // C4
      gain.gain.setValueAtTime(0.15, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.3);
    } catch {
      // AudioContext blocked
    }
  }

  // Star collection sound
  public playStarPop(): void {
    try {
      const ctx = this.getAudioContext();
      if (!ctx) return;
      const now = ctx.currentTime;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(523.25, now); // C5
      osc.frequency.exponentialRampToValueAtTime(1046.5, now + 0.18); // C6
      gain.gain.setValueAtTime(0.2, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.25);
    } catch {
      // AudioContext blocked
    }
  }

  // Grand fanfare for Gold Story Master Trophy & Unit Master
  public playGrandFanfare(): void {
    try {
      const ctx = this.getAudioContext();
      if (!ctx) return;
      const now = ctx.currentTime;
      const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6
      notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, now + idx * 0.14);
        gain.gain.setValueAtTime(0.22, now + idx * 0.14);
        gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.14 + 0.5);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now + idx * 0.14);
        osc.stop(now + idx * 0.14 + 0.5);
      });
    } catch {
      // AudioContext blocked
    }
  }
}

export const audioService = new AudioService();
