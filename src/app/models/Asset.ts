import { DataImport, ImportIndex } from './DataImport';

export class Asset {
  public symbol!: string;
  public cnpj!: string;
  public name!: string;

  public mediumBuyPriceCalc!: number;
  public mediumSellPriceCalc!: number;
  public amountBuy!: number;
  public amountSell!: number;

  private formatter?;

  constructor(cnpj: string, name: string, symbol: string) {
    this.cnpj = cnpj;
    this.name = name;
    this.symbol = symbol;

    this.formatter = new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });
  }

  setData(data: any) {
    this.mediumBuyPriceCalc = +data[ImportIndex.precoMedioCompra].replace(
      /,/g,
      '.'
    );

    this.mediumSellPriceCalc = +data[ImportIndex.precoMediaVenda].replace(
      /,/g,
      '.'
    );

    this.amountBuy = +data[ImportIndex.qtdCompra];
    this.amountSell = +data[ImportIndex.qtdVenda];
  }

  netAmount() {
    return this.amountBuy - this.amountSell;
  }

  isBensEDiretos() {
    return this.netAmount() != 0;
  }

  totalCost() {
    return this.netAmount() * this.mediumBuyPriceCalc;
  }

  totalCostStr() {
    return this.formatter?.format(this.totalCost());
  }

  mediumBuyPriceStr() {
    return this.formatter?.format(this.mediumBuyPriceCalc);
  }

  profit() {
    var buyValue = this.amountSell * this.mediumBuyPriceCalc;
    var sellValue = this.amountSell * this.mediumSellPriceCalc;

    return sellValue - buyValue;
  }

  profitStr() {
    return this.formatter?.format(this.profit());
  }

  consolidateAsset(fractionAsset: Asset, symbol: string) {
    let consolidatedAsset: Asset = new Asset(this.cnpj, this.name, symbol);

    consolidatedAsset.amountBuy = this.amountBuy + fractionAsset.amountBuy;
    consolidatedAsset.amountSell = this.amountSell + fractionAsset.amountSell;
    consolidatedAsset.mediumBuyPriceCalc =
      (this.mediumBuyPriceCalc + fractionAsset.mediumBuyPriceCalc) / 2;

    if (fractionAsset.mediumSellPriceCalc > 0 && this.mediumSellPriceCalc) {
      consolidatedAsset.mediumSellPriceCalc =
        (this.mediumSellPriceCalc + fractionAsset.mediumSellPriceCalc) / 2;
    } else {
      consolidatedAsset.mediumSellPriceCalc =
        this.mediumSellPriceCalc + fractionAsset.mediumSellPriceCalc;
    }

    return consolidatedAsset;
  }
}
