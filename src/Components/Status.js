import React, { useState, useEffect } from "react";
import HeadImg from "./Photos/tiffin2.jpg"
import { getMeals } from "./MealManager";
import MealStyle from "./mealbox.css"
export default function Status() {
    const [today, settoday] = useState(new Date().getDate())
    const [month, setMonth] = useState(new Date().getMonth());
    const [year, setYear] = useState(new Date().getFullYear());
    const [monthname, setMonthName] = useState(["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"])
    const [todaymeals, setTodayMeals] = useState([])
    const [selectmeals, setSelectMeals] = useState([]);
    //useEffect(() => { getDates(month, year) }, [month, year])
    useEffect(() => {
        fetchMeals();
    }, [today]);

    useEffect(() => {
        filterMeals();
    }, [todaymeals]);

    const fetchMeals = async () => {
        const data = await getMeals();
        setTodayMeals(data);
        filterMeals();
    }
    function filterMeals() {
        if (todaymeals.length === 0) return;

        console.log("Today:", today);

        const selectedMeals = todaymeals
            .filter((meal) => new Date(meal.date).getDate() === today)
            .flatMap(meal => meal.meals);

        setSelectMeals(selectedMeals);
    }

    return (
        <div>
            <div className="food-menu">
                <div className="Headbox">
                    <img src={HeadImg} />
                    <h3>MealBox<br />Bringing the Kitchen to Your Table.</h3>
                </div>
                <div className="Statusbox">
                    <div className=" today">
                        <p className="selecteddate">{today}th {monthname[month]}</p>
                        <p className="selectedyear">{year}</p>
                    </div>
                    {selectmeals.map((food, index) => (
                        <div className="meal-info" key={index}>
                            <div className="Meal1">{food.type}</div>
                            <div className="mealtime">{food.time}</div>
                            <div className="address">{food.address}</div>
                            <div className="Restraunt">{food.restuarant}</div>
                            <div className="meal">{food.items}</div>
                        </div>
                    ))}
                </div>
            </div>

        </div>
    )
}