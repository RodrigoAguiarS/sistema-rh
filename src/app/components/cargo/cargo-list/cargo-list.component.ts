import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Cargo } from 'src/app/models/cargo';
import { CargoService } from 'src/app/services/cargo.service';
import { UtilService } from 'src/app/services/util.service';

@Component({
  selector: 'app-cargo-list',
  templateUrl: './cargo-list.component.html',
  styleUrls: ['./cargo-list.component.css']
})
export class CargoListComponent implements OnInit {

  ELEMENT_DATA: Cargo[] = []
  FILTERED_DATA: Cargo[] = []

  displayedColumns: string[] = ['id', 'cargo', 'salarioBase', 'departamento', 'acoes'];
  dataSource = new MatTableDataSource<Cargo>(this.ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private cargoService: CargoService,
    private utilService: UtilService
  ) { }

  ngOnInit(): void {
    this.findAll();
  }

  findAll(): void {
    this.cargoService.findAll().subscribe(resposta => {
      this.ELEMENT_DATA = resposta;
      this.dataSource = new MatTableDataSource<Cargo>(resposta);
      this.dataSource.paginator = this.paginator;
    })
  }

   // metodo para filtrar todas as colunas da tabela.
   applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
  
    this.dataSource.filterPredicate = (data: Cargo) => {
      const nomeCargo = data.nome?.toLowerCase()|| '';
      const salarioBaseCargo = data.salarioBase?.toString().toLowerCase()|| '';
      const departamentoCargo = data.departamento.nome.toLowerCase()|| '';

      return (
        nomeCargo.includes(filterValue) ||
        salarioBaseCargo.includes(filterValue) ||
        departamentoCargo.includes(filterValue)
      );
    };
  
    this.dataSource.filter = filterValue;
  }

  getLinhaImpar(index: number): boolean {
    return this.utilService.linhaImpar(index);
  }
}
