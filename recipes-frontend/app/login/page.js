"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { login, saveAuth } from "@/lib/api";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";

export default function LoginPage() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError]       = useState("");
    const router = useRouter();

    async function handleSubmit(e) {
        e.preventDefault();
        setError("");
        try {
            await login(username, password);
            saveAuth(username, password);
            window.location.href = "/";   // ← full reload so NavBar re-reads localStorage
        } catch (err) {
            setError(err.message);
        }
    }

    return (
        <main>
            <Box sx={{ maxWidth: 400, mx: "auto", mt: 10, px: 3, py: 4,
                borderRadius: 3, boxShadow: 3, backgroundColor: "white" }}>

                <Typography variant="h5" fontWeight="bold" mb={2}>
                    Login
                </Typography>

                {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

                <Box component="form" onSubmit={handleSubmit}
                     sx={{ display: "flex", flexDirection: "column", gap: 2 }}>

                    <TextField label="Username" value={username} required fullWidth
                               onChange={(e) => setUsername(e.target.value)} />

                    <TextField label="Password" type="password" value={password} required fullWidth
                               onChange={(e) => setPassword(e.target.value)} />

                    <Button type="submit" variant="contained" size="large" fullWidth>
                        Login
                    </Button>

                    <Typography variant="body2" sx={{ textAlign: "center" }}>
                        No account?{" "}
                        <Link href="/register" underline="hover">Register</Link>
                    </Typography>

                </Box>
            </Box>
        </main>
    );
}