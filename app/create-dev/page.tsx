"use client";

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';

const FormContent = () => {
    const searchParams = useSearchParams();
    const router = useRouter();
    const editId = searchParams.get('id');

    const [name, setName] = useState('');
    const [role, setRole] = useState('');
    const [bio, setBio] = useState('');
    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(false);
    const [message, setMessage] = useState('');

    useEffect(() => {
        if (editId) {
            fetchDeveloper();
        }
    }, [editId]);

    const fetchDeveloper = async () => {
        setFetching(true);
        try {
            const response = await fetch(`/api/developers`);
            const developers = await response.json();
            const dev = developers.find((d: any) => d._id === editId);
            if (dev) {
                setName(dev.name);
                setRole(dev.role);
                setBio(dev.bio);
            } else {
                setMessage('Error: Developer not found.');
            }
        } catch (error) {
            console.error('Error fetching developer:', error);
            setMessage('Error: Failed to fetch record.');
        } finally {
            setFetching(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setMessage('');

        try {
            const url = editId ? `/api/developers/${editId}` : '/api/developers';
            const method = editId ? 'PUT' : 'POST';

            const response = await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name,
                    role,
                    bio,
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to process developer profile');
            }

            setMessage(`Success: Developer profile ${editId ? 'updated' : 'created'}!`);

            if (!editId) {
                setName('');
                setRole('');
                setBio('');
            }

            // Redirect back after short delay
            setTimeout(() => {
                router.push('/');
            }, 1500);

        } catch (error) {
            console.error('Error:', error);
            setMessage('Error: Failed to process record.');
        } finally {
            setLoading(false);
        }
    };

    if (fetching) {
        return <div className="text-center animate-pulse text-[#00ff41] mt-20">DECRYPTING_RECORD...</div>;
    }

    return (
        <div className="max-w-md mx-auto">
            <h1 className="text-3xl font-bold underline mb-8 uppercase tracking-widest">
                &gt; {editId ? 'UPDATE_RECORD' : 'CREATE_DEV_PROFILE'}
            </h1>

            {message && (
                <div className={`mb-4 p-3 border ${message.startsWith('Error') ? 'border-red-500 text-red-500' : 'border-[#00ff41] text-[#00ff41]'}`}>
                    {message}
                </div>
            )}

            <form onSubmit={handleSubmit} className="bg-black/80 border border-[#00ff41] p-6 rounded-sm shadow-[0_0_15px_rgba(0,255,65,0.2)]">
                <div className="mb-4">
                    <label className="block text-xs uppercase mb-1">IDENTIFIER_NAME</label>
                    <input
                        type="text"
                        name="name"
                        placeholder="root@admin:~#"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full bg-black border-b border-[#00ff41]/30 focus:border-[#00ff41] outline-none py-2 px-1 transition-colors text-[#00ff41]"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-xs uppercase mb-1">DESIGNATION_ROLE</label>
                    <input
                        type="text"
                        name="role"
                        placeholder="SEC_OPERATIVE"
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                        className="w-full bg-black border-b border-[#00ff41]/30 focus:border-[#00ff41] outline-none py-2 px-1 transition-colors text-[#00ff41]"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-xs uppercase mb-1">BIOGRAPHICAL_DATA</label>
                    <textarea
                        name="bio"
                        placeholder="[ENCRYPTED_DATA]"
                        value={bio}
                        onChange={(e) => setBio(e.target.value)}
                        className="w-full bg-black border-b border-[#00ff41]/30 focus:border-[#00ff41] outline-none py-2 px-1 transition-colors text-[#00ff41] h-24 resize-none"
                        required
                    />
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-transparent border border-[#00ff41] py-2 px-4 hover:bg-[#00ff41] hover:text-black transition-all duration-300 font-bold uppercase tracking-tighter disabled:opacity-50"
                >
                    {loading ? '[ PROCESSING... ]' : (editId ? '[ COMMIT_UPDATE ]' : '[ COMMIT_DATA ]')}
                </button>
            </form>

            <div className="mt-8 text-center flex justify-center space-x-6">
                <a href="/" className="text-xs hover:underline text-[#00ff41]/60">&lt; RETURN_TO_DASHBOARD</a>
            </div>
        </div>
    );
};

const CreateDevPage = () => {
    return (
        <div className="min-h-screen bg-[#050505] text-[#00ff41] font-mono p-8">
            <Suspense fallback={<div className="text-center text-[#00ff41]">LOADING_INTERFACE...</div>}>
                <FormContent />
            </Suspense>
        </div>
    );
};

export default CreateDevPage;
