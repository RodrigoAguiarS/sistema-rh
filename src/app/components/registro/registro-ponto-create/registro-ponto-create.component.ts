import { RegistroPontoService } from './../../../services/registro-ponto.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RegistroPonto } from 'src/app/models/registroPonto';
import { MensagemService } from 'src/app/services/mensagem.service';

@Component({
  selector: 'app-registro-ponto-create',
  templateUrl: './registro-ponto-create.component.html',
  styleUrls: ['./registro-ponto-create.component.css']
})
export class RegistroPontoCreateComponent implements OnInit {

  hora: Date = new Date();
  data: Date = new Date();

  registro: RegistroPonto;

  observacoes: FormControl =  new FormControl(null, Validators.minLength(1));

  constructor(
    private registroPontoService: RegistroPontoService,
    private mensagemService: MensagemService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.registro = new RegistroPonto();
  
    setInterval(() => {
      this.data = new Date();
      this.hora = new Date();
    }, 1000);
  
    this.registroPontoService.consultarUltimoPonto().subscribe({
      next: (ponto) => {
        this.registro.pontoRegistrado = ponto;
      },
      error: (error) => {
        this.mensagemService.showErrorMensagem(error.error.message);
      }
    });
  }

  registrarPonto() {
    const registro: RegistroPonto = {
      observacoes: this.observacoes.value,
      pontoRegistrado: this.registro.pontoRegistrado,
      horaEntrada: this.registro.horaEntrada,
      dataRegistro: this.registro.dataRegistro,
      horaSaida: this.registro.horaSaida
    }
  
    if (!this.registro.pontoRegistrado) {
      this.registroPontoService.registrarPonto(registro).subscribe({
        next: () => {
          this.mensagemService.showSuccessoMensagem('Entrada registrada com sucesso:');
          this.router.navigate(["home"]);
          this.registro.pontoRegistrado = true;
        },
        error: (error: any) => {
          this.mensagemService.showErrorMensagem(error.error.message);
        }
      });
    } else {
      this.registroPontoService.registrarPonto(registro).subscribe({
        next: () => {
          this.mensagemService.showSuccessoMensagem('Saída registrada com sucesso:');
          this.router.navigate(["home"]);
          this.registro.pontoRegistrado = false;
        },
        error: (error: any) => {
          this.mensagemService.showErrorMensagem(error.error.message);
        }
      });
    }
  }

  validaCampos(): boolean {
    return this.observacoes.valid
  }
}
