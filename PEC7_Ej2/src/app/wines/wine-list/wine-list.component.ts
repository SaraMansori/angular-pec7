import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';

import { debounceTime, switchMap,
  distinctUntilChanged, startWith, merge,
  share } from 'rxjs/operators';

import { WineService } from 'src/app/services/wine.service';

import { Wine } from "../../models/wine";
import { WineQuantityChange } from "../../models/wine-quantity-change";

@Component({
  selector: 'app-wine-list',
  template: `
    <div class="search">
      <input
        type="text" 
        name="searchBox"
        [(ngModel)]="searchString"
        placeholder="Search Here"
        (keyup)="search()">
    </div>
    <div class="list">
      <div *ngFor="let wine of wines$ | async">
          <app-wine-item (quantityChange) = "onQuantityChange($event)" [wine]="wine"></app-wine-item>
      </div>
    </div>
  `,
  styles: [`
    .list {
      display: flex;
      flex-wrap: wrap;
      margin: 20px;
    }
    .search {
      margin-top: 20px;
      display: flex;
      justify-content:center;
      align-items: center;
    }
  `]
})
export class WineListComponent implements OnInit {

  public wines$ : Observable<Wine[]>;

  public searchString: string = '';
  private searchTerms: Subject<string> = new Subject();
  private reloadWineList : Subject <void> = new Subject();

  constructor(private wineService: WineService) { }

  ngOnInit(): void {
    this.wines$ = this.searchTerms.pipe(
      startWith(this.searchString),
      debounceTime(500),
      distinctUntilChanged(),
      merge(this.reloadWineList),
      switchMap((q) => this.wineService.getWines(this.searchString)));
  }

  onQuantityChange(change: WineQuantityChange) {
    this.wineService.changeQuantity(change.wine.id, change.changeInQuantity)
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
