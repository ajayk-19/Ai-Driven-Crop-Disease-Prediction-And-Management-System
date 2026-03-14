import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import { Shield, Mail, Lock, User, AlertCircle, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Signup() {
    const { signup } = useAuth();
    const navigate = useNavigate();
    const [form, setForm] = useState({ fullName: '', email: '', password: '', confirm: '', role: 'USER', adminSecret: '' });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        if (form.password !== form.confirm) { setError('Passwords do not match.'); return; }
        if (form.password.length < 6) { setError('Password must be at least 6 characters.'); return; }
        setLoading(true);
        try {
            await signup(form.email, form.password, form.fullName, form.role, form.adminSecret);
            navigate('/login');
        } catch (err) {
            setError(err.response?.data || 'Registration failed. Check your information.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-agri-dark flex items-center justify-center p-6 relative overflow-hidden py-12">
            {/* Ambient Background Effects */}
            <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle, #2F8F5B 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-agri-green/5 blur-[120px] rounded-full pointer-events-none" />

            <div className="w-full max-w-md relative z-10">
                <motion.div 
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="text-center mb-8"
                >
                    <div className="inline-flex items-center justify-center w-14 h-14 bg-agri-green/10 border border-agri-green/30 shadow-[0_0_20px_rgba(47,143,91,0.2)] rounded-sm mb-4 relative group">
                        <div className="absolute inset-0 bg-agri-green/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        <Shield size={28} className="text-agri-green relative z-10" />
                    </div>
                    <h1 className="font-display font-bold text-3xl text-white tracking-widest">AGRI-TECH</h1>
                    <p className="text-[10px] font-mono uppercase tracking-[0.4em] text-agri-green mt-2">Intelligence Console</p>
                </motion.div>

                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
                    className="console-card relative backdrop-blur-md bg-agri-surface/80 border-agri-green/20"
                >
                    <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-agri-green/50 to-transparent opacity-50" />

                    <div className="mb-6 text-center">
                        <h2 className="font-display font-semibold text-2xl text-white">Create Account</h2>
                        <p className="text-xs text-agri-text/50 font-sans mt-1.5">Join the platform to access crop diagnostics.</p>
                    </div>

                    {error && (
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="mb-5 flex items-center gap-3 p-3 bg-agri-red/10 border border-agri-red/30 rounded-sm text-agri-red text-xs font-sans"
                        >
                            <AlertCircle size={14} className="shrink-0" /> {error}
                        </motion.div>
                    )}

                    <div className="flex gap-2 mb-6 p-1 bg-agri-dark/80 border border-agri-border rounded-sm">
                        <button
                            type="button"
                            onClick={() => setForm({ ...form, role: 'USER', adminSecret: '' })}
                            className={`flex-1 py-2 text-[10px] font-mono uppercase tracking-widest rounded-sm transition-all duration-300 ${form.role === 'USER' ? 'bg-agri-surface text-agri-green border border-agri-green/30 shadow-[0_0_10px_rgba(47,143,91,0.1)]' : 'text-agri-text/40 hover:text-agri-text'} `}
                        >
                            Student / User
                        </button>
                        <button
                            type="button"
                            onClick={() => setForm({ ...form, role: 'ADMIN' })}
                            className={`flex-1 py-2 text-[10px] font-mono uppercase tracking-widest rounded-sm transition-all duration-300 ${form.role === 'ADMIN' ? 'bg-agri-surface text-agri-amber border border-agri-amber/30 shadow-[0_0_10px_rgba(228,179,99,0.1)]' : 'text-agri-text/40 hover:text-agri-text'} `}
                        >
                            Admin
                        </button>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <AnimatePresence>
                            {form.role === 'ADMIN' && (
                                <motion.div 
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: 'auto', opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    className="overflow-hidden"
                                >
                                    <div className="space-y-1.5 pb-2">
                                        <label className="label-console text-agri-amber">Admin Secret Key</label>
                                        <div className="relative">
                                            <Shield size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-agri-amber/50" />
                                            <input type="password" required placeholder="Secret Key" value={form.adminSecret}
                                                onChange={e => setForm({ ...form, adminSecret: e.target.value })}
                                                className="input-field pl-10 border-agri-amber/30 focus:border-agri-amber bg-agri-amber/5 text-agri-amber placeholder-agri-amber/30" />
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-1.5 group col-span-2 sm:col-span-1">
                                <label className="label-console group-focus-within:text-agri-green transition-colors">Full Name</label>
                                <div className="relative">
                                    <User size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-agri-text/30 group-focus-within:text-agri-green transition-colors" />
                                    <input required placeholder="Jane Doe" value={form.fullName}
                                        onChange={e => setForm({ ...form, fullName: e.target.value })}
                                        className="input-field pl-10 bg-agri-dark/50" />
                                </div>
                            </div>
                            <div className="space-y-1.5 group col-span-2 sm:col-span-1">
                                <label className="label-console group-focus-within:text-agri-green transition-colors">Email Address</label>
                                <div className="relative">
                                    <Mail size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-agri-text/30 group-focus-within:text-agri-green transition-colors" />
                                    <input type="email" required placeholder="name@example.com" value={form.email}
                                        onChange={e => setForm({ ...form, email: e.target.value })}
                                        className="input-field pl-10 bg-agri-dark/50" />
                                </div>
                            </div>
                        </div>

                        <div className="space-y-1.5 group">
                            <label className="label-console group-focus-within:text-agri-green transition-colors">Password</label>
                            <div className="relative">
                                <Lock size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-agri-text/30 group-focus-within:text-agri-green transition-colors" />
                                <input type="password" required placeholder="Min. 6 characters" value={form.password}
                                    onChange={e => setForm({ ...form, password: e.target.value })}
                                    className="input-field pl-10 bg-agri-dark/50" />
                            </div>
                        </div>

                        <div className="space-y-1.5 group">
                            <label className="label-console group-focus-within:text-agri-green transition-colors">Confirm Password</label>
                            <div className="relative">
                                <Lock size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-agri-text/30 group-focus-within:text-agri-green transition-colors" />
                                <input type="password" required placeholder="Repeat password" value={form.confirm}
                                    onChange={e => setForm({ ...form, confirm: e.target.value })}
                                    className="input-field pl-10 bg-agri-dark/50" />
                            </div>
                        </div>

                        <button type="submit" disabled={loading} className="btn-primary w-full justify-center mt-6 py-3.5 shadow-[0_4px_14px_0_rgba(47,143,91,0.39)] hover:shadow-[0_6px_20px_rgba(47,143,91,0.23)]">
                            {loading ? <Loader2 size={16} className="animate-spin" /> : 'Sign Up'}
                        </button>
                    </form>

                    <p className="mt-8 text-center text-xs text-agri-text/40 font-sans">
                        Already have an account?{' '}
                        <Link to="/login" className="text-agri-green hover:text-white hover:underline transition-colors">Log In</Link>
                    </p>
                </motion.div>
            </div>
        </div>
    );
}
