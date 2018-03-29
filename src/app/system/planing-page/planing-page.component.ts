import {Component, OnDestroy, OnInit} from '@angular/core';
import {BillService} from '../shared/systems/bill.service';
import {CategoriesService} from '../shared/systems/categories.service';
import {EventsService} from '../shared/systems/events.service';
import {Observable} from 'rxjs/Observable';
import {BillModel} from '../shared/models/bill.model';
import {WFMEvent} from '../shared/models/event.model';
import {Category} from '../shared/models/category.model';
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'wfm-planing-page',
  templateUrl: './planing-page.component.html',
  styleUrls: ['./planing-page.component.scss']
})
export class PlaningPageComponent implements OnInit, OnDestroy {

  sub1: Subscription;

  isLoaded = false;
  bill: BillModel;
  categories: Category[] = [];
  events: WFMEvent[] = [];

  constructor(private billService: BillService,
              private categoriesService: CategoriesService,
              private eventService: EventsService) { }

  ngOnInit() {
    this.sub1 = Observable.combineLatest(
      this.billService.getBill(),
      this.categoriesService.getCategories(),
      this.eventService.getEvent()
    ).subscribe((data: [BillModel, Category[], WFMEvent[]]) => {
      this.bill = data[0];
      this.categories = data[1];
      this.events = data[2];

      this.isLoaded = true;
    })
  }

  getCategoryCost (cat: Category): number {
    return this.events
      .filter(e => e.category === cat.id && e.type === 'outcome')
      .reduce((tot, e) => {
      return tot += e.amount;
    }, 0);
  }

  private getPercent(cat: Category): number {
    const percent = (100 * this.getCategoryCost(cat)) / cat.capacity;
    return percent > 100 ? 100 : percent;
  }

  getCatPercent(cat: Category) {
    return this.getPercent(cat) + '%';
  }

  getCatColorClass(cat: Category): string {
    const percent = this.getPercent(cat);
    return percent < 60 ? 'success' : percent >= 100 ? 'danger' : 'warning';
  }

  ngOnDestroy(){
    if (this.sub1) this.sub1.unsubscribe();
  }

}
