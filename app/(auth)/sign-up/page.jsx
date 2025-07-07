'use client';
import { SignUp } from '@clerk/nextjs';
import { useEffect } from 'react';

export default function Page() {
    useEffect(() => {
        // Load particles.js script dynamically
        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/npm/particles.js@2.0.0/particles.min.js';
        script.async = true;
        script.onload = () => {
            window.particlesJS('particles-js', {
                particles: {
                    number: { value: 80, density: { enable: true, value_area: 800 } },
                    color: { value: '#ffffff' },
                    shape: { type: 'circle' },
                    opacity: { value: 0.5, random: false },
                    size: { value: 3, random: true },
                    line_linked: { enable: true, distance: 150, color: '#ffffff', opacity: 0.4, width: 1 },
                    move: { enable: true, speed: 6, direction: 'none', random: false, straight: false, out_mode: 'out', bounce: false },
                },
                interactivity: {
                    detect_on: 'canvas',
                    events: { onhover: { enable: true, mode: 'repulse' }, onclick: { enable: true, mode: 'push' }, resize: true },
                    modes: { repulse: { distance: 100, duration: 0.4 }, push: { particles_nb: 4 } },
                },
                retina_detect: true,
            });
        };
        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        };
    }, []);

    return (
        <div className="page-container">
            {/* Particle Background */}
            <div id="particles-js" className="absolute inset-0 z-0"></div>

            {/* Header */}
            <header className="w-full flex justify-center items-center p-6 z-10">
                <div className="glassmorphism p-4 rounded-xl">
                    <h1 className="expense-tracker-logo text-3xl font-bold">Expense Tracker</h1>
                </div>
            </header>

            {/* Centered Sign-Up Form */}
            <main className="flex-1 w-full flex justify-center items-center p-4 min-h-[50vh] z-10">
                <div className="w-full max-w-md flex justify-content: center items-center">
                    <SignUp
                        appearance={{
                            elements: {
                                rootBox: {
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    width: '100%',
                                },
                                card: { // Target Clerk's card element
                                    background: 'rgba(255, 255, 255, 0.15) !important',
                                    backdropFilter: 'blur(10px)',
                                    WebkitBackdropFilter: 'blur(10px)', // For Safari
                                    border: '1px solid rgba(255, 255, 255, 0.3)',
                                    padding: '2rem',
                                    borderRadius: '15px',
                                    width: '100%',
                                    maxWidth: '400px',
                                    textAlign: 'center',
                                    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
                                },
                                form: {
                                    background: 'transparent !important', // Ensure form is transparent to inherit card styles
                                    padding: '0',
                                    border: 'none',
                                    boxShadow: 'none',
                                },
                                headerTitle: {
                                    fontSize: '1.8rem',
                                    color: '#fff',
                                    marginBottom: '0.5rem',
                                },
                                headerSubtitle: {
                                    fontSize: '0.9rem',
                                    color: '#ddd',
                                    marginBottom: '1.5rem',
                                },
                                socialButtons: {
                                    display: 'flex',
                                    gap: '1rem',
                                    justifyContent: 'center',
                                    marginBottom: '1rem',
                                },
                                socialButtonsButton: {
                                    flex: 1,
                                    padding: '0.75rem',
                                    borderRadius: '8px',
                                    fontSize: '0.9rem',
                                    cursor: 'pointer',
                                    transition: 'all 0.3s ease',
                                    border: '1px solid rgba(255, 255, 255, 0.2)',
                                    background: 'rgba(255, 255, 255, 0.1)',
                                    color: '#fff',
                                },
                                formButtonPrimary: {
                                    background: 'linear-gradient(90deg, #4B5EAA, #7F9CF5)',
                                    color: '#fff',
                                    padding: '0.75rem',
                                    borderRadius: '8px',
                                    fontSize: '1rem',
                                    cursor: 'pointer',
                                    transition: 'all 0.3s ease',
                                    border: 'none',
                                },
                                formFieldInput: {
                                    padding: '0.75rem',
                                    borderRadius: '8px',
                                    border: '1px solid rgba(255, 255, 255, 0.3)',
                                    background: 'rgba(255, 255, 255, 0.15)',
                                    color: '#ffffff',
                                    WebkitTextFillColor: '#ffffff', // Ensure text visibility
                                    caretColor: '#ffffff', // Visible cursor
                                    fontSize: '0.9rem',
                                    fontFamily: 'var(--font-outfit), Poppins, sans-serif',
                                    transition: 'border-color 0.3s ease',
                                    '&::placeholder': { color: '#cccccc', opacity: 1 }, // Visible placeholders
                                    '&[type="password"]': {
                                        WebkitTextSecurity: 'disc', // Password mask
                                        MozTextSecurity: 'disc', // Firefox
                                        textSecurity: 'disc', // Standard
                                        color: '#ffffff',
                                        WebkitTextFillColor: '#ffffff',
                                    },
                                    '&[type="email"], &[type="text"]': {
                                        color: '#ffffff',
                                        WebkitTextFillColor: '#ffffff',
                                    },
                                },
                                footerActionLink: {
                                    color: '#7F9CF5',
                                    fontSize: '0.9rem',
                                    textDecoration: 'none',
                                    href: '/sign-in',
                                },
                                dividerText: {
                                    color: '#ddd',
                                },
                                footerText: {
                                    color: '#ddd',
                                },
                            },
                        }}
                        routing="path"
                        path="/sign-up"
                    />
                </div>
            </main>

            {/* Footer */}
            <footer className="w-full flex justify-center items-center p-6 z-10">
                <div className="glassmorphism p-4 rounded-xl text-center text-white">
                    <p className="text-sm mb-2">Follow us:</p>
                    <div className="social-icons flex gap-4 justify-center mb-2">
                        <a href="#" className="social-icon w-9 h-9 bg-white/10 rounded-full flex items-center justify-center text-white text-lg transition-all">
                            𝕏
                        </a>
                        <a href="#" className="social-icon w-9 h-9 bg-white/10 rounded-full flex items-center justify-center text-white text-lg transition-all">
                            📸
                        </a>
                        <a href="#" className="social-icon w-9 h-9 bg-white/10 rounded-full flex items-center justify-center text-white text-lg transition-all">
                            📘
                        </a>
                    </div>
                    <p className="text-sm">© 2025 Expense Tracker. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
}