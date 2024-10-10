import React from "react";
import { useState } from "react";
import {
    useQuery,
    QueryClient,
    QueryClientProvider,
  } from '@tanstack/react-query'

  let arr:any[]= document.cookie.split('-').filter(Boolean);
  console.log(arr);
export const Ingridiends = ()=>{
    const queryClient = new QueryClient()

    
    return(
        <div>
            <QueryClientProvider client={queryClient}>
                <ul>
                    <GetIngri />
                </ul>
                </QueryClientProvider>
        </div>
    )
}
const GetIngri= ()=> {
    
    const [meal, setMeal] = useState<any>(null);
    const [ingredients, setingredients] = useState<any>([]);
    
    const { isPending, error, data } = useQuery({
        queryKey: ['repoData'],
        queryFn: async () => {
            for (let j = 0; j < arr.length; j++) {
                
                const res = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${arr[j]}`)
                .then((res)=> res.json())
                .then(res => {
                    setMeal(res.meals[0]);
                    for (let i = 1; i < 21; i++) {
                        if (res.meals[0][`strIngredient${i}`] != null && res.meals[0][`strIngredient${i}`] !="") {
                            ingredients.push(res.meals[0][`strIngredient${i}`])
                        }
                }
                });
            }
        },
    })
    
    if (isPending) return <div>Loading...</div>;
    console.log(meal)
    console.log(ingredients);
    
    return (
        <ul>
            {
                ingredients.map((el: string)=> (
                    <li>{el}</li>
                ))
            }
        </ul>
    );
    
}