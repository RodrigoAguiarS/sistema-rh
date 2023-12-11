import { Component, OnInit } from '@angular/core';
import { Cargo } from 'src/app/models/cargo';
import { Departamento } from 'src/app/models/departamento';
import { DetalhesResponsavel } from 'src/app/models/detalhesResponsavel';
import { Empresa } from 'src/app/models/empresa';
import { Pessoa } from 'src/app/models/pessoa';
import { Usuario } from 'src/app/models/usuario';
import { UserChangeService } from 'src/app/services/user-change-service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  usuario: Usuario;

  constructor(private usuarioService: UsuarioService,
    private userChangeService: UserChangeService) { }

  ngOnInit(): void {
    this.buscarDadosUsuario();
    this.userChangeService.userChanged$.subscribe(() => {
      this.buscarDadosUsuario();
    });
  }

  private buscarDadosUsuario(): void {
    this.usuario = new Usuario();
    this.usuario.pessoa = new Pessoa();
    this.usuario.cargo = new Cargo();
    this.usuario.responsavelDepartamento = new DetalhesResponsavel();
    this.usuario.cargo.departamento = new Departamento();
    this.usuario.cargo.departamento.empresa = new Empresa();
    this.usuarioService.obterDadosUsuario().subscribe((dadosUsuario) => {
      this.usuario = dadosUsuario;
    });
  }
}