import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app-root/app-root.component';
import { HeaderComponent } from './cmp/header/header.component';
import { FooterComponent } from './cmp/footer/footer.component';
import { HomePageComponent } from './views/home-page/home-page.component';
import { ContactListComponent } from './cmp/contact-list/contact-list.component';
import { ContactPreviewComponent } from './cmp/contact-preview/contact-preview.component';
import { ContactDetailsComponent } from './views/contact-details/contact-details.component';
import { ContactEditComponent } from './views/contact-edit/contact-edit.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SignupComponent } from './views/signup/signup.component';
import { DateDescPipe } from './pipes/date-desc.pipe';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomePageComponent,
    ContactListComponent,
    ContactPreviewComponent,
    ContactDetailsComponent,
    ContactEditComponent,
    SignupComponent,
    DateDescPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
