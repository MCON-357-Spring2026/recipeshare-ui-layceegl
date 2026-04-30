"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { register } from "@/lib/api";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";

export default function RegisterPage() {
    const [username, setUsername] = useState("");
    const [email, setEmail]       = useState("");
    const [password, setPassword] = useState("");
    const [error, setError]       = useState("");
    const router = useRouter();

    async function handleSubmit(e) {
        e.preventDefault();
        setError("");
        try {
            await register(username, email, password);
            router.push("/login");          // ← navigate to login after success
        } catch (err) {
            setError(err.message);
        }
    }

    return (
        <main>
            <Box sx={{ maxWidth: 400, mx: "auto", mt: 10, px: 3, py: 4,
                borderRadius: 3, boxShadow: 3, backgroundColor: "white" }}>

                <Typography variant="h5" fontWeight="bold" mb={2}>
                    Create account
                </Typography>

                {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

                <Box component="form" onSubmit={handleSubmit}
                     sx={{ display: "flex", flexDirection: "column", mt:2,  gap: 2 }}>

                    <TextField label="Username" value={username} required fullWidth
                               onChange={(e) => setUsername(e.target.value)} />

                    <TextField label="Email" type="email" value={email} required fullWidth
                               onChange={(e) => setEmail(e.target.value)} />

                    <TextField label="Password" type="password" value={password} required fullWidth
                               onChange={(e) => setPassword(e.target.value)} />

                    <Button type="submit" variant="contained" size="large" fullWidth>
                        Register
                    </Button>

                    <Typography variant="body2" sx={{ textAlign: "center" }}>
                        Already have an account?{" "}
                        <Link href="/login" underline="hover">Login</Link>
                    </Typography>

                </Box>
            </Box>
        </main>
    );
}