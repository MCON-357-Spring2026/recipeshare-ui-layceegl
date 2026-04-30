"use client";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

export default function RecipeCard({ recipe }) {
    return (
        <Card sx={{ marginBottom: 2 }}>
            <CardContent>
                <Typography variant="h6" component="h2">
                    {recipe.title || recipe.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {recipe.description || "No description available."}
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small">View Recipe</Button>
            </CardActions>
        </Card>
    );
}