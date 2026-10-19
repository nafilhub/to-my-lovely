import React from 'react';
import { Heart } from 'lucide-react';

export default function LoveLetterSection({ partnerName = 'Ayy' }) {
  return (
    <section
      style={{
        maxWidth: '720px',
        margin: '40px auto 0',
        padding: '0 20px',
      }}
    >
      <div
        className="glass-card"
        style={{
          padding: '40px 32px',
          background: 'rgba(255, 255, 255, 0.88)',
          borderRadius: '24px',
          border: '1px solid rgba(240, 220, 225, 0.8)',
          boxShadow: '0 10px 30px rgba(0, 0, 0, 0.04)',
        }}
      >
        {/* Recipient Header */}
        <div
          style={{
            display: 'flex',
            alignItems: 'baseline',
            gap: '10px',
            marginBottom: '22px',
            borderBottom: '1px solid rgba(230, 200, 210, 0.4)',
            paddingBottom: '14px',
          }}
        >
          <h2
            className="font-serif"
            style={{
              fontSize: '2rem',
              fontWeight: 600,
              color: '#3b2835',
            }}
          >
            Hai {partnerName} 🤍
          </h2>
        </div>

        {/* Real, sincere, non-AI-slop text - Mas & Ayy only */}
        <div
          style={{
            fontSize: '1.02rem',
            lineHeight: 1.85,
            color: '#4a3744',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
            fontWeight: 400,
          }}
        >
          <p>
            Sebenarnya mas bukan tipe yang jago bikin kalimat puitis atau kata-kata manis yang berlebihan.
            Tapi lewat web sederhana ini, mas cuma pengen ngasih tau hal-hal yang mungkin jarang sempat terucap.
          </p>

          <p>
            Terima kasih ya sudah selalu jadi ayy yang lemah lembut, sabar, dan penuh pengertian.
            Pembawaan ayy yang tenang beneran selalu berhasil bikin dunia mas yang kadang berantakan jadi jauh lebih adem.
            Tiap kali mas lagi capek atau banyak pikiran, ketemu ayy atau denger cerita ayy aja udah cukup buat bikin napas mas lega lagi.
          </p>

          <p>
            Mas selalu suka momen-momen kecil pas kita bareng—dari hal sederhana pas boncengan motoran berdua sambil ketawa,
            waktu nemenin ayy jajan, sampai saat kita cuma duduk sebelahan tanpa perlu banyak bicara pun rasanya udah nyaman banget.
          </p>

          <p>
            Kalau suatu hari ayy lagi ngerasa capek, sedih, atau hari ayy lagi berat, jangan dipendam sendirian ya.
            Ingat kalau ayy selalu punya mas di sini. Cerita apa aja ke mas ya, ayy. Gak perlu berusaha jadi siapa-siapa, cukup jadi ayy yang selalu apa adanya.
          </p>
        </div>

        {/* Simple Warm Sign-off */}
        <div
          style={{
            marginTop: '28px',
            paddingTop: '18px',
            borderTop: '1px solid rgba(230, 200, 210, 0.4)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <div>
            <div
              className="font-handwriting"
              style={{
                fontSize: '1.9rem',
                color: '#be123c',
                lineHeight: 1.2,
              }}
            >
              Sayang ayy selalu,
            </div>
            <div
              style={{
                fontSize: '0.95rem',
                color: '#6e5264',
                fontWeight: 600,
                marginTop: '4px',
              }}
            >
              — Masmu 🤍
            </div>
          </div>
          <Heart size={20} fill="#e11d48" color="#e11d48" style={{ opacity: 0.8 }} />
        </div>
      </div>
    </section>
  );
}
