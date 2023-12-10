import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { Empresa } from "src/app/models/empresa";
import { EnderecoResposta } from "src/app/models/enderecoReposta";
import { EmpresaService } from "src/app/services/empresa.service";
import { EnderecoService } from "src/app/services/endereco.service";
import { MensagemService } from "src/app/services/mensagem.service";

@Component({
  selector: "app-empresa-create",
  templateUrl: "./empresa-create.component.html",
  styleUrls: ["./empresa-create.component.css"],
})
export class EmpresaCreateComponent implements OnInit {
  empresaForm!: FormGroup;
  empresa: Empresa;

  constructor(
    private empresaService: EmpresaService,
    private enderecoService: EnderecoService,
    private mensagemService: MensagemService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  create(): void {
    this.empresa = this.empresaForm.value;
    this.empresaService.create(this.empresa).subscribe({
      next: (resposta) => {
        this.mensagemService.showSuccessoMensagem(
          "Empresa " + resposta.nome + " cadastrada com sucesso");
        this.router.navigate(["home"]);
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
      nome: ["", Validators.required],
      cnpj: ["", Validators.required],
      telefone: ["", Validators.required],
      endereco: this.formBuilder.group({
        numero: ["", Validators.required],
        rua: ["", Validators.required],
        bairro: ["", Validators.required],
        cidade: ["", Validators.required],
        cep: ["", Validators.required],
        estado: ["", Validators.required],
      }),
    });

    // Adicione um ouvinte de eventos ao campo CEP
    this.empresaForm.get("endereco.cep")?.valueChanges.subscribe((cep) => {
      if (cep && cep.length === 8) {
        // Realize a busca do CEP
        this.buscarCep(cep);
      }
    });
  }

  buscarCep(cep: string): void {
    this.enderecoService.buscaEnderecoPorCep(cep).subscribe({
      next: (dadosCep) => {
        // Preencha automaticamente os campos com os dados do CEP
        this.preencherCamposComCep(dadosCep);
      },
      error: (ex) => {
        this.mensagemService.showErrorMensagem(ex.error.message);
      },
    });
  }

  preencherCamposComCep(dadosCep: EnderecoResposta): void {
    // Preencha os campos do formulário com os dados do CEP
    this.empresaForm.patchValue({
      endereco: {
        rua: dadosCep.logradouro,
        bairro: dadosCep.bairro,
        cidade: dadosCep.localidade,
        estado: dadosCep.uf,
      },
    });
  }
}
