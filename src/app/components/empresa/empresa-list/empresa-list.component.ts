import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Empresa } from 'src/app/models/empresa';
import { EmpresaService } from 'src/app/services/empresa.service';
import { UtilService } from 'src/app/services/util.service';

@Component({
  selector: 'app-empresa-list',
  templateUrl: './empresa-list.component.html',
  styleUrls: ['./empresa-list.component.css']
})
export class EmpresaListComponent implements OnInit {

  ELEMENT_DATA: Empresa[] = []
  FILTERED_DATA: Empresa[] = []

  displayedColumns: string[] = [
    "id",
    "nome",
    "cnpj",
    "telefone",
    "cep",
    "rua",
    "numero",
    "bairro",
    "cidade",
    "estado",
    "acoes",
  ];

  dataSource = new MatTableDataSource<Empresa>(this.ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private empresaService: EmpresaService,
    private utilService: UtilService
  ) { }

  ngOnInit(): void {
    this.findAll();
  }

  findAll(): void {
    this.empresaService.findAll().subscribe(resposta => {
      this.ELEMENT_DATA = resposta;
      this.dataSource = new MatTableDataSource<Empresa>(resposta);
      this.dataSource.paginator = this.paginator;
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
  
    this.dataSource.filterPredicate = (data: Empresa) => {
      const nomeEmpresa = data.nome?.toLowerCase()|| '';
      const cnpjEmpresa = data.cnpj?.toLowerCase()|| '';
      const telefoneEmpresa = data.telefone?.toLowerCase()|| '';
      const cepEmpresa = data.endereco.cep?.toLowerCase()|| '';
      const numeroEmpresa = data.endereco.numero?.toLowerCase()|| '';
      const bairroEmpresa = data.endereco.bairro?.toLowerCase()|| '';
      const cidadeEmpresa = data.endereco.cidade?.toLowerCase()|| '';
      const estadoEmpresa = data.endereco.estado?.toLowerCase()|| '';

      return (
        nomeEmpresa.includes(filterValue) ||
        cnpjEmpresa.includes(filterValue) ||
        cepEmpresa.includes(filterValue) ||
        telefoneEmpresa.includes(filterValue) ||
        numeroEmpresa.includes(filterValue) ||
        bairroEmpresa.includes(filterValue) ||
        cidadeEmpresa.includes(filterValue) ||
        estadoEmpresa.includes(filterValue)
      );
    };
  
    this.dataSource.filter = filterValue;
  }

  getLinhaImpar(index: number): boolean {
    return this.utilService.linhaImpar(index);
  }
}