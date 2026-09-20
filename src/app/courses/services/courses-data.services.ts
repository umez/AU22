import { DefaultDataService, HttpUrlGenerator } from "@ngrx/data";
import { Course } from "../model/course";
import { inject, Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable()
export class CousesDataService extends DefaultDataService<Course> {

  constructor(httpClient: HttpClient, httpUrlGenerator: HttpUrlGenerator) {
    super('Course', httpClient, httpUrlGenerator)
  }

}
