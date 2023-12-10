import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Empresa } from 'src/app/models/empresa';
import { EmpresaService } from 'src/app/services/empresa.service';
import { MensagemService } from 'src/app/services/mensagem.service';

@Component({
  selector: 'app-empresa-delete',
  templateUrl: './empresa-delete.component.html',
  styleUrls: ['./empresa-delete.component.css']
})
export class EmpresaDeleteComponent implements OnInit {

  empresaForm!: FormGroup;
  empresa: Empresa;

  constructor(
    private empresaService: EmpresaService,
    private mensagemService: MensagemService,
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.empresa = new Empresa();
    this.empresa.id = this.route.snapshot.paramMap.get("id");
    this.initForm();
    this.findById();
  }

  findById(): void {
    this.empresaService.findById(this.empresa.id).subscribe((resposta) => {
      this.empresa = resposta;
      this.initForm();
    });
  }

  delete(): void {
    this.empresaService.delete(this.empresa.id).subscribe({
      next: () => {
        this.mensagemService.showSuccessoMensagem("Empresa apagada com sucesso");
        this.router.navigate(["empresas"]);
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
    this.empresaForm = this.formBuilder.group({
      nome: [{ value: this.empresa.nome || "", disabled: true }, Validators.required],
      cnpj: [{ value: this.empresa.cnpj || "", disabled: true }, Validators.required],
      telefone: [{ value: this.empresa.telefone || "", disabled: true }, Validators.required],
      endereco: this.formBuilder.group({
        numero: [{ value: this.empresa.endereco?.numero || "", disabled: true }, Validators.required],
        rua: [{ value: this.empresa.endereco?.rua || "", disabled: true }, Validators.required],
        bairro: [{ value: this.empresa.endereco?.bairro || "", disabled: true }, Validators.required],
        cidade: [{ value: this.empresa.endereco?.cidade || "", disabled: true }, Validators.required],
        cep: [{ value: this.empresa.endereco?.cep || "", disabled: true }, Validators.required],
        estado: [{ value: this.empresa.endereco?.estado || "", disabled: true }, Validators.required],
      }),
    });
  }
}