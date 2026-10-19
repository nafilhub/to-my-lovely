import React from 'react';
import { Heart, Smile, Coffee, HeartHandshake, Sparkles } from 'lucide-react';

const reasons = [
  {
    id: 1,
    icon: HeartHandshake,
    title: 'Sifat Ayy yang Sabar',
    desc: '',
    tag: 'Sabar & Adem 🕊️',
  },
  {
    id: 2,
    icon: Coffee,
    title: 'Pembawaan Ayy yang Santai',
    desc: '',
    tag: 'Bikin Rileks ☕',
  },
  {
    id: 3,
    icon: Smile,
    title: 'Tingkah Lucu & Ngawur Ayy',
    desc: '',
    tag: 'Moodbooster 🌼',
  },
  {
    id: 4,
    icon: Heart,
    title: 'Rasa Nyaman Bareng Ayy',
    desc: '',
    tag: 'Tempat Pulang 🏡',
  },
];

export default function ReasonsWhyILoveYou() {
  return (
    <section
      style={{
        maxWidth: '860px',
        margin: '50px auto 0',
        padding: '0 20px',
      }}
    >
      <div style={{ textAlign: 'center', marginBottom: '28px' }}>
        <h2
          className="font-serif"
          style={{
            fontSize: '2rem',
            fontWeight: 500,
            color: 'var(--text-primary)',
            marginBottom: '6px',
          }}
        >
          Hal-Hal Kecil yang Paling Mas Sukai Dari Ayy
        </h2>
        <p
          style={{
            fontSize: '0.92rem',
            color: 'var(--text-secondary)',
          }}
        >
          Sederhana, tapi selalu bikin mas bersyukur punya ayy.
        </p>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '18px',
        }}
      >
        {reasons.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.id}
              className="glass-card"
              style={{
                padding: '24px 20px',
                background: 'rgba(255, 255, 255, 0.85)',
                border: '1px solid rgba(240, 220, 225, 0.7)',
                borderRadius: '18px',
                display: 'flex',
                flexDirection: 'column',
                gap: '10px',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <div
                  style={{
                    width: '38px',
                    height: '38px',
                    borderRadius: '12px',
                    background: 'rgba(254, 226, 236, 0.7)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#be123c',
                  }}
                >
                  <Icon size={19} />
                </div>
                <span
                  style={{
                    fontSize: '0.74rem',
                    fontWeight: 600,
                    color: '#9e4256',
                    background: 'rgba(255, 240, 245, 0.8)',
                    padding: '3px 10px',
                    borderRadius: '12px',
                  }}
                >
                  {item.tag}
                </span>
              </div>

              <h3
                style={{
                  fontSize: '1.15rem',
                  fontWeight: 600,
                  color: 'var(--text-primary)',
                  marginTop: '4px',
                }}
              >
                {item.title}
              </h3>

              <p
                style={{
                  fontSize: '0.9rem',
                  color: 'var(--text-secondary)',
                  lineHeight: 1.6,
                }}
              >
                {item.desc}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
