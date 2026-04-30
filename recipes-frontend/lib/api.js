const BASE_URL = "";  // relative — proxied by Next.js to localhost:5000

export function saveAuth(username, password, userId) {
    if (typeof window === "undefined") return;
    localStorage.setItem("auth", JSON.stringify({ username, password, userId }));
}

export function getAuth() {
    if (typeof window === "undefined") return null;
    const raw = localStorage.getItem("auth");
    try {
        return raw ? JSON.parse(raw) : null;
    } catch {
        return null;
    }
}

export function clearAuth() {
    if (typeof window === "undefined") return;
    localStorage.removeItem("auth");
}

export async function fetchRecipes() {
    const response = await fetch(`${BASE_URL}/api/recipes`);
    if (!response.ok) throw new Error("Failed to load recipes");
    return response.json();
}

export async function createRecipe(recipeData) {
    const response = await fetch(`${BASE_URL}/api/recipes`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(recipeData),
    });
    if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        throw new Error(data.error || `Server error ${response.status} - are you logged in?`);
    }
    return response.json();
}

export async function updateRecipe(id, recipeData) {
    const response = await fetch(`${BASE_URL}/api/recipes/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(recipeData),
    });
    if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        throw new Error(data.error || `Server error ${response.status} - are you logged in?`);
    }
    return response.json();
}

export async function deleteRecipe(id) {
    const response = await fetch(`${BASE_URL}/api/recipes/${id}`, {
        method: "DELETE",
    });
    if (!response.ok) throw new Error(`Delete failed (${response.status})`);
}

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

export async function logout() {
    await fetch(`${BASE_URL}/auth/logout`, {
        method: "POST",
    });
}