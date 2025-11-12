import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import LoginTransition from '../components/LoginTransition';

const ClosedLanding = () => {
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isShaking, setIsShaking] = useState(false);
  const [showTransition, setShowTransition] = useState(false);

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    
    if (password.toLowerCase() === '1percent') {
      // Set authenticated flag
      localStorage.setItem('authenticated', 'true');
      
      // Show transition animation
      setShowTransition(true);
      
      // Navigate after transition completes (3 seconds)
      setTimeout(() => {
        navigate('/store');
      }, 3000);
    } else {
      setError('Invalid password');
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 500);
    }
  };

  return (
    <div 
      id="closed-landing"
      className="min-h-screen flex flex-col items-center justify-center px-4 py-8 animate-fadeIn relative"
      style={{ animation: 'fadeIn 0.5s ease-in-out', backgroundColor: '#0b0b0a' }}
    >
      
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }
          
          @keyframes shake {
            0%, 100% { transform: translateX(0); }
            25% { transform: translateX(-10px); }
            75% { transform: translateX(10px); }
          }
          
          .shake {
            animation: shake 0.3s ease-in-out;
          }
          
          .glow-hover {
            transition: all 0.3s ease;
          }
          
          .glow-hover:hover {
            box-shadow: 0 0 20px rgba(220, 38, 38, 0.6);
            transform: scale(1.02);
          }
          
          .button-glow:hover {
            box-shadow: 0 0 15px rgba(234, 179, 8, 0.5);
          }

          .primary-btn {
            background-color: #d10121;
          }

          .primary-btn:hover {
            background-color: #b1001c;
          }
        `}
      </style>

      <div className="w-full max-w-4xl mx-auto flex flex-col items-center space-y-3">
        {/* Logo */}
        <div className="mb-2">
          <img 
            src="https://app.trickle.so/storage/public/images/usr_14ec922cf0000001/1240476a-bf23-4bf4-9259-64052a0d8ef0.jpeg"
            alt="1% Logo"
            className="w-20 h-20 md:w-28 md:h-28 object-contain drop-shadow-2xl"
          />
        </div>

        {/* Main Heading */}
        <h1 className="font-extrabold text-white text-center uppercase mb-3" style={{ 
          fontFamily: 'Helvetica Neue, Helvetica, Arial, sans-serif',
          fontSize: 'clamp(2rem, 14vw, 6rem)',
          letterSpacing: '0.02em',
          lineHeight: '1',
          whiteSpace: 'nowrap'
        }}>
          WE'RE CLOSED
        </h1>

        {/* Subtitle */}
        <p className="text-white text-lg sm:text-xl md:text-4xl text-center font-light uppercase tracking-wide mb-10 whitespace-nowrap" style={{ fontFamily: 'Helvetica Neue, Helvetica, Arial, sans-serif', letterSpacing: '0.08em' }}>
          UNLOCK ACCESS. JOIN WAITLIST
        </p>

        {/* Password Form */}
        <form onSubmit={handlePasswordSubmit} className="w-full max-w-2xl mt-0">
          <div className="flex flex-row items-stretch">
            <input
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError('');
              }}
              placeholder="Password"
              className={`flex-1 px-4 md:px-6 py-4 bg-gray-900 border border-r-0 rounded-l-lg text-white placeholder-gray-400 text-center focus:outline-none transition-all ${
                isShaking ? 'shake' : ''
              }`}
              style={{ 
                borderColor: error ? '#ef4444' : 'rgba(212, 175, 55, 0.2)', 
                boxShadow: error ? 'none' : '0 0 6px rgba(212, 175, 55, 0.1)',
                fontFamily: 'Helvetica Neue, Helvetica, Arial, sans-serif'
              }}
            />
            <button
              type="submit"
              className="px-6 md:px-10 py-4 text-white font-normal rounded-r-lg uppercase tracking-widest transition-all primary-btn"
              style={{ fontFamily: 'Helvetica Neue, Helvetica, Arial, sans-serif' }}
            >
              ENTER
            </button>
          </div>
          {error && (
            <p className="text-red-500 text-sm mt-2 text-center shake" style={{ fontFamily: 'Helvetica Neue, Helvetica, Arial, sans-serif' }}>
              {error}
            </p>
          )}
        </form>

        {/* Hoodie Showcase */}
        <div className="w-full mt-12 mb-8 flex justify-center">
          <div className="max-w-3xl w-full">
            <img
              src="/assets/landing-hoodies.png"
              alt="1% Hoodies Collection"
              className="w-full h-auto object-contain"
            />
          </div>
        </div>

        {/* Join Waitlist Button */}
        <div className="w-full flex justify-center mt-6 px-4">
          <button
            data-tally-open="VLElMM"
            data-tally-layout="modal"
            data-tally-width="600"
            data-tally-emoji-text="👋"
            data-tally-emoji-animation="wave"
            className="text-white font-normal py-3 px-12 rounded-md uppercase tracking-widest text-sm transition-all glow-hover primary-btn"
            style={{ fontFamily: 'Helvetica Neue, Helvetica, Arial, sans-serif', maxWidth: '320px' }}
          >
            Join Waitlist
          </button>
        </div>

        {/* Social Media Section */}
        <div className="w-full mt-8 mb-8 flex flex-col items-center space-y-4">
          <p className="text-white text-base uppercase tracking-widest font-normal" style={{ fontFamily: 'Helvetica Neue, Helvetica, Arial, sans-serif' }}>
            FOLLOW US
          </p>
          <div className="flex items-center space-x-8">
            {/* Instagram */}
            <a href="https://www.instagram.com/1of1.percent_?igsh=MXkxZ3Q0OXVlNG5nMQ==" target="_blank" rel="noopener noreferrer" className="text-white hover:text-red-600 transition-colors">
              <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </a>
            {/* TikTok */}
            <a href="#" className="text-white hover:text-red-600 transition-colors">
              <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
              </svg>
            </a>
            {/* Twitter */}
            <a href="#" className="text-white hover:text-red-600 transition-colors">
              <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
              </svg>
            </a>
          </div>
        </div>
      </div>

      {/* Login Transition Animation */}
      <AnimatePresence>
        {showTransition && <LoginTransition />}
      </AnimatePresence>
    </div>
  );
};

export default ClosedLanding;
