import { Cargo } from "./cargo";
import { DetalhesResponsavel } from "./detalhesResponsavel";
import { Pessoa } from "./pessoa";

export class Usuario {
    id?:         any;
    email:    string;
    senha:    string;
    pessoa:   Pessoa;
    perfis: string[];
    cargo:   Cargo;
    dataEntrada: Date;
    ativo:      boolean;
    responsavelDepartamento: DetalhesResponsavel;
  }