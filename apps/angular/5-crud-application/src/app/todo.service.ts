import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { randText } from '@ngneat/falso';
import { Todo } from './todo.model';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  constructor(private readonly http: HttpClient) {}

  getAllTodos() {
    return this.http.get<Todo[]>('https://jsonplaceholder.typicode.com/todos');
  }

  update(id: number) {
    return this.http.put<Todo>(
      `https://jsonplaceholder.typicode.com/todos/${id}`,
      JSON.stringify({
        title: randText(),
      }),
      {
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      },
    );
  }

  delete(id: number) {
    return this.http.delete<Todo>(
      `https://jsonplaceholder.typicode.com/todos/${id}`,
    );
  }
}
