import { ChangeDetectorRef, Component, OnInit } from "@angular/core";
import { FormControl, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { forkJoin } from "rxjs";
import { RefreshTokenResponse } from "src/app/models/refreshTokenResponse";
import { Usuario } from "src/app/models/usuario";
import { AuthService } from "src/app/services/auth.service";
import { MensagemService } from "src/app/services/mensagem.service";
import { UserChangeService } from "src/app/services/user-change-service";
import { UsuarioService } from "src/app/services/usuario.service";

@Component({
  selector: "app-administracao",
  templateUrl: "./administracao.component.html",
  styleUrls: ["./administracao.component.css"],
})
export class AdministracaoComponent implements OnInit {
  usuario: Usuario;
  usuarioLogado: Usuario;
  usuarioTrocado: boolean = false;
  roles: string[] = [];
  
  loginComoUsuario: FormControl = new FormControl(null, Validators.email);

  constructor(
    public authService: AuthService,
    private router: Router,
    private mensagemService: MensagemService,
    private usuarioService: UsuarioService,
    private cdRef: ChangeDetectorRef,
    private userChangeService: UserChangeService
  ) {}

  ngOnInit(): void {
    this.carregarDadosIniciais();
  }

  private carregarDadosIniciais(): void {
    forkJoin([
      this.authService.getUserRoles(),
      this.usuarioService.obterDadosUsuario(),
    ]).subscribe({
      next: ([roles, usuario]) => {
        this.roles = roles;
        this.usuario = usuario;
        this.usuarioLogado = usuario;
        this.cdRef.markForCheck();
      },
      error: (error) => {
        this.mensagemService.showErrorMensagem(error.error.message);
      },
    });
  }

  logarComoUsuario(): void {
    if (this.loginComoUsuario) {
      this.authService.executarAcaoComoUsuario(this.loginComoUsuario.value).subscribe({
        next: (response) => {
          this.mensagemService.showSuccessoMensagem(response.message);
          this.usuarioTrocado = true;
          this.authService
            .trocarTokenComNovoUsuario(this.loginComoUsuario.value)
            .subscribe({
              next: (refreshTokenResponse: RefreshTokenResponse) => {
                localStorage.setItem("token", refreshTokenResponse.newToken);
                this.atualizarInformacoesUsuario(refreshTokenResponse.newToken);
                this.router.navigate(['home']);
              },
              error: (error) => {
                this.mensagemService.showErrorMensagem(error.error.message);
              },
            });
        },
        error: (error) => {
          this.mensagemService.showErrorMensagem(error.error.message);
          this.loginComoUsuario.reset;
        },
      });
    }
  }

  // Atualiza as informações do usuário com base no token
  private atualizarInformacoesUsuario(token: string): void {
    this.usuarioService.getUserInfo(token).subscribe({
      next: (userInfo: Usuario) => {
        this.usuario = userInfo;
        this.cdRef.markForCheck();
        this.userChangeService.notifyUserChanged();
      },
      error: (error) => {
        this.mensagemService.showErrorMensagem(error.error.message);
      },
    });
  }

  // validacao de campos
  validaCampos(): boolean {
    return (
      this.loginComoUsuario.valid
    );
  }
}
