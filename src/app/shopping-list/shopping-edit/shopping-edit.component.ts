import { Component, Output,OnInit, ViewChild, ElementRef, EventEmitter, OnDestroy} from '@angular/core';
import{NgForm} from '@angular/forms';
import {Ingredient} from '../../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
editMode=false;
editedItemIndex:number;
sub:Subscription;
editedItem:Ingredient;
@ViewChild('f') slForm:NgForm;
  constructor(private slService:ShoppingListService) { }

  ngOnInit() {
    this.sub=this.slService.startedEditing.subscribe(
      (index:number)=>{
this.editedItemIndex=index;
this.editMode=true;
this.editedItem=this.slService.getIngredient(index);
this.slForm.setValue({
  name:this.editedItem.name,
  amount:this.editedItem.amount
}
  
)
      }
    );
  }
onAddItem(form:NgForm){
  const ingName=form.value.name;
  const ingAmount=form.value.amount;
  const newIngredient=new Ingredient(ingName,ingAmount);
  if(this.editMode){
    this.slService.updateIngredient(this.editedItemIndex, newIngredient)
  }
  else{
    this.slService.addIngredient(newIngredient)
  }
  this.editMode=false;
  form.reset();
}

onClear(){
  this.slForm.reset();
  this.editMode=false;
}

onDelete(){
  this.slService.deleteIngredient(this.editedItemIndex);
  this.onClear();
}
ngOnDestroy(){
this.sub.unsubscribe();
}
}
