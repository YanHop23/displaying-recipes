import React from "react";
import style from "./styles/cart.module.scss";
import { Navigate, useNavigate } from 'react-router-dom';

interface Item {
    [key: string]: string; 
}

interface CartProps {
    item: Item;
}

export const Cart: React.FC<CartProps> = ({ item, }) => {
    let selectStatus : string = "" 
    if (document.cookie.search(item.idMeal) != -1){
        selectStatus = style.selected
    } 
    const navigate = useNavigate()
    function moveToMeal(id:string) {
        console.log(id);
        navigate(`/recipe/${item.idMeal}`)
    }
    function selectCart(id: string){

        let el: any = document.getElementById(id)
        
        el.classList.toggle(style.selected);
        if (document.cookie.search(id) != -1){
            document.cookie = document.cookie.replace(id+'-', '')
        } else {
            console.log(el);
            document.cookie += id + '-'
        }
        
    }
    return (
        <div className={style.wrapper} >
            <div className={`${style.select} ${selectStatus}`} id={item.idMeal} onClick={() => selectCart(item.idMeal)}></div>
            <h3>{item.strMeal}</h3>
            <img onClick={() => moveToMeal(item.idMeal)} className={style.img} src={item.strMealThumb} alt="" />
            <span>Category: {item.strCategory}</span>
            <br />
            <span>Country: {item.strArea}</span>
        </div>
    );
}
