import { Funcionario } from "./funcionario";

export interface FolhaPagamento {
    id?: any;
    funcionario: Funcionario;
    dataPagamento: Date;
    valorBruto: number;
    valorLiquido: number;
    totalDescontos: number;
    descontoInss: number;
    descontoValeTransporte: number;
    descontoPlanoDeSaude: number;
    descontoIrrf: number;
  }