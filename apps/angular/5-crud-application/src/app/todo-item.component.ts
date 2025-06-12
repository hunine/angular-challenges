import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  effect,
  inject,
  input,
} from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { LetDirective } from '@ngrx/component';
import { provideComponentStore } from '@ngrx/component-store';

import { TodoItemStore } from './todo-item.store';
import { Todo } from './todo.model';

@Component({
  selector: 'app-todo-item',
  imports: [CommonModule, LetDirective, MatProgressSpinnerModule],
  providers: [provideComponentStore(TodoItemStore)],
  template: `
    <ng-container *ngrxLet="vm$ as vm">
      <mat-spinner
        [diameter]="20"
        color="primary"
        *ngIf="vm.loading"></mat-spinner>
      {{ vm.todo.title }}
      <button (click)="update(vm.todo.id)">Update</button>
      <button (click)="delete(vm.todo.id)">Delete</button>
      <div class="error" *ngIf="vm.error">
        An error has occured: {{ vm.error }}
      </div>
    </ng-container>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodoItemComponent {
  private readonly todoItemStore = inject(TodoItemStore);

  vm$ = this.todoItemStore.vm$;

  todo = input<Todo>();

  constructor() {
    effect(() => {
      this.todoItemStore.patchState({ todo: this.todo() });
    });
  }

  protected update(id: number) {
    this.todoItemStore.updateTodo(id);
  }

  protected delete(id: number) {
    this.todoItemStore.deleteTodo(id);
  }
}
