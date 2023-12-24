import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { TipoDemissao } from 'src/app/models/tipoDemissao';
import { TipoDemissaoService } from 'src/app/services/tipo-demissao.service';
import { UtilService } from 'src/app/services/util.service';

@Component({
  selector: 'app-tipo-demissao-list',
  templateUrl: './tipo-demissao-list.component.html',
  styleUrls: ['./tipo-demissao-list.component.css']
})
export class TipoDemissaoListComponent implements OnInit {

  ELEMENT_DATA: TipoDemissao[] = []

  displayedColumns: string[] = ['id','nome', 'ativo', 'acoes'];
  dataSource = new MatTableDataSource<TipoDemissao>(this.ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private tipoDemissaoService: TipoDemissaoService,
    private utilService: UtilService
  ) { }

  ngOnInit(): void {
    this.findAll();
  }

  findAll() {
    this.tipoDemissaoService.findAll().subscribe(resposta => {
      this.ELEMENT_DATA = resposta
      this.dataSource = new MatTableDataSource<TipoDemissao>(resposta);
      this.dataSource.paginator = this.paginator;
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  getLinhaImpar(index: number): boolean {
    return this.utilService.linhaImpar(index);
  }
}

