import { Component, OnInit } from '@angular/core';
import { DataStorageService } from '../../shared/data.storage.service';
import { Observable } from 'rxjs';
import { Recipe } from '../../recipes/recipe.model';
import { AngularFireDatabase } from 'angularfire2/database';
import { AuthService } from '../../auth/auth-service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  rec:Recipe[];
  constructor(private dataStoreRecipe:DataStorageService, private firebase: AngularFireDatabase,
    private authService:AuthService) {
    
   }

  ngOnInit() {

  }
  onSaveData(){
    
this.dataStoreRecipe.storeRecipes()


  }

  onFetchData()
  {
    this.dataStoreRecipe.fetchRecipe()
  
    
  }
  onLogout(){
this.authService.logout();
  }

}
