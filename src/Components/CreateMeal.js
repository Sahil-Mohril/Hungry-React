import React, { useState } from "react";
import { getMeals, addmeal } from "./MealManager";
import createstyle from './mealbox.css'
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

export default function CreateMeal({ date, month, year }) {
    const [restaurant, setRestaurant] = useState("");
    const [items, setitems] = useState([]);
    const [monthname, setMonthName] = useState(["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]);
    const [newMeal, setNewMeal] = useState({ "date": "", "day": "", "week": "", "meals": [] })
    const [meal, setmealitem] = useState({
        "type": "",
        "time": "",
        "restaurant": "",
        "address": "",
        "items": [
        ]
    })
    const handleAddMeal = async () => {
        //console.log(meal);
        // setNewMeal({
        //     ...newMeal,
        //     "date": new Date(`${year}-${month + 1}-${date}`).toISOString().split("T")[0]
        // });
        // setNewMeal({ ...newMeal, "meals": meal })
        // console.log(newMeal)
        //console.log(new Date((month + 1) + '-' + date + '-' + year))
        let adddate = Number(date) + 1;
        console.log(adddate)
        const updatedMeal = {
            ...newMeal,
            date: new Date(year, month, adddate).toISOString().split("T")[0], // Correct way to create a date
            meals: [...newMeal.meals, meal], // Append meal instead of replacing
        };

        console.log(updatedMeal);
        setNewMeal(updatedMeal);

        await addmeal(updatedMeal);
    }


    return (<div><div className="create-meal">
        <Link to="/">
            <div className="close-btn">X</div>
        </Link>


        <div className="leftside">
            <div className=" today">
                <h2>
                    <p>{date}th {monthname[month]} {year}</p>
                </h2>
                <h2></h2>
                <p>Wednesday</p>
            </div>
            <div className="Addressinfo">
                <input className="address" type='text' value={meal.address} onChange={(e) => setmealitem({ ...meal, "address": e.target.value })} />
                <button>Change Address</button>
            </div>
            <button className="rightbutton">Reset Menu</button>
            <button className="rightbutton">Apply to All Days</button>
        </div>
        <div className="rightside">
            <div className="Meal1">
                <h3><input type='text' onChange={(e) => setmealitem({ ...meal, "type": e.target.value })} /></h3>
            </div>
            <div>
                <p>Meal Order</p>
            </div>
            <div className="choose">
                <p>Choose Restraunt</p>
                <select className="restaurant-select" onChange={(e) => setmealitem({ ...meal, "restaurant": e.target.value })}>
                    <option>Vellore Kitchen</option>
                    <option>Curry Leaf</option>
                </select>
                <button>Explore Restaurants</button>
            </div>
            <div className="choose">
                <p>Choose Items</p>
                <input className="item-select" onChange={(e) => setmealitem({ ...meal, "items": e.target.value.split(",") })} />
                <button>Menu</button>
            </div>
            <div className="choose">
                <p>Time</p>
                <input type="time" className="time-select" onChange={(e) => setmealitem({ ...meal, "time": e.target.value })} />
            </div>
            <button className="add" onClick={handleAddMeal}>Add</button>



        </div>
    </div>
    </div>)
}