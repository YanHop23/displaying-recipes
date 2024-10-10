import React from "react";
import { NavLink } from "react-router-dom";
import style from "./header.module.scss"
import { useNavigate } from "react-router-dom";

const Header = () =>{
    const navig= useNavigate()
    return(
        <div className={style.wrapper}>
            <NavLink className={style.link} to="/">Recipes</NavLink>
            <NavLink className={style.link} to="/recipe/52893">Meal</NavLink>
            <NavLink onClick={()=>{
                navig('/ingridiends')
                window.location.reload()
                //перезавантажуємо щоб кукі оновилися
            }} className={style.link} to="/ingridiends">All Ingrediends</NavLink>
        </div>
    );
}

export default Header