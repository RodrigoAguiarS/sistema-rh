import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { Vinculo } from "src/app/models/vinculo";
import { MensagemService } from "src/app/services/mensagem.service";
import { VinculoService } from "src/app/services/vinculo.service";

@Component({
  selector: "app-vinculo-update",
  templateUrl: "./vinculo-update.component.html",
  styleUrls: ["./vinculo-update.component.css"],
})
export class VinculoUpdateComponent implements OnInit {
  vinculoForm!: FormGroup;

  vinculo: Vinculo;

  constructor(
    private mensagemService: MensagemService,
    private vinculoService: VinculoService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.vinculo = new Vinculo();
    this.vinculo.id = this.route.snapshot.paramMap.get("id");
    this.initForm();
    this.findById();
  }

  update(): void {
    // Atualizar os campos da instância de vinculo com os valores do formulário
    this.vinculo.nome = this.vinculoForm.get("nome")?.value;
    this.vinculo.descricao = this.vinculoForm.get("descricao")?.value;
    this.vinculo.ativo = this.vinculoForm.get("ativo")?.value;

    this.vinculoService.update(this.vinculo).subscribe({
      next: (resposta) => {
        this.mensagemService.showSuccessoMensagem(
          "vinculo " + resposta.nome + " atualizado com sucesso"
        );
        this.router.navigate(["vinculos"]);
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
    this.vinculoService.findById(this.vinculo.id).subscribe((resposta) => {
      this.vinculo = resposta;
      this.initForm();
    });
  }

  initForm(): void {
    this.vinculoForm = this.formBuilder.group({
      nome: [this.vinculo.nome, Validators.required],
      descricao: [this.vinculo.descricao, Validators.required],
      ativo: [this.vinculo.ativo, Validators.required],
    });
  }
}
