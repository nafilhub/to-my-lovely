import React, { useEffect, useRef } from 'react';

export default function FloatingPetalsCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Create Petals and Sparkles
    const petalCount = Math.min(35, Math.floor(width / 35));
    const petals = [];

    for (let i = 0; i < petalCount; i++) {
      petals.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 10 + 8,
        speedX: (Math.random() - 0.5) * 0.4 + 0.3,
        speedY: Math.random() * 0.5 + 0.4, // Slow, peaceful fall
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 0.8,
        opacity: Math.random() * 0.4 + 0.4,
        color: Math.random() > 0.4 ? 'rgba(255, 182, 193, ' : 'rgba(255, 218, 224, ',
      });
    }

    // Gentle Stars / Dust Motes
    const motesCount = 20;
    const motes = [];
    for (let i = 0; i < motesCount; i++) {
      motes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 2 + 1,
        alpha: Math.random() * 0.6 + 0.2,
        pulseSpeed: Math.random() * 0.02 + 0.01,
      });
    }

    const drawPetal = (p) => {
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate((p.rotation * Math.PI) / 180);
      ctx.beginPath();
      // Organic petal curve
      ctx.moveTo(0, 0);
      ctx.bezierCurveTo(p.size / 2, -p.size / 2, p.size, 0, 0, p.size * 1.5);
      ctx.bezierCurveTo(-p.size, 0, -p.size / 2, -p.size / 2, 0, 0);
      ctx.fillStyle = p.color + p.opacity + ')';
      ctx.shadowColor = 'rgba(255, 192, 203, 0.4)';
      ctx.shadowBlur = 6;
      ctx.fill();
      ctx.restore();
    };

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw dust motes
      motes.forEach((m) => {
        m.alpha += Math.sin(Date.now() * m.pulseSpeed) * 0.008;
        ctx.beginPath();
        ctx.arc(m.x, m.y, m.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 235, 200, ${Math.max(0.1, Math.min(0.7, m.alpha))})`;
        ctx.shadowColor = 'rgba(255, 235, 180, 0.8)';
        ctx.shadowBlur = 8;
        ctx.fill();
      });

      // Draw and update petals
      petals.forEach((p) => {
        drawPetal(p);

        p.x += p.speedX;
        p.y += p.speedY;
        p.rotation += p.rotationSpeed;

        // Wrap around smoothly
        if (p.y > height + 20) {
          p.y = -20;
          p.x = Math.random() * width;
        }
        if (p.x > width + 20) {
          p.x = -20;
        } else if (p.x < -20) {
          p.x = width + 20;
        }
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 1,
        width: '100%',
        height: '100%',
      }}
    />
  );
}
