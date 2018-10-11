import { NgModule } from "@angular/core";
import { HeaderComponent } from "./header/header.component";
import { HomeComponent } from "./home/home.component";
import { AppRoutingModule } from "../app-routing-module";
import { CommonModule } from "@angular/common";
import { RecipeService } from "../recipes/recipe-service";
import { ShoppingListService } from "../shopping-list/shopping-list.service";
import { DataStorageService } from "../shared/data.storage.service";
import { AuthService } from "../auth/auth-service";
import { AuthGuard } from "../auth/auth-guard-service";
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { AuthInterceptor } from "../shared/auth.interceptor";
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

@NgModule({
    declarations:[
        HeaderComponent,
    HomeComponent,
    ],
    imports:[
        AppRoutingModule,
        CommonModule,
        BsDropdownModule.forRoot()
    ],

    exports:[AppRoutingModule,
    HeaderComponent],

    providers:[RecipeService, ShoppingListService, 
        DataStorageService, 
        AuthService,
    {provide:HTTP_INTERCEPTORS, useClass:AuthInterceptor, multi:true}]
})
export class CoreModule{

}