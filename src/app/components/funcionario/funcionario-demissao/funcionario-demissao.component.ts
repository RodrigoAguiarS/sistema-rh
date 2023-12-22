import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Cargo } from 'src/app/models/cargo';
import { Demissao } from 'src/app/models/demissao';
import { DetalhesResponsavel } from 'src/app/models/detalhesResponsavel';
import { Funcionario } from 'src/app/models/funcionario';
import { Pessoa } from 'src/app/models/pessoa';
import { TipoDemissao } from 'src/app/models/tipoDemissao';
import { Vinculo } from 'src/app/models/vinculo';
import { FuncionarioService } from 'src/app/services/funcionario.service';
import { MensagemService } from 'src/app/services/mensagem.service';

@Component({
  selector: 'app-funcionario-demissao',
  templateUrl: './funcionario-demissao.component.html',
  styleUrls: ['./funcionario-demissao.component.css']
})
export class FuncionarioDemissaoComponent implements OnInit {
  funcionarioForm: FormGroup;
  funcionario: Funcionario;
  tiposDemissao: TipoDemissao[] = Object.values(TipoDemissao);

  constructor(
    private funcionarioService: FuncionarioService,
    private mensagemService: MensagemService,
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
        motivo: '',  // Preencha conforme necessário
        tipoDemissao: '',  // Preencha conforme necessário
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
      motivo: ['', Validators.required],
      tipoDemissao: ['', Validators.required],
      vinculo: ['', Validators.required],
      cargo: ['', Validators.required],
      dataEntrada: ['', Validators.required],
      salario: ['', Validators.required],
    });
  }

  demitir(): void {
    if (this.funcionarioForm.valid) {
      const demissaoDto: Demissao = this.funcionarioForm.value;

      this.funcionarioService.demitirFuncionario(this.funcionario.id, demissaoDto).subscribe({
        next: () => {
          this.mensagemService.showSuccessoMensagem('Funcionário demitido com sucesso');
          this.router.navigate(['funcionarios']);
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
  }
}