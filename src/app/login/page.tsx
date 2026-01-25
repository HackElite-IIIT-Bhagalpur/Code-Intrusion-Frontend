"use client";

import { useForm } from "react-hook-form";
import api from "@/lib/api";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/useAuthStore";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import Card, { CardBody, CardHeader } from "@/components/ui/Card";
import Link from "next/link";
import { useState } from "react";

type LoginForm = {
  email: string;
  password: string;
};

export default function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>();
  const router = useRouter();
  const { setUser, setToken } = useAuthStore();
  const [errorMessage, setErrorMessage] = useState("");

  const mutation = useMutation({
    mutationFn: async (data: LoginForm) => {
      const res = await api.post("/auth/login", data);
      return res.data;
    },
    onSuccess: (response) => {
      if (response.success && response.data?.token) {
        setToken(response.data.token);
        router.push("/profile");
      } else {
        setErrorMessage("Invalid response from server");
      }
    },
    onError: (error: any) => {
      setErrorMessage(
        error.response?.data?.message || "Login failed. Please try again."
      );
    },
  });

  const onSubmit = (vals: LoginForm) => {
    setErrorMessage("");
    mutation.mutate(vals);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-[color:var(--bg)] relative overflow-hidden">
      <div className="absolute inset-0 opacity-60" aria-hidden>
        <div className="h-full w-full" style={{ backgroundImage: "linear-gradient(to right, rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.03) 1px, transparent 1px)", backgroundSize: "48px 48px" }} />
      </div>
      <div className="relative w-full max-w-md">
        <Card variant="elevated" className="glass-surface">
          <CardHeader className="border-b border-[color:var(--border)]/80">
            <div className="text-center space-y-2">
              <h1 className="text-3xl font-bold text-[color:var(--text)]">Welcome Back</h1>
              <p className="text-[color:var(--muted)]">Log in to continue your CTF run</p>
            </div>
          </CardHeader>
          <CardBody>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              {errorMessage && (
                <div className="bg-[color:var(--error)]/10 border border-[color:var(--error)]/40 text-[color:var(--error)] px-4 py-3 rounded-lg text-sm">
                  {errorMessage}
                </div>
              )}

              <Input
                label="Email or Username"
                type="text"
                placeholder="ghost@ctf.io"
                error={errors.email?.message}
                {...register("email", {
                  required: "Email or username is required",
                })}
              />

              <Input
                label="Password"
                type="password"
                placeholder="••••••••"
                error={errors.password?.message}
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                })}
              />

              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2 text-[color:var(--muted)]">
                  <input
                    type="checkbox"
                    className="w-4 h-4 text-[color:var(--primary)] border-[color:var(--border)] rounded focus:ring-[color:var(--primary)]"
                  />
                  <span>Remember me</span>
                </label>
                <Link
                  href="/forgot-password"
                  className="text-[color:var(--primary)] hover:text-white font-medium"
                >
                  Forgot password?
                </Link>
              </div>

              <Button
                type="submit"
                className="w-full"
                size="lg"
                isLoading={mutation.isPending}
                disabled={mutation.isPending}
              >
                {mutation.isPending ? "Logging in..." : "Login"}
              </Button>
            </form>

            <div className="mt-6 text-center text-sm text-[color:var(--muted)]">
              Don't have an account?{" "}
              <Link
                href="/"
                className="text-[color:var(--primary)] hover:text-white font-medium"
              >
                Contact Admin
              </Link>
            </div>

            {/* Demo Credentials Helper */}
            <div className="mt-4 p-4 border border-[color:var(--border)] rounded-lg bg-[color:var(--surface)]/70">
              <p className="text-sm font-semibold text-[color:var(--primary)] mb-2">
                🔑 Demo Credentials (testing)
              </p>
              <div className="text-xs text-[color:var(--muted)] space-y-1">
                <p>
                  Email: <code className="bg-[color:var(--bg)] px-2 py-0.5 rounded text-[color:var(--text)] mono">admin@ctf.com</code>
                </p>
                <p>
                  Password: <code className="bg-[color:var(--bg)] px-2 py-0.5 rounded text-[color:var(--text)] mono">password123</code>
                </p>
              </div>
            </div>
          </CardBody>
        </Card>

        <div className="mt-6 text-center text-sm text-[color:var(--muted)]">
          <Link href="/" className="hover:text-[color:var(--primary)]">
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
