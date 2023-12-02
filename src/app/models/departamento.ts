import { DetalhesResponsavel } from "./detalhesResponsavel";

export class Departamento {
    id?:     any;
    nome: string;
    descricao: string;
    dataCriacao: Date;
    responsavelAtual: DetalhesResponsavel;
  }