import React, { useState, useEffect } from 'react';
import { Heart, Wind, Sparkles } from 'lucide-react';
import { soundManager } from '../utils/audioSynthesizer';

export default function FooterSection({ partnerName }) {
  const [showBreathing, setShowBreathing] = useState(false);
  const [breathPhase, setBreathPhase] = useState('Tarik Napas Perlahan... 🌸');

  useEffect(() => {
    if (!showBreathing) return;

    const phases = [
      { text: 'Tarik napas perlahan... 🌸', duration: 4000 },
      { text: 'Tahan sejenak... rasakan ketenangannya ✨', duration: 4000 },
      { text: 'Hembuskan napas lembut... lepaskan lelahmu 🕊️', duration: 4000 },
    ];

    let current = 0;
    const interval = setInterval(() => {
      current = (current + 1) % phases.length;
      setBreathPhase(phases[current].text);
    }, 4000);

    return () => clearInterval(interval);
  }, [showBreathing]);

  return (
    <footer
      style={{
        maxWidth: '840px',
        margin: '80px auto 40px',
        padding: '0 20px',
        textAlign: 'center',
      }}
    >
      {/* Gentle Breathing Bubble Modal / Widget */}
      {showBreathing && (
        <div
          className="glass-card animate-fadeIn"
          style={{
            padding: '36px 24px',
            borderRadius: '28px',
            marginBottom: '36px',
            background: 'linear-gradient(135deg, rgba(254, 240, 245, 0.95), rgba(243, 232, 255, 0.95))',
            border: '2px solid rgba(251, 182, 206, 0.6)',
          }}
        >
          <div
            style={{
              width: '120px',
              height: '120px',
              margin: '0 auto 20px',
              borderRadius: '50%',
              background: 'radial-gradient(circle, #fbcfe8 0%, #fda4af 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 0 40px rgba(251, 182, 206, 0.7)',
              transition: 'transform 4s ease-in-out',
            }}
            className="animate-breathe"
          >
            <Wind size={40} color="#be123c" />
          </div>

          <h3
            className="font-serif"
            style={{
              fontSize: '1.8rem',
              color: '#831843',
              marginBottom: '10px',
            }}
          >
            {breathPhase}
          </h3>

          <p style={{ fontSize: '0.9rem', color: '#9d174d', marginBottom: '20px' }}>
            Bernapas santai ya ayy. Ayy selalu aman, disayangi mas, dan gak perlu terburu-buru.
          </p>

          <button
            onClick={() => setShowBreathing(false)}
            className="btn-gentle btn-gentle-secondary"
            style={{ fontSize: '0.85rem', padding: '8px 20px' }}
          >
            Tutup Ruang Napas
          </button>
        </div>
      )}

      {/* Breathing Trigger Button */}
      {!showBreathing && (
        <div style={{ marginBottom: '30px' }}>
          <button
            onClick={() => {
              setShowBreathing(true);
              soundManager.playSparkle();
            }}
            className="btn-gentle"
            style={{
              background: 'rgba(254, 215, 226, 0.5)',
              color: '#be123c',
              border: '1px solid rgba(251, 182, 206, 0.6)',
              padding: '12px 26px',
              borderRadius: '30px',
              fontSize: '0.92rem',
            }}
          >
            <Wind size={18} />
            <span>Tarik Napas Tenang Bareng Mas 🧘‍♀️</span>
          </button>
        </div>
      )}

      {/* Warm Ending Message */}
      <div
        style={{
          borderTop: '1px dashed rgba(220, 160, 180, 0.4)',
          paddingTop: '32px',
        }}
      >
        <p
          className="font-handwriting"
          style={{
            fontSize: '1.9rem',
            color: '#be123c',
            marginBottom: '6px',
          }}
        >
          "Tetap jadi ayy yang selalu tenang dan apa adanya ya 🤍"
        </p>

        <p
          style={{
            fontSize: '0.85rem',
            color: 'var(--text-muted)',
            marginTop: '8px',
          }}
        >
          Dibuat sama Mas khusus buat {partnerName || 'Ayy'} tercinta
        </p>
      </div>
    </footer>
  );
}
