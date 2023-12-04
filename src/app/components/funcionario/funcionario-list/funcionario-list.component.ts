import { Component, OnInit, ViewChild } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";
import { Funcionario } from "src/app/models/funcionario";
import { FuncionarioService } from "src/app/services/funcionario.service";

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
    "cargo",
    "salarioBase",
    "dataAdmissao",
    "departamento",
    "gestor",
    "acoes",
  ];
  dataSource = new MatTableDataSource<Funcionario>(this.ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private funcionarioService: FuncionarioService) {}

  ngOnInit(): void {
    this.findAll();
  }

  findAll(): void {
    this.funcionarioService.findAllFuncinarios().subscribe((resposta) => {
      this.ELEMENT_DATA = resposta;
      console.log(this.ELEMENT_DATA);
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
      const salarioFuncionario = (data.cargo.salarioBase || "").toString().toLowerCase();
      const dataEntradaFuncionario = (data.dataAdmissao || "").toString().toLowerCase();
      const departamentoFuncionario = (data.cargo.departamento.nome || "").toLowerCase();
      const gestorFuncionario = (data.responsavelAtual?.nomeFuncionarioResponsavel || "").toLowerCase();

      return (
        nomeFuncionario.includes(filterValue) ||
        cargoFuncionario.includes(filterValue) ||
        salarioFuncionario.includes(filterValue) ||
        departamentoFuncionario.includes(filterValue) ||
        dataEntradaFuncionario.includes(filterValue) ||
        gestorFuncionario.includes(filterValue)
      );
    };

    this.dataSource.filter = filterValue;
  }
}
