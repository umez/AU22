import { Routes } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { CousesDataService } from "./services/courses-data.services";

export const coursesRoutes: Routes = [
  {
    path: '',
    providers: [CousesDataService],
    component: HomeComponent
  },
  // {
  //   path: ':courseUrl',
  //   component: CourseComponent
  // }
];
