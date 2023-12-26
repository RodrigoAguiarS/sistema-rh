import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Cargo } from 'src/app/models/cargo';
import { DetalhesResponsavel } from 'src/app/models/detalhesResponsavel';
import { Funcionario } from 'src/app/models/funcionario';
import { Pessoa } from 'src/app/models/pessoa';
import { Vinculo } from 'src/app/models/vinculo';
import { FolhaDePagamentoService } from 'src/app/services/folha-de-pagamento.service';
import { FuncionarioService } from 'src/app/services/funcionario.service';
import { MensagemService } from 'src/app/services/mensagem.service';

@Component({
  selector: 'app-funcionario-gerar-folha-pagamento',
  templateUrl: './funcionario-gerar-folha-pagamento.component.html',
  styleUrls: ['./funcionario-gerar-folha-pagamento.component.css']
})
export class FuncionarioGerarFolhaPagamentoComponent implements OnInit {

  funcionarioForm: FormGroup;
  funcionario: Funcionario;

  constructor(
    private funcionarioService: FuncionarioService,
    private mensagemService: MensagemService,
    private folhaDePagamentoService: FolhaDePagamentoService,
    private router: Router,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.funcionario = new Funcionario();
    this.funcionario.cargo = new Cargo();
    this.funcionario.pessoa = new Pessoa();
    this.funcionario.vinculo = new Vinculo();
    this.funcionario.responsavelAtual = new DetalhesResponsavel();
    this.funcionario.id = this.route.snapshot.paramMap.get('id');
    this.initForm();
    this.findById();
  }

  findById(): void {
    this.funcionarioService.findById(this.funcionario.id).subscribe((resposta) => {
      this.funcionario = resposta;
      // Popule os dados no formulário após obter a resposta
      this.funcionarioForm.patchValue({
        nome: this.funcionario.pessoa.nome,
        vinculo: this.funcionario.vinculo.nome,
        cargo: this.funcionario.cargo.nome,
        dataEntrada: this.funcionario.dataEntrada,
        salario: this.funcionario.cargo.salarioBase,
      });
    });
  }

  initForm(): void {
    this.funcionarioForm = this.formBuilder.group({
      nome: ['', Validators.required],
      vinculo: ['', Validators.required],
      cargo: ['', Validators.required],
      dataEntrada: ['', Validators.required],
      salario: ['', Validators.required],
    });
  }

  gerarRelatorio() {
    // Log para verificar o valor de idFuncionario antes de chamar o serviço
    console.log('ID do Funcionário para Relatório:', this.funcionario.id);

    this.folhaDePagamentoService.gerarRelatorio(this.funcionario.id).subscribe((response) => {
      this.baixarArquivo(response.body, 'folha_de_pagamento.pdf');
      this.router.navigate(['funcionarios']);
      this.mensagemService.showSuccessoMensagem('Folha de Pagamento Gerada com sucesso');
    });
  }

  baixarArquivo(blob: Blob, nomeArquivo: string) {
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.download = nomeArquivo;
    link.click();
  }
}