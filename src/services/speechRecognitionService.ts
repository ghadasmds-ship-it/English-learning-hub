// Speech Recognition & Pronunciation Assessment Service with Genuine Web Speech API

export interface SpeechAssessmentResult {
  transcript: string;
  accuracyScore: number; // 0 - 100
  fluencyScore: number;  // 0 - 100
  overallScore: number;  // 0 - 100
  feedback: string;
  flaggedForTeacherReview: boolean;
  reviewReason?: string;
  isAvailable: boolean; // True if genuine speech assessment was performed
  wordBreakdown?: Array<{
    word: string;
    matched: boolean;
  }>;
}

class SpeechRecognitionService {
  private recognition: any = null;
  private isListening: boolean = false;
  private currentTranscript: string = '';
  private mediaStream: MediaStream | null = null;

  constructor() {
    this.initRecognition();
  }

  private initRecognition() {
    if (typeof window !== 'undefined') {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      if (SpeechRecognition) {
        try {
          this.recognition = new SpeechRecognition();
          this.recognition.continuous = true; // Stay listening while student reads whole page!
          this.recognition.interimResults = true;
          this.recognition.lang = 'en-US';
          this.recognition.maxAlternatives = 1;
        } catch (e) {
          console.warn('SpeechRecognition initialization error:', e);
          this.recognition = null;
        }
      }
    }
  }

  public isSupported(): boolean {
    if (typeof window === 'undefined') return false;
    return !!((window as any).SpeechRecognition || (window as any).webkitSpeechRecognition);
  }

  public async startRecording(
    expectedText: string,
    onResult: (result: SpeechAssessmentResult) => void,
    onError: (err: string) => void,
    onInterimSpeech?: (transcript: string) => void
  ): Promise<void> {
    if (!this.isSupported()) {
      onResult({
        transcript: '',
        accuracyScore: 0,
        fluencyScore: 0,
        overallScore: 0,
        feedback: 'Speech recognition is not supported in this browser. Please use Chrome, Edge, or Safari for voice assessment.',
        flaggedForTeacherReview: false,
        isAvailable: false
      });
      return;
    }

    this.currentTranscript = '';
    this.isListening = true;

    // Check microphone permission via getUserMedia
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      try {
        this.mediaStream = await navigator.mediaDevices.getUserMedia({ audio: true });
      } catch (err: any) {
        this.isListening = false;
        onError(err?.name === 'NotAllowedError' ? 'Microphone permission denied. Please allow microphone access in your browser settings.' : 'Unable to access microphone.');
        return;
      }
    }

    // Re-init recognition if needed
    if (!this.recognition) {
      this.initRecognition();
    }

    if (!this.recognition) {
      this.isListening = false;
      onResult({
        transcript: '',
        accuracyScore: 0,
        fluencyScore: 0,
        overallScore: 0,
        feedback: 'Speech recognition service is currently unavailable.',
        flaggedForTeacherReview: false,
        isAvailable: false
      });
      return;
    }

    let finalTranscript = '';

    this.recognition.onresult = (event: any) => {
      let interim = '';
      for (let i = event.resultIndex; i < event.results.length; ++i) {
        const piece = event.results[i][0].transcript;
        if (event.results[i].isFinal) {
          finalTranscript += ' ' + piece;
        } else {
          interim += ' ' + piece;
        }
      }
      const combined = (finalTranscript + ' ' + interim).trim();
      this.currentTranscript = combined;
      if (onInterimSpeech) {
        onInterimSpeech(combined);
      }
    };

    this.recognition.onerror = (event: any) => {
      console.warn('Speech recognition event:', event.error);
      if (event.error === 'no-speech') {
        // Do not abort, user might be pausing
        return;
      }
      if (event.error === 'not-allowed') {
        onError('Microphone permission was not granted.');
        this.stopRecording();
      }
    };

    this.recognition.onend = () => {
      // If stopped by user, evaluate
      if (!this.isListening) {
        const evaluation = this.evaluatePronunciation(expectedText, this.currentTranscript);
        onResult(evaluation);
      } else {
        // Automatically restart if continuous listening was stopped prematurely by browser
        try {
          if (this.isListening && this.recognition) {
            this.recognition.start();
          }
        } catch {
          // If restart fails, return current transcript
          const evaluation = this.evaluatePronunciation(expectedText, this.currentTranscript);
          onResult(evaluation);
        }
      }
    };

    try {
      this.recognition.start();
    } catch (e: any) {
      console.warn('Could not start recognition:', e);
      // Already running or error
    }
  }

  public stopRecording(): void {
    this.isListening = false;
    if (this.recognition) {
      try {
        this.recognition.stop();
      } catch {}
    }
    if (this.mediaStream) {
      try {
        this.mediaStream.getTracks().forEach(t => t.stop());
        this.mediaStream = null;
      } catch {}
    }
  }

  /**
   * Word-recognition matching against the expected text, NOT a phoneme-level pronunciation assessment.
   * No fabricated 75% scores. The score represents recognized word alignment, not sound quality.
   */
  private evaluatePronunciation(expectedText: string, transcript: string): SpeechAssessmentResult {
    const cleanExpected = expectedText
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, '')
      .split(/\s+/)
      .filter(Boolean);

    const cleanTranscript = transcript
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, '')
      .split(/\s+/)
      .filter(Boolean);

    if (cleanTranscript.length === 0) {
      return {
        transcript: '',
        accuracyScore: 0,
        fluencyScore: 0,
        overallScore: 0,
        feedback: 'No speech was detected. Tap the microphone and read the page out loud clearly!',
        flaggedForTeacherReview: false,
        isAvailable: true,
        wordBreakdown: cleanExpected.map(w => ({ word: w, matched: false }))
      };
    }

    // Ordered word alignment prevents one spoken word from matching multiple
    // repeated target words and prevents shuffled words from earning full credit.
    const n = cleanExpected.length;
    const m = cleanTranscript.length;
    const dp: number[][] = Array.from({ length: n + 1 }, () => Array(m + 1).fill(0));
    for (let i = n - 1; i >= 0; i--) {
      for (let j = m - 1; j >= 0; j--) {
        dp[i][j] = cleanExpected[i] === cleanTranscript[j]
          ? 1 + dp[i + 1][j + 1]
          : Math.max(dp[i + 1][j], dp[i][j + 1]);
      }
    }
    const matchedIndices = new Set<number>();
    let i = 0;
    let j = 0;
    while (i < n && j < m) {
      if (cleanExpected[i] === cleanTranscript[j]) {
        matchedIndices.add(i);
        i++;
        j++;
      } else if (dp[i + 1][j] >= dp[i][j + 1]) {
        i++;
      } else {
        j++;
      }
    }
    const matchedCount = matchedIndices.size;
    const wordBreakdown = cleanExpected.map((word, index) => ({
      word,
      matched: matchedIndices.has(index)
    }));
    const accuracyScore = n ? Math.round((matchedCount / n) * 100) : 0;
    // Completeness is not acoustic fluency. The Web Speech API does not
    // provide reliable timing or phoneme-level scores.
    const fluencyScore = n ? Math.round((matchedCount / n) * 100) : 0;
    const overallScore = accuracyScore;

    let feedback = '';
    if (overallScore >= 85) {
      feedback = `Excellent reading! You read ${matchedCount} of ${cleanExpected.length} words accurately in the expected order.`;
    } else if (overallScore >= 70) {
      feedback = `Good job! You read ${matchedCount} of ${cleanExpected.length} words correctly. Listen to the page audio once more to perfect tricky words!`;
    } else {
      feedback = `Keep practicing! You matched ${matchedCount} of ${cleanExpected.length} words. Tap words to listen to their sounds and try reading again.`;
    }

    return {
      transcript: transcript.trim(),
      accuracyScore,
      fluencyScore,
      overallScore,
      feedback,
      flaggedForTeacherReview: false,
      isAvailable: true,
      wordBreakdown
    };
  }
}

export const speechService = new SpeechRecognitionService();
