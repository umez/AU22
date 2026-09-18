import {Component, OnInit, ChangeDetectionStrategy, inject} from '@angular/core';
import {compareCourses, Course} from '../model/course';
import {Observable} from "rxjs";
import {defaultDialogConfig} from '../shared/default-dialog-config';
import {EditCourseDialogComponent} from '../edit-course-dialog/edit-course-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import {map, shareReplay} from 'rxjs/operators';
import {CoursesHttpService} from '../services/courses-http.service';
import { MatModules } from '../../mat.modules';
import { AsyncPipe } from '@angular/common';
import { CoursesCardListComponent } from '../courses-card-list/courses-card-list.component';
import { select, Store } from '@ngrx/store';
import { getAllCourses, selectAdvancedCourses, selectBeginnerCourses, selectPromoTotal } from '../courses.selectors';



@Component({
    selector: 'home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css'],
    imports: [MatModules, AsyncPipe,  CoursesCardListComponent]
})
export class HomeComponent implements OnInit {

    promoTotal$!: Observable<number>;

    beginnerCourses$!: Observable<Course[]>;

    advancedCourses$!: Observable<Course[]>;

    store = inject(Store);

    constructor(
      private dialog: MatDialog,
      private coursesHttpService: CoursesHttpService) {

    }

    ngOnInit() {
      this.reload();
    }

  reload() {

    this.beginnerCourses$ = this.store.pipe(
      select(selectBeginnerCourses)
    )

    this.advancedCourses$ = this.store.pipe(
      select(selectAdvancedCourses)
    )

    this.promoTotal$ = this.store.pipe(
      select(selectPromoTotal)
    )

    // const courses$ = this.coursesHttpService.findAllCourses()
    //   .pipe(
    //     map(courses => courses.sort(compareCourses)),
    //     shareReplay()
    //   );

    // this.loading$ = courses$.pipe(map(courses => !!courses));

    // this.beginnerCourses$ = courses$
    //   .pipe(
    //     map(courses => courses.filter(course => course.category == 'BEGINNER'))
    //   );


    // this.advancedCourses$ = courses$
    //   .pipe(
    //     map(courses => courses.filter(course => course.category == 'ADVANCED'))
    //   );

    // this.promoTotal$ = courses$
    //     .pipe(
    //         map(courses => courses.filter(course => course.promo).length)
    //     );

  }

  onAddCourse() {

    const dialogConfig = defaultDialogConfig();

    dialogConfig.data = {
      dialogTitle:"Create Course",
      mode: 'create'
    };

    this.dialog.open(EditCourseDialogComponent, dialogConfig);

  }


}
