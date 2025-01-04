import { Component, inject } from '@angular/core';
import {
  FakeHttpService,
  randTeacher,
} from '../../data-access/fake-http.service';
import { TeacherStore } from '../../data-access/teacher.store';
import { CardComponent } from '../../ui/card/card.component';
import { CardRowDirective } from '../../ui/card/card.directive';
import { ListItemComponent } from '../../ui/list-item/list-item.component';

@Component({
  selector: 'app-teacher-card',
  template: `
    <app-card class="bg-light-red" [items]="teachers()" (add)="addTeacher()">
      <img src="assets/img/teacher.png" width="200px" />

      <ng-template cardRow let-teacher>
        <app-list-item (delete)="deleteTeacher(teacher.id)">
          {{ teacher.firstName }}
        </app-list-item>
      </ng-template>
    </app-card>
  `,
  styles: [
    `
      .bg-light-red {
        background-color: rgba(250, 0, 0, 0.1);
      }
    `,
  ],
  standalone: true,
  imports: [CardComponent, CardRowDirective, ListItemComponent],
})
export class TeacherCardComponent {
  http = inject(FakeHttpService);
  teacherStore = inject(TeacherStore);

  teachers = this.teacherStore.teachers;

  constructor() {
    this.http.fetchTeachers$.subscribe((t) => this.teacherStore.addAll(t));
  }

  addTeacher() {
    this.teacherStore.addOne(randTeacher());
  }

  deleteTeacher(id: number) {
    this.teacherStore.deleteOne(id);
  }
}
