import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TipoDemissao } from 'src/app/models/tipoDemissao';
import { MensagemService } from 'src/app/services/mensagem.service';
import { TipoDemissaoService } from 'src/app/services/tipo-demissao.service';

@Component({
  selector: 'app-tipo-demissao-delete',
  templateUrl: './tipo-demissao-delete.component.html',
  styleUrls: ['./tipo-demissao-delete.component.css']
})
export class TipoDemissaoDeleteComponent implements OnInit {
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

  delete(): void {
    this.tipoDemissaoService.delete(this.tipoDemissao.id).subscribe({
      next: () => {
        this.mensagemService.showSuccessoMensagem(
          "Tipo Demissão deletado com sucesso"
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
    this.tipoDemissaoService.findById(this.tipoDemissao.id).subscribe((resposta) => {
      this.tipoDemissao = resposta;
      this.initForm();
    });
  }

  initForm(): void {
    this.tipoDemissaoForm = this.formBuilder.group({
      nome: [{ value: this.tipoDemissao.nome || "", disabled: true }, Validators.required],
      descricao: [{ value: this.tipoDemissao.descricao || "", disabled: true }, Validators.required],
      ativo: [{ value: this.tipoDemissao.ativo || "", disabled: true }, Validators.required],
    });
  }
}
