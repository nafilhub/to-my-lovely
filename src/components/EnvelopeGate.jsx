import React, { useState } from 'react';
import { Heart, Sparkles, Mail } from 'lucide-react';
import { soundManager } from '../utils/audioSynthesizer';

export default function EnvelopeGate({ onOpen, partnerName = 'Ayy' }) {
  const [isOpening, setIsOpening] = useState(false);

  const handleOpen = () => {
    setIsOpening(true);
    soundManager.playChime();
    soundManager.startMelody();

    setTimeout(() => {
      onOpen();
    }, 800);
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 50,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'radial-gradient(ellipse at center, rgba(255, 248, 250, 0.98) 0%, rgba(250, 240, 242, 0.96) 100%)',
        backdropFilter: 'blur(16px)',
        padding: '20px',
        transition: 'opacity 0.8s cubic-bezier(0.25, 1, 0.5, 1), transform 0.8s cubic-bezier(0.25, 1, 0.5, 1)',
        opacity: isOpening ? 0 : 1,
        pointerEvents: isOpening ? 'none' : 'auto',
        transform: isOpening ? 'scale(1.04)' : 'scale(1)',
      }}
    >
      <div
        className="glass-card"
        style={{
          maxWidth: '440px',
          width: '100%',
          padding: '40px 32px',
          textAlign: 'center',
          background: 'rgba(255, 255, 255, 0.95)',
          borderRadius: '24px',
          border: '1px solid rgba(240, 215, 222, 0.8)',
          boxShadow: '0 15px 35px rgba(220, 160, 175, 0.12)',
        }}
      >
        {/* Simple Soft Icon */}
        <div
          onClick={handleOpen}
          style={{
            width: '74px',
            height: '74px',
            margin: '0 auto 20px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #fce7f3 0%, #ffe4e6 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 6px 18px rgba(244, 114, 182, 0.2)',
            cursor: 'pointer',
            transition: 'transform 0.3s ease',
          }}
          className="animate-breathe"
        >
          <Mail size={32} color="#be123c" />
        </div>

        <h1
          className="font-serif"
          style={{
            fontSize: '2.1rem',
            fontWeight: 500,
            color: '#2e1c27',
            marginBottom: '8px',
          }}
        >
          Hai {partnerName} 🤍
        </h1>

        <p
          style={{
            fontSize: '0.96rem',
            color: '#6e5264',
            maxWidth: '340px',
            margin: '0 auto 28px',
            lineHeight: 1.6,
          }}
        >
          Ada catatan kecil dari mas dan beberapa foto momen favorit kita berdua.
        </p>

        <button
          onClick={handleOpen}
          className="btn-gentle btn-gentle-primary"
          style={{
            padding: '13px 32px',
            fontSize: '0.95rem',
            borderRadius: '40px',
          }}
        >
          <span>Buka pelan-pelan ya 🌸</span>
        </button>

        <p
          style={{
            fontSize: '0.78rem',
            color: '#a88fa2',
            marginTop: '16px',
          }}
        >
          *Ada alunan musik santai di dalamnya 🎵
        </p>
      </div>
    </div>
  );
}
