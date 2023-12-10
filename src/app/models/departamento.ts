import { DetalhesResponsavel } from "./detalhesResponsavel";
import { Empresa } from "./empresa";

export class Departamento {
    id?:     any;
    nome: string;
    descricao: string;
    dataCriacao: Date;
    responsavelAtual: DetalhesResponsavel;
    empresa: Empresa;
  }