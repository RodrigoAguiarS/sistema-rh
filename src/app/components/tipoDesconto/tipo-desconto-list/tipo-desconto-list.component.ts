import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { TipoDesconto } from 'src/app/models/tipoDesconto';
import { TipoDescontoService } from 'src/app/services/tipo-desconto.service';
import { UtilService } from 'src/app/services/util.service';

@Component({
  selector: 'app-tipo-desconto-list',
  templateUrl: './tipo-desconto-list.component.html',
  styleUrls: ['./tipo-desconto-list.component.css']
})
export class TipoDescontoListComponent implements OnInit {

  ELEMENT_DATA: TipoDesconto[] = []

  displayedColumns: string[] = ['id','nome', 'ativo', 'acoes'];
  dataSource = new MatTableDataSource<TipoDesconto>(this.ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private tipoDescontoService: TipoDescontoService,
    private utilService: UtilService
  ) { }

  ngOnInit(): void {
    this.findAll();
  }

  findAll() {
    this.tipoDescontoService.findAll().subscribe(resposta => {
      this.ELEMENT_DATA = resposta
      this.dataSource = new MatTableDataSource<TipoDesconto>(resposta);
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


