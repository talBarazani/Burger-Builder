import { object } from 'prop-types';
import React from 'react'
import classes from '../Burger/Burger.module.css';
import BurgerIngredient from './BurgerIngridiant/BurgerIngredient';

const Burger = (props) => {
    let transformedIngridiant = Object.keys(props.ingredients).map(ingKey => {
        return [...Array(props.ingredients[ingKey])].map((_, i) => {
            return <BurgerIngredient key={ingKey+i} type={ingKey}/>
        });
    }).reduce((arr, el) => {
        return arr.concat(el)
    }, []);
    console.log(transformedIngridiant)
    if(transformedIngridiant.length === 0){
        transformedIngridiant = <p>Please start adding ingredients</p>
    }

    
    return (
        <div className={classes.Burger}>
            <BurgerIngredient type="bread-top"/>
            {transformedIngridiant}
            <BurgerIngredient type="bread-bottom"/>

        </div>
    );
}

export default Burger