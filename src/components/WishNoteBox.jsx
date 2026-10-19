import React, { useState, useEffect } from 'react';
import { Heart, Send, Sparkles, Trash2 } from 'lucide-react';
import { soundManager } from '../utils/audioSynthesizer';
import confetti from 'canvas-confetti';

export default function WishNoteBox({ partnerName }) {
  const [notes, setNotes] = useState(() => {
    try {
      const saved = localStorage.getItem('lovely_personal_notes');
      return saved
        ? JSON.parse(saved)
        : [
            {
              id: 1,
              author: partnerName || 'Ayy',
              text: 'Makasih ya mas udah dibikinin web selucu ini... sayang mas selalu 🤍',
              date: 'Pesan Perdana 🌸',
            },
          ];
    } catch {
      return [];
    }
  });

  const [inputAuthor, setInputAuthor] = useState('');
  const [inputText, setInputText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    soundManager.playSparkle();
    confetti({
      particleCount: 25,
      spread: 50,
      origin: { y: 0.8 },
      colors: ['#fda4af', '#f472b6', '#fed7aa'],
    });

    const newNote = {
      id: Date.now(),
      author: inputAuthor.trim() || partnerName || 'Ayy',
      text: inputText.trim(),
      date: new Date().toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'short',
        hour: '2-digit',
        minute: '2-digit',
      }),
    };

    const updated = [newNote, ...notes];
    setNotes(updated);
    localStorage.setItem('lovely_personal_notes', JSON.stringify(updated));
    setInputText('');
  };

  const handleDelete = (id) => {
    const updated = notes.filter((n) => n.id !== id);
    setNotes(updated);
    localStorage.setItem('lovely_personal_notes', JSON.stringify(updated));
  };

  return (
    <section
      style={{
        maxWidth: '840px',
        margin: '70px auto 0',
        padding: '0 20px',
      }}
    >
      <div
        className="glass-card"
        style={{
          padding: '44px 36px',
          borderRadius: '32px',
          background: 'linear-gradient(160deg, rgba(255, 255, 255, 0.95) 0%, rgba(254, 245, 248, 0.9) 100%)',
          border: '1px solid rgba(255, 210, 225, 0.8)',
          boxShadow: '0 20px 50px -10px rgba(230, 140, 165, 0.18)',
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: '28px' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '6px 18px',
              borderRadius: '30px',
              background: 'rgba(254, 215, 226, 0.6)',
              color: '#be123c',
              fontSize: '0.85rem',
              fontWeight: 600,
              marginBottom: '14px',
            }}
          >
            <Sparkles size={14} />
            <span>Sudut Catatan Berdua</span>
          </div>

          <h2
            className="font-serif"
            style={{
              fontSize: '2.4rem',
              fontWeight: 500,
              color: 'var(--text-primary)',
              lineHeight: 1.25,
            }}
          >
            Tuliskan Pesan atau Keinginanmu 💌
          </h2>

          <p
            style={{
              fontSize: '0.98rem',
              color: 'var(--text-secondary)',
              maxWidth: '500px',
              margin: '8px auto 0',
            }}
          >
            Mau cerita apa aja, ninggalin pesan buat mas, atau nulis hal yang pengen kita lakuin bareng di sini ya ayy.
          </p>
        </div>

        {/* Input Form */}
        <form onSubmit={handleSubmit} style={{ marginBottom: '32px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <input
              type="text"
              value={inputAuthor}
              onChange={(e) => setInputAuthor(e.target.value)}
              placeholder={`Namamu (Default: ${partnerName || 'Ayy'})`}
              style={{
                padding: '12px 18px',
                borderRadius: '16px',
                border: '1px solid rgba(244, 114, 182, 0.35)',
                background: 'rgba(255, 255, 255, 0.85)',
                outline: 'none',
                fontSize: '0.92rem',
                color: 'var(--text-primary)',
              }}
            />
            <textarea
              rows={3}
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Tulis pesan buat mas, curhatan hari ini, atau hal yang pengen kita coba bareng..."
              style={{
                padding: '14px 18px',
                borderRadius: '16px',
                border: '1px solid rgba(244, 114, 182, 0.35)',
                background: 'rgba(255, 255, 255, 0.85)',
                outline: 'none',
                fontSize: '0.95rem',
                color: 'var(--text-primary)',
                resize: 'none',
                fontFamily: 'var(--font-sans)',
              }}
            />
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <button
                type="submit"
                className="btn-gentle btn-gentle-primary"
                style={{ padding: '12px 28px', fontSize: '0.92rem' }}
              >
                <Send size={16} />
                <span>Kirim Pesan Hati</span>
              </button>
            </div>
          </div>
        </form>

        {/* Notes Grid */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {notes.map((note) => (
            <div
              key={note.id}
              style={{
                padding: '18px 22px',
                borderRadius: '18px',
                background: 'linear-gradient(145deg, rgba(255, 245, 247, 0.9), rgba(254, 235, 240, 0.7))',
                border: '1px solid rgba(251, 182, 206, 0.5)',
                position: 'relative',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '8px',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Heart size={14} fill="#e11d48" color="#e11d48" />
                  <span style={{ fontWeight: 600, fontSize: '0.92rem', color: '#be123c' }}>
                    {note.author}
                  </span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{note.date}</span>
                  <button
                    onClick={() => handleDelete(note.id)}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: 'var(--text-muted)',
                      cursor: 'pointer',
                      padding: '2px',
                    }}
                    title="Hapus pesan"
                  >
                    <Trash2 size={13} />
                  </button>
                </div>
              </div>
              <p
                style={{
                  fontSize: '0.95rem',
                  color: 'var(--text-primary)',
                  lineHeight: 1.65,
                }}
              >
                {note.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
