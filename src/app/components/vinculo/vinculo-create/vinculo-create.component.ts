import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Vinculo } from 'src/app/models/vinculo';
import { MensagemService } from 'src/app/services/mensagem.service';
import { VinculoService } from 'src/app/services/vinculo.service';

@Component({
  selector: 'app-vinculo-create',
  templateUrl: './vinculo-create.component.html',
  styleUrls: ['./vinculo-create.component.css']
})
export class VinculoCreateComponent implements OnInit {

  vinculoForm!: FormGroup;

  vinculo: Vinculo;

  constructor(
    private mensagemService: MensagemService,
    private vinculoService: VinculoService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.vinculo = new Vinculo();
    this.initForm();
  }

  create(): void {
    this.vinculo = this.vinculoForm.value;
    // Chamada do serviço para criar o usuário
    this.vinculoService.create(this.vinculo).subscribe({
      next: (resposta) => {
        this.mensagemService.showSuccessoMensagem(
          "Vinculo " + resposta.nome + " cadastrado com sucesso"
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

  initForm(): void {
    this.vinculoForm = this.formBuilder.group({
      nome: ["", Validators.required],
      descricao: ["",Validators.required],
      ativo: [null,Validators.required],
    });
  }
}