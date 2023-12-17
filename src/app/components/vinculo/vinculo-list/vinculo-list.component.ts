import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Vinculo } from 'src/app/models/vinculo';
import { UtilService } from 'src/app/services/util.service';
import { VinculoService } from 'src/app/services/vinculo.service';

@Component({
  selector: 'app-vinculo-list',
  templateUrl: './vinculo-list.component.html',
  styleUrls: ['./vinculo-list.component.css']
})
export class VinculoListComponent implements OnInit {

  ELEMENT_DATA: Vinculo[] = []

  displayedColumns: string[] = ['id','nome', 'descricao', 'ativo', 'acoes'];
  dataSource = new MatTableDataSource<Vinculo>(this.ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private vinculoService: VinculoService,
    private utilService: UtilService
  ) { }

  ngOnInit(): void {
    this.findAll();
  }

  findAll() {
    this.vinculoService.findAll().subscribe(resposta => {
      this.ELEMENT_DATA = resposta
      this.dataSource = new MatTableDataSource<Vinculo>(resposta);
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

