import { Component, inject } from '@angular/core';
import { CityStore } from '../../data-access/city.store';
import {
  FakeHttpService,
  randomCity,
} from '../../data-access/fake-http.service';
import { CardComponent } from '../../ui/card/card.component';
import { CardRowDirective } from '../../ui/card/card.directive';
import { ListItemComponent } from '../../ui/list-item/list-item.component';

@Component({
  selector: 'app-city-card',
  template: `
    <app-card class="bg-light-purple" [items]="cities()" (add)="addCity()">
      <img src="assets/img/city.png" width="200px" />
      <ng-template cardRow let-city>
        <app-list-item (delete)="deleteCity(city.id)">
          {{ city.name }}
        </app-list-item>
      </ng-template>
    </app-card>
  `,
  standalone: true,
  styles: [
    `
      .bg-light-purple {
        background-color: rgba(0, 0, 250, 0.1);
      }
    `,
  ],
  imports: [CardComponent, ListItemComponent, CardRowDirective],
})
export class CityCardComponent {
  http = inject(FakeHttpService);
  cityStore = inject(CityStore);

  cities = this.cityStore.cities;

  constructor() {
    this.http.fetchCities$.subscribe((s) => this.cityStore.addAll(s));
  }

  addCity() {
    this.cityStore.addOne(randomCity());
  }

  deleteCity(id: number) {
    this.cityStore.deleteOne(id);
  }
}
