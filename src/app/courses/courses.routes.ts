import { Routes } from "@angular/router";
import { HomeComponent } from "./home/home.component";

export const coursesRoutes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  // {
  //   path: ':courseUrl',
  //   component: CourseComponent
  // }
];
