import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { Pessoa } from "src/app/models/pessoa";
import { Usuario } from "src/app/models/usuario";
import { MensagemService } from "src/app/services/mensagem.service";
import { PessoaService } from "src/app/services/pessoa.service";

@Component({
  selector: "app-pessoa-alterar-senha",
  templateUrl: "./pessoa-alterar-senha.component.html",
  styleUrls: ["./pessoa-alterar-senha.component.css"],
})
export class PessoaAlterarSenhaComponent implements OnInit {

  recuperarForm!: FormGroup;
  usuario: Usuario;
  hide: boolean = true;

  constructor(
    private pessoaService: PessoaService,
    private mensagemService: MensagemService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.usuario = new Usuario();
    this.usuario.pessoa = new Pessoa();
    this.usuario.id = this.route.snapshot.paramMap.get("id");
    this.initForm();
    this.findById();
  }

  initForm(): void {
    this.recuperarForm = this.formBuilder.group({
      novaSenha: ["", Validators.required],
      confirmarSenha: ["", [Validators.required, this.confirmValidator]],
    });
  }

  findById(): void {
    this.pessoaService.findById(this.usuario.id).subscribe((resposta) => {
      resposta.perfis = [];
      this.usuario = resposta;
      this.usuario.senha = "";
      this.recuperarForm.patchValue(resposta);
    });
  }

  update(): void {
    this.pessoaService.alterarSenha(this.usuario).subscribe({
      next: () => {
        this.mensagemService.showSuccessoMensagem("Senha alterada com sucesso");
        this.router.navigate(["home"]);
      },
      error: (ex) => {
        if (ex.error.errors) {
          ex.error.errors.forEach((element) => {
            this.mensagemService.showErrorMensagem(element.message);
          });
        } else {
          this.mensagemService.showErrorMensagem(ex.error.message);
        }
      },
    });
  }

  confirmValidator = (control: FormGroup): { [s: string]: boolean } => {
    if (!control.value) {
      return { error: true, required: true };
    } else if (
      control.value !== this.recuperarForm.controls["novaSenha"].value
    ) {
      return { confirm: true, error: true };
    }
    return {};
  };

  checkPasswordMatch(): void {
    const novaSenha = this.recuperarForm.get("novaSenha").value;
    const confirmarSenha = this.recuperarForm.get("confirmarSenha").value;

    if (confirmarSenha !== novaSenha) {
      this.mensagemService.showErrorMensagem("As senhas não são iguais");
    }
  }

  togglePasswordVisibility(): void {
    this.hide = !this.hide;
  }
}