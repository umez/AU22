import { Course } from './model/course';
import { inject, Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { CoursesHttpService } from "./services/courses-http.service";
import { CoursesActions } from "./course.actions";
import { concatMap, map, switchMap } from "rxjs";

@Injectable()
export class CoursesEffect {

  private action$ = inject(Actions);

  private coursesService = inject(CoursesHttpService);

  loadCourses$ = createEffect(
    () => this.action$.pipe(
      ofType(CoursesActions.loadAllCourses),
      concatMap(action => this.coursesService.findAllCourses()),
      map(courses => CoursesActions.allCoursesLoaded({courses}))
    )
  )

  saveCourse$ = createEffect(
    () => this.action$.pipe(
      ofType(CoursesActions.updateCourse),
      concatMap(action => this.coursesService.saveCourse(
        action.update.id,
        action.update.changes
      ))
    ),
    {
      dispatch: false
    }
  )

}
