import React, { useState } from 'react';
import { Heart, Camera, X, Sparkles } from 'lucide-react';
import { soundManager } from '../utils/audioSynthesizer';

const photos = [
  {
    id: 1,
    src: '/photos/photo5.jpeg',
    caption: 'Gigi mas sakit abis dari sini sebenarnya wkwkwk',
    date: 'Abis Mam Eskrim',
    rotate: '-2deg',
  },
  {
    id: 2,
    src: '/photos/photo6.jpeg',
    caption: 'Mas suka banget foto kita yang ini hehehe',
    date: 'Yang ini lutju',
    rotate: '1.5deg',
  },
  {
    id: 3,
    src: '/photos/photo2.jpeg',
    caption: 'Udah lama banget ini, seneng banget mas dapat pap ayy yang ini.',
    date: 'G(old)',
    rotate: '-1deg',
  },
  {
    id: 4,
    src: '/photos/photo3.jpeg',
    caption: 'Yang ini lucu wkwkwk.',
    date: 'Jajan buanyak',
    rotate: '2deg',
  },
  {
    id: 5,
    src: '/photos/photo4.jpeg',
    caption: 'Kalo yang ini elegan gayanya wkwkw',
    date: 'Kereeenn😎',
    rotate: '-1.5deg',
  },
  {
    id: 6,
    src: '/photos/photo1.jpeg',
    caption: 'Nahh ini jugaa, udah lama banget ini, tetep mas simpen.',
    date: 'G(old)2',
    rotate: '1deg',
  },
];

const getPhotoSrc = (src) => {
  if (!src) return '';
  if (src.startsWith('http')) return src;
  const base = (import.meta.env.BASE_URL || '/').replace(/\/$/, '');
  const cleanPath = src.replace(/^\//, '');
  return `${base}/${cleanPath}`;
};

export default function PhotoGallery() {
  const [activePhoto, setActivePhoto] = useState(null);

  const handleOpenPhoto = (p) => {
    setActivePhoto(p);
    soundManager.playSparkle();
  };

  const handleClose = () => {
    setActivePhoto(null);
  };

  return (
    <section
      style={{
        maxWidth: '960px',
        margin: '60px auto 0',
        padding: '0 20px',
      }}
    >
      <div style={{ textAlign: 'center', marginBottom: '32px' }}>
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            padding: '5px 16px',
            borderRadius: '20px',
            background: 'rgba(254, 215, 226, 0.5)',
            color: '#be123c',
            fontSize: '0.82rem',
            fontWeight: 500,
            marginBottom: '10px',
          }}
        >
          <Camera size={14} />
          <span>Momen-Momen Manis</span>
        </div>

        <h2
          className="font-serif"
          style={{
            fontSize: '2.2rem',
            fontWeight: 500,
            color: 'var(--text-primary)',
            marginBottom: '8px',
          }}
        >
          Foto-Foto Favorit Mas Tentang Ayy 📷
        </h2>

        <p
          style={{
            fontSize: '0.94rem',
            color: 'var(--text-secondary)',
            maxWidth: '460px',
            margin: '0 auto',
            lineHeight: 1.6,
          }}
        >
          Dari hal-hal kecil, tawa pas lagi jalan bareng, sampai momen sederhana yang selalu bikin kangen.
        </p>
      </div>

      {/* Polaroid Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: '24px',
          padding: '10px 0',
        }}
      >
        {photos.map((p) => (
          <div
            key={p.id}
            onClick={() => handleOpenPhoto(p)}
            style={{
              background: '#ffffff',
              padding: '14px 14px 20px',
              borderRadius: '16px',
              boxShadow: '0 8px 24px rgba(0, 0, 0, 0.06), 0 2px 6px rgba(0, 0, 0, 0.04)',
              cursor: 'pointer',
              transform: `rotate(${p.rotate})`,
              transition: 'transform 0.35s ease, box-shadow 0.35s ease',
              border: '1px solid rgba(240, 220, 225, 0.6)',
              position: 'relative',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-6px) scale(1.02)';
              e.currentTarget.style.boxShadow = '0 16px 32px rgba(220, 140, 160, 0.18)';
              e.currentTarget.style.zIndex = '5';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = `rotate(${p.rotate})`;
              e.currentTarget.style.boxShadow = '0 8px 24px rgba(0, 0, 0, 0.06)';
              e.currentTarget.style.zIndex = '1';
            }}
          >
            {/* Photo frame */}
            <div
              style={{
                width: '100%',
                height: '310px',
                borderRadius: '10px',
                overflow: 'hidden',
                background: '#f8f4f4',
                position: 'relative',
              }}
            >
              <img
                src={getPhotoSrc(p.src)}
                alt={p.caption}
                loading="lazy"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  display: 'block',
                  transition: 'transform 0.5s ease',
                }}
              />
              <div
                style={{
                  position: 'absolute',
                  top: '10px',
                  right: '10px',
                  background: 'rgba(255, 255, 255, 0.85)',
                  backdropFilter: 'blur(8px)',
                  padding: '4px 10px',
                  borderRadius: '20px',
                  fontSize: '0.72rem',
                  fontWeight: 600,
                  color: '#9e4256',
                }}
              >
                {p.date}
              </div>
            </div>

            {/* Handwritten Polaroid Caption */}
            <p
              className="font-handwriting"
              style={{
                marginTop: '14px',
                fontSize: '1.25rem',
                color: '#3b2835',
                lineHeight: 1.4,
                textAlign: 'center',
                padding: '0 4px',
              }}
            >
              {p.caption}
            </p>
          </div>
        ))}
      </div>

      {/* Lightbox / Modal for enlarged view */}
      {activePhoto && (
        <div
          onClick={handleClose}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 100,
            background: 'rgba(20, 15, 20, 0.85)',
            backdropFilter: 'blur(10px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px',
            animation: 'fadeIn 0.3s ease',
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              background: '#ffffff',
              padding: '18px 18px 24px',
              borderRadius: '20px',
              maxWidth: '520px',
              width: '100%',
              boxShadow: '0 25px 60px rgba(0,0,0,0.4)',
              position: 'relative',
            }}
          >
            <button
              onClick={handleClose}
              style={{
                position: 'absolute',
                top: '-14px',
                right: '-14px',
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                background: '#ffffff',
                border: 'none',
                boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#333',
              }}
            >
              <X size={20} />
            </button>

            <img
              src={getPhotoSrc(activePhoto.src)}
              alt={activePhoto.caption}
              style={{
                width: '100%',
                maxHeight: '65vh',
                objectFit: 'contain',
                borderRadius: '12px',
                display: 'block',
                background: '#faf6f7',
              }}
            />

            <div style={{ marginTop: '16px', textAlign: 'center' }}>
              <span
                style={{
                  display: 'inline-block',
                  fontSize: '0.78rem',
                  fontWeight: 600,
                  color: '#be123c',
                  background: 'rgba(254, 215, 226, 0.6)',
                  padding: '3px 12px',
                  borderRadius: '20px',
                  marginBottom: '8px',
                }}
              >
                {activePhoto.date}
              </span>
              <p
                className="font-handwriting"
                style={{
                  fontSize: '1.45rem',
                  color: '#2e1c27',
                  lineHeight: 1.4,
                }}
              >
                "{activePhoto.caption}"
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
