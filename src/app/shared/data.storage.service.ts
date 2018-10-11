import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { RecipeService } from "../recipes/recipe-service";
import { Recipe } from "../recipes/recipe.model";
import { AngularFireDatabase, AngularFireList } from "angularfire2/database";
import { Observable } from "rxjs";
import { AuthService } from "../auth/auth-service";

@Injectable()
export class DataStorageService{
    recipeList:Recipe[];
    tokenName:String;
    user:String[];
    vals:String;
    constructor(private http: HttpClient, 
        private recipeService:RecipeService, 
        private firebase:AngularFireDatabase,
    private authService:AuthService){}
    
    storeRecipes(){
        const token=this.authService.getToken()
        console.log(token)
     this.http.post('https://recipebook-8756d.firebaseio.com/recipes.json',
         this.recipeService.getRecipes(),
         ).subscribe(
             (val)=>{
             
                 console.log(val);
                 const value=Object.values(val).toString();
                 console.log(value)
                 this.vals=value


             
                
                }
             
                 );
         
      //return this.firebase.list('recipes').push(this.recipeService.getRecipes());
        
    }

    fetchRecipe(){
        let newi:any[];
        const token=this.authService.getToken()
        
  this.http.get(
    'https://recipebook-8756d.firebaseio.com/recipes.json',
    )
  
        
  .subscribe(
            (res)=>{
                console.log(res);

                let newrecip=Object.values(res);
                console.log(newrecip)
                //var arr = [['object1', 'object2'],['object1'],['object1','object2','object3']];
var flatenned = newrecip.reduce(function(a,b){ return a.concat(b) }, []);
                //for (let item of newrecip) {
                  
                   //console.log(Object.values(item))
                   
                    
                   
                    

                    //}
//console.log(newi)
                    this.recipeService.setRecipe(flatenned);   
                        
                }
                
            
           
            
        )
        
    }

}