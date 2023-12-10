import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Departamento } from 'src/app/models/departamento';
import { Empresa } from 'src/app/models/empresa';
import { DepartamentoService } from 'src/app/services/departamento.service';
import { EmpresaService } from 'src/app/services/empresa.service';
import { MensagemService } from 'src/app/services/mensagem.service';

@Component({
  selector: 'app-departamento-update',
  templateUrl: './departamento-update.component.html',
  styleUrls: ['./departamento-update.component.css']
})
export class DepartamentoUpdateComponent implements OnInit {

  departamentoForm!: FormGroup;
  departamento: Departamento;
  empresas: Empresa[] = [];

  constructor(
    private departamentoService: DepartamentoService,
    private mensagemService: MensagemService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private empresaService: EmpresaService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.departamento = new Departamento();
    this.departamento.empresa = new Empresa();
    this.departamento.id = this.route.snapshot.paramMap.get("id");
    this.initForm();
    this.findById();
    this.findAllEmpresas();
  }

  findById(): void {
    this.departamentoService.findById(this.departamento.id).subscribe((resposta) => {
      this.departamento = resposta;
      this.initForm();
    });
  }

  // adiciona perfil ao usuário
  update(): void {
    
    this.departamento.nome = this.departamentoForm.get('nome')?.value;
    this.departamento.descricao = this.departamentoForm.get('descricao')?.value;
    this.departamento.empresa = this.departamentoForm.get('empresa')?.value;

    this.departamentoService.update(this.departamento).subscribe({
      next: () => {
        this.mensagemService.showSuccessoMensagem(
          "Departamento atualizado com sucesso"
        );
        this.router.navigate(["departamentos"]);
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
    this.departamentoForm = this.formBuilder.group({
      nome: [this.departamento.nome || "", Validators.required],
      descricao: [this.departamento.descricao || "", Validators.required],
      empresa: [this.departamento.empresa || "", Validators.required],
    });
  }

  findAllEmpresas(): void {
    this.empresaService.findAll().subscribe((resposta) => {
      this.empresas = resposta;
    });
  }

  compareEmpresas(empresa1: any, empresa2: any): boolean {
    return empresa1 && empresa2
      ? empresa1.id === empresa2.id
      : empresa1 === empresa2;
  }
}