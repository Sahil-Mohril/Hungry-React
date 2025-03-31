import React from "react";
import axios from "axios";

const url = "http://localhost:5005/meals"

export const getMeals = async () => {
    const response = await axios.get('http://localhost:5005/meals');
    return response.data;
}

export const addmeal = async (newmeal) => {
    const response = await axios.post(url, newmeal)
}