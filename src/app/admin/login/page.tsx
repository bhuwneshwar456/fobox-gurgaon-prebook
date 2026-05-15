"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });
    if (res.ok) {
      router.push("/admin");
    } else {
      setError("Invalid password");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-paper">
      <div className="bg-canvas border border-border rounded-[12px] p-10 w-full max-w-sm">
        <h1 className="text-ink text-2xl font-semibold mb-1" style={{ fontFamily: "var(--font-fraunces), Georgia, serif" }}>
          fobox admin
        </h1>
        <p className="text-ink-3 text-sm mb-8">Enter your admin password to continue.</p>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            autoFocus
            className="w-full bg-paper border border-border rounded-[6px] px-4 text-ink placeholder:text-ink-3 focus:outline-none focus:border-border-strong transition-colors"
            style={{ height: "48px", fontSize: "16px" }}
          />
          {error && <p className="text-error text-sm">{error}</p>}
          <button
            type="submit"
            disabled={loading || !password}
            className="w-full rounded-[6px] px-4 font-medium text-paper transition-opacity disabled:opacity-50"
            style={{ height: "48px", backgroundColor: "var(--ink)", fontSize: "16px" }}
          >
            {loading ? "Signing in..." : "Sign in"}
          </button>
        </form>
      </div>
    </div>
  );
}
