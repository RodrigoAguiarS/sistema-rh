import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { Empresa } from "src/app/models/empresa";
import { EnderecoResposta } from "src/app/models/enderecoReposta";
import { EmpresaService } from "src/app/services/empresa.service";
import { EnderecoService } from "src/app/services/endereco.service";
import { MensagemService } from "src/app/services/mensagem.service";

@Component({
  selector: "app-empresa-update",
  templateUrl: "./empresa-update.component.html",
  styleUrls: ["./empresa-update.component.css"],
})
export class EmpresaUpdateComponent implements OnInit {
  empresaForm!: FormGroup;
  empresa: Empresa;

  constructor(
    private empresaService: EmpresaService,
    private enderecoService: EnderecoService,
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

  update(): void {
    // Atualizar os campos da instância de Empresa com os valores do formulário
    this.empresa.nome = this.empresaForm.get('nome')?.value;
    this.empresa.cnpj = this.empresaForm.get('cnpj')?.value;
    this.empresa.telefone = this.empresaForm.get('telefone')?.value;
    // Atualizar os campos do endereço
    this.empresa.endereco.numero = this.empresaForm.get('endereco.numero')?.value;
    this.empresa.endereco.rua = this.empresaForm.get('endereco.rua')?.value;
    this.empresa.endereco.bairro = this.empresaForm.get('endereco.bairro')?.value;
    this.empresa.endereco.cidade = this.empresaForm.get('endereco.cidade')?.value;
    this.empresa.endereco.cep = this.empresaForm.get('endereco.cep')?.value;
    this.empresa.endereco.estado = this.empresaForm.get('endereco.estado')?.value;
  
    this.empresaService.update(this.empresa).subscribe({
      next: (resposta) => {
        this.mensagemService.showSuccessoMensagem(
          "Empresa " + resposta.nome + " atualizado com sucesso"
        );
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
      nome: [this.empresa.nome || "", Validators.required],
      cnpj: [this.empresa.cnpj || "", Validators.required],
      telefone: [this.empresa.telefone || "", Validators.required],
      endereco: this.formBuilder.group({
        numero: [this.empresa.endereco?.numero || "", Validators.required],
        rua: [this.empresa.endereco?.rua || "", Validators.required],
        bairro: [this.empresa.endereco?.bairro || "", Validators.required],
        cidade: [this.empresa.endereco?.cidade || "", Validators.required],
        cep: [this.empresa.endereco?.cep || "", Validators.required],
        estado: [this.empresa.endereco?.estado || "", Validators.required],
      }),
    });

    this.empresaForm.get("endereco.cep")?.valueChanges.subscribe((cep) => {
      if (cep && cep.length === 8) {
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
