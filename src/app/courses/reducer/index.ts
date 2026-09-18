import { areCoursesLoaded } from './../courses.selectors';
import { createReducer, on } from "@ngrx/store";
import { compareCourses, Course } from "../model/course";
import {createEntityAdapter, EntityState} from '@ngrx/entity';
import { CoursesActions } from "../course.actions";


// export interface CoursesState {
//   entities: {[key: number]: Course},
//   ids: number[]
// } // same as below using ngrx entity state

export interface CoursesState extends EntityState<Course> {
  allCoursesLoaded: boolean
}

export const adapter = createEntityAdapter<Course>({
  sortComparer: compareCourses,
  // selectId: (course:Course) => course.seqNo // usually takes the id but can be set to different keys
}); // for crud operation in the store

export const initialCoursesState = adapter.getInitialState({
  allCoursesLoaded: false
}); // generate initials state


export const coursesReducer = createReducer(
  initialCoursesState,
  on(
    CoursesActions.allCoursesLoaded,
    (state, action) => adapter.addMany(action.courses, {
      ...state,
      allCoursesLoaded: true
    })

  )
)

export const {selectAll} = adapter.getSelectors(); // this is utils to get the data from entitie object easily
