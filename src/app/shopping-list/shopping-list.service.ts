import { Ingredient } from "../shared/ingredient.model";
import { EventEmitter } from "@angular/core";
import { Subject } from "rxjs";

export class ShoppingListService{
    ingChanged=new Subject<Ingredient[]>();
    startedEditing=new Subject<number>();
    private ingredients:Ingredient[]=[
        new Ingredient('Apple', 5),
      new Ingredient('Mango',10)
      ];
      getIngredients(){
          return this.ingredients.slice();
      }
      getIngredient(index:number){
return this.ingredients.slice()[index];
      }

      addIngredient(ing:Ingredient){
          this.ingredients.push(ing);
          this.ingChanged.next(this.ingredients.slice());
      }

      updateIngredient(index:number, newIng:Ingredient){
        this.ingredients[index]=newIng;
        this.ingChanged.next(this.ingredients.slice())
      }

      deleteIngredient(index:number){
        this.ingredients.splice(index, 1);
        this.ingChanged.next(this.ingredients.slice());
      }
      addIngredients(ing:Ingredient[]){
        this.ingredients.push(...ing);
        this.ingChanged.next(this.ingredients.slice())

      }
}
