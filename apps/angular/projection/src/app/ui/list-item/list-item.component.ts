import { Component, output } from '@angular/core';

@Component({
  selector: 'app-list-item',
  template: `
    <ng-content />
    <button (click)="delete.emit()">
      <img class="h-5" src="assets/svg/trash.svg" />
    </button>
  `,
  standalone: true,
  host: {
    class: 'border-grey-300 flex justify-between border px-2 py-1',
  },
})
export class ListItemComponent {
  delete = output();
}
