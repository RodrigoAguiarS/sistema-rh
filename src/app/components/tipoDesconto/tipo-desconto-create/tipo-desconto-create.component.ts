import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TipoDesconto } from 'src/app/models/tipoDesconto';
import { MensagemService } from 'src/app/services/mensagem.service';
import { TipoDescontoService } from 'src/app/services/tipo-desconto.service';

@Component({
  selector: 'app-tipo-desconto-create',
  templateUrl: './tipo-desconto-create.component.html',
  styleUrls: ['./tipo-desconto-create.component.css']
})
export class TipoDescontoCreateComponent implements OnInit {

  tipoDescontoForm!: FormGroup;

  tipoDesconto: TipoDesconto;

  constructor(
    private mensagemService: MensagemService,
    private tipoDescontoService: TipoDescontoService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.tipoDesconto = new TipoDesconto();
    this.initForm();
  }

  create(): void {
    this.tipoDesconto = this.tipoDescontoForm.value;
    
    this.tipoDescontoService.create(this.tipoDesconto).subscribe({
      next: (resposta) => {
        this.mensagemService.showSuccessoMensagem(
          "tipoDesconto " + resposta.nome + " cadastrado com sucesso"
        );
        this.router.navigate(["tiposDesconto"]);
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
    this.tipoDescontoForm = this.formBuilder.group({
      nome: ["", Validators.required],
      descricao: ["",Validators.required],
      ativo: [null,Validators.required],
    });
  }
}
