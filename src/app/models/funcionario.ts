import { Cargo } from "./cargo";
import { DetalhesResponsavel } from "./detalhesResponsavel";
import { Pessoa } from "./pessoa";
import { Vinculo } from "./vinculo";

export class Funcionario {
    id?:    any;
    pessoa: Pessoa;
    cargo: Cargo;
    dataEntrada: Date;
    vinculo: Vinculo;
    responsavelAtual: DetalhesResponsavel;
  }