import RecipeCard from "./RecipeCard";
import Box from "@mui/material/Box";

export default function RecipeCardList({ recipes, onDeleted }) {
    return (
        <Box sx={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
            gap: 3,
            width: "100%",
        }}>
            {recipes.map((recipe) => (
                <RecipeCard key={recipe.id} recipe={recipe} onDeleted={onDeleted} />
            ))}
        </Box>
    );
}