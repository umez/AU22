import { Course } from "../model/course";

export interface CoursesSlice {

  isLoading: boolean | null
}

export const initialCoursesSlice: CoursesSlice = {

  isLoading: null
}
