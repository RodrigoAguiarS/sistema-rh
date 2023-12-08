import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RegistroPonto } from 'src/app/models/registroPonto';
import { MensagemService } from 'src/app/services/mensagem.service';
import { RegistroPontoService } from 'src/app/services/registro-ponto.service';

@Component({
  selector: 'app-registro-ponto-read',
  templateUrl: './registro-ponto-read.component.html',
  styleUrls: ['./registro-ponto-read.component.css']
})
export class RegistroPontoReadComponent implements OnInit {

  registro: RegistroPonto;

  constructor(
    private registroPontoService: RegistroPontoService,
    private mensagemService: MensagemService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.registro = new RegistroPonto();
    this.registro.id = this.route.snapshot.paramMap.get('id');
    this.findById();
  }

  findById(): void {
    this.registroPontoService.findById(this.registro.id).subscribe({
      next: (resposta) => {
        console.log(resposta);
        this.registro = resposta;
      },
      error: (ex) => {
        this.mensagemService.showErrorMensagem(ex.error.message);
      }
    });
  }
}
