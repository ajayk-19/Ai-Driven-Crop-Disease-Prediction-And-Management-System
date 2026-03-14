import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import api from '../services/api.js';
import { ScanLine, History, CloudLightning, TrendingUp, AlertTriangle, CheckCircle2, Activity, Leaf, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

const SEVERITY_COLOR = { Severe: 'badge-red', Moderate: 'badge-amber', Mild: 'badge-green', Healthy: 'badge-green' };

// Animation Variants
const containerVariants = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: { staggerChildren: 0.1 }
    }
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 300, damping: 24 } }
};

export default function Dashboard() {
    const { user } = useAuth();
    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        api.get('/predictions/history').then(r => setHistory(r.data)).catch(() => { }).finally(() => setLoading(false));
    }, []);

    const total = history.length;
    const severe = history.filter(h => h.severity === 'Severe').length;
    const healthy = history.filter(h => h.diseaseName?.toLowerCase().includes('healthy')).length;
    const avgConf = total > 0 ? (history.reduce((s, h) => s + (h.confidence || 0), 0) / total * 100).toFixed(1) : 0;

    return (
        <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="space-y-8 max-w-5xl mx-auto"
        >
            {/* Header */}
            <motion.div variants={itemVariants} className="border-b border-agri-border pb-6 relative">
                <div className="absolute top-0 right-0 w-32 h-32 bg-agri-green/10 blur-[80px] rounded-full pointer-events-none" />
                <p className="label-console mb-2 text-agri-green font-bold">Secure Connection Established</p>
                <h1 className="h1-console flex items-center gap-3">
                    {user?.fullName || 'Operative'}
                    <span className="w-2 h-2 rounded-full bg-agri-green animate-pulse" />
                </h1>
                <p className="text-sm text-agri-text/50 font-sans mt-2">Crop disease detection & agricultural intelligence platform.</p>
            </motion.div>

            {/* KPI Grid */}
            <motion.div variants={containerVariants} className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                    { label: 'Total Scans', value: total, icon: Activity, color: 'text-white' },
                    { label: 'Severe Cases', value: severe, icon: AlertTriangle, color: 'text-agri-red' },
                    { label: 'Healthy Scans', value: healthy, icon: CheckCircle2, color: 'text-agri-green' },
                    { label: 'Avg. Confidence', value: `${avgConf}%`, icon: TrendingUp, color: 'text-agri-amber' },
                ].map(({ label, value, icon: Icon, color }, i) => (
                    <motion.div key={label} variants={itemVariants} className="console-card-dark relative overflow-hidden group">
                        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-agri-border to-transparent opacity-50 group-hover:via-agri-green/50 transition-colors" />
                        <div className="flex items-center gap-2 mb-3">
                            <Icon size={14} className={`${color} opacity-70`} />
                            <span className="label-console">{label}</span>
                        </div>
                        <p className={`text-3xl font-sans font-bold ${color}`}>{loading ? '—' : value}</p>
                    </motion.div>
                ))}
            </motion.div>

            {/* Quick Actions */}
            <motion.div variants={containerVariants} className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <motion.div variants={itemVariants} className="h-full">
                    <Link to="/scan" className="h-full console-card border-agri-green/30 hover:border-agri-green hover:shadow-[0_0_15px_rgba(47,143,91,0.15)] transition-all group flex items-start sm:items-center gap-4 bg-gradient-to-b from-agri-surface to-agri-dark">
                        <div className="w-10 h-10 bg-agri-green/10 border border-agri-green/30 rounded-sm flex items-center justify-center text-agri-green shrink-0 group-hover:scale-110 transition-transform">
                            <ScanLine size={18} />
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-semibold text-white group-hover:text-agri-green transition-colors">Run Diagnostic</p>
                            <p className="text-xs text-agri-text/50 font-sans mt-0.5">Upload image for CNN analysis</p>
                        </div>
                        <ChevronRight size={16} className="text-agri-text/30 group-hover:text-agri-green transition-colors shrink-0 mt-2 sm:mt-0" />
                    </Link>
                </motion.div>
                <motion.div variants={itemVariants} className="h-full">
                    <Link to="/weather" className="h-full console-card hover:border-agri-amber/40 hover:shadow-[0_0_15px_rgba(228,179,99,0.1)] transition-all group flex items-start sm:items-center gap-4 bg-gradient-to-b from-agri-surface to-agri-dark">
                        <div className="w-10 h-10 bg-agri-amber/10 border border-agri-amber/20 rounded-sm flex items-center justify-center text-agri-amber shrink-0 group-hover:scale-110 transition-transform">
                            <CloudLightning size={18} />
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-semibold text-white group-hover:text-agri-amber transition-colors">Weather Risk</p>
                            <p className="text-xs text-agri-text/50 font-sans mt-0.5">Check environmental risk</p>
                        </div>
                        <ChevronRight size={16} className="text-agri-text/30 group-hover:text-agri-amber transition-colors shrink-0 mt-2 sm:mt-0" />
                    </Link>
                </motion.div>
                <motion.div variants={itemVariants} className="h-full">
                    <Link to="/encyclopedia" className="h-full console-card hover:border-agri-text/40 hover:shadow-[0_0_15px_rgba(234,239,234,0.05)] transition-all group flex items-start sm:items-center gap-4 bg-gradient-to-b from-agri-surface to-agri-dark">
                        <div className="w-10 h-10 bg-agri-text/5 border border-agri-border rounded-sm flex items-center justify-center text-agri-text/60 shrink-0 group-hover:scale-110 transition-transform">
                            <Leaf size={18} />
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-semibold text-white transition-colors">Encyclopedia</p>
                            <p className="text-xs text-agri-text/50 font-sans mt-0.5">Browse knowledge base</p>
                        </div>
                        <ChevronRight size={16} className="text-agri-text/30 group-hover:text-white transition-colors shrink-0 mt-2 sm:mt-0" />
                    </Link>
                </motion.div>
            </motion.div>

            {/* Recent History */}
            <motion.div variants={itemVariants} className="console-card relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-agri-green/5 blur-[100px] rounded-full pointer-events-none" />
                <div className="flex items-center justify-between mb-5 relative z-10">
                    <h2 className="h2-console text-xl">Recent Scans</h2>
                    <Link to="/history" className="text-xs font-mono uppercase tracking-widest text-agri-green hover:underline">View All</Link>
                </div>
                {loading ? (
                    <div className="flex justify-center py-12 relative z-10"><div className="spinner" /></div>
                ) : history.length === 0 ? (
                    <div className="text-center py-12 relative z-10">
                        <ScanLine size={36} className="text-agri-text/20 mx-auto mb-3" />
                        <p className="text-sm text-agri-text/50 font-sans">No scans yet. Upload a crop image to get started.</p>
                        <Link to="/scan" className="btn-primary mt-4 inline-flex">Run First Diagnostic</Link>
                    </div>
                ) : (
                    <div className="space-y-2 relative z-10">
                        {history.slice(0, 5).map((h) => (
                            <div key={h.id} className="flex items-center gap-4 p-3 bg-agri-dark border border-agri-border/50 rounded-sm hover:border-agri-border hover:bg-agri-surface/50 transition-colors group">
                                <div className="w-8 h-8 bg-agri-green/10 border border-agri-green/20 rounded-sm flex items-center justify-center text-agri-green shrink-0 text-xs font-mono group-hover:bg-agri-green/20 transition-colors">
                                    {h.cropType?.[0] || 'C'}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-semibold text-white truncate group-hover:text-agri-green transition-colors">{h.diseaseName}</p>
                                    <p className="text-[10px] font-mono text-agri-text/40 uppercase tracking-widest mt-0.5">
                                        {h.cropType} • {new Date(h.createdAt).toLocaleDateString()}
                                    </p>
                                </div>
                                <div className="flex items-center gap-3 shrink-0">
                                    <span className="text-[10px] font-mono text-agri-text/50">{(h.confidence * 100).toFixed(1)}%</span>
                                    <span className={`badge ${SEVERITY_COLOR[h.severity] || 'badge-grey'}`}>{h.severity}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </motion.div>
        </motion.div>
    );
}
