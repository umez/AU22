import { createActionGroup, emptyProps, props } from "@ngrx/store";
import { Course } from "./model/course";

export const CoursesActions = createActionGroup({
  source: 'Courses',
  events: {
    'Load All Courses': emptyProps(),
    'All Courses Loaded': props<{courses : Course[] }>()
  }
});
