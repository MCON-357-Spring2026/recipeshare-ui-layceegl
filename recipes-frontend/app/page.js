"use client";

import { useEffect, useState } from "react";
import { fetchRecipes } from "@/lib/api";  //<--- import the API helper function
import RecipeCardList from "@/components/RecipeCardList";  //<--- import a component to render the list
import Alert from "@mui/material/Alert"; //<--- import MUI Alert for error messages

export default function HomePage() {
    const [recipes, setRecipes] = useState([]);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchRecipes()
            .then(setRecipes)
            .catch((err) => setError(err.message))
            .finally(() => setLoading(false));
    }, []);

    return (
        <main>
            <h1>RecipeShare</h1>
            {loading ? (
                <p>Loading recipes...</p>
            ) : error ? (
                <Alert severity="error">{error}</Alert>
            ) : (
                <RecipeCardList recipes={recipes} />
            )}
        </main>
    );
}