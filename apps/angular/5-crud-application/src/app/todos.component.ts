import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { LetDirective } from '@ngrx/component';
import { provideComponentStore } from '@ngrx/component-store';

import { TodoItemComponent } from './todo-item.component';
import { TodosStore } from './todos.store';

@Component({
  selector: 'app-todos',
  imports: [
    CommonModule,
    LetDirective,
    MatProgressSpinnerModule,
    TodoItemComponent,
  ],
  providers: [provideComponentStore(TodosStore)],
  template: `
    <ng-container *ngrxLet="vm$ as vm">
      <mat-spinner
        [diameter]="20"
        color="primary"
        *ngIf="vm.loading"></mat-spinner>
      <ng-container *ngIf="vm.error; else noError">
        Error: {{ vm.error }}
      </ng-container>
      <ng-template #noError>
        <app-todo-item
          *ngFor="let todo of vm.todos"
          [todo]="todo"></app-todo-item>
      </ng-template>
    </ng-container>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodosComponent {
  private readonly todosStore = inject(TodosStore);

  vm$ = this.todosStore.vm$;
}
