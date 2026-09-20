import {Component, Inject, ChangeDetectionStrategy, inject, effect} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Course} from '../model/course';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {Observable} from 'rxjs';
import {CoursesHttpService} from '../services/courses-http.service';
import { MatModules } from '../../mat.modules';
import { AsyncPipe, CommonModule } from '@angular/common';
import { CoursesStore } from '../store/courses.store';

@Component({
    selector: 'course-dialog',
    templateUrl: './edit-course-dialog.component.html',
    styleUrls: ['./edit-course-dialog.component.css'],
    imports: [MatModules, AsyncPipe, CommonModule, ReactiveFormsModule]
})
export class EditCourseDialogComponent {

  form!: FormGroup;

  dialogTitle: string;

  course: Course;

  mode: 'create' | 'update';

  loading$!:Observable<boolean>;

  store = inject(CoursesStore);



  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<EditCourseDialogComponent>,
    @Inject(MAT_DIALOG_DATA) data: any,
    private coursesService: CoursesHttpService) {

    this.dialogTitle = data.dialogTitle;
    this.course = data.course;
    this.mode = data.mode;

    const formControls = {
      description: ['', Validators.required],
      category: ['', Validators.required],
      longDescription: ['', Validators.required],
      promo: ['', []]
    };

    if (this.mode == 'update') {
      this.form = this.fb.group(formControls);
      this.form.patchValue({...data.course});
    }
    else if (this.mode == 'create') {
      this.form = this.fb.group({
        ...formControls,
        url: ['', Validators.required],
        iconUrl: ['', Validators.required]
      });
    }

    effect(() => {
      if(this.store.isLoading() === false ) {
        this.dialogRef.close()
      }
    })
  }

  onClose() {
    this.dialogRef.close();
  }

  async onSave() {

    const course: Course = {
      ...this.course,
      ...this.form.value
    };

    await this.store.editCourse({courseId: course.id, changes: course})
    // this.dialogRef.close()
    // this.coursesService.saveCourse(course.id, course)
    //   .subscribe(
    //     () => this.dialogRef.close()
    //   )


  }


}
