"use client";

import { useState } from "react";

export default function RecipeList() {
    const [recipes, setRecipes] = useState([
        { id: 1, title: "Chicken Soup" },
        { id: 2, title: "Caesar Salad" },
        { id: 3, title: "Chocolate Cake" },
    ]);

    return (
        <ul>
            {recipes.map((recipe) => (
                <li key={recipe.id}>{recipe.title}</li>
            ))}
        </ul>
    );
}