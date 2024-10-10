import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
    useQuery,
    QueryClient,
    QueryClientProvider,
  } from '@tanstack/react-query'
import style from "./meal.module.scss"
import ReactPlayer from 'react-player';

export const Meal = () => {
    const queryClient = new QueryClient()
    
    return (
        <QueryClientProvider client={queryClient}>
            <div>
                <GetMeal />
            </div>
        </QueryClientProvider>
    );
}

const GetMeal= ()=> {
    
    const { id } = useParams<{ id: string }>(); 
    const [meal, setMeal] = useState<any>(null);
    const [ingredients, setingredients] = useState<any>([]);

    const { isPending, error, data } = useQuery({
        queryKey: ['repoData'],
        queryFn: async () => {
                const res = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
                .then((res)=> res.json())
                .then(res => {
                    setMeal(res.meals[0]);
                    for (let i = 1; i < 21; i++) {
                        if (res.meals[0][`strIngredient${i}`] != null && res.meals[0][`strIngredient${i}`] !="") {
                            ingredients.push(res.meals[0][`strIngredient${i}`] + ' ' + res.meals[0][`strMeasure${i}`])
                        }
                }
                });
        },
    })
    
    if (isPending) return <div>Loading...</div>;
    console.log(meal)
    return (
        <div className={style.wrapper}>
            <h3>{meal.strMeal}</h3>
            <img className={style.img} src={meal.strMealThumb} alt="" />
            <span>Category: {meal.strCategory}</span>
            <br />
            <span>Country: {meal.strArea}</span>
            <br />
            <span>Ingridients:</span>
            <ul>
                {
                    ingredients.map((el: string)=> (
                        <li>{el}</li>
                    ))
                }
            </ul>
            <span>instrucrion:</span>
            <p>{meal.strInstructions}</p>
            <a href={meal.strSource}>More Information</a>
            <ReactPlayer
            url={meal.strYoutube}
            />
        </div>
    );
    
}
