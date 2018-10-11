import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { RecipeService } from '../recipe-service';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
id:number;
editMode=false;
recipeForm:FormGroup;
  constructor(private route:ActivatedRoute, private recipeService:RecipeService,
              private router:Router) { }

  ngOnInit() {
    this.route.params.subscribe(
      (params:Params)=>{
        this.id=+params['id'];
        this.editMode=params['id']!=null;
        this.initForm();
      }
    )
  }

  onSubmit()
  {
    
  
    if(this.editMode){
      this.recipeService.updateRecipe(this.id, this.recipeForm.value);
    }
    else{
      this.recipeService.addRecipe(this.recipeForm.value)
    }
    this.onCancel();
  }

  onIngAdded(){
    (<FormArray>this.recipeForm.get('ingredients')).push(
      new FormGroup(
        {
          'name':new FormControl(null, Validators.required),
          'amount':new FormControl(null, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
        }
      )
    )
  }

  onCancel(){
    this.router.navigate(['../'], {relativeTo:this.route})
  }

  onDeleteIng(index:number){
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(index)
  }

  private initForm(){
let recipeName="";
let recipeDescription="";
let imagePath="";
let recipeIng=new FormArray([]);
 if(this.editMode){
   const recipe=this.recipeService.getRecipe(this.id);
   recipeName=recipe.name;
   recipeDescription=recipe.description;
   imagePath=recipe.imagePath;

   if(recipe['ingredients']){
     for(let ingredient of recipe.ingredients){
       recipeIng.push(
         new FormGroup({
           'name':new FormControl(ingredient.name, Validators.required),
           'amount':new FormControl(ingredient.amount, [Validators.required, 
            Validators.pattern(/^[1-9]+[0-9]*$/)]
            )
         })
       )
     }
   }
 }

 this.recipeForm=new FormGroup({
  'name':new FormControl(recipeName, Validators.required),
  'description':new FormControl(recipeDescription, Validators.required),
  'imagePath':new FormControl(imagePath, Validators.required),
  'ingredients':recipeIng




 }
   
 );
  }


}
