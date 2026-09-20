import { Component, OnInit, inject } from '@angular/core';
import { defaultDialogConfig } from '../shared/default-dialog-config';
import { EditCourseDialogComponent } from '../edit-course-dialog/edit-course-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { CoursesHttpService } from '../services/courses-http.service';
import { MatModules } from '../../mat.modules';
import { CoursesCardListComponent } from '../courses-card-list/courses-card-list.component';
import { CoursesStore } from '../store/courses.store';



@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  imports: [MatModules, CoursesCardListComponent]
})
export class HomeComponent implements OnInit {

  coursesStore = inject(CoursesStore);
  dialog = inject(MatDialog)

  ngOnInit() {
    // this.reload();

    console.log(this.coursesStore.entities)

    // if(this.coursesStore().length < 1 ) {
      // }
        this.coursesStore.fetchAllCourses();

  }

  reload() {

  }

  onAddCourse() {

    const dialogConfig = defaultDialogConfig();

    dialogConfig.data = {
      dialogTitle: "Create Course",
      mode: 'create'
    };

    this.dialog.open(EditCourseDialogComponent, dialogConfig);

  }


}
