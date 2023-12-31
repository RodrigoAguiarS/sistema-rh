import { Component, OnInit, ViewChild } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";
import { Funcionario } from "src/app/models/funcionario";
import { FolhaDePagamentoService } from "src/app/services/folha-de-pagamento.service";
import { FuncionarioService } from "src/app/services/funcionario.service";
import { UtilService } from "src/app/services/util.service";

@Component({
  selector: "app-funcionario-list",
  templateUrl: "./funcionario-list.component.html",
  styleUrls: ["./funcionario-list.component.css"],
})
export class FuncionarioListComponent implements OnInit {
  ELEMENT_DATA: Funcionario[] = [];
  FILTERED_DATA: Funcionario[] = [];

  displayedColumns: string[] = [
    "id",
    "nome",
    "vinculo",
    "cargo",
    "salarioBase",
    "dataAdmissao",
    "departamento",
    "gestor",
    "acoes",
  ];
  dataSource = new MatTableDataSource<Funcionario>(this.ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private funcionarioService: FuncionarioService,
    private utilService: UtilService) {}

  ngOnInit(): void {
    this.findAll();
  }

  findAll(): void {
    this.funcionarioService.findAllFuncinarios().subscribe((resposta) => {
      this.ELEMENT_DATA = resposta;
      this.dataSource = new MatTableDataSource<Funcionario>(resposta);
      this.dataSource.paginator = this.paginator;
    });
  }

  // metodo para filtrar todas as colunas da tabela.
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value
      .trim()
      .toLowerCase();

    this.dataSource.filterPredicate = (data: Funcionario) => {
      const nomeFuncionario = (data.pessoa.nome || "").toLowerCase();
      const cargoFuncionario = (data.cargo.nome || "").toLowerCase();
      const vinculoFuncionario = (data.vinculo.nome || "").toLowerCase();
      const salarioFuncionario = (data.cargo.salarioBase || "").toString().toLowerCase();
      const dataEntradaFuncionario = (data.dataEntrada || "").toString().toLowerCase();
      const departamentoFuncionario = (data.cargo.departamento.nome || "").toLowerCase();
      const gestorFuncionario = (data.responsavelAtual?.nomeFuncionarioResponsavel || "").toLowerCase();

      return (
        nomeFuncionario.includes(filterValue) ||
        cargoFuncionario.includes(filterValue) ||
        salarioFuncionario.includes(filterValue) ||
        vinculoFuncionario.includes(filterValue) ||
        departamentoFuncionario.includes(filterValue) ||
        dataEntradaFuncionario.includes(filterValue) ||
        gestorFuncionario.includes(filterValue)
      );
    };

    this.dataSource.filter = filterValue;
  }

  getLinhaImpar(index: number): boolean {
    return this.utilService.linhaImpar(index);
  }
}
