import { NgTemplateOutlet } from '@angular/common';
import {
  Component,
  contentChild,
  input,
  output,
  TemplateRef,
} from '@angular/core';
import { CardRowDirective } from './card.directive';

@Component({
  selector: 'app-card',
  template: `
    <ng-content select="img" />

    <section>
      @for (item of items(); track item.id) {
        <ng-template
          [ngTemplateOutlet]="cardRow()"
          [ngTemplateOutletContext]="{ $implicit: item }" />
      }
    </section>

    <button
      class="rounded-sm border border-blue-500 bg-blue-300 p-2"
      (click)="add.emit()">
      Add
    </button>
  `,
  standalone: true,
  imports: [NgTemplateOutlet],
  host: {
    class: 'flex w-fit flex-col gap-3 rounded-md border-2 border-black p-4',
  },
})
export class CardComponent<T extends { id: number }> {
  items = input.required<T[]>();
  add = output();
  cardRow = contentChild.required(CardRowDirective, { read: TemplateRef });
}
