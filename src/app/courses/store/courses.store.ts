import { patchState, signalStore, withComputed, withMethods, withProps, withState } from "@ngrx/signals";
// import { initialCoursesSlice } from "./courses.slice";
import { computed, inject } from "@angular/core";
import { CoursesHttpService } from "../services/courses-http.service";
import { withDevtools } from "@ngrx-toolkit/core";
import { pipe, switchMap, tap } from "rxjs";
import { rxMethod } from "@ngrx/signals/rxjs-interop";
import { tapResponse } from "@ngrx/operators";
import { setAllEntities, updateEntity, withEntities } from "@ngrx/signals/entities";
import { Course } from "../model/course";
import { EditCourse } from "./types";
import { initialCoursesSlice } from "./courses.slice";

export const CoursesStore = signalStore(
  withState(initialCoursesSlice),
  withEntities<Course>(),
  withProps(() => ({
    _coursesService: inject(CoursesHttpService)
  })),
  withComputed(({ entities }) => ({

    // coursesByCategory: computed(() => {
    //   return (category: string) => entities().filter(course => course.category === category) // this will be used to coursesStore.coursesByCategory()('BEGINNER')
    // })
    // const getBeginnerCourses = computed(() => data().filter(course => course.category === 'BEGINNER'));
    // const getAdvancedCourses = computed(() => data().filter(course => course.category === 'ADVANCED'));
    // const getPromoTotal = computed(() => data().filter(course => course.promo).length)
    // return {
    //   getBeginnerCourses,
    //   getAdvancedCourses,
    //   getPromoTotal
    // }
  })),
  withMethods(store => ({
    fetchAllCourses: rxMethod<void>(
      pipe(
        switchMap(
          () => store._coursesService.findAllCourses().pipe(
            tapResponse({
              next: (courses) => patchState(store, setAllEntities(courses)),
              error: (err) => console.log(err)
            })
          )
        )      )
    ),

    getCoursesByCategory(category: Course['category']) {
      return store.entities().filter(
        course => course.category === category
      );
    },

    editCourse: rxMethod<EditCourse>(
      pipe(
        tap(_ => patchState(store, {isLoading: true})),
        switchMap(({courseId, changes}) =>
          store._coursesService.saveCourse(courseId, changes).pipe(
            tapResponse({
              next: _ => patchState(
                store,
                updateEntity({
                  id: courseId,
                  changes
                })
              ),
              error: err => console.error(err),
              finalize: () => {
                patchState(store, {isLoading: false});
                setTimeout(() => {
                  patchState(store, {isLoading: null});
                })
              }
            })
          )
        )
      )
    )
    // fetchAllCourses: async () => {
    //   const courses = await firstValueFrom(store._coursesService.findAllCourses());
    //   console.log(courses);
    //   patchState(store, {courses})
    // }
  })),
  withDevtools('courses')
)
