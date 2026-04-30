"use client";

import { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

const empty = { title: "", description: "", instructions: "", prep_time: "" };

export default function RecipeForm({ initialData, onSave, onCancel }) {
    const [formData, setFormData] = useState(initialData || empty);

    function handleChange(e) {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    }

    function handleSubmit(e) {
        e.preventDefault();
        onSave({ ...formData, prep_time: Number(formData.prep_time) }); // cast to integer
    }

    return (
        <Paper elevation={3} sx={{ maxWidth: 1100, mx: "auto", borderRadius: 3, overflow: "hidden" }}>
            <Box sx={{ px: 4, py: 3, background: "linear-gradient(135deg, #1e3a5f 0%, #2563eb 100%)" }}>
                <Typography variant="h5" fontWeight={700} color="white">
                    {initialData ? "Edit Recipe" : "New Recipe"}
                </Typography>
            </Box>

            <Box component="form" onSubmit={handleSubmit}
                 sx={{ px: 4, py: 4, display: "flex", flexDirection: "column", gap: 3 }}>

                {/* Title + Prep Time on same row */}
                <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "1fr auto" }, gap: 3 }}>
                    <TextField label="Recipe Title" name="title" value={formData.title}
                               onChange={handleChange} required fullWidth
                               placeholder="e.g. Classic Spaghetti Carbonara"
                               slotProps={{ inputLabel: { shrink: true } }} />
                    <TextField label="Prep Time (minutes)" name="prep_time" value={formData.prep_time}
                               onChange={handleChange} required type="number"
                               sx={{ width: { xs: "100%", md: 180 } }}
                               slotProps={{ inputLabel: { shrink: true }, htmlInput: { min: 1 } }} />
                </Box>

                <TextField label="Description" name="description" value={formData.description}
                           onChange={handleChange} required multiline rows={3} fullWidth
                           slotProps={{ inputLabel: { shrink: true } }} />

                <Divider />

                <TextField label="Instructions" name="instructions" value={formData.instructions}
                           onChange={handleChange} required multiline rows={10} fullWidth
                           helperText="Walk through the preparation steps."
                           slotProps={{ inputLabel: { shrink: true } }} />

                <Divider />

                <Box sx={{ display: "flex", gap: 2, justifyContent: "flex-end" }}>
                    {onCancel && (
                        <Button variant="outlined" size="large" onClick={onCancel} sx={{ minWidth: 120 }}>Cancel</Button>
                    )}
                    <Button type="submit" variant="contained" size="large" sx={{ minWidth: 160 }}>Save Recipe</Button>
                </Box>
            </Box>
        </Paper>
    );
}