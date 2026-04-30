import Grid from "@mui/material/Grid";
import RecipeCard from "./RecipeCard";

export default function RecipeCardList({ recipes }) {
    return (
        <Grid container spacing={3}>
            {recipes.map((recipe) => (
                <Grid size={{ xs: 12, sm: 6, md: 4 }} key={recipe.id}>
                    <RecipeCard recipe={recipe} />
                </Grid>
            ))}
        </Grid>
    );
}