import { EntityMetadataMap, EntityDataModuleConfig } from '@ngrx/data';
import { Course } from './model/course';
import { CousesDataService } from './services/courses-data.services';

// Define your model
export interface Courses {
  courses: Course[]
}

// Map your entities
const entityMetadata: EntityMetadataMap = {
  Course: {

  } // NgRx Data assumes 'id' is the primary key by default
};

export const entityConfig: EntityDataModuleConfig = {
  entityMetadata
};
