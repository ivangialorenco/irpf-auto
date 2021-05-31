import { Asset } from './Asset';
import { CNPJUtils } from './CNPJUtils';

export enum ImportIndex {
  codigo = 0,
  periodo,
  qtdCompra,
  qtdVenda,
  precoMedioCompra,
  precoMediaVenda,
  qtdLiquida,
  posicao,
}

export class DataImport {
  data: any[];
  isBensEDireitos?: boolean = false;
  irpfDescription!: string;
  asset?: Asset;

  constructor(data: any) {
    this.data = data;

    this.asset = CNPJUtils.getAssetBySymbol(this.data[ImportIndex.codigo]);
    if (!this.asset) {
      this.asset = new Asset(
        '',
        this.data[ImportIndex.codigo],
        this.data[ImportIndex.codigo]
      );
    }
    this.asset?.setData(this.data);
    this.irpfDescription = this.parseToIRPF();
  }

  parseToIRPF() {
    this.isBensEDireitos = this.asset?.isBensEDiretos();

    return `AÇÕES: ${this.asset?.netAmount()} ações de ${
      this.asset?.name
    }, código de negociação ${
      this.asset?.symbol
    }, adquiridas ao preço médio de ${this.asset?.mediumBuyPriceStr()}. Custo total de ${this.asset?.totalCostStr()}`;
  }
}
