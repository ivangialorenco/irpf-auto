import { Component, Input, OnInit } from '@angular/core';
import { Asset } from 'src/app/models/Asset';
import { DataImport } from 'src/app/models/DataImport';

@Component({
  selector: 'cei-parser',
  templateUrl: './CEIParser.html',
  styleUrls: ['./CEIParser.scss'],
})
export class CEIParser implements OnInit {
  @Input()
  context: any;
  ceiData!: string;
  executing!: boolean;
  errors: any;

  public tableRows: DataImport[] = [];
  public tableHeaders: DataImport[] = [];
  public assetsConsolidated: Map<string, Asset> = new Map();
  public netSales: string = '';
  public formatter = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });

  ngOnInit() {
    this.ceiData = '';
  }

  dataChanged() {
    this.generateTable();
    this.calculateSales();
  }

  generateTable() {
    var data = this.ceiData;
    this.tableHeaders = [];
    this.tableRows = [];

    if (data == null) {
      return;
    }
    const rows = data.split('\n');

    let counter = 0;
    rows.forEach((row: string) => {
      const columns = row.split('\t');
      if (counter === 0) {
        this.tableHeaders.push(new DataImport(columns));
      } else {
        this.tableRows.push(new DataImport(columns));
      }
      counter += 1;
    });
  }

  calculateSales() {
    let sum: number = 0;
    this.assetsConsolidated = new Map();
    this.tableRows.forEach((row: DataImport) => {
      this.addToConsolidated(row);
      if (row.asset) {
        if (row.asset!.profit() > 0) {
          sum += row.asset!.profit();
        }
      }
    });

    this.netSales = this.formatter?.format(sum);
  }

  addToConsolidated(row: DataImport) {
    let asset = row.asset!;
    let simpleSymbol = asset.symbol.substring(0, asset.symbol.length - 1);
    let fractionSymbol = asset.symbol + 'F';

    if (this.assetsConsolidated.has(simpleSymbol)) {
      let foundAsset = this.assetsConsolidated.get(simpleSymbol);

      this.assetsConsolidated.set(
        foundAsset!.symbol,
        foundAsset!.consolidateAsset(asset, foundAsset!.symbol)
      );

      return;
    }

    if (this.assetsConsolidated.has(fractionSymbol)) {
      let foundAsset = this.assetsConsolidated.get(fractionSymbol);

      this.assetsConsolidated.set(
        asset.symbol,
        foundAsset!.consolidateAsset(asset, asset.symbol)
      );

      this.assetsConsolidated.delete(fractionSymbol);

      return;
    }

    this.assetsConsolidated.set(asset.symbol, asset);
  }
}
