import { Asset } from './Asset';

export class CNPJUtils {
  // prettier-ignore
  public static list = new Map([
    ['MGLU3', new Asset('47.960.950/0001-21', 'MAGAZINE LUIZA SA', 'MGLU3')],
    ['MGLU3F', new Asset('47.960.950/0001-21', 'MAGAZINE LUIZA SA', 'MGLU3F')],
    ['AZUL4', new Asset('09.305.994/0001-29', 'AZUL SA ', 'AZUL4')],
    ['AZUL4F', new Asset('09.305.994/0001-29', 'AZUL SA ', 'AZUL4F')],
    ['BRSR6', new Asset('92.702.067/0001-96', 'BANRISUL', 'BRSR6')],
    ['BRSR6F', new Asset('92.702.067/0001-96', 'BANRISUL', 'BRSR6F')],
    ['LAME4', new Asset('33.014.556/0001-96', 'LOJAS AMERICANAS', 'LAME4')],
    ['LAME4F', new Asset('33.014.556/0001-96', 'LOJAS AMERICANAS', 'LAME4F')],
    ['TRIS3', new Asset('08.811.643/0001-27', 'TRISUL S A', 'TRIS3')],
    ['TRIS3F', new Asset('08.811.643/0001-27', 'TRISUL S A', 'TRIS3F')],
    ['ALSO3', new Asset('05.878.397/0001-32', 'ALIANSCE SONAE SHOPPING CENTERS S A', 'ALSO3')],
    ['ALSO3F', new Asset('05.878.397/0001-32', 'ALIANSCE SONAE SHOPPING CENTERS S A', 'ALSO3F')],
    ['NTCO3', new Asset('32.785.497/0001-97', 'NATURA CO HOLDING S A', 'NTCO3')],
    ['NTCO3F', new Asset('32.785.497/0001-97', 'NATURA CO HOLDING S A', 'NTCO3F')],
    ['MTRE3', new Asset('07.882.930/0001-65', 'MITRE REALTY EMPREENDIMENTOS E PARTICIPACOES S A ', 'MTRE3')],
    ['MTRE3F', new Asset('07.882.930/0001-65', 'MITRE REALTY EMPREENDIMENTOS E PARTICIPACOES S A ', 'MTRE3F')],
    ['GOAU4', new Asset('92.690.783/0001-09', 'METALURGICA GERDAU', 'GOAU4')],
    ['GOAU4F', new Asset('92.690.783/0001-09', 'METALURGICA GERDAU', 'GOAU4F')],
  ]);

  constructor() {}

  static getAssetBySymbol(symbol: string) {
    return this.list.get(symbol);
  }
}
