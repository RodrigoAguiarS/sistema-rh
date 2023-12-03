import { Cargo } from "./cargo";
import { DetalhesResponsavel } from "./detalhesResponsavel";
import { Pessoa } from "./pessoa";

export class Funcionario {
    id?:    any;
    pessoa: Pessoa;
    cargo: Cargo;
    dataAdmissao: Date;
    responsavelAtual: DetalhesResponsavel;
  }