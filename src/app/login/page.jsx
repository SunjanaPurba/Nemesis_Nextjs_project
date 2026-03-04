"use client";

import { useState, Suspense } from "react";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

const inputClass = "mt-1 block w-full rounded-xl border border-[var(--border)] bg-white/5 px-3 py-2.5 text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:border-[var(--accent-start)] focus:outline-none focus:ring-1 focus:ring-[var(--accent-start)]";
const labelClass = "block text-sm font-medium text-[var(--text-muted)]";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const isRegister = searchParams.get("register") === "true";

  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleCredentials = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      if (isRegister) {
        const res = await fetch("/api/auth/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name: form.name || undefined, email: form.email, password: form.password }),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Registration failed");
      }

      const result = await signIn("credentials", { email: form.email, password: form.password, redirect: false });

      if (result?.error) {
        setError(result.error);
        setLoading(false);
        return;
      }

      router.push("/");
      router.refresh();
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogle = () => signIn("google", { callbackUrl: "/" });

  return (
    <main className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="rounded-2xl glass-card p-8">
          <h1 className="text-2xl font-bold">{isRegister ? "Create an account" : "Sign in"}</h1>
          <p className="mt-2 text-sm text-[var(--text-muted)]">
            {isRegister ? "Register with your email or use Google." : "Sign in with your credentials or Google."}
          </p>

          <button
            type="button"
            onClick={handleGoogle}
            className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl border border-[var(--border)] bg-white/5 px-4 py-3 text-sm font-medium text-[var(--text-primary)] transition hover:bg-white/10"
          >
            <svg className="h-5 w-5" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
            </svg>
            Continue with Google
          </button>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-[var(--border)]" /></div>
            <div className="relative flex justify-center text-sm"><span className="bg-[var(--bg-card)] px-2 text-[var(--text-muted)]">Or continue with email</span></div>
          </div>

          <form onSubmit={handleCredentials} className="space-y-4">
            {isRegister && (
              <div>
                <label htmlFor="name" className={labelClass}>Name (optional)</label>
                <input id="name" type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className={inputClass} placeholder="Your name" />
              </div>
            )}
            <div>
              <label htmlFor="email" className={labelClass}>Email</label>
              <input id="email" type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className={inputClass} placeholder="you@example.com" />
            </div>
            <div>
              <label htmlFor="password" className={labelClass}>Password</label>
              <input id="password" type="password" required value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} className={inputClass} placeholder="••••••••" />
            </div>
            {error && <p className="text-sm text-[var(--danger)]">{error}</p>}
            <button type="submit" disabled={loading} className="btn-accent w-full rounded-xl px-4 py-3 font-semibold text-white disabled:opacity-70">
              {loading ? "Please wait..." : isRegister ? "Register" : "Sign in"}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-[var(--text-muted)]">
            {isRegister ? <>Already have an account? <Link href="/login" className="font-medium text-[var(--accent-start)] hover:underline">Sign in</Link></> : <>Don&apos;t have an account? <Link href="/login?register=true" className="font-medium text-[var(--accent-start)] hover:underline">Register</Link></>}
          </p>
        </div>
      </div>
    </main>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={
      <main className="min-h-[80vh] flex items-center justify-center">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-[var(--accent-start)] border-t-transparent" />
      </main>
    }>
      <LoginForm />
    </Suspense>
  );
}
