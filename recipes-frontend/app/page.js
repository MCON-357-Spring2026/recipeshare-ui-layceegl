"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import RecipeCardList from "@/components/RecipeCardList";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { fetchRecipes, getAuth } from "@/lib/api";

export default function HomePage() {
    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const router = useRouter();
    const auth = getAuth();

    useEffect(() => {
        fetchRecipes()
            .then(setRecipes)
            .catch((err) => setError(err.message))
            .finally(() => setLoading(false));
    }, []);

    function handleDeleted(id) {
        setRecipes((prev) => prev.filter((r) => r.id !== id));
    }

    return (
        <main style={{ width: "100%" }}>
            <Box sx={{ maxWidth: 1200, mx: "auto", px: { xs: 2, sm: 4 }, py: 4, width: "100%" }}>
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 4 }}>
                    <Box>
                        <Typography variant="h4" fontWeight={700}>Recipes</Typography>
                        <Typography variant="body2" color="text.secondary">
                            {recipes.length > 0 ? `${recipes.length} recipe${recipes.length !== 1 ? "s" : ""} shared` : ""}
                        </Typography>
                    </Box>
                    {auth && (
                        <Button variant="contained" disableElevation
                                onClick={() => router.push("/recipes/create")} sx={{ borderRadius: 2 }}>
                            + New Recipe
                        </Button>
                    )}
                </Box>

                {loading ? (
                    <Typography color="text.secondary">Loading recipes...</Typography>
                ) : error ? (
                    <Alert severity="error">{error}</Alert>
                ) : recipes.length === 0 ? (
                    <Typography color="text.secondary">No recipes yet. Be the first to share one!</Typography>
                ) : (
                    <RecipeCardList recipes={recipes} onDeleted={handleDeleted} />
                )}
            </Box>
        </main>
    );
}