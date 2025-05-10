'use client'

import { ShieldCheck } from 'lucide-react';

export default function Upgrade() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-indigo-50 to-white p-4">
      <div className="text-center max-w-lg">
        {/* Icon for visual engagement */}
        <ShieldCheck className="w-12 h-12 text-indigo-600 mx-auto mb-4" />

        {/* Engaging Heading */}
        <h1 className="text-3xl font-bold text-gray-800 mb-3">
          Unlock Your Financial Potential Today!
        </h1>

        {/* Subheading with Benefits */}
        <p className="text-lg text-gray-600 mb-6">
          Upgrade to Premium and enjoy: <br />
          ✨ Advanced Analytics <br />
          📊 Unlimited Transaction Tracking <br />
          💡 Exclusive Financial Insights
        </p>

        {/* Interactive Upgrade Button */}
        <a
          href="#"
          className="inline-block bg-gradient-to-r from-indigo-700 to-indigo-400 text-white px-8 py-3 rounded-lg font-semibold hover:from-indigo-400 hover:to-indigo-700 transition-all hover:scale-105 active:scale-95"
        >
          Upgrade Now
        </a>
      </div>
    </div>
  );
}