"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getAuth, createRecipe } from "@/lib/api";
import RecipeForm from "@/components/RecipeForm";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";

export default function CreateRecipePage() {
    const router = useRouter();
    const [error, setError] = useState("");

    useEffect(() => {
        if (!getAuth()) router.push("/login");
    }, [router]);

    async function handleSave(formData) {
        setError("");
        try {
            await createRecipe(formData);
            router.push("/");
        } catch (err) {
            setError(err.message);
        }
    }

    return (
        <main>
            <Box sx={{ mt: 5, px: { xs: 2, sm: 4 } }}>
                {error && <Alert severity="error" sx={{ mb: 2, maxWidth: 780, mx: "auto" }}>{error}</Alert>}
                <RecipeForm onSave={handleSave} onCancel={() => router.push("/")} />
            </Box>
        </main>
    );
}