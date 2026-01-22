"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface Developer {
  _id: string; // MongoDB use _id
  name: string;
  role: string;
  bio: string;
}

export default function HomePage() {
  const [developers, setDevelopers] = useState<Developer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchDevelopers();
  }, []);

  const fetchDevelopers = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/developers');
      if (!response.ok) throw new Error('Failed to fetch from DB');
      const data = await response.json();
      setDevelopers(data);
    } catch (error) {
      console.error('Error fetching developers:', error);
      setError('Failed to load database records.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to PURGE this record?')) return;

    setError(null);
    try {
      const response = await fetch(`/api/developers/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Purge failed');
      fetchDevelopers();
    } catch (error) {
      console.error('Error deleting developer:', error);
      setError('Operational error: System failed to purge record.');
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-[#00ff41] font-mono p-4 md:p-8 selection:bg-[#00ff41] selection:text-black">
      <div className="max-w-4xl mx-auto space-y-8 relative">
        {/* Scanline effect overlay */}
        <div className="fixed inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%),linear-gradient(90deg,rgba(255,0,0,0.03),rgba(0,255,0,0.01),rgba(0,0,255,0.03))] bg-[length:100%_4px,3px_100%] z-50"></div>

        <header className="border-b-2 border-[#00ff41] pb-4 mb-8 flex justify-between items-end">
          <div>
            <h1 className="text-4xl font-bold uppercase tracking-widest animate-pulse">
              &gt; DEV_PROFILES_TERMINAL
            </h1>
            <p className="text-xs mt-2 text-[#00ff41]/60">SYSTEM STATUS: ONLINE | ENCRYPTION: ACTIVE</p>
          </div>
          <Link
            href="/create-dev"
            className="border border-[#00ff41] px-4 py-2 hover:bg-[#00ff41] hover:text-black transition-all duration-300 font-bold uppercase text-sm"
          >
            [ + INITIALIZE_NEW_ENTRY ]
          </Link>
        </header>

        <section className="space-y-4">
          <h2 className="text-xl font-bold flex items-center">
            <span className="mr-2">#</span> DATABASE_RECORDS
          </h2>
          {error && (
            <div className="bg-red-500/10 border border-red-500 text-red-500 p-3 rounded-sm text-xs mb-4">
              &gt; ERROR: {error}
            </div>
          )}
          {loading ? (
            <div className="animate-pulse text-[#00ff41]">SCANNING_FILES...</div>
          ) : (
            <div className="grid gap-4">
              {developers.length === 0 ? (
                <div className="text-center py-20 border border-dashed border-[#00ff41]/20 text-[#00ff41]/40">
                  &lt; NO_RECORDS_FOUND_IN_LOCAL_SECTOR &gt;
                </div>
              ) : (
                developers.map((dev) => (
                  <div key={dev._id} className="bg-black/40 border border-[#00ff41]/20 p-4 hover:border-[#00ff41] transition-colors group relative overflow-hidden">
                    <div className="relative z-10 flex justify-between items-start">
                      <div className="space-y-1">
                        <div className="flex items-center space-x-2">
                          <span className="text-[#00ff41]/40 text-xs">ID: {dev._id.substring(dev._id.length - 6)}</span>
                          <h3 className="text-lg font-bold uppercase tracking-tight">{dev.name}</h3>
                        </div>
                        <p className="text-sm text-[#00ff41]/80 italic">&gt; {dev.role}</p>
                        <p className="text-xs mt-2 text-[#00ff41]/60 leading-relaxed max-w-2xl">{dev.bio}</p>
                      </div>
                      <div className="flex flex-col space-y-2">
                        <Link
                          href={`/create-dev?id=${dev._id}`}
                          className="text-center text-[10px] border border-[#00ff41]/40 px-2 py-1 hover:bg-[#00ff41] hover:text-black transition-colors"
                        >
                          EDIT
                        </Link>
                        <button
                          onClick={() => handleDelete(dev._id)}
                          className="text-[10px] border border-red-500/40 text-red-500 px-2 py-1 hover:bg-red-500 hover:text-black transition-colors"
                        >
                          PURGE
                        </button>
                      </div>
                    </div>
                    {/* Subtle background glitch effect on hover */}
                    <div className="absolute inset-0 bg-[#00ff41]/5 translate-x-full group-hover:translate-x-0 transition-transform duration-500 -skew-x-12"></div>
                  </div>
                ))
              )}
            </div>
          )}
        </section>

        <footer className="pt-12 text-center text-[10px] text-[#00ff41]/30 uppercase tracking-[0.3em]">
          &copy; 2026 Assignment4 // ALL RIGHTS RESERVED
        </footer>
      </div>

      <style jsx global>{`
                @keyframes pulse {
                    0%, 100% { opacity: 1; }
                    50% { opacity: 0.7; }
                }
                ::-webkit-scrollbar {
                    width: 4px;
                }
                ::-webkit-scrollbar-track {
                    background: #050505;
                }
                ::-webkit-scrollbar-thumb {
                    background: #00ff41;
                }
            `}</style>
    </div>
  );
}
