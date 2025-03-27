import React, { useState } from "react";
import HeadImg from "./Photos/tiffin2.jpg"
import MealStyle from "./mealbox.css"
export default function Status() {
    const [dates, setdates] = useState([])

    function nextMonth() {


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
                        <h3>Today's Order</h3>
                        <p>14th January 2025</p>
                    </div>
                    <div className="meal-info">
                        <div className="Meal1">Breakfast</div>
                        <div className="mealtime">9:00 AM</div>
                        <div className="address">221B Baker Street</div>
                        <div className="Restraunt">VIT tiffin service</div>
                        <div className="meal">Poha,Jalebi,Samosa</div>
                    </div>
                    <div className="meal-info">
                        <div className="Meal1">Lunch</div>
                        <div className="mealtime">1:00 PM</div>
                        <div className="address">221B Baker Street</div>
                        <div className="Restraunt">BBC tiffin service</div>
                        <div className="meal">Dal Makhni,Dal Makhni</div>
                    </div>
                    <div className="meal-info">
                        <div className="Meal1">Snacks</div>
                        <div className="mealtime">5:00 PM</div>
                        <div className="address">221B Baker Street</div>
                        <div className="Restraunt">VIT tiffin service</div>
                        <div className="meal">Bhel,Chewda,Tea</div>

                    </div>
                    <div className="meal-info">
                        <div className="Meal1">Dinner</div>
                        <div className="mealtime">8:00 AM</div>
                        <div className="address">221B Baker Street</div>
                        <div className="Restraunt">VIT tiffin service</div>
                        <div className="order">Paneer,Butter Naan</div>
                    </div>
                </div>
            </div>

        </div>
    )
}