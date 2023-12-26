import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FolhaDePagamentoService } from 'src/app/services/folha-de-pagamento.service';
import { MensagemService } from 'src/app/services/mensagem.service';

@Component({
  selector: 'app-funcionario-gerar-todos-folha-pagamento',
  templateUrl: './funcionario-gerar-todos-folha-pagamento.component.html',
  styleUrls: ['./funcionario-gerar-todos-folha-pagamento.component.css']
})
export class FuncionarioGerarTodosFolhaPagamentoComponent implements OnInit {

  concordoTermos: boolean = false;

  constructor(
    private mensagemService: MensagemService,
    private folhaPagamentoService: FolhaDePagamentoService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    // TODO document why this method 'ngOnInit' is empty
  }

  gerarFolhaPagamentoParaTodos(): void {
    this.folhaPagamentoService.gerarFolhaPagamentoParaTodosFuncionarios().subscribe({
      next: () => {
        this.mensagemService.showSuccessoMensagem(
          "Rotina de geração de Folha de pagamento executada com sucesso");
        this.router.navigate(["funcionarios"]);
      },
      error: (ex) => {
        if (ex.error.errors) {
          ex.error.errors.forEach((element) => {
            this.mensagemService.showErrorMensagem(element.message);
          });
        } else {
          this.mensagemService.showErrorMensagem(ex.error.erro);
        }
      },
    });
  }
}
