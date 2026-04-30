"use client";

import { use, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getAuth, fetchRecipes, updateRecipe } from "@/lib/api";
import RecipeForm from "@/components/RecipeForm";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

export default function EditRecipePage({ params }) {
    const { id } = use(params);   // ← unwrap Promise (Next.js 15)
    const [recipe, setRecipe] = useState(null);
    const [error, setError] = useState("");
    const router = useRouter();

    useEffect(() => {
        if (!getAuth()) { router.push("/login"); return; }
        fetchRecipes()
            .then((list) => {
                const found = list.find((r) => String(r.id) === String(id));
                if (found) {
                    setRecipe(found);
                } else {
                    setError("Recipe not found.");
                }
            })
            .catch((err) => setError(err.message));
    }, [id, router]);

    async function handleSave(formData) {
        setError("");
        try {
            await updateRecipe(id, formData);
            router.push("/");
        } catch (err) {
            setError(err.message);
        }
    }

    if (!recipe && !error) return <Typography sx={{ m: 4 }}>Loading...</Typography>;

    return (
        <main>
            <Box sx={{ mt: 5, px: { xs: 2, sm: 4 } }}>
                {error && (
                    <Alert severity="error" sx={{ mb: 2, maxWidth: 780, mx: "auto" }}>{error}</Alert>
                )}
                {recipe && <RecipeForm initialData={recipe} onSave={handleSave} onCancel={() => router.push("/")} />}
            </Box>
        </main>
    );
}