import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import { Shield, Mail, Lock, AlertCircle, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Login() {
    const { login } = useAuth();
    const navigate = useNavigate();
    const [form, setForm] = useState({ email: '', password: '' });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            const user = await login(form.email, form.password);
            navigate(user.role === 'ADMIN' ? '/admin' : '/');
        } catch {
            setError('Invalid credentials. Please check your email and password.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-agri-dark flex items-center justify-center p-6 relative overflow-hidden">
            {/* Ambient Background Effects */}
            <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle, #2F8F5B 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-agri-green/5 blur-[120px] rounded-full pointer-events-none" />

            <div className="w-full max-w-md relative z-10">
                {/* Brand */}
                <motion.div 
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="text-center mb-10"
                >
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-agri-green/10 border border-agri-green/30 shadow-[0_0_20px_rgba(47,143,91,0.2)] rounded-sm mb-5 relative group">
                        <div className="absolute inset-0 bg-agri-green/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        <Shield size={32} className="text-agri-green relative z-10" />
                    </div>
                    <h1 className="font-display font-bold text-4xl text-white tracking-widest">AGRI-TECH</h1>
                    <p className="text-[10px] font-mono uppercase tracking-[0.4em] text-agri-green mt-2">Intelligence Console</p>
                </motion.div>

                {/* Card */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
                    className="console-card relative backdrop-blur-md bg-agri-surface/80 border-agri-green/20"
                >
                    <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-agri-green/50 to-transparent opacity-50" />
                    
                    <div className="mb-7 text-center">
                        <h2 className="font-display font-semibold text-2xl text-white">Welcome Back</h2>
                        <p className="text-xs text-agri-text/50 font-sans mt-2">Log in to access your dashboard.</p>
                    </div>

                    {error && (
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="mb-5 flex items-center gap-3 p-3 bg-agri-red/10 border border-agri-red/30 rounded-sm text-agri-red text-xs font-sans"
                        >
                            <AlertCircle size={14} className="shrink-0" />
                            {error}
                        </motion.div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div className="space-y-1.5 group">
                            <label className="label-console group-focus-within:text-agri-green transition-colors">Email Address</label>
                            <div className="relative">
                                <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-agri-text/30 group-focus-within:text-agri-green transition-colors" />
                                <input type="email" required placeholder="student@example.com" value={form.email}
                                    onChange={e => setForm({ ...form, email: e.target.value })}
                                    className="input-field pl-10 bg-agri-dark/50" />
                            </div>
                        </div>

                        <div className="space-y-1.5 group">
                            <label className="label-console group-focus-within:text-agri-green transition-colors">Password</label>
                            <div className="relative">
                                <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-agri-text/30 group-focus-within:text-agri-green transition-colors" />
                                <input type="password" required placeholder="••••••••" value={form.password}
                                    onChange={e => setForm({ ...form, password: e.target.value })}
                                    className="input-field pl-10 bg-agri-dark/50" />
                            </div>
                        </div>

                        <button type="submit" disabled={loading} className="btn-primary w-full justify-center mt-4 py-3.5 shadow-[0_4px_14px_0_rgba(47,143,91,0.39)] hover:shadow-[0_6px_20px_rgba(47,143,91,0.23)]">
                            {loading ? <Loader2 size={16} className="animate-spin" /> : 'Log In'}
                        </button>
                    </form>

                    <p className="mt-8 text-center text-xs text-agri-text/40 font-sans">
                        Don't have an account?{' '}
                        <Link to="/signup" className="text-agri-green hover:text-white hover:underline transition-colors">Sign Up</Link>
                    </p>
                </motion.div>
            </div>
        </div>
    );
}
