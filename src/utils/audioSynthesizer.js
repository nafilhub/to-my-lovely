// Gentle Web Audio API Music Box & Sound FX Synthesizer
// Provides 100% reliable, soothing, gentle ambient music and interaction sounds without external audio file dependencies.

class GentleAudioEngine {
  constructor() {
    this.ctx = null;
    this.isPlayingMusic = false;
    this.musicTimer = null;
    this.currentNoteIndex = 0;
    this.isMuted = false;
    this.isRainPlaying = false;
    this.rainNode = null;
  }

  init() {
    if (!this.ctx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AudioContext();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  // Soft Music Box Note (Warm Bell / Celesta Tone)
  playMusicBoxNote(freq, timeOffset = 0, duration = 2.2, volume = 0.15) {
    if (this.isMuted || !this.ctx) return;
    const now = this.ctx.currentTime + timeOffset;

    // Dual oscillator for rich, warm, vintage music box harmonic
    const osc1 = this.ctx.createOscillator();
    const osc2 = this.ctx.createOscillator();
    const gainNode = this.ctx.createGain();
    const filter = this.ctx.createBiquadFilter();

    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(freq, now);

    // Warm soft harmonic overtone
    osc2.type = 'triangle';
    osc2.frequency.setValueAtTime(freq * 2, now);

    // Filter to remove sharp edges, making it soft and gentle
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(1400, now);
    filter.Q.setValueAtTime(1.2, now);

    // Gentle strike and slow exponential fade
    gainNode.gain.setValueAtTime(0.001, now);
    gainNode.gain.linearRampToValueAtTime(volume, now + 0.04);
    gainNode.gain.exponentialRampToValueAtTime(0.0001, now + duration);

    osc1.connect(gainNode);
    osc2.connect(gainNode);
    gainNode.connect(filter);
    filter.connect(this.ctx.destination);

    osc1.start(now);
    osc2.start(now);
    osc1.stop(now + duration);
    osc2.stop(now + duration);
  }

  // Play peaceful chime effect for card reveals & interactions
  playChime() {
    this.init();
    if (this.isMuted || !this.ctx) return;

    const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
    notes.forEach((freq, i) => {
      this.playMusicBoxNote(freq, i * 0.12, 1.8, 0.12);
    });
  }

  // Play delicate sparkle sound
  playSparkle() {
    this.init();
    if (this.isMuted || !this.ctx) return;

    const sparkles = [880, 1046.5, 1318.5, 1567.98];
    sparkles.forEach((freq, i) => {
      this.playMusicBoxNote(freq, i * 0.08, 1.4, 0.08);
    });
  }

  // Start continuous slow, peaceful music box melody (D Major / Canon style lullaby)
  startMelody() {
    this.init();
    if (this.isPlayingMusic) return;
    this.isPlayingMusic = true;

    // Soothing slow acoustic lullaby melody (frequencies in Hz)
    // D4, F#4, A4, D5, C#5, A4, B4, G4, A4, F#4, G4, E4, F#4, D4...
    const melody = [
      { f: 587.33, d: 1.2 }, // D5
      { f: 523.25, d: 0.8 }, // C5
      { f: 440.00, d: 1.0 }, // A4
      { f: 493.88, d: 1.4 }, // B4
      { f: 392.00, d: 1.0 }, // G4
      { f: 440.00, d: 1.6 }, // A4
      { f: 349.23, d: 1.2 }, // F4
      { f: 392.00, d: 1.0 }, // G4
      { f: 329.63, d: 1.4 }, // E4
      { f: 293.66, d: 2.0 }, // D4
      { f: 392.00, d: 1.0 }, // G4
      { f: 440.00, d: 1.2 }, // A4
      { f: 523.25, d: 1.5 }, // C5
      { f: 587.33, d: 2.2 }, // D5
    ];

    const accompaniments = [
      293.66, 220.00, 246.94, 196.00, 220.00, 174.61, 196.00, 146.83
    ];

    let noteIdx = 0;
    let accIdx = 0;

    const playNext = () => {
      if (!this.isPlayingMusic) return;

      const item = melody[noteIdx];
      this.playMusicBoxNote(item.f, 0, 2.5, 0.16);

      // Play soft bass/harmony every 2 notes
      if (noteIdx % 2 === 0) {
        this.playMusicBoxNote(accompaniments[accIdx % accompaniments.length], 0.05, 3.2, 0.12);
        accIdx++;
      }

      noteIdx = (noteIdx + 1) % melody.length;
      this.musicTimer = setTimeout(playNext, (item.d * 1000) + 400); // Relaxed, slow tempo
    };

    playNext();
  }

  stopMelody() {
    this.isPlayingMusic = false;
    if (this.musicTimer) {
      clearTimeout(this.musicTimer);
      this.musicTimer = null;
    }
  }

  toggleMusic() {
    if (this.isPlayingMusic) {
      this.stopMelody();
      return false;
    } else {
      this.startMelody();
      return true;
    }
  }

  // Soft Ambient Rain (White noise with soft lowpass filtering)
  toggleRain() {
    this.init();
    if (this.isRainPlaying) {
      if (this.rainNode) {
        this.rainNode.disconnect();
        this.rainNode = null;
      }
      this.isRainPlaying = false;
      return false;
    }

    if (!this.ctx) return false;

    const bufferSize = 2 * this.ctx.sampleRate;
    const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    let lastOut = 0.0;
    // Pink/Brown noise generator for gentle rain sound
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      output[i] = (lastOut + (0.02 * white)) / 1.02;
      lastOut = output[i];
      output[i] *= 1.8;
    }

    const whiteNoise = this.ctx.createBufferSource();
    whiteNoise.buffer = noiseBuffer;
    whiteNoise.loop = true;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(600, this.ctx.currentTime);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.06, this.ctx.currentTime); // Soft background

    whiteNoise.connect(filter);
    filter.connect(gain);
    gain.connect(this.ctx.destination);

    whiteNoise.start(0);
    this.rainNode = whiteNoise;
    this.isRainPlaying = true;
    return true;
  }
}

export const soundManager = new GentleAudioEngine();
