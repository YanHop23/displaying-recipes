import React from 'react';
import { BrowserRouter, Routes,Route } from 'react-router-dom';
import style from "./app.module.scss"
import { RecipesList } from './components/content/recipesList/recipesList';
import { Meal } from './components/content/meal/meal';
import Header from './components/header/header';
import { Ingridiends } from './components/content/ingrediends/ingridiends';

function App() {
  return (
    <BrowserRouter>
        <div className={style.wrapper}>  
          <Header />
          <Routes>
            <Route path='/' element={<RecipesList />}/>
            <Route path='/recipe/:id' element={<Meal />}/>
            <Route path='/ingridiends' element={<Ingridiends />}/>

          </Routes>
        </div>
    </BrowserRouter>
    );
  }

  

export default App;
