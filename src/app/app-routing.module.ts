import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddCategoryComponent } from './components/admin/add-category/add-category.component';
import { AddQuestionComponent } from './components/admin/add-question/add-question.component';
import { AddQuizzesComponent } from './components/admin/add-quizzes/add-quizzes.component';
import { DashboardComponent } from './components/admin/dashboard/dashboard.component';
import { UpDateQuizComponent } from './components/admin/up-date-quiz/up-date-quiz.component';
import { UpdateQuestionComponent } from './components/admin/update-question/update-question.component';
import { ViewCategoriesComponent } from './components/admin/view-categories/view-categories.component';
import { ViewQuizQuestionsComponent } from './components/admin/view-quiz-questions/view-quiz-questions.component';
import { ViewQuizzesComponent } from './components/admin/view-quizzes/view-quizzes.component';
import { WelcomeComponent } from './components/admin/welcome/welcome.component';
import { InstructionsComponent } from './components/user/instructions/instructions.component';
import { LodeQuizComponent } from './components/user/lode-quiz/lode-quiz.component';
import { StartquizComponent } from './components/user/startquiz/startquiz.component';
import { UserDashboardComponent } from './components/user/user-dashboard/user-dashboard.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { SignupComponent } from './pages/signup/signup.component';
import { AdminGuard } from './userServices/allGard/admin.guard';
import { NormalGuard } from './userServices/allGard/normal.guard';

const routes: Routes = [
  {path:'', component:HomeComponent, pathMatch:'full'},
  {path:'signUp', component:SignupComponent,pathMatch:'full'},
  {path:'login', component:LoginComponent,pathMatch:'full'},
  {path:'admin', component:DashboardComponent, canActivate:[AdminGuard], 
  children:[
    {path:'',component:WelcomeComponent},
    {path:'profile',component:ProfileComponent},
    {path:'categories',component:ViewCategoriesComponent},
    {path:'addcategory',component:AddCategoryComponent},
    {path:'quizzes',component:ViewQuizzesComponent},
    {path:'addquizzes',component:AddQuizzesComponent},
    {path:'quiz/:quiz_id',component:UpDateQuizComponent},
    {path:'view-questions/:id/:title',component:ViewQuizQuestionsComponent},
    {path:'add-questions/:questions_id/:title',component:AddQuestionComponent},
    {path:'updatequestion/:questions_id/:title',component:UpdateQuestionComponent}
    
  ]},
  {path:'user-dashboard',component:UserDashboardComponent,canActivate:[NormalGuard],
  children:[
    {path:':category_id',component:LodeQuizComponent},
    {path:'instructions/:question_id',component:InstructionsComponent},
  ]
},
{path:'startquiz/:quez_id',component:StartquizComponent,canActivate:[NormalGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
