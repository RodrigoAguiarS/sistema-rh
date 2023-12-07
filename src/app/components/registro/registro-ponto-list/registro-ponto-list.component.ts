import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { RegistroPonto } from 'src/app/models/registroPonto';
import { RegistroPontoService } from 'src/app/services/registro-ponto.service';

@Component({
  selector: 'app-registro-ponto-list',
  templateUrl: './registro-ponto-list.component.html',
  styleUrls: ['./registro-ponto-list.component.css']
})
export class RegistroPontoListComponent implements OnInit {

  ELEMENT_DATA: RegistroPonto[] = []

  displayedColumns: string[] = ['id', 'data registro', 'hora entrada', 'hora saída', 'ponto registrado', 'acoes'];
  dataSource = new MatTableDataSource<RegistroPonto>(this.ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private service: RegistroPontoService
  ) { }

  ngOnInit(): void {
    this.findAll();
  }

  findAll() {
    this.service.findAll().subscribe(resposta => {
      this.ELEMENT_DATA = resposta
      console.log(resposta)
      this.dataSource = new MatTableDataSource<RegistroPonto>(resposta);
      this.dataSource.paginator = this.paginator;
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
