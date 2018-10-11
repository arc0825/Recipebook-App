import {Recipe} from './recipe.model';

import { Ingredient } from '../shared/ingredient.model';
import { Subject } from 'rxjs';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Injectable } from '@angular/core';

@Injectable()
export class RecipeService{

    constructor(private slService:ShoppingListService){

    }
    recipehanged=new Subject<Recipe[]>();
    private recipes:Recipe[]=[
        new Recipe('Burger Recipe', 'This is burger recipe',
        'https://cdn.pixabay.com/photo/2017/11/05/11/17/recipes-2920065_960_720.jpg',
    [
        new Ingredient('Meat',1),
        new Ingredient('French Fries', 20)
    ] ),
        new Recipe('Tandoor Recipe', 'This is Tandoor recipe',
        'https://cdn.pixabay.com/photo/2017/11/05/11/17/recipes-2920065_960_720.jpg',
    [
        new Ingredient('Buns',17),
        new Ingredient('Tea', 20)
    ] )
      ];


getRecipes(){
   console.log(this.recipes)
   return this.recipes.slice();
   
}


getRecipe(index:number){
return this.recipes.slice()[index];
}

addRecipe(recipe:Recipe){
this.recipes.push(recipe);
this.recipehanged.next(this.recipes.slice())
}

updateRecipe(index:number, recipe:Recipe){
this.recipes[index]=recipe;
this.recipehanged.next(this.recipes.slice())
}

deleteRecipe(index:number){
this.recipes.splice(index,1)
this.recipehanged.next(this.recipes.slice())
}

setRecipe(recipe:Recipe[]){
    console.log(recipe)
    this.recipes=recipe;
    console.log(this.recipes)
    
    this.recipehanged.next(this.recipes.slice())
}

addIngToShoppingList(ing:Ingredient[]){
this.slService.addIngredients(ing)
}

}
