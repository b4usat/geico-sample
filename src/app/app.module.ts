import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { CustomMaterialModule } from './CustomMaterialModule';
import { TabComponent } from './tab/tab.component';
import { TabContentComponent } from './tab-content/tab-content.component';
import { DataService } from './services/app.services';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TransfromArray } from './utilities/pipes';
import { ErrorStateMatcher, ShowOnDirtyErrorStateMatcher } from '@angular/material';


@NgModule({
  declarations: [
    AppComponent,
    TransfromArray,
    HomeComponent,
    TabComponent,
    TabContentComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule,
    CustomMaterialModule
  ],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule {

}
