import { Cargo } from "./cargo";
import { DetalhesResponsavel } from "./detalhesResponsavel";
import { Pessoa } from "./pessoa";
import { Vinculo } from "./vinculo";

export class Usuario {
    id?:         any;
    email:    string;
    senha:    string;
    pessoa:   Pessoa;
    perfis: string[];
    cargo:   Cargo;
    vinculo: Vinculo;
    dataEntrada: Date;
    ativo:      boolean;
    responsavelDepartamento: DetalhesResponsavel;
  }