import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { IStocksData } from 'src/app/interfaces/stocks';
import { ApiService } from 'src/app/services/api/api.service';

@Component({
  selector: 'app-stocks-reports-table',
  templateUrl: './stocks-reports-table.component.html',
  styleUrls: ['./stocks-reports-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StocksReportsTableComponent implements OnInit {

  @ViewChild('table', { static: true }) table!: MatTable<IStocksData>;

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

  private page = 1;
  private per_page = 10;

  public drag_disabled = true;

  public datasource = new MatTableDataSource<IStocksData>([]);

  constructor(private readonly api: ApiService, private readonly cdr: ChangeDetectorRef){}

  ngOnInit(): void {
    this.refreshData();
  }

  private async refreshData(): Promise<void> {
    this.datasource = new MatTableDataSource((await this.api.getStocksData(this.page, this.per_page)) || []);
    this.cdr.detectChanges();
  }

  public drop(event: CdkDragDrop<string, IStocksData>) {
    const { previousIndex, currentIndex } = event;
    moveItemInArray(this.datasource.data, previousIndex, currentIndex);
    this.table.renderRows();
  }
}
