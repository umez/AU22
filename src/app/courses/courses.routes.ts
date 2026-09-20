import { Routes } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { CourseComponent } from "./course/course.component";

export const coursesRoutes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: ':courseUrl',
    component: CourseComponent
  }
];
