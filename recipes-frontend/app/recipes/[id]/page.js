"use client";

import { use, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getAuth, fetchRecipes, deleteRecipe } from "@/lib/api";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import Divider from "@mui/material/Divider";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

export default function RecipeDetailPage({ params }) {
    const { id } = use(params);
    const [recipe, setRecipe] = useState(null);
    const [error, setError] = useState("");
    const router = useRouter();
    const auth = getAuth();

    useEffect(() => {
        fetchRecipes()
            .then((list) => {
                const found = list.find((r) => String(r.id) === String(id));
                if (found) setRecipe(found); else setError("Recipe not found.");
            })
            .catch((err) => setError(err.message));
    }, [id]);

    if (error) return <Alert severity="error" sx={{ m: 4 }}>{error}</Alert>;
    if (!recipe) return <Typography sx={{ m: 4 }}>Loading...</Typography>;

    const isOwner = auth && Number(auth.userId) === Number(recipe.user_id);

    async function handleDelete() {
        try {
            await deleteRecipe(recipe.id);
            router.push("/");
        } catch (err) {
            setError(err.message);
        }
    }

    return (
        <main>
            <Box sx={{ maxWidth: 860, mx: "auto", mt: 5, px: { xs: 2, sm: 4 } }}>
                <Button variant="text" onClick={() => router.push("/")} sx={{ mb: 2 }}>Back</Button>

                <Paper elevation={3} sx={{ borderRadius: 3, overflow: "hidden" }}>
                    <Box sx={{ px: 4, py: 3, background: "linear-gradient(135deg, #1e3a5f 0%, #2563eb 100%)" }}>
                        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                            <Typography variant="h4" fontWeight={700} color="white">{recipe.title}</Typography>
                            {isOwner && <Chip label="Your Recipe" size="small"
                                              sx={{ bgcolor: "rgba(255,255,255,0.2)", color: "white" }} />}
                        </Box>
                        {recipe.prep_time && (
                            <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.8)", mt: 1 }}>
                                {recipe.prep_time} min prep
                            </Typography>
                        )}
                    </Box>

                    <Box sx={{ px: 4, py: 4, display: "flex", flexDirection: "column", gap: 3 }}>
                        <Box>
                            <Typography variant="overline" color="text.secondary">Description</Typography>
                            <Typography variant="body1">{recipe.description}</Typography>
                        </Box>
                        <Divider />
                        <Box>
                            <Typography variant="overline" color="text.secondary">Instructions</Typography>
                            <Typography variant="body1" sx={{ whiteSpace: "pre-wrap" }}>{recipe.instructions}</Typography>
                        </Box>
                        {isOwner && (
                            <>
                                <Divider />
                                <Box sx={{ display: "flex", gap: 2, justifyContent: "flex-end", flexWrap: "nowrap" }}>
                                    <Button variant="outlined" color="error" onClick={handleDelete} sx={{ minWidth: 140 }}>
                                        Delete Recipe
                                    </Button>
                                    <Button variant="contained" disableElevation
                                            onClick={() => router.push(`/recipes/${recipe.id}/edit`)} sx={{ minWidth: 140 }}>
                                        Edit Recipe
                                    </Button>
                                </Box>
                            </>
                        )}
                    </Box>
                </Paper>
            </Box>
        </main>
    );
}