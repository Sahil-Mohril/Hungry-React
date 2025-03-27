
import React, { useEffect, useState } from "react";
import calendarStyle from './mealbox.css'
import { getMeals } from "./MealManager";
export default function Calendar() {
    const [dates, setDates] = useState([]);
    const [month, setMonth] = useState(new Date().getMonth());
    const [year, setYear] = useState(new Date().getFullYear());
    const [monthname, setMonthName] = useState(["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"])
    const [openMenu, setOpenMenu] = useState([false, false, false, false, false])
    const [dateopen, setDateOpen] = useState(0);

    const [meals, setMeals] = useState([])
    const [selectmeals, setSelectMeals] = useState([]);
    useEffect(() => { getDates(month, year) }, [month, year])
    useEffect(() => { fetchMeals() }, [])
    useEffect(() => {
        if (dateopen) {
            filterMeals();
        }
    }, [dateopen, meals]);


    const fetchMeals = async () => {
        const data = await getMeals();
        setMeals(data);
    }

    // function filterMeals() {

    //     setSelectMeals(() => {
    //         let select;
    //         for (let i = 0; i < meals.length; i++) {
    //             if (new Date(meals[i].date).getDate() == dateopen)
    //                 select = meals[i]
    //         }
    //         return select;
    //     }
    //     );
    //     console.log(selectmeals)

    // }
    function getDates() {
        //console.log("year" + year)
        //setYear(year);
        //setMonth(monthIndex);
        //console.log(month);
        let firstDay = new Date(year, month, 1).getDay();
        let lastDate = new Date(year, month + 1, 0).getDate();
        let newDates = []
        let c = 1;
        firstDay = (firstDay == 0 ? 7 : firstDay)
        for (let i = firstDay - 1; c <= lastDate; i++) {
            newDates[i] = c;
            c++;
        }
        setDates(newDates);
        //console.log(dates);

    }
    function UpdateDates() {
        let newdates = [];
        let firstday = new Date(year, month, 1).getDay();
        let lastdate = new Date(year, month + 1, 0).getDate();
        let c = 1;
        for (let i = firstday - 1; c <= lastdate; i++) {
            newdates[i] = c;
            c++;
        }
        console.log(newdates)
        setDates(newdates)
    }

    function NextMonth() {
        setYear(month + 1 == 12 ? year + 1 : year)
        setMonth(month + 1 == 12 ? 0 : month + 1)
        let open = [...openMenu]
        for (let i = 0; i < open.length; i++)
            open[i] = false;
        console.log(open);
        setOpenMenu(open);
        // console.log(month);
        // console.log(year);

        // setDates([]);
        // UpdateDates();


    }
    function PrevMonth() {
        setMonth(month - 1 == -1 ? 11 : month - 1)
        setYear(month - 1 == -1 ? year - 1 : year);
        let open = [...openMenu]
        for (let i = 0; i < open.length; i++)
            open[i] = false;
        console.log(open);
        setOpenMenu(open);
    }
    function dateClick(e) {
        //if (e.target.textContent = undefined) return;
        const week = ['Week1', 'Week2', 'Week3', 'Week4', 'Week5', 'Week6']
        //console.log(e.target.classList[3]);
        //console.log(week.indexOf(e.target.classList[3]))
        let open = [...openMenu];
        for (let i = 0; i < open.length; i++)
            open[i] = false;
        open[week.indexOf(e.target.classList[3])] = !open[week.indexOf(e.target.classList[3])];
        setOpenMenu(open);
        setDateOpen(e.target.textContent);

        filterMeals();

    }
    function filterMeals() {
        if (meals.length === 0) return;
        const selectedMeals = meals.filter((meal) => new Date(meal.date).getDate() == dateopen).flatMap(meal => meal.meals);
        setSelectMeals(selectedMeals);
    }
    useEffect(() => {
        console.log("Filtered Meals: ", selectmeals);
    }, [selectmeals]);

    return (<div>
        <div className="Month">
            <div className="Calendar">
                <div className="currentMonth">{monthname[month]}</div>
                <div className="year">{year}</div>
                <div className="Next" onClick={NextMonth}>{'>'}</div>
                <div className="Prev" onClick={PrevMonth}>{'<'}</div>
            </div>
            <div className="Week no"></div>
            <div className="Day">Monday</div>
            <div className="Day">Tuesday</div>
            <div className="Day">Wednesday</div>
            <div className="Day">Thursday</div>
            <div className="Day">Friday</div>
            <div className="Day">Saturday</div>
            <div className="Day">Sunday</div>
            <div className="Week">Week1</div>
            <div className="Date R1 C1 Week1" onClick={(e) => dateClick(e)}>{dates[0]}</div>
            <div className="Date R1 C2 Week1" onClick={(e) => dateClick(e)}>{dates[1]}</div>
            <div className="Date R1 C3 Week1" onClick={(e) => dateClick(e)}>{dates[2]}</div>
            <div className="Date R1 C4 Week1" onClick={(e) => dateClick(e)}>{dates[3]}</div>
            <div className="Date R1 C5 Week1" onClick={(e) => dateClick(e)}>{dates[4]}</div>
            <div className="Date R1 C6 Week1" onClick={(e) => dateClick(e)}>{dates[5]}</div>
            <div className="Date R1 C7 Week1" onClick={(e) => dateClick(e)}>{dates[6]}</div>
            {openMenu[0] && (<div className="Week-menu Week1">
                <div className=" today">
                    <p className="selecteddate">{dateopen}th {monthname[month]}</p>
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
                <div className="add">+</div>
            </div>)}
            <div className="Week">Week2</div>
            <div className="Date R2 C1 Week2" onClick={(e) => dateClick(e)}>{dates[7]}
            </div>
            <div className="Date R2 C2 Week2" onClick={(e) => dateClick(e)}>{dates[8]}
            </div>
            <div className="Date R2 C3 Week2" onClick={(e) => dateClick(e)}>{dates[9]}</div>
            <div className="Date R2 C4 Week2" onClick={(e) => dateClick(e)}>{dates[10]}</div>
            <div className="Date R2 C5 Week2" onClick={(e) => dateClick(e)}>{dates[11]}</div>
            <div className="Date R2 C6 Week2" onClick={(e) => dateClick(e)}>{dates[12]}</div>
            <div className="Date R2 C7 Week2" onClick={(e) => dateClick(e)}>{dates[13]}</div>
            {openMenu[1] && (<div className="Week-menu Week2 ">
                <div className=" today">
                    <p className="selecteddate">{dateopen}th {monthname[month]}</p>
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

                <div className="add">+</div>
            </div>)}
            <div className="Week">Week3</div>
            <div className="Date R3 C1 Week3" onClick={(e) => dateClick(e)}>{dates[14]}</div>
            <div className="Date R3 C2 Week3" onClick={(e) => dateClick(e)}>{dates[15]}</div>
            <div className="Date R3 C3 Week3" onClick={(e) => dateClick(e)}>{dates[16]}</div>
            <div className="Date R3 C4 Week3" onClick={(e) => dateClick(e)}>{dates[17]}</div>
            <div className="Date R3 C5 Week3" onClick={(e) => dateClick(e)}>{dates[18]}</div>
            <div className="Date R3 C6 Week3" onClick={(e) => dateClick(e)}>{dates[19]}</div>
            <div className="Date R3 C7 Week3" onClick={(e) => dateClick(e)}>{dates[20]}</div>
            {openMenu[2] && (<div className="Week-menu Week3">
                <div className=" today">
                    <p className="selecteddate">{dateopen}th {monthname[month]}</p>
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


                <div className="add">+</div>
            </div>)}
            <div className="Week">Week4</div>
            <div className="Date R4 C1 Week4" onClick={(e) => dateClick(e)}>{dates[21]}</div>
            <div className="Date R4 C2 Week4" onClick={(e) => dateClick(e)}>{dates[22]}</div>
            <div className="Date R4 C3 Week4" onClick={(e) => dateClick(e)}>{dates[23]}</div>
            <div className="Date R4 C4 Week4" onClick={(e) => dateClick(e)}>{dates[24]}</div>
            <div className="Date R4 C5 Week4" onClick={(e) => dateClick(e)}>{dates[25]}</div>
            <div className="Date R4 C6 Week4" onClick={(e) => dateClick(e)}>{dates[26]}</div>
            <div className="Date R4 C7 Week4" onClick={(e) => dateClick(e)}>{dates[27]}</div>
            {openMenu[3] && (<div className="Week-menu Week4">
                <div className="today">
                    <p className="selecteddate">14th January</p>
                    <p className="selectedyear">2025</p>
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
                    <div className="meal">Poha,Jalebi,Samosa</div>
                </div>
                <div className="meal-info">
                    <div className="Meal1">Snacks</div>
                    <div className="mealtime">5:00 PM</div>
                    <div className="address">221B Baker Street</div>
                    <div className="Restraunt">VIT tiffin service</div>
                    <div className="meal">Poha,Jalebi,Samosa</div>

                </div>


                <div className="add">+</div>
            </div>)}
            <div className="Week">Week5</div>
            <div className="Date R5 C1 Week5" onClick={(e) => dateClick(e)}>{dates[28]}</div>
            <div className="Date R5 C2 Week5" onClick={(e) => dateClick(e)}>{dates[29]}</div>
            <div className="Date R5 C3 Week5" onClick={(e) => dateClick(e)}>{dates[30]}</div>
            <div className="Date R5 C4 Week5" onClick={(e) => dateClick(e)}>{dates[31]}</div>
            <div className="Date R5 C5 Week5" onClick={(e) => dateClick(e)}>{dates[32]}</div>
            <div className="Date R5 C6 Week5" onClick={(e) => dateClick(e)}>{dates[33]}</div>
            <div className="Date R5 C7 Week5" onClick={(e) => dateClick(e)}>{dates[34]}</div>
            <div className="Week-menu Week5 show">
                <div className="today">
                    <p className="selecteddate">14th January</p>
                    <p className="selectedyear">2025</p>
                </div>
                <div className="add">+</div>
            </div>
            <div className="Week">Week6</div>
            <div className="Date R6 C1 Week6" onClick={(e) => dateClick(e)}>{dates[35]}</div>
            <div className="Date R6 C2 Week6" onClick={(e) => dateClick(e)}>{dates[36]}</div>
            <div className="Date R6 C3 Week6" onClick={(e) => dateClick(e)}>{dates[37]}</div>
            <div className="Date R6 C4 Week6" onClick={(e) => dateClick(e)}>{dates[38]}</div>
            <div className="Date R6 C5 Week6" onClick={(e) => dateClick(e)}>{dates[39]}</div>
            <div className="Date R6 C6 Week6" onClick={(e) => dateClick(e)}>{dates[40]}</div>
            <div className="Date R6 C7 Week6" onClick={(e) => dateClick(e)}>{dates[41]}</div>
            <div className="Week-menu Week6 show">
                <div className="today">
                    <p className="selecteddate">14th January</p>
                    <p className="selectedyear">2025</p>
                </div>
                <div className="add">+</div>
            </div>

        </div>
    </div>)
}
