import React, { useEffect, useState } from 'react';
import api from '../services/api.js';
import { Users, Activity, AlertTriangle, TrendingUp, BarChart3 } from 'lucide-react';
import { motion } from 'framer-motion';

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

export default function AdminDashboard() {
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        api.get('/admin/stats').then(r => setStats(r.data)).catch(() => {
            // Mock data if endpoint unavailable
            setStats({ totalUsers: 0, totalPredictions: 0, severeCount: 0, mostFrequentDisease: 'No data yet' });
        }).finally(() => setLoading(false));
    }, []);

    return (
        <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="space-y-8 max-w-5xl mx-auto"
        >
            <motion.div variants={itemVariants} className="border-b border-agri-border pb-6 relative">
                <div className="absolute top-0 right-0 w-32 h-32 bg-agri-amber/10 blur-[80px] rounded-full pointer-events-none" />
                <p className="label-console mb-2 text-agri-amber font-bold">Admin · System Overview</p>
                <h1 className="h1-console flex items-center gap-3">
                    Command Center
                    <span className="w-2 h-2 rounded-full bg-agri-amber animate-pulse" />
                </h1>
                <p className="text-sm text-agri-text/50 font-sans mt-2">Global platform health, user activity, and diagnostic metrics.</p>
            </motion.div>

            {loading ? (
                <div className="py-20 flex justify-center"><div className="spinner" /></div>
            ) : (
                <>
                    <motion.div variants={containerVariants} className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                        {[
                            { label: 'Total Users', value: stats?.totalUsers ?? '—', icon: Users, color: 'text-agri-green' },
                            { label: 'Total Scans', value: stats?.totalPredictions ?? '—', icon: Activity, color: 'text-white' },
                            { label: 'Severe Cases', value: stats?.severeCount ?? '—', icon: AlertTriangle, color: 'text-agri-red' },
                            { label: 'Top Disease', value: stats?.mostFrequentDisease?.split(' ').slice(0, 2).join(' ') ?? '—', icon: TrendingUp, color: 'text-agri-amber' },
                        ].map(({ label, value, icon: Icon, color }) => (
                            <motion.div key={label} variants={itemVariants} className="console-card-dark relative overflow-hidden group">
                                <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-agri-border to-transparent opacity-50 group-hover:via-agri-amber/50 transition-colors" />
                                <div className="flex items-center gap-2 mb-3"><Icon size={14} className={color} /><span className="label-console">{label}</span></div>
                                <p className={`text-3xl font-bold font-sans ${color}`}>{value}</p>
                            </motion.div>
                        ))}
                    </motion.div>

                    <motion.div variants={itemVariants} className="console-card relative overflow-hidden">
                        <div className="absolute bottom-0 right-0 w-48 h-48 bg-agri-text/5 blur-[80px] rounded-full pointer-events-none" />
                        <div className="flex items-center gap-2 mb-5 relative z-10">
                            <BarChart3 size={18} className="text-agri-text/50" />
                            <h2 className="h2-console text-xl">Most Detected Disease</h2>
                        </div>
                        {stats?.mostFrequentDisease ? (
                            <div className="p-4 bg-agri-dark border border-agri-border rounded-sm relative z-10 hover:border-agri-text/30 transition-colors">
                                <p className="text-lg font-display font-semibold text-white">{stats.mostFrequentDisease}</p>
                                <p className="text-xs text-agri-text/50 font-sans mt-1">Most frequently detected across all user scans.</p>
                            </div>
                        ) : (
                            <p className="text-sm text-agri-text/50 font-sans relative z-10">Insufficient scan data to determine top disease.</p>
                        )}
                    </motion.div>

                    <motion.div variants={containerVariants} className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {['Manage Knowledge Base', 'Manage Users', 'View All Scans'].map((action, i) => (
                            <motion.a href={['/admin/knowledge', '/admin/users', '/history'][i]} key={i} variants={itemVariants} className="console-card hover:border-agri-amber/40 hover:shadow-[0_0_15px_rgba(228,179,99,0.1)] transition-all group bg-gradient-to-b from-agri-surface to-agri-dark">
                                <p className="text-sm font-semibold text-white mb-1 group-hover:text-agri-amber transition-colors">{action}</p>
                                <p className="text-xs text-agri-text/50 font-sans">{['Add and edit disease treatments', 'Manage user roles and access', 'Review all system predictions'][i]}</p>
                            </motion.a>
                        ))}
                    </motion.div>
                </>
            )}
        </motion.div>
    );
}
