import { Routes } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { CoursesResolver } from "./courses.resolver";
import { provideState } from "@ngrx/store";
import { coursesReducer } from "./reducer";
import { CourseComponent } from "./course/course.component";

export const coursesRoutes: Routes = [
  {
    path: '',
    resolve: [CoursesResolver],
    providers: [
      provideState(
        { name: 'Courses', reducer: coursesReducer } // same as above
      ),

    ],
    component: HomeComponent
  },
  {
    path: ':courseUrl',
    component: CourseComponent
  }
];
