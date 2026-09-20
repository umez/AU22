import { Course } from "../model/course";

export type EditCourse = {
  courseId: number;
  changes: Partial<Course>;
};
