import {
  MatButtonModule, MatCheckboxModule, MatFormFieldModule, MatSelectModule, MatIconModule,
  MatAutocompleteModule, MatRadioModule, MatInputModule, MatCardModule, ErrorStateMatcher, ShowOnDirtyErrorStateMatcher
} from '@angular/material';
import { MatTabsModule } from '@angular/material/tabs';
import { NgModule } from '@angular/core';

@NgModule({
  providers: [
    { provide: ErrorStateMatcher, useClass: ShowOnDirtyErrorStateMatcher }
  ],
  imports: [MatButtonModule, MatCheckboxModule, MatTabsModule, MatFormFieldModule, MatIconModule,
    MatSelectModule, MatAutocompleteModule, MatRadioModule, MatInputModule, MatCardModule],
  exports: [MatButtonModule, MatCheckboxModule, MatTabsModule, MatFormFieldModule, MatIconModule,
    MatSelectModule, MatAutocompleteModule, MatRadioModule, MatInputModule, MatCardModule],
})
export class CustomMaterialModule { }
