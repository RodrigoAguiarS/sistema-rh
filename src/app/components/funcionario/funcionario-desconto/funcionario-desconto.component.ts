import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Cargo } from 'src/app/models/cargo';
import { DetalhesResponsavel } from 'src/app/models/detalhesResponsavel';
import { Funcionario } from 'src/app/models/funcionario';
import { Pessoa } from 'src/app/models/pessoa';
import { TipoDesconto } from 'src/app/models/tipoDesconto';
import { Vinculo } from 'src/app/models/vinculo';
import { FuncionarioService } from 'src/app/services/funcionario.service';
import { MensagemService } from 'src/app/services/mensagem.service';
import { TipoDescontoService } from 'src/app/services/tipo-desconto.service';

@Component({
  selector: 'app-funcionario-desconto',
  templateUrl: './funcionario-desconto.component.html',
  styleUrls: ['./funcionario-desconto.component.css']
})
export class FuncionarioDescontoComponent implements OnInit {

  funcionarioForm: FormGroup;
  funcionario: Funcionario;
  tiposDesconto: TipoDesconto[] = []

  constructor(
    private funcionarioService: FuncionarioService,
    private tipoDescontoService: TipoDescontoService,
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
    this.findAllTipoDesconto();
  }

  findById(): void {
    this.funcionarioService.findById(this.funcionario.id).subscribe((resposta) => {
      this.funcionario = resposta;
  
      // Crie um array de objetos TipoDesconto
      const tiposDescontoValues = this.funcionario.tiposDesconto.map(desconto => desconto.id);

      // Popule os dados no formulário após obter a resposta
      this.funcionarioForm.patchValue({
        nome: this.funcionario.pessoa.nome,
        tiposDesconto: tiposDescontoValues, // Use o array de valores aqui
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
      tiposDesconto: ['', Validators.required],
      vinculo: ['', Validators.required],
      cargo: ['', Validators.required],
      dataEntrada: ['', Validators.required],
      salario: ['', Validators.required],
    });
  }

  adicionarDesconto(): void {
    if (this.funcionarioForm.valid) {
      const listaDescontos: TipoDesconto[] = this.funcionarioForm.value.tiposDesconto;
  
      this.funcionarioService.adicionarTiposDesconto(this.funcionario.id, listaDescontos).subscribe({
        next: () => {
          this.mensagemService.showSuccessoMensagem('Adicionado tipos Desconto com sucesso');
          this.router.navigate(['funcionarios']);
        },
        error: (ex) => {
          if (ex.error.errors) {
            ex.error.errors.forEach((element) => {
              this.mensagemService.showErrorMensagem(element.message);
            });
          } else {
            this.mensagemService.showErrorMensagem(ex.error);
          }
        },
      });
    }
  }

  findAllTipoDesconto(): void {
    this.tipoDescontoService.findAll().subscribe(resposta => {
      this.tiposDesconto = resposta;
    })
  }
}  