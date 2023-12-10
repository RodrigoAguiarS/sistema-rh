import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Para trabalhar com formulários no Angular 12
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

// Para realizar requisições HTTP
import { HttpClientModule } from '@angular/common/http';

// Imports para componentes do Angular Material
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatRadioModule } from '@angular/material/radio';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatStepperModule } from '@angular/material/stepper';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatMenuModule } from '@angular/material/menu';

// Componentes do projeto
import { NavComponent } from './components/nav/nav.component';
import { HomeComponent } from './components/home/home.component';
import { HeaderComponent } from './components/header/header.component';
import { TecnicoListComponent } from './components/tecnico/tecnico-list/tecnico-list.component';
import { LoginComponent } from './components/login/login.component';
import { ToastrModule } from 'ngx-toastr';
import { AuthInterceptorProvider } from './interceptors/auth.interceptor';
import { TecnicoCreateComponent } from './components/tecnico/tecnico-create/tecnico-create.component';
import { NgxMaskModule } from 'ngx-mask';
import { TecnicoUpdateComponent } from './components/tecnico/tecnico-update/tecnico-update.component';
import { TecnicoDeleteComponent } from './components/tecnico/tecnico-delete/tecnico-delete.component';
import { ClienteCreateComponent } from './components/cliente/cliente-create/cliente-create.component';
import { ClienteDeleteComponent } from './components/cliente/cliente-delete/cliente-delete.component';
import { ClienteListComponent } from './components/cliente/cliente-list/cliente-list.component';
import { ClienteUpdateComponent } from './components/cliente/cliente-update/cliente-update.component';
import { ChamadoListComponent } from './components/chamado/chamado-list/chamado-list.component';
import { ChamadoCreateComponent } from './components/chamado/chamado-create/chamado-create.component';
import { ChamadoUpdateComponent } from './components/chamado/chamado-update/chamado-update.component';
import { ChamadoReadComponent } from './components/chamado/chamado-read/chamado-read.component';
import { PessoaCreateComponent } from './components/pessoa/pessoa-create/pessoa-create.component';
import { PessoaListComponent } from './components/pessoa/pessoa-list/pessoa-list.component';
import { LoginAlterarComponent } from './components/login/login-alterar/login-alterar.component';
import { LoginRecuperarComponent } from './components/login/login-recuperar/login-recuperar.component';
import { CPFPipe } from './cpf.pipe';
import { CurrencyPipe } from './currency.pipe';
import { TelefonePipe } from './telefone.pipe';
import { PessoaUpdateComponent } from './components/pessoa/pessoa-update/pessoa-update.component';
import { PessoaDeleteComponent } from './components/pessoa/pessoa-delete/pessoa-delete.component';
import { DepartamentoCreateComponent } from './components/departamento/departamento-create/departamento-create.component';
import { DepartamentoListComponent } from './components/departamento/departamento-list/departamento-list.component';
import { DepartamentoUpdateComponent } from './components/departamento/departamento-update/departamento-update.component';
import { DepartamentoReadComponent } from './components/departamento/departamento-read/departamento-read.component';
import { DepartamentoDeleteComponent } from './components/departamento/departamento-delete/departamento-delete.component';
import { ResponsavelDepartamentoCreateComponent } from './components/responsavel-departamento/responsavel-departamento-create/responsavel-departamento-create.component';
import { ResponsavelDepartamentoListComponent } from './components/responsavel-departamento/responsavel-departamento-list/responsavel-departamento-list.component';
import { ResponsavelDepartamentoUpdateComponent } from './components/responsavel-departamento/responsavel-departamento-update/responsavel-departamento-update.component';
import { ResponsavelDepartamentoDeleteComponent } from './components/responsavel-departamento/responsavel-departamento-delete/responsavel-departamento-delete.component';
import { CargoCreateComponent } from './components/cargo/cargo-create/cargo-create.component';
import { CargoListComponent } from './components/cargo/cargo-list/cargo-list.component';
import { CargoUpdateComponent } from './components/cargo/cargo-update/cargo-update.component';
import { CargoReadComponent } from './components/cargo/cargo-read/cargo-read.component';
import { CargoDeleteComponent } from './components/cargo/cargo-delete/cargo-delete.component';
import { FuncionarioListComponent } from './components/funcionario/funcionario-list/funcionario-list.component';
import { AdministracaoComponent } from './components/administracao/administracao/administracao.component';
import { PessoaAlterarSenhaComponent } from './components/pessoa/pessoa-alterar-senha/pessoa-alterar-senha.component';
import { RegistroPontoCreateComponent } from './components/registro/registro-ponto-create/registro-ponto-create.component';
import { RegistroPontoListComponent } from './components/registro/registro-ponto-list/registro-ponto-list.component';
import { RegistroPontoReadComponent } from './components/registro/registro-ponto-read/registro-ponto-read.component';
import { EmpresaCreateComponent } from './components/empresa/empresa-create/empresa-create.component';
import { EmpresaListComponent } from './components/empresa/empresa-list/empresa-list.component';
import { EmpresaUpdateComponent } from './components/empresa/empresa-update/empresa-update.component';
import { EmpresaDeleteComponent } from './components/empresa/empresa-delete/empresa-delete.component';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HomeComponent,
    HeaderComponent,
    TecnicoListComponent,
    LoginComponent,
    TecnicoCreateComponent,
    TecnicoUpdateComponent,
    TecnicoDeleteComponent,
    ClienteCreateComponent,
    ClienteDeleteComponent,
    ClienteListComponent,
    ClienteUpdateComponent,
    ChamadoListComponent,
    ChamadoCreateComponent,
    ChamadoUpdateComponent,
    ChamadoReadComponent,
    PessoaCreateComponent,
    PessoaListComponent,
    PessoaUpdateComponent,
    LoginAlterarComponent,
    LoginRecuperarComponent,
    CPFPipe,
    TelefonePipe,
    CurrencyPipe,
    PessoaUpdateComponent,
    PessoaDeleteComponent,
    DepartamentoCreateComponent,
    DepartamentoListComponent,
    DepartamentoUpdateComponent,
    DepartamentoReadComponent,
    DepartamentoDeleteComponent,
    ResponsavelDepartamentoCreateComponent,
    ResponsavelDepartamentoListComponent,
    ResponsavelDepartamentoUpdateComponent,
    ResponsavelDepartamentoDeleteComponent,
    CargoCreateComponent,
    CargoListComponent,
    CargoUpdateComponent,
    CargoReadComponent,
    CargoDeleteComponent,
    FuncionarioListComponent,
    AdministracaoComponent,
    PessoaAlterarSenhaComponent,
    RegistroPontoCreateComponent,
    RegistroPontoListComponent,
    RegistroPontoReadComponent,
    EmpresaCreateComponent,
    EmpresaListComponent,
    EmpresaUpdateComponent,
    EmpresaDeleteComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    // Forms
    FormsModule,
    ReactiveFormsModule,
    // Requisições http
    HttpClientModule,
    // Angular Material
    MatFormFieldModule,
    MatPaginatorModule,
    MatCheckboxModule,
    MatSnackBarModule,
    MatToolbarModule,
    MatSidenavModule,
    MatButtonModule,
    MatSelectModule,
    MatInputModule,
    MatRadioModule,
    MatTableModule,
    MatIconModule,
    MatListModule,
    MatCardModule,
    MatStepperModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatMenuModule,
    ToastrModule.forRoot({
      timeOut: 4000,
      closeButton: true,
      progressBar: true
    }),
    NgxMaskModule.forRoot()
  ],
  providers: [AuthInterceptorProvider, { provide: MAT_DATE_LOCALE, useValue: 'pt-BR' } ],
  bootstrap: [AppComponent]
})
export class AppModule { }
