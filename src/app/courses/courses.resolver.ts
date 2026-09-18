import { ResolveFn } from "@angular/router";
import { CoursesHttpService } from "./services/courses-http.service";
import { inject } from "@angular/core";
import { select, Store } from "@ngrx/store";
import { filter, finalize, first, tap } from "rxjs";
import { CoursesActions } from "./course.actions";
import { areCoursesLoaded } from "./courses.selectors";

export const CoursesResolver: ResolveFn<any> = () => {
  const store = inject(Store)
  let loading = false; // this check is for avoiding multiple dispatch caused by route transistion
  return store.pipe(
    select(
      areCoursesLoaded
    ),
    tap(coursesLoaded => {
      if(!loading && !coursesLoaded) {
        loading = true;
        store.dispatch(CoursesActions.loadAllCourses());
      }
    }),
    filter(coursesLoaded => coursesLoaded),
    first(),
    finalize(() => loading = false)
  )
}
