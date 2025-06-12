import { ChangeDetectionStrategy, Component } from '@angular/core';

import { TodosComponent } from './todos.component';

@Component({
  imports: [TodosComponent],
  selector: 'app-root',
  template: `
    <app-todos></app-todos>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {}
