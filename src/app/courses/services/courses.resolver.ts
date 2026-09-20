import { ResolveFn } from "@angular/router";
import { inject } from "@angular/core";
import { CourseEntityService } from "./course.entity.service";
import { map } from "rxjs";

export const courseResolver = ()   => {
  const coursesService = inject(CourseEntityService);
  return coursesService.getAll().pipe(
    map(courses => !!courses)
  )

}
