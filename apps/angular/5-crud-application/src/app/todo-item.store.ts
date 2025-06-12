import { inject, Injectable } from '@angular/core';
import { ComponentStore, OnStoreInit } from '@ngrx/component-store';
import { tapResponse } from '@ngrx/operators';
import { pipe, switchMap, tap } from 'rxjs';

import { Todo } from './todo.model';
import { TodoService } from './todo.service';
import { TodosStore } from './todos.store';

interface TodoItemState {
  todo: Todo;
  loading: boolean;
  error: unknown;
}

@Injectable()
export class TodoItemStore
  extends ComponentStore<TodoItemState>
  implements OnStoreInit
{
  private readonly todoService = inject(TodoService);
  private readonly todosStore = inject(TodosStore);

  private readonly todo$ = this.select((state) => state.todo);
  private readonly loading$ = this.select((state) => state.loading);
  private readonly error$ = this.select((state) => state.error);

  readonly vm$ = this.select(
    {
      todo: this.todo$,
      loading: this.loading$,
      error: this.error$,
    },
    {
      debounce: true,
    },
  );

  private readonly startLoading = this.updater((state) => ({
    ...state,
    loading: true,
    error: '',
  }));

  private readonly stopLoading = this.updater((state) => ({
    ...state,
    loading: false,
  }));

  private readonly handleError = this.updater((state, error: unknown) => ({
    ...state,
    error,
    loading: false,
  }));

  readonly updateTodo = this.effect<number>(
    pipe(
      tap(() => this.startLoading()),
      switchMap((id) =>
        this.todoService.update(id).pipe(
          tapResponse({
            next: (todo) => {
              this.stopLoading();
              this.todosStore.updateTodo(todo);
            },
            error: (error: unknown) => {
              this.handleError(error);
            },
          }),
        ),
      ),
    ),
  );

  readonly deleteTodo = this.effect<number>(
    pipe(
      tap(() => this.startLoading()),
      switchMap((id) =>
        this.todoService.delete(id).pipe(
          tapResponse({
            next: () => this.todosStore.deleteTodo(id),
            error: (error: unknown) => this.handleError(error),
          }),
        ),
      ),
    ),
  );

  ngrxOnStoreInit() {
    this.setState({ todo: {} as Todo, loading: false, error: '' });
  }
}
