import { Routes } from '@angular/router';
import { LoginComponent } from '../components/login/login.component';
import { TasksComponent } from '../components/tasks/tasks.component';

export const routes: Routes = [
    {
        path:'',
        redirectTo:'app-login',
        pathMatch:'full'
    },{
        path:'app-login',
        component:LoginComponent
    },{
        path:'app-tasks',
        component:TasksComponent
    }
];
