import { createActionGroup, emptyProps, props } from "@ngrx/store";
import { Course } from "./model/course";
import { Update } from "@ngrx/entity";

export const CoursesActions = createActionGroup({
  source: 'Courses',
  events: {
    'Load All Courses': emptyProps(),
    'All Courses Loaded': props<{courses : Course[] }>(),
    'Update Course': props<{update: Update<Course>}>()
  }
});
