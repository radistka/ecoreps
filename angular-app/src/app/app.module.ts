import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatTabsModule, MatButtonModule } from '@angular/material';

import { AppComponent } from './app.component';
import { TabContentComponent } from './tab-content.component';
import { ContentContainerDirective } from './content-container.directive';
import { TabService } from './tab.service';
import { LessonsComponent } from './components/lessons.component';
import { StudentsComponent } from './components/students.component';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    TabContentComponent,
    ContentContainerDirective,
    LessonsComponent,
    StudentsComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatTabsModule,
    MatButtonModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [TabService],
  bootstrap: [AppComponent],
  entryComponents: [LessonsComponent, StudentsComponent]
})
export class AppModule {}
