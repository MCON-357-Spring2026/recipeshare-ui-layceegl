const BASE_URL = "http://localhost:5000";

// ─── Auth helpers (localStorage) ────────────────────────────────────────────

export function saveAuth(username, password) {
    localStorage.setItem("auth", JSON.stringify({ username, password }));
}

export function getAuth() {
    const raw = localStorage.getItem("auth");
    return raw ? JSON.parse(raw) : null;
}

export function clearAuth() {
    localStorage.removeItem("auth");
}

function authHeader(username, password) {
    return { Authorization: "Basic " + btoa(username + ":" + password) };
}

// ─── Recipes ─────────────────────────────────────────────────────────────────

export async function fetchRecipes() {
    const response = await fetch(`${BASE_URL}/api/recipes`);
    if (!response.ok) throw new Error("Failed to load recipes");
    return response.json();
}

export async function createRecipe(recipeData, username, password) {
    const response = await fetch(`${BASE_URL}/api/recipes`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            ...authHeader(username, password),
        },
        body: JSON.stringify(recipeData),
    });
    if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Could not create recipe");
    }
    return response.json();
}

export async function updateRecipe(id, recipeData, username, password) {
    const response = await fetch(`${BASE_URL}/api/recipes/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            ...authHeader(username, password),
        },
        body: JSON.stringify(recipeData),
    });
    if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Could not update recipe");
    }
    return response.json();
}

export async function deleteRecipe(id, username, password) {
    const response = await fetch(`${BASE_URL}/api/recipes/${id}`, {
        method: "DELETE",
        headers: authHeader(username, password),
    });
    if (!response.ok) throw new Error("Delete failed");
}

// ─── Auth ────────────────────────────────────────────────────────────────────

export async function register(username, email, password) {
    const response = await fetch(`${BASE_URL}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password }),
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.error || "Registration failed");
    return data;
}

export async function login(username, password) {
    const response = await fetch(`${BASE_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.error || "Login failed");
    return data;
}

export async function logout(username, password) {
    await fetch(`${BASE_URL}/auth/logout`, {
        method: "POST",
        headers: authHeader(username, password),
    });
}