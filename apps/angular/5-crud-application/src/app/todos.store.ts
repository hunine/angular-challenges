import { randomErrorHttp } from '@angular-challenges/shared/utils';
import { inject, Injectable } from '@angular/core';
import {
  ComponentStore,
  OnStateInit,
  OnStoreInit,
} from '@ngrx/component-store';
import { tapResponse } from '@ngrx/operators';

import { pipe, switchMap, tap } from 'rxjs';
import { Todo } from './todo.model';
import { TodoService } from './todo.service';

interface TodosState {
  todos: Todo[];
  loading: boolean;
  error: unknown;
}

@Injectable()
export class TodosStore
  extends ComponentStore<TodosState>
  implements OnStoreInit, OnStateInit
{
  private readonly todoService = inject(TodoService);

  private readonly todos$ = this.select((state) => state.todos);
  private readonly loading$ = this.select((state) => state.loading);
  private readonly error$ = this.select((state) => state.error);

  readonly vm$ = this.select(
    {
      todos: this.todos$,
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

  private readonly stopLoading = this.updater((state, todos: Todo[]) => ({
    ...state,
    todos,
    loading: false,
  }));

  private readonly handleError = this.updater((state, error: unknown) => ({
    ...state,
    error,
    loading: false,
  }));

  readonly fetchTodos = this.effect<void>(
    pipe(
      tap(() => this.startLoading()),
      switchMap(() =>
        randomErrorHttp({
          httpRequest: () => this.todoService.getAllTodos(),
        }).pipe(
          tapResponse({
            next: (todos) => this.stopLoading(todos),
            error: (error: unknown) => this.handleError(error),
          }),
        ),
      ),
    ),
  );

  readonly updateTodo = this.updater((state, todo: Todo) => ({
    ...state,
    todos: state.todos.map((t) => (t.id === todo.id ? todo : t)),
  }));

  readonly deleteTodo = this.updater((state, id: number) => ({
    ...state,
    todos: state.todos.filter((todo) => todo.id !== id),
  }));

  ngrxOnStoreInit() {
    this.setState({ todos: [], loading: false, error: '' });
  }

  ngrxOnStateInit() {
    this.fetchTodos();
  }
}
