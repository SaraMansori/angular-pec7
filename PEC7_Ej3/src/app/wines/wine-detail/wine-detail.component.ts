import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Wine } from 'src/app/models/wine';
import { WineService } from 'src/app/services/wine.service';

@Component({
  selector: 'app-wine-detail',
  templateUrl: './wine-detail.component.html',
  styleUrls: ['./wine-detail.component.css'],
})
export class WineDetailComponent implements OnInit {
  public wine: Wine;

  constructor(
    private wineService: WineService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const wineCode = this.route.snapshot.paramMap.get('code');
    this.wineService.getWine(wineCode).subscribe((wine) => (this.wine = wine));
  }
}
