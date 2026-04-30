"use client";

import { useRouter } from "next/navigation";
import { getAuth, deleteRecipe } from "@/lib/api";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Chip from "@mui/material/Chip";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

export default function RecipeCard({ recipe, onDeleted }) {
    const router = useRouter();
    const auth = getAuth();
    const isOwner = auth && Number(auth.userId) === Number(recipe.user_id);  // compare numeric IDs

    async function handleDelete() {
        await deleteRecipe(recipe.id);
        onDeleted(recipe.id);   // tell parent to remove from state
    }

    return (
        <Card elevation={2} sx={{
            height: "100%", display: "flex", flexDirection: "column", borderRadius: 3,
            transition: "box-shadow 0.2s, transform 0.2s",
            "&:hover": { boxShadow: 8, transform: "translateY(-2px)" },
        }}>
            {/* Accent bar */}
            <Box sx={{ height: 8, background: isOwner
                    ? "linear-gradient(90deg, #1e3a5f, #2563eb)"
                    : "linear-gradient(90deg, #64748b, #94a3b8)" }} />

            <CardContent sx={{ flexGrow: 1, pt: 3, px: 3 }}>
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 1, mb: 1 }}>
                    <Typography variant="h5" fontWeight={600} sx={{ lineHeight: 1.3 }}>{recipe.title}</Typography>
                    {isOwner && <Chip label="Yours" size="small" color="primary" sx={{ flexShrink: 0 }} />}
                </Box>

                {recipe.prep_time && (
                    <Typography variant="caption" color="text.secondary" sx={{ display: "block", mb: 1 }}>
                        {recipe.prep_time} min prep
                    </Typography>
                )}

                <Divider sx={{ my: 1 }} />

                <Typography variant="body1" color="text.secondary" sx={{
                    display: "-webkit-box", WebkitLineClamp: 4, WebkitBoxOrient: "vertical", overflow: "hidden",
                }}>
                    {recipe.description || "No description available."}
                </Typography>
            </CardContent>

            <CardActions sx={{ px: 3, pb: 3, pt: 1, gap: 1, flexWrap: "nowrap" }}>
                <Button size="small" variant="contained" disableElevation
                        onClick={() => router.push(`/recipes/${recipe.id}`)} sx={{ borderRadius: 2, minWidth: 72 }}>
                    View
                </Button>
                {isOwner && (
                    <>
                        <Button size="small" variant="outlined"
                                onClick={() => router.push(`/recipes/${recipe.id}/edit`)} sx={{ borderRadius: 2, minWidth: 60 }}>
                            Edit
                        </Button>
                        <Button size="small" variant="outlined" color="error" onClick={handleDelete}
                                sx={{ borderRadius: 2, minWidth: 72, ml: "auto" }}>
                            Delete
                        </Button>
                    </>
                )}
            </CardActions>
        </Card>
    );
}