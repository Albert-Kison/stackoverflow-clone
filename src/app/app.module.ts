import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WelcomePageComponent } from './welcome-page/welcome-page.component';
import { NavComponent } from './nav/nav.component';
import { FooterComponent } from './footer/footer.component';
import { SigninComponent } from './signin/signin.component';
import { LoginComponent } from './login/login.component';
import { TokenInterceptorService } from './token-interceptor.service';
import { QuestionsComponent } from './questions/questions.component';
import { QuestionDetailComponent } from './question-detail/question-detail.component';
import { SearchInputComponent } from './search-input/search-input.component';
import { BecomeAProComponent } from './become-a-pro/become-a-pro.component';
import { TagComponent } from './tag/tag.component';
import { ButtonFillComponent } from './button-fill/button-fill.component';
import { AddQuestionModalComponent } from './add-question-modal/add-question-modal.component';
import { TagInputComponent } from './tag-input/tag-input.component';

@NgModule({
  declarations: [
    AppComponent,
    WelcomePageComponent,
    NavComponent,
    FooterComponent,
    SigninComponent,
    LoginComponent,
    QuestionsComponent,
    QuestionDetailComponent,
    SearchInputComponent,
    BecomeAProComponent,
    TagComponent,
    ButtonFillComponent,
    AddQuestionModalComponent,
    TagInputComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptorService,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
