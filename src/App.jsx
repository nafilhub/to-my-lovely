import React, { useState, useEffect } from 'react';
import FloatingPetalsCanvas from './components/FloatingPetalsCanvas';
import EnvelopeGate from './components/EnvelopeGate';
import HeaderNav from './components/HeaderNav';
import LoveLetterSection from './components/LoveLetterSection';
import PhotoGallery from './components/PhotoGallery';
import ReasonsWhyILoveYou from './components/ReasonsWhyILoveYou';
import AffirmationJar from './components/AffirmationJar';
import WishNoteBox from './components/WishNoteBox';
import FooterSection from './components/FooterSection';
import confetti from 'canvas-confetti';

export default function App() {
  const [hasOpenedEnvelope, setHasOpenedEnvelope] = useState(() => {
    return sessionStorage.getItem('lovely_opened_gate') === 'true';
  });

  const [partnerName, setPartnerName] = useState(() => {
    return localStorage.getItem('lovely_partner_name') || 'Ayy';
  });

  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('lovely_theme') || 'daylight';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('lovely_theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'daylight' ? 'twilight' : 'daylight'));
  };

  const handleOpenEnvelope = () => {
    setHasOpenedEnvelope(true);
    sessionStorage.setItem('lovely_opened_gate', 'true');
  };

  const handleSendHug = () => {
    confetti({
      particleCount: 25,
      spread: 50,
      origin: { y: 0.15 },
      colors: ['#f43f5e', '#ec4899', '#fda4af', '#fff1f2'],
      shapes: ['circle'],
    });
  };

  return (
    <div style={{ position: 'relative', minHeight: '100vh', paddingBottom: '30px' }}>
      {/* Background Soft Atmospheric Glows */}
      <div className="ambient-glow-bg">
        <div className="glow-orb glow-orb-1" />
        <div className="glow-orb glow-orb-2" />
        <div className="glow-orb glow-orb-3" />
      </div>

      {/* Slow Falling Petals & Ambient Dust Canvas */}
      <FloatingPetalsCanvas />

      {/* Initial Envelope Gate Modal */}
      {!hasOpenedEnvelope && (
        <EnvelopeGate onOpen={handleOpenEnvelope} partnerName={partnerName} />
      )}

      {/* Main Content Experience */}
      <div
        style={{
          position: 'relative',
          zIndex: 10,
          opacity: hasOpenedEnvelope ? 1 : 0.4,
          transition: 'opacity 0.8s cubic-bezier(0.25, 1, 0.5, 1)',
          pointerEvents: hasOpenedEnvelope ? 'auto' : 'none',
        }}
      >
        <HeaderNav
          theme={theme}
          toggleTheme={toggleTheme}
          partnerName={partnerName}
          onSendHug={handleSendHug}
        />

        <main>
          <LoveLetterSection partnerName={partnerName} />
          <PhotoGallery />
          <ReasonsWhyILoveYou />
          <AffirmationJar />
          <WishNoteBox partnerName={partnerName} />
        </main>

        <FooterSection partnerName={partnerName} />
      </div>
    </div>
  );
}
