'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FiMail, FiLock, FiEye, FiEyeOff, FiArrowLeft, FiCheck } from 'react-icons/fi';
import { FcGoogle } from 'react-icons/fc';
import { signIn } from 'next-auth/react';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);
    const [errors, setErrors] = useState<{ email?: string; password?: string; form?: string }>({});
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const validateForm = () => {
        const newErrors: { email?: string; password?: string } = {};

        if (!email) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            newErrors.email = 'Email is invalid';
        }

        if (!password) {
            newErrors.password = 'Password is required';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validateForm()) return;

        setIsLoading(true);
        setErrors({});

        try {
            const result = await signIn('credentials', {
                redirect: false,
                email,
                password,
            });

            if (result?.error) {
                setErrors({ form: 'Invalid email or password' });
            } else {
                router.push('/');
                router.refresh();
            }
        } catch (error) {
            setErrors({ form: 'An unexpected error occurred' });
        } finally {
            setIsLoading(false);
        }
    };

    const handleGoogleLogin = () => {
        setIsLoading(true);
        signIn('google', { callbackUrl: '/' });
    };

    return (
        <div className="min-h-screen bg-black flex flex-col items-center justify-center p-4 relative overflow-hidden">
            {/* Cinematic Background Elements */}
            <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-indigo-500/5 rounded-full blur-[100px] pointer-events-none" />

            <div className="max-w-md w-full relative z-10 animate-slideUp">
                {/* Back to Home */}
                <div className="mb-12">
                    <Link
                        href="/"
                        className="group inline-flex items-center text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500 hover:text-white transition-all"
                    >
                        <FiArrowLeft className="mr-3 group-hover:-translate-x-1 transition-transform" />
                        Escape to Home
                    </Link>
                </div>

                {/* Header */}
                <div className="text-center mb-12">
                    <div className="relative w-16 h-16 bg-white text-black rounded-full flex items-center justify-center mx-auto mb-8 shadow-[0_0_40px_rgba(255,255,255,0.1)] group">
                        <span className="text-lg font-black tracking-tight">TC</span>
                        <div className="absolute inset-0 rounded-full border border-white/20 animate-ping opacity-20" />
                    </div>
                    <h1 className="text-4xl font-black text-white mb-2 tracking-tighter uppercase">
                        RE-AUTHENTICATE.
                    </h1>
                    <p className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.4em]">
                        Access the Timray Hub
                    </p>
                </div>

                {/* Form Container */}
                <div className="bg-zinc-900/40 backdrop-blur-3xl border border-white/5 rounded-[2.5rem] p-10 shadow-2xl relative overflow-hidden group">
                    {/* Decorative glow in card */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 blur-3xl -mr-16 -mt-16 group-hover:bg-indigo-500/20 transition-all duration-700" />

                    {/* Google Button */}
                    <button
                        onClick={handleGoogleLogin}
                        disabled={isLoading}
                        className="w-full flex items-center justify-center px-6 py-4 bg-white text-black rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-indigo-500 hover:text-white transition-all shadow-xl shadow-white/5 disabled:opacity-50 mb-8"
                    >
                        <FcGoogle className="w-5 h-5 mr-4" />
                        <span>Continue with Google</span>
                    </button>

                    {/* Divider */}
                    <div className="relative mb-8">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-white/5"></div>
                        </div>
                        <div className="relative flex justify-center text-[10px] font-black">
                            <span className="px-6 bg-transparent text-zinc-600 uppercase tracking-widest">Or Secret Access</span>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {errors.form && (
                            <div className="bg-red-500/10 border border-red-500/20 text-red-500 px-6 py-4 rounded-xl text-[10px] font-black uppercase tracking-widest animate-fadeIn flex items-center">
                                <svg className="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                {errors.form}
                            </div>
                        )}

                        {/* Email */}
                        <div>
                            <label className="block text-[10px] font-black text-zinc-500 uppercase tracking-widest mb-3 ml-2">
                                Identity Mail
                            </label>
                            <div className="relative group/input">
                                <FiMail className="absolute left-6 top-1/2 -translate-y-1/2 text-zinc-600 group-focus-within/input:text-indigo-400 transition-colors" size={18} />
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className={`w-full pl-14 pr-6 py-4 bg-white/5 border ${errors.email ? 'border-red-500/50' : 'border-white/5'} rounded-2xl focus:border-indigo-500/50 focus:bg-white/10 outline-none transition-all text-white font-bold placeholder:text-zinc-700`}
                                    placeholder="Enter encrypted email"
                                    disabled={isLoading}
                                />
                            </div>
                            {errors.email && (
                                <p className="mt-2 ml-2 text-[10px] font-black text-red-500 uppercase tracking-widest">{errors.email}</p>
                            )}
                        </div>

                        {/* Password */}
                        <div>
                            <label className="block text-[10px] font-black text-zinc-500 uppercase tracking-widest mb-3 ml-2">
                                Security Portal
                            </label>
                            <div className="relative group/input">
                                <FiLock className="absolute left-6 top-1/2 -translate-y-1/2 text-zinc-600 group-focus-within/input:text-indigo-400 transition-colors" size={18} />
                                <input
                                    type={showPassword ? "text" : "password"}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className={`w-full pl-14 pr-16 py-4 bg-white/5 border ${errors.password ? 'border-red-500/50' : 'border-white/5'} rounded-2xl focus:border-indigo-500/50 focus:bg-white/10 outline-none transition-all text-white font-bold placeholder:text-zinc-700`}
                                    placeholder="Enter master key"
                                    disabled={isLoading}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute inset-y-0 right-0 pr-6 flex items-center text-zinc-600 hover:text-white transition-colors"
                                >
                                    {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                                </button>
                            </div>
                            {errors.password && (
                                <p className="mt-2 ml-2 text-[10px] font-black text-red-500 uppercase tracking-widest">{errors.password}</p>
                            )}
                        </div>

                        {/* Remember Me & Forgot Password */}
                        <div className="flex items-center justify-between px-2">
                            <button
                                type="button"
                                onClick={() => setRememberMe(!rememberMe)}
                                className="group flex items-center cursor-pointer"
                            >
                                <div className={`w-5 h-5 border-2 ${rememberMe ? 'bg-indigo-500 border-indigo-500 shadow-lg shadow-indigo-500/20' : 'border-zinc-800 bg-zinc-900'} rounded-lg flex items-center justify-center mr-3 transition-all duration-300`}>
                                    {rememberMe && <FiCheck className="text-white" size={12} strokeWidth={4} />}
                                </div>
                                <span className={`text-[10px] font-black uppercase tracking-widest transition-colors ${rememberMe ? 'text-white' : 'text-zinc-500 group-hover:text-zinc-300'}`}>Persist Session</span>
                            </button>
                            <Link
                                href="/forgot-password"
                                className="text-[10px] font-black uppercase tracking-widest text-zinc-600 hover:text-white transition-colors"
                            >
                                Key Lost?
                            </Link>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full py-5 bg-white text-black font-black uppercase tracking-[0.2em] text-xs rounded-2xl hover:bg-indigo-500 hover:text-white transition-all shadow-xl shadow-white/5 active:scale-[0.98] disabled:opacity-50 group/btn overflow-hidden relative"
                        >
                            <span className="relative z-10">
                                {isLoading ? 'Decrypting Access...' : 'Initiate Session'}
                            </span>
                            <div className="absolute inset-0 bg-indigo-600 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-500" />
                        </button>
                    </form>

                    {/* Sign Up Link */}
                    <div className="mt-10 pt-6 border-t border-white/5 text-center">
                        <p className="text-[10px] font-black text-zinc-600 uppercase tracking-widest">
                            New to the Hub?{' '}
                            <Link
                                href="/signup"
                                className="text-white hover:text-indigo-400 transition-colors ml-2"
                            >
                                Forge Identity
                            </Link>
                        </p>
                    </div>
                </div>

                {/* Additional Info */}
                <div className="mt-12 text-center">
                    <p className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest">
                        By entering, you accept our{' '}
                        <Link href="/terms" className="text-zinc-400 hover:text-white underline-offset-4 hover:underline transition-colors">Protocols</Link>{' '}
                        &{' '}
                        <Link href="/privacy" className="text-zinc-400 hover:text-white underline-offset-4 hover:underline transition-colors">Manifesto</Link>
                    </p>
                </div>
            </div>


        </div>
    );
}