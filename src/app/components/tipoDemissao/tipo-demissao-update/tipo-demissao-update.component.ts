import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { TipoDemissao } from "src/app/models/tipoDemissao";
import { MensagemService } from "src/app/services/mensagem.service";
import { TipoDemissaoService } from "src/app/services/tipo-demissao.service";

@Component({
  selector: "app-tipo-demissao-update",
  templateUrl: "./tipo-demissao-update.component.html",
  styleUrls: ["./tipo-demissao-update.component.css"],
})
export class TipoDemissaoUpdateComponent implements OnInit {
  tipoDemissaoForm!: FormGroup;

  tipoDemissao: TipoDemissao;

  constructor(
    private mensagemService: MensagemService,
    private tipoDemissaoService: TipoDemissaoService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.tipoDemissao = new TipoDemissao();
    this.tipoDemissao.id = this.route.snapshot.paramMap.get("id");
    this.initForm();
    this.findById();
  }

  update(): void {
    // Atualizar os campos da instância de vinculo com os valores do formulário
    this.tipoDemissao.nome = this.tipoDemissaoForm.get("nome")?.value;
    this.tipoDemissao.descricao = this.tipoDemissaoForm.get("descricao")?.value;
    this.tipoDemissao.ativo = this.tipoDemissaoForm.get("ativo")?.value;

    this.tipoDemissaoService.update(this.tipoDemissao).subscribe({
      next: (resposta) => {
        this.mensagemService.showSuccessoMensagem(
          "Tipo de Demissão " + resposta.nome + " atualizado com sucesso"
        );
        this.router.navigate(["tiposDemisao"]);
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

  findById(): void {
    this.tipoDemissaoService
      .findById(this.tipoDemissao.id)
      .subscribe((resposta) => {
        this.tipoDemissao = resposta;
        this.initForm();
      });
  }

  initForm(): void {
    this.tipoDemissaoForm = this.formBuilder.group({
      nome: [this.tipoDemissao.nome, Validators.required],
      descricao: [this.tipoDemissao.descricao, Validators.required],
      ativo: [this.tipoDemissao.ativo, Validators.required],
    });
  }
}
