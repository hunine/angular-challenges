import { Component } from '@angular/core';
import { DashPipe } from './dash.pipe';

@Component({
  selector: 'app-root',
  imports: [DashPipe],
  template: `
    @for (person of persons; track person) {
      {{ person | dash: $index }}
    }
  `,
})
export class AppComponent {
  persons = ['toto', 'jack'];
}
