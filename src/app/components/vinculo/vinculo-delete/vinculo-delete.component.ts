import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Vinculo } from 'src/app/models/vinculo';
import { MensagemService } from 'src/app/services/mensagem.service';
import { VinculoService } from 'src/app/services/vinculo.service';

@Component({
  selector: 'app-vinculo-delete',
  templateUrl: './vinculo-delete.component.html',
  styleUrls: ['./vinculo-delete.component.css']
})
export class VinculoDeleteComponent implements OnInit {

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

  delete(): void {
    this.vinculoService.delete(this.vinculo.id).subscribe({
      next: () => {
        this.mensagemService.showSuccessoMensagem(
          "vinculo deletado com sucesso"
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
      nome: [{ value: this.vinculo.nome || "", disabled: true }, Validators.required],
      descricao: [{ value: this.vinculo.descricao || "", disabled: true }, Validators.required],
      ativo: [{ value: this.vinculo.ativo || "", disabled: true }, Validators.required],
    });
  }
}
