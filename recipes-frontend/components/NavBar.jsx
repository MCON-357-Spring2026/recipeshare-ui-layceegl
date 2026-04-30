"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getAuth, clearAuth, logout } from "@/lib/api";
import Link from "next/link";

export default function NavBar() {
    const [auth, setAuth] = useState(null);
    const router = useRouter();

    useEffect(() => {
        setAuth(getAuth());
    }, []);

    async function handleLogout() {
        if (auth) {
            await logout(auth.username, auth.password).catch(() => {});
            clearAuth();
            setAuth(null);
            router.push("/");
        }
    }

    return (
        <nav style={{ padding: "12px 24px", background: "#0f172a", color: "white",
            display: "flex", gap: "16px", alignItems: "center" }}>
            <Link href="/" style={{ color: "white", fontWeight: "bold" }}>RecipeShare</Link>

            {auth ? (
                <>
                    <span>Hello, {auth.username}</span>
                    <Link href="/recipes/create" style={{ color: "#93c5fd" }}>New Recipe</Link>
                    <button onClick={handleLogout} style={{ color: "white", background: "transparent",
                        border: "1px solid white", borderRadius: "6px", padding: "4px 12px",
                        cursor: "pointer" }}>Logout</button>
                </>
            ) : (
                <>
                    <Link href="/login"    style={{ color: "#93c5fd" }}>Login</Link>
                    <Link href="/register" style={{ color: "#93c5fd" }}>Register</Link>
                </>
            )}
        </nav>
    );
}