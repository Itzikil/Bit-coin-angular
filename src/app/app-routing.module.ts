import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactListComponent } from './cmp/contact-list/contact-list.component';
import { ContactDetailsComponent } from './views/contact-details/contact-details.component';
import { ContactEditComponent } from './views/contact-edit/contact-edit.component';
import { HomePageComponent } from './views/home-page/home-page.component';
import { SignupComponent } from './views/signup/signup.component';

const routes: Routes = [
  {path: 'contact/edit/:id', component: ContactEditComponent},
  {path: 'contact/edit', component: ContactEditComponent},
  {path: 'contact/:id', component: ContactDetailsComponent},
  {path: 'signup', component: SignupComponent},
  {path: 'contact', component: ContactListComponent},
  {path: '', component: HomePageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
