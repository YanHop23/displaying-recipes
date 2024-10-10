import React, { useState } from "react";
import style from "./styles/recipesList.module.scss"
import { Cart } from "./cart";
import {
    useQuery,
    QueryClient,
    QueryClientProvider,
  } from '@tanstack/react-query'

export const RecipesList = () =>{
    const queryClient = new QueryClient()

    return(
        <QueryClientProvider client={queryClient}>
            <div className={style.wrapper}>
                <GetProduct />
            </div>
        </QueryClientProvider>
    );
}

const GetProduct = () => {
        const[meals, setMeals] = useState([])
        const countPage = 31;
        const [page, setPage] = useState(1)
        const [selectMail, setSelectMail] =useState([])
        
        const { isPending, error, data } = useQuery({
            queryKey: ['repoData'],
            queryFn: async () => {
                const alphabet = 'abcdefghijklmnopqrstuvwxyz';
                const allMeals: any[] = [];
                
                for (let i = 0; i < alphabet.length; i++) {
                    const res = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${alphabet[i]}`)
                    .then((res)=> res.json())
                    .then(res => {
                        if (res.meals) {
                            allMeals.push(...res.meals);
                        }
                    });
                }
                
                return allMeals;
            },
        })
        
        if (isPending) return <div>'Loading...'</div>
        
        if (error) return <div>'An error has occurred: {error.message}'</div>  
        interface DataType {
            id: number;
            name: string;
        }
        const totalPages = Math.ceil(data.length / countPage);
        const startIndex = (page - 1) * countPage;
        const currentItems = data.slice(startIndex, startIndex + countPage);

        const changePage = (newPage: number) => {
            setPage(newPage);
        };

        
        
    interface Item {
        [key: string]: string; 
    }
    const renderPagination = () => {
        const pageNumbers = [];
        for (let i = 1; i <= totalPages; i++) {
            pageNumbers.push(i);

        }

        return (
            <div className={style.pagination}>
                <button onClick={() => changePage(page - 1)} disabled={page === 1}>
                &larr;
                </button>
                {pageNumbers.map((number, index) => (
                    <button
                        key={index}
                        onClick={() => changePage(typeof number === 'number' ? number : page)}
                        className={page === number ? style.active : ''}
                    >
                        {number}
                    </button>
                ))}
                <button onClick={() => changePage(page + 1)} disabled={page === totalPages}>
                &rarr;
                </button>
            </div>
        );
    };
        return (
        <div >
            {
            currentItems.map((el)=>(
                <Cart item={el} />
            ))
            }
            {renderPagination()}
        </div>
        )
    }