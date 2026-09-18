import { createFeatureSelector, createSelector } from "@ngrx/store";
import { CoursesState } from "./reducer";
import * as fromCourses from "./reducer/index";

export const selectCoursesState = createFeatureSelector<CoursesState>('Courses'); //get the complete state


export const getAllCourses = createSelector(
  selectCoursesState,
  fromCourses.selectAll
)

export const selectBeginnerCourses = createSelector(
  getAllCourses,
  courses => courses.filter(course => course.category === 'BEGINNER')
)


export const selectAdvancedCourses = createSelector(
  getAllCourses,
  courses => courses.filter(course => course.category === 'ADVANCED')
)

export const selectPromoTotal = createSelector(
  getAllCourses,
  courses => courses.filter(course => course.promo).length
)

export const areCoursesLoaded = createSelector(
  selectCoursesState,
  state => state.allCoursesLoaded
)
