// src/pages/Index.tsx
import React, { useEffect, useRef } from 'react';

const Home: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let animationFrameId: number;

    const draw = () => {
      if (!ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Simple gradient background animation
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      const time = Date.now() * 0.0005;
      gradient.addColorStop(0, `hsl(${Math.sin(time) * 360}, 70%, 50%)`);
      gradient.addColorStop(1, `hsl(${Math.cos(time) * 360}, 70%, 50%)`);
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Background Canvas */}
      <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full -z-10" />

      {/* Header / Navigation */}
      <header className="flex justify-between items-center p-6 bg-white/70 backdrop-blur-md shadow-md fixed w-full z-20">
        <div className="text-2xl font-bold">
          <a href="/">IQnnect</a>
        </div>
        <nav className="space-x-6">
          <a href="/" className="hover:text-primary transition-colors">Home</a>
          <a href="/quizzes" className="hover:text-primary transition-colors">Quizzes</a>
          <a href="/about" className="hover:text-primary transition-colors">About</a>
          <a href="/contact" className="hover:text-primary transition-colors">Contact</a>
        </nav>
        <div className="space-x-4">
          <a href="/signup" className="px-4 py-2 border rounded hover:bg-primary hover:text-white transition">Sign Up</a>
          <a href="/login" className="px-4 py-2 bg-primary text-white rounded hover:bg-primary-dark transition">Log In</a>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex flex-col items-center justify-center text-center pt-40 px-6">
        <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fadeIn">
          Welcome to{' '}
          <span className="bg-gradient-to-r from-primary to-primary-end bg-clip-text text-transparent">
            IQnnect
          </span>
        </h1>
        <p className="text-lg md:text-2xl mb-12 animate-fadeIn delay-200">
          Test your knowledge, challenge your mind, and connect with intelligence.
        </p>

        <div className="space-x-4">
          <a href="/quizzes" className="px-6 py-3 bg-primary text-white rounded hover:bg-primary-dark transition">
            Start Quiz
          </a>
          <a href="/about" className="px-6 py-3 border rounded hover:bg-primary hover:text-white transition">
            Learn More
          </a>
        </div>
      </main>

      {/* Tailwind CSS Animations */}
      <style jsx>{`
        @keyframes fadeIn {
          0% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 1s ease forwards;
        }
        .animate-fadeIn.delay-200 {
          animation-delay: 0.2s;
        }
      `}</style>
    </div>
  );
};

export default Home;
