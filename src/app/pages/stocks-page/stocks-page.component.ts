import { ChangeDetectionStrategy, Component } from '@angular/core';
import { StocksService } from 'src/app/services/stocks/stocks.service';

@Component({
  selector: 'app-stocks-page',
  templateUrl: './stocks-page.component.html',
  styleUrls: ['./stocks-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StocksPageComponent {
  constructor(public readonly stocks_service: StocksService) {}
}
