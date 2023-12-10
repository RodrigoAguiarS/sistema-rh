import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { Departamento } from "src/app/models/departamento";
import { Empresa } from "src/app/models/empresa";
import { DepartamentoService } from "src/app/services/departamento.service";
import { EmpresaService } from "src/app/services/empresa.service";
import { MensagemService } from "src/app/services/mensagem.service";

@Component({
  selector: "app-departamento-create",
  templateUrl: "./departamento-create.component.html",
  styleUrls: ["./departamento-create.component.css"],
})
export class DepartamentoCreateComponent implements OnInit {

  departamento: Departamento;
  empresas: Empresa[] = [];
  departamentoForm!: FormGroup;

  constructor(
    private mensagemService: MensagemService,
    private departamentoService: DepartamentoService,
    private empresaService: EmpresaService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.departamento = new Departamento();
    this.initForm();
    this.findAllEmpresas();
  }

  create(): void {

    this.departamento = this.departamentoForm.value;
    // Chamada do serviço para criar o usuário
    this.departamentoService.create(this.departamento).subscribe({
      next: (resposta) => {
        this.mensagemService.showSuccessoMensagem(
          "Departamento " + resposta.nome + " cadastrado com sucesso"
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
      nome: ["", Validators.required],
      descricao: ["",Validators.required],
      empresa: ["",Validators.required],
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
