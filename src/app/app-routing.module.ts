import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "./auth/auth.guard";
import { ChamadoCreateComponent } from "./components/chamado/chamado-create/chamado-create.component";
import { ChamadoListComponent } from "./components/chamado/chamado-list/chamado-list.component";
import { ChamadoReadComponent } from "./components/chamado/chamado-read/chamado-read.component";
import { ChamadoUpdateComponent } from "./components/chamado/chamado-update/chamado-update.component";
import { ClienteCreateComponent } from "./components/cliente/cliente-create/cliente-create.component";
import { ClienteDeleteComponent } from "./components/cliente/cliente-delete/cliente-delete.component";
import { ClienteListComponent } from "./components/cliente/cliente-list/cliente-list.component";
import { ClienteUpdateComponent } from "./components/cliente/cliente-update/cliente-update.component";
import { HomeComponent } from "./components/home/home.component";
import { LoginComponent } from "./components/login/login.component";
import { NavComponent } from "./components/nav/nav.component";
import { TecnicoCreateComponent } from "./components/tecnico/tecnico-create/tecnico-create.component";
import { TecnicoDeleteComponent } from "./components/tecnico/tecnico-delete/tecnico-delete.component";
import { TecnicoListComponent } from "./components/tecnico/tecnico-list/tecnico-list.component";
import { TecnicoUpdateComponent } from "./components/tecnico/tecnico-update/tecnico-update.component";
import { PessoaCreateComponent } from "./components/pessoa/pessoa-create/pessoa-create.component";
import { PessoaListComponent } from "./components/pessoa/pessoa-list/pessoa-list.component";
import { PessoaUpdateComponent } from "./components/pessoa/pessoa-update/pessoa-update.component";
import { LoginAlterarComponent } from "./components/login/login-alterar/login-alterar.component";
import { LoginRecuperarComponent } from "./components/login/login-recuperar/login-recuperar.component";
import { PessoaDeleteComponent } from "./components/pessoa/pessoa-delete/pessoa-delete.component";
import { DepartamentoCreateComponent } from "./components/departamento/departamento-create/departamento-create.component";
import { DepartamentoListComponent } from "./components/departamento/departamento-list/departamento-list.component";
import { DepartamentoUpdateComponent } from "./components/departamento/departamento-update/departamento-update.component";
import { DepartamentoReadComponent } from "./components/departamento/departamento-read/departamento-read.component";
import { DepartamentoDeleteComponent } from "./components/departamento/departamento-delete/departamento-delete.component";
import { ResponsavelDepartamentoCreateComponent } from "./components/responsavel-departamento/responsavel-departamento-create/responsavel-departamento-create.component";
import { ResponsavelDepartamentoListComponent } from "./components/responsavel-departamento/responsavel-departamento-list/responsavel-departamento-list.component";
import { ResponsavelDepartamentoUpdateComponent } from "./components/responsavel-departamento/responsavel-departamento-update/responsavel-departamento-update.component";
import { ResponsavelDepartamentoDeleteComponent } from "./components/responsavel-departamento/responsavel-departamento-delete/responsavel-departamento-delete.component";
import { CargoCreateComponent } from "./components/cargo/cargo-create/cargo-create.component";
import { CargoListComponent } from "./components/cargo/cargo-list/cargo-list.component";
import { CargoUpdateComponent } from "./components/cargo/cargo-update/cargo-update.component";
import { CargoReadComponent } from "./components/cargo/cargo-read/cargo-read.component";
import { CargoDeleteComponent } from "./components/cargo/cargo-delete/cargo-delete.component";
import { FuncionarioListComponent } from "./components/funcionario/funcionario-list/funcionario-list.component";
import { FuncionarioDemissaoComponent } from './components/funcionario/funcionario-demissao/funcionario-demissao.component'; 
import { FuncionarioDescontoComponent } from './components/funcionario/funcionario-desconto/funcionario-desconto.component';
import { AdministracaoComponent } from "./components/administracao/administracao/administracao.component";
import { PessoaAlterarSenhaComponent } from "./components/pessoa/pessoa-alterar-senha/pessoa-alterar-senha.component";
import { RegistroPontoCreateComponent } from "./components/registro/registro-ponto-create/registro-ponto-create.component";
import { RegistroPontoListComponent } from "./components/registro/registro-ponto-list/registro-ponto-list.component";
import { RegistroPontoReadComponent } from "./components/registro/registro-ponto-read/registro-ponto-read.component";
import { EmpresaCreateComponent } from './components/empresa/empresa-create/empresa-create.component';
import { EmpresaListComponent } from './components/empresa/empresa-list/empresa-list.component';
import { EmpresaUpdateComponent } from './components/empresa/empresa-update/empresa-update.component';
import { EmpresaDeleteComponent } from './components/empresa/empresa-delete/empresa-delete.component';
import { VinculoCreateComponent } from './components/vinculo/vinculo-create/vinculo-create.component';
import { VinculoListComponent } from './components/vinculo/vinculo-list/vinculo-list.component';
import { VinculoUpdateComponent } from './components/vinculo/vinculo-update/vinculo-update.component'; 
import { VinculoDeleteComponent } from './components/vinculo/vinculo-delete/vinculo-delete.component';
import { TipoDemissaoCreateComponent } from './components/tipoDemissao/tipo-demissao-create/tipo-demissao-create.component'; 
import { TipoDemissaoListComponent } from './components/tipoDemissao/tipo-demissao-list/tipo-demissao-list.component';
import { TipoDemissaoUpdateComponent } from './components/tipoDemissao/tipo-demissao-update/tipo-demissao-update.component';
import { TipoDemissaoDeleteComponent } from './components/tipoDemissao/tipo-demissao-delete/tipo-demissao-delete.component';
import { TipoDescontoCreateComponent } from './components/tipoDesconto/tipo-desconto-create/tipo-desconto-create.component';
import { TipoDescontoListComponent } from './components/tipoDesconto/tipo-desconto-list/tipo-desconto-list.component';
import { TipoDescontoUpdateComponent } from './components/tipoDesconto/tipo-desconto-update/tipo-desconto-update.component';
import { TipoDescontoDeleteComponent } from './components/tipoDesconto/tipo-desconto-delete/tipo-desconto-delete.component';
import { FuncionarioGerarFolhaPagamentoComponent } from './components/funcionario/funcionario-gerar-folha-pagamento/funcionario-gerar-folha-pagamento.component';
import { FuncionarioGerarTodosFolhaPagamentoComponent } from './components/funcionario/funcionario-gerar-todos-folha-pagamento/funcionario-gerar-todos-folha-pagamento.component';








const routes: Routes = [
  { path: "login", component: LoginComponent },
  { path: "login-recuperar", component: LoginRecuperarComponent },
  { path: "login-alterar/:uid", component: LoginAlterarComponent },
  {
    path: "",
    component: NavComponent,
    canActivate: [AuthGuard],
    children: [
      { path: "home", component: HomeComponent },

      { path: "pessoas", component: PessoaListComponent },
      { path: "pessoas/create", component: PessoaCreateComponent },
      { path: "pessoas/update/:id", component: PessoaUpdateComponent },
      { path: "pessoas/delete/:id", component: PessoaDeleteComponent },
      {
        path: "pessoas/alterar-senha/:id",
        component: PessoaAlterarSenhaComponent,
      },

      { path: "funcionarios", component: FuncionarioListComponent },
      { path: "funcionarios/demissao/:id", component: FuncionarioDemissaoComponent },
      { path: "funcionarios/descontos/:id", component: FuncionarioDescontoComponent },
      { path: "funcionarios/gerar/:id", component: FuncionarioGerarFolhaPagamentoComponent },
      { path: "funcionarios/gerarTodos", component: FuncionarioGerarTodosFolhaPagamentoComponent },

      { path: "administracao", component: AdministracaoComponent },

      { path: "registros", component: RegistroPontoListComponent },
      { path: "registros/create", component: RegistroPontoCreateComponent },
      { path: "registros/read/:id", component: RegistroPontoReadComponent },

      { path: "departamentos", component: DepartamentoListComponent },
      { path: "departamentos/create", component: DepartamentoCreateComponent },
      {
        path: "departamentos/update/:id",
        component: DepartamentoUpdateComponent,
      },
      {
        path: "departamentos/delete/:id",
        component: DepartamentoDeleteComponent,
      },
      { path: "departamentos/read/:id", component: DepartamentoReadComponent },

      { path: "empresas", component: EmpresaListComponent },
      { path: "empresas/create", component: EmpresaCreateComponent },
      { path: "empresas/update/:id", component: EmpresaUpdateComponent },
      { path: "empresas/delete/:id", component: EmpresaDeleteComponent },

      { path: "vinculos", component: VinculoListComponent },
      { path: "vinculos/create", component: VinculoCreateComponent },
      { path: "vinculos/update/:id", component: VinculoUpdateComponent },
      { path: "vinculos/delete/:id", component: VinculoDeleteComponent },

      { path: "tiposDemissao", component: TipoDemissaoListComponent },
      { path: "tiposDemissao/create", component: TipoDemissaoCreateComponent },
      { path: "tiposDemissao/update/:id", component: TipoDemissaoUpdateComponent },
      { path: "tiposDemissao/delete/:id", component: TipoDemissaoDeleteComponent },

      { path: "tiposDesconto", component: TipoDescontoListComponent },
      { path: "tiposDesconto/create", component: TipoDescontoCreateComponent },
      { path: "tiposDesconto/update/:id", component:  TipoDescontoUpdateComponent },
      { path: "tiposDesconto/delete/:id", component: TipoDescontoDeleteComponent },
      
      { path: "cargos", component: CargoListComponent },
      { path: "cargos/create", component: CargoCreateComponent },
      { path: "cargos/update/:id", component: CargoUpdateComponent },
      { path: "cargos/delete/:id", component: CargoDeleteComponent },
      { path: "cargos/read/:id", component: CargoReadComponent },
      { path: "cargos/read/:id/update/:id", component: CargoUpdateComponent },
      { path: "cargos/read/:id/delete/:id", component: CargoDeleteComponent },

      {
        path: "responsavelDepartamentos",
        component: ResponsavelDepartamentoListComponent,
      },
      {
        path: "responsavelDepartamentos/create",
        component: ResponsavelDepartamentoCreateComponent,
      },
      {
        path: "responsavelDepartamentos/delete/:id",
        component: ResponsavelDepartamentoDeleteComponent,
      },
      {
        path: "responsavelDepartamentos/update/:id",
        component: ResponsavelDepartamentoUpdateComponent,
      },

      { path: "tecnicos", component: TecnicoListComponent },
      { path: "tecnicos/create", component: TecnicoCreateComponent },
      { path: "tecnicos/update/:id", component: TecnicoUpdateComponent },
      { path: "tecnicos/delete/:id", component: TecnicoDeleteComponent },

      { path: "clientes", component: ClienteListComponent },
      { path: "clientes/create", component: ClienteCreateComponent },
      { path: "clientes/update/:id", component: ClienteUpdateComponent },
      { path: "clientes/delete/:id", component: ClienteDeleteComponent },

      { path: "chamados", component: ChamadoListComponent },
      { path: "chamados/create", component: ChamadoCreateComponent },
      { path: "chamados/update/:id", component: ChamadoUpdateComponent },
      { path: "chamados/read/:id", component: ChamadoReadComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
