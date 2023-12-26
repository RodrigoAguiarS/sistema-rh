import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TipoDesconto } from 'src/app/models/tipoDesconto';
import { MensagemService } from 'src/app/services/mensagem.service';
import { TipoDescontoService } from 'src/app/services/tipo-desconto.service';

@Component({
  selector: 'app-tipo-desconto-update',
  templateUrl: './tipo-desconto-update.component.html',
  styleUrls: ['./tipo-desconto-update.component.css']
})
export class TipoDescontoUpdateComponent implements OnInit {

  tipoDescontoForm!: FormGroup;

  tipoDesconto: TipoDesconto;

  constructor(
    private mensagemService: MensagemService,
    private tipoDescontoService: TipoDescontoService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router
  ) {}


  ngOnInit(): void {
    this.tipoDesconto = new TipoDesconto();
    this.tipoDesconto.id = this.route.snapshot.paramMap.get("id");
    this.initForm();
    this.findById();
  }

  update(): void {
    // Atualizar os campos da instância de vinculo com os valores do formulário
    this.tipoDesconto.nome = this.tipoDescontoForm.get("nome")?.value;
    this.tipoDesconto.descricao = this.tipoDescontoForm.get("descricao")?.value;
    this.tipoDesconto.ativo = this.tipoDescontoForm.get("ativo")?.value;

    this.tipoDescontoService.update(this.tipoDesconto).subscribe({
      next: (resposta) => {
        this.mensagemService.showSuccessoMensagem(
          "Tipo de Demissão " + resposta.nome + " atualizado com sucesso"
        );
        this.router.navigate(["tiposDemissao"]);
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
    this.tipoDescontoService
      .findById(this.tipoDesconto.id)
      .subscribe((resposta) => {
        this.tipoDesconto = resposta;
        this.initForm();
      });
  }

  initForm(): void {
    this.tipoDescontoForm = this.formBuilder.group({
      nome: [this.tipoDesconto.nome, Validators.required],
      descricao: [this.tipoDesconto.descricao, Validators.required],
      ativo: [this.tipoDesconto.ativo, Validators.required],
    });
  }
}
