import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WelcomePageComponent } from './welcome-page/welcome-page.component';
import { SigninComponent } from './signin/signin.component';
import { LoginComponent } from './login/login.component';
import { QuestionsComponent } from './questions/questions.component';
import { QuestionDetailComponent } from './question-detail/question-detail.component';
import { BecomeAProComponent } from './become-a-pro/become-a-pro.component';
import { UsersComponent } from './users/users.component';
import { UserRoleGuard } from './user-role.guard';

const routes: Routes = [
  { path: '', component: WelcomePageComponent },
  { path: 'signup', component: SigninComponent },
  { path: 'login', component: LoginComponent },
  { path: 'become-pro', component: BecomeAProComponent },
  { path: 'questions/:text', component: QuestionsComponent },
  { path: 'questions', component: QuestionsComponent },
  { path: 'question/:id', component: QuestionDetailComponent },
  { path: 'users', component: UsersComponent, canActivate: [UserRoleGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
