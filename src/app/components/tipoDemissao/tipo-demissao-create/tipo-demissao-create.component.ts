import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TipoDemissao } from 'src/app/models/tipoDemissao';
import { MensagemService } from 'src/app/services/mensagem.service';
import { TipoDemissaoService } from 'src/app/services/tipo-demissao.service';

@Component({
  selector: 'app-tipo-demissao-create',
  templateUrl: './tipo-demissao-create.component.html',
  styleUrls: ['./tipo-demissao-create.component.css']
})
export class TipoDemissaoCreateComponent implements OnInit {

  tipoDemissaoForm!: FormGroup;

  tipoDemissao: TipoDemissao;

  constructor(
    private mensagemService: MensagemService,
    private tipoDemissaoService: TipoDemissaoService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.tipoDemissao = new TipoDemissao();
    this.initForm();
  }

  create(): void {
    this.tipoDemissao = this.tipoDemissaoForm.value;
    // Chamada do serviço para criar o usuário
    this.tipoDemissaoService.create(this.tipoDemissao).subscribe({
      next: (resposta) => {
        this.mensagemService.showSuccessoMensagem(
          "tipoDemissao " + resposta.nome + " cadastrado com sucesso"
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

  initForm(): void {
    this.tipoDemissaoForm = this.formBuilder.group({
      nome: ["", Validators.required],
      descricao: ["",Validators.required],
      ativo: [null,Validators.required],
    });
  }
}