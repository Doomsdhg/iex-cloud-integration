import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { combineLatest, first, map } from 'rxjs';
import { LocalStorageService } from 'src/app/services/local-storage/local-storage.service';
import { StocksService } from 'src/app/services/stocks/stocks.service';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent {
  public per_page_form = new FormControl<number>(this.local_storage_service.getStocksPerPage());
  public per_page_options = [10, 20, 30];

  constructor(public readonly stocks_service: StocksService, private readonly local_storage_service: LocalStorageService) {
    this.per_page_form.valueChanges.subscribe((value) => {
      if (value) {
        this.stocks_service.per_page$.next(value);
        this.local_storage_service.setStocksPerPage(value);
      }
    })
  }

  public prev_button_disabled$ = this.stocks_service.page_number$.pipe(map((current_page) => current_page === 1));
  public next_button_disabled$ = combineLatest(
    [this.stocks_service.stocks$, this.stocks_service.per_page$]
  ).pipe(
    map(([stocks, per_page]) => stocks.length < per_page || !stocks.length)
  )

  public changePage(offset: number) {
    this.stocks_service.page_number$.pipe(first()).subscribe((current_page) => {
      this.stocks_service.page_number$.next(current_page + offset);
      this.local_storage_service.setStocksPageNumber(current_page + offset);
    })
  }
}
