import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { first } from 'rxjs';
import { IStocksData } from 'src/app/interfaces/stocks';
import { LocalStorageService } from 'src/app/services/local-storage/local-storage.service';
import { StocksService } from 'src/app/services/stocks/stocks.service';

@Component({
  selector: 'app-stocks-reports-table',
  templateUrl: './stocks-reports-table.component.html',
  styleUrls: ['./stocks-reports-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StocksReportsTableComponent implements OnInit {
  public displayed_columns = [
    'position',
    'close',
    'date',
    'high',
    'low',
    'open',
    'symbol',
    'volume'
  ];

  constructor(public readonly stocks_service: StocksService, private readonly local_storage_service: LocalStorageService){}

  ngOnInit(): void {
    this.initialize_pagination();
  }

  private initialize_pagination(): void {
    this.stocks_service.page_number$.next(this.local_storage_service.getStocksPageNumber());
    this.stocks_service.per_page$.next(this.local_storage_service.getStocksPerPage());
  }

  public drop(event: CdkDragDrop<string, IStocksData>) {
    this.stocks_service.stocks$.pipe(first()).subscribe((stocks) => {
      const { previousIndex, currentIndex } = event;
      moveItemInArray(stocks, previousIndex, currentIndex);
      this.stocks_service.stocks$.next(stocks);
    });
  }
}
