import { inject, Injectable } from "@angular/core";
import { EntityCollectionServiceBase, EntityCollectionServiceElementsFactory, EntityCollectionServiceFactory } from "@ngrx/data";
import { Course } from "../model/course";

@Injectable({
  providedIn: 'root'
})
export class CourseEntityService extends EntityCollectionServiceBase<Course>{


  constructor( serviceElementFactory: EntityCollectionServiceElementsFactory) {
    super('Course', serviceElementFactory);
  }

}
