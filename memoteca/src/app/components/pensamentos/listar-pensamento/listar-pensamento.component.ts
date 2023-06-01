import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-listar-pensamento',
  templateUrl: './listar-pensamento.component.html',
  styleUrls: ['./listar-pensamento.component.css'],
})
export class ListarPensamentoComponent implements OnInit {
  listaPensamentos = [
    {
      conteudo: 'Conteúdo mock lista-pensamentos',
      autoria: 'Yves',
      modelo: 'modelo2',
    },
    {
      conteudo: 'Conteúdo mock lista-pensamentos 2',
      autoria: 'Yves',
      modelo: 'modelo1',
    },
  ];

  constructor() {}

  ngOnInit(): void {}
}
