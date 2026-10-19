import React, { useState } from 'react';
import { Sparkles, RefreshCw, Send, CheckCircle2 } from 'lucide-react';
import { soundManager } from '../utils/audioSynthesizer';

const defaultAffirmations = [
  'Kalau hari ini capek, istirahat dulu ya ayy. Gak perlu maksain diri.',
  'Jangan lupa makan yang kenyang dan minum air ya ayy.',
  'Mas selalu bangga dan bersyukur punya ayy yang sabar dan baik hati.',
  'Mau seberat apa pun hari ayy, nanti cerita ke mas ya. Mas selalu dengerin.',
  'Peluk hangat dari mas buat ayy hari ini 🤍',
  'Tersenyum ya ayy, senyum manis ayy selalu bikin hati mas adem.',
  'Ayy selalu lebih dari cukup buat mas, jangan overthinking ya.',
  'Makasih ya sudah selalu nemenin mas dan hadir apa adanya.',
  'Nanti kalau ada waktu luang, kita jalan santai dan cari jajan kesukaan ayy lagi yuk!',
  'Ingat ya ayy, ayy gak sendirian. Mas selalu di sini.',
];

export default function AffirmationJar() {
  const [currentNote, setCurrentNote] = useState(
    'Ketuk toplesnya kapan pun ayy butuh kata-kata penenang... 🍯'
  );
  const [isDrawing, setIsDrawing] = useState(false);
  const [customWish, setCustomWish] = useState('');
  const [isAdded, setIsAdded] = useState(false);

  const drawNote = () => {
    setIsDrawing(true);
    soundManager.playChime();

    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * defaultAffirmations.length);
      setCurrentNote(defaultAffirmations[randomIndex]);
      setIsDrawing(false);
    }, 450);
  };

  const handleAddWish = (e) => {
    e.preventDefault();
    if (!customWish.trim()) return;

    defaultAffirmations.push(customWish.trim());
    setCurrentNote(`✨ Pesan ayy sudah tersimpan: "${customWish.trim()}"`);
    setCustomWish('');
    setIsAdded(true);
    soundManager.playSparkle();

    setTimeout(() => setIsAdded(false), 3000);
  };

  return (
    <section
      style={{
        maxWidth: '720px',
        margin: '50px auto 0',
        padding: '0 20px',
      }}
    >
      <div
        className="glass-card"
        style={{
          padding: '36px 28px',
          textAlign: 'center',
          background: 'rgba(255, 255, 255, 0.88)',
          borderRadius: '24px',
          border: '1px solid rgba(240, 220, 225, 0.7)',
          boxShadow: '0 10px 30px rgba(0, 0, 0, 0.04)',
        }}
      >
        <h2
          className="font-serif"
          style={{
            fontSize: '1.9rem',
            fontWeight: 500,
            color: 'var(--text-primary)',
            marginBottom: '6px',
          }}
        >
          Toples Pengingat Sayang 🍯
        </h2>

        <p
          style={{
            fontSize: '0.9rem',
            color: 'var(--text-secondary)',
            maxWidth: '440px',
            margin: '0 auto 22px',
          }}
        >
          Kapan pun ayy lagi capek, pusing, atau butuh dihibur, coba buka pesan kecil di bawah ini ya.
        </p>

        {/* Jar Visual */}
        <div
          onClick={drawNote}
          style={{
            width: '100px',
            height: '120px',
            margin: '0 auto 20px',
            borderRadius: '22px 22px 30px 30px',
            background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(254, 215, 226, 0.5) 100%)',
            border: '2px solid rgba(255, 255, 255, 0.95)',
            boxShadow: '0 10px 24px rgba(244, 114, 182, 0.18)',
            position: 'relative',
            cursor: 'pointer',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all 0.3s ease',
            transform: isDrawing ? 'scale(0.96)' : 'scale(1)',
          }}
          className="animate-breathe"
          title="Klik untuk membuka pesan baru"
        >
          <div
            style={{
              position: 'absolute',
              top: '-10px',
              width: '60px',
              height: '12px',
              background: '#d4a373',
              borderRadius: '6px',
            }}
          />
          <div style={{ fontSize: '1.8rem' }}>💌</div>
          <span style={{ fontSize: '0.72rem', color: '#be123c', fontWeight: 600, marginTop: '4px' }}>
            {isDrawing ? 'Membuka...' : 'Buka Pesan 🤍'}
          </span>
        </div>

        {/* Drawn Note Card */}
        <div
          style={{
            padding: '18px 22px',
            borderRadius: '16px',
            background: 'rgba(255, 245, 247, 0.9)',
            border: '1px dashed rgba(244, 114, 182, 0.45)',
            minHeight: '70px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '20px',
          }}
        >
          <p
            className="font-serif"
            style={{
              fontSize: '1.18rem',
              fontStyle: 'italic',
              color: '#3b2835',
              lineHeight: 1.6,
            }}
          >
            "{currentNote}"
          </p>
        </div>

        {/* Button to Draw */}
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '22px' }}>
          <button
            onClick={drawNote}
            disabled={isDrawing}
            className="btn-gentle btn-gentle-primary"
            style={{ padding: '10px 24px', fontSize: '0.88rem' }}
          >
            <RefreshCw size={15} className={isDrawing ? 'animate-spin' : ''} />
            <span>{isDrawing ? 'Membuka...' : 'Ambil Pesan Lain 🤍'}</span>
          </button>
        </div>

        {/* Form to add note */}
        <div
          style={{
            borderTop: '1px solid rgba(230, 200, 210, 0.3)',
            paddingTop: '16px',
          }}
        >
          <form onSubmit={handleAddWish} style={{ display: 'flex', gap: '8px' }}>
            <input
              type="text"
              value={customWish}
              onChange={(e) => setCustomWish(e.target.value)}
              placeholder="Tulis pesan atau harapan kecil ayy di sini..."
              style={{
                flex: 1,
                padding: '9px 16px',
                borderRadius: '24px',
                border: '1px solid rgba(244, 114, 182, 0.35)',
                background: 'rgba(255, 255, 255, 0.9)',
                outline: 'none',
                fontSize: '0.88rem',
                color: 'var(--text-primary)',
              }}
            />
            <button
              type="submit"
              className="btn-gentle btn-gentle-secondary"
              style={{ padding: '8px 18px', fontSize: '0.85rem', borderRadius: '24px' }}
            >
              {isAdded ? <CheckCircle2 size={15} color="#10b981" /> : <Send size={15} />}
              <span>{isAdded ? 'Tersimpan' : 'Simpan'}</span>
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
