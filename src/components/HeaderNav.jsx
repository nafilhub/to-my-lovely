import React, { useState, useEffect } from 'react';
import { Music, VolumeX, CloudRain, Sun, Moon, Heart, Sparkles } from 'lucide-react';
import { soundManager } from '../utils/audioSynthesizer';

export default function HeaderNav({ theme, toggleTheme, partnerName, onSendHug }) {
  const [isPlayingMusic, setIsPlayingMusic] = useState(false);
  const [isPlayingRain, setIsPlayingRain] = useState(false);
  const [hugCount, setHugCount] = useState(0);

  const handleToggleMusic = () => {
    const active = soundManager.toggleMusic();
    setIsPlayingMusic(active);
  };

  const handleToggleRain = () => {
    const active = soundManager.toggleRain();
    setIsPlayingRain(active);
  };

  const handleHug = () => {
    setHugCount((prev) => prev + 1);
    soundManager.playSparkle();
    if (onSendHug) onSendHug();
  };

  return (
    <header
      style={{
        position: 'sticky',
        top: '16px',
        zIndex: 30,
        maxWidth: '1100px',
        margin: '0 auto',
        padding: '0 20px',
      }}
    >
      <div
        className="glass-card"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '12px 24px',
          borderRadius: '50px',
          background: 'var(--card-bg)',
          backdropFilter: 'blur(20px)',
          border: '1px solid var(--card-border)',
        }}
      >
        {/* Logo / Nickname */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #fbcfe8, #fda4af)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#e11d48',
              boxShadow: '0 4px 12px rgba(225, 29, 72, 0.2)',
            }}
          >
            <Heart size={18} fill="#e11d48" />
          </div>
          <div>
            <span
              className="font-serif"
              style={{
                fontSize: '1.2rem',
                fontWeight: 600,
                color: 'var(--text-primary)',
                letterSpacing: '0.02em',
              }}
            >
              Hai {partnerName || 'Ayy'} 🤍
            </span>
            <span
              style={{
                display: 'block',
                fontSize: '0.72rem',
                color: 'var(--text-muted)',
                lineHeight: 1,
              }}
            >
              Ruang tenang kita
            </span>
          </div>
        </div>

        {/* Action Controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          {/* Send Virtual Hug Button */}
          <button
            onClick={handleHug}
            className="btn-gentle"
            style={{
              padding: '8px 16px',
              fontSize: '0.85rem',
              background: 'rgba(254, 215, 226, 0.5)',
              color: '#be123c',
              border: '1px solid rgba(251, 182, 206, 0.6)',
              borderRadius: '30px',
            }}
            title="Kirim pelukan hangat"
          >
            <Heart size={15} fill="#be123c" />
            <span style={{ fontWeight: 500 }}>Peluk ({hugCount})</span>
          </button>

          {/* Lofi Rain Sound Toggle */}
          <button
            onClick={handleToggleRain}
            className="btn-gentle"
            style={{
              width: '40px',
              height: '40px',
              padding: 0,
              borderRadius: '50%',
              background: isPlayingRain ? 'rgba(186, 230, 253, 0.6)' : 'var(--card-bg)',
              color: isPlayingRain ? '#0284c7' : 'var(--text-secondary)',
              border: '1px solid var(--card-border)',
            }}
            title={isPlayingRain ? 'Hentikan Suara Hujan Tenang' : 'Putar Suara Hujan Tenang'}
          >
            <CloudRain size={18} />
          </button>

          {/* Calming Melodic Music Toggle */}
          <button
            onClick={handleToggleMusic}
            className="btn-gentle"
            style={{
              width: '40px',
              height: '40px',
              padding: 0,
              borderRadius: '50%',
              background: isPlayingMusic ? 'rgba(254, 205, 211, 0.7)' : 'var(--card-bg)',
              color: isPlayingMusic ? '#e11d48' : 'var(--text-secondary)',
              border: '1px solid var(--card-border)',
              position: 'relative',
            }}
            title={isPlayingMusic ? 'Jeda Musik Kotak Musik' : 'Putar Musik Kotak Musik Lembut'}
          >
            {isPlayingMusic ? <Music size={18} className="animate-breathe" /> : <VolumeX size={18} />}
          </button>

          {/* Day / Twilight Theme Switcher */}
          <button
            onClick={toggleTheme}
            className="btn-gentle"
            style={{
              width: '40px',
              height: '40px',
              padding: 0,
              borderRadius: '50%',
              background: 'var(--card-bg)',
              color: 'var(--text-secondary)',
              border: '1px solid var(--card-border)',
            }}
            title="Ganti Suasana Siang / Malam"
          >
            {theme === 'twilight' ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        </div>
      </div>
    </header>
  );
}
