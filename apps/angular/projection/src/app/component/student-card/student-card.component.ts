import { Component, inject } from '@angular/core';
import {
  FakeHttpService,
  randStudent,
} from '../../data-access/fake-http.service';
import { StudentStore } from '../../data-access/student.store';
import { CardComponent } from '../../ui/card/card.component';
import { CardRowDirective } from '../../ui/card/card.directive';
import { ListItemComponent } from '../../ui/list-item/list-item.component';

@Component({
  selector: 'app-student-card',
  template: `
    <app-card class="bg-light-green" [items]="students()" (add)="addStudent()">
      <img src="assets/img/student.webp" width="200px" />
      <ng-template cardRow let-student>
        <app-list-item (delete)="deleteStudent(student.id)">
          {{ student.firstName }}
        </app-list-item>
      </ng-template>
    </app-card>
  `,
  standalone: true,
  styles: [
    `
      .bg-light-green {
        background-color: rgba(0, 250, 0, 0.1);
      }
    `,
  ],
  imports: [CardComponent, ListItemComponent, CardRowDirective],
})
export class StudentCardComponent {
  http = inject(FakeHttpService);
  studentStore = inject(StudentStore);

  students = this.studentStore.students;

  constructor() {
    this.http.fetchStudents$.subscribe((s) => this.studentStore.addAll(s));
  }

  addStudent() {
    this.studentStore.addOne(randStudent());
  }

  deleteStudent(id: number) {
    this.studentStore.deleteOne(id);
  }
}
