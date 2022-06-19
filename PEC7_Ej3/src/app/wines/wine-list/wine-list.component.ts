import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';

import {
  debounceTime,
  switchMap,
  distinctUntilChanged,
  startWith,
  merge,
  share,
} from 'rxjs/operators';

import { WineService } from 'src/app/services/wine.service';

import { Wine } from '../../models/wine';
import { WineQuantityChange } from '../../models/wine-quantity-change';

@Component({
  selector: 'app-wine-list',
  templateUrl: './wine-list.component.html',
  styleUrls: ['./wine-list.component.css'],
})
export class WineListComponent implements OnInit {
  public wines$: Observable<Wine[]>;

  public searchString: string = '';
  private searchTerms: Subject<string> = new Subject();
  private reloadWineList: Subject<void> = new Subject();

  constructor(private wineService: WineService) {}

  ngOnInit(): void {
    this.wines$ = this.searchTerms.pipe(
      startWith(this.searchString),
      debounceTime(500),
      distinctUntilChanged(),
      merge(this.reloadWineList),
      switchMap((q) => this.wineService.getWines(this.searchString))
    );
  }

  onQuantityChange(change: WineQuantityChange) {
    this.wineService
      .changeQuantity(change.wine.id, change.changeInQuantity)
      .subscribe((res) => {
        console.log(res.msg);
        this.reloadWineList.next();
      });
  }

  search() {
    this.searchTerms.next(this.searchString);
  }

  onNew() {
    this.reloadWineList.next();
  }
}
