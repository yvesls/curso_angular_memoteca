import { Component, Input, OnInit } from "@angular/core";
import { Pensamento } from "../pensamento";
import { PensamentoService } from "../pensamento.service";
import { Router } from "@angular/router";

@Component({
    selector: "app-listar-pensamento",
    templateUrl: "./listar-pensamento.component.html",
    styleUrls: ["./listar-pensamento.component.css"],
})
export class ListarPensamentoComponent implements OnInit {
    listaPensamentos: Pensamento[] = [];
    paginaAtual = 1;
    haMaisPensamentos: boolean = true;
    filtro: string = "";
    favoritos: boolean = false;
    titulo: string = "Meu Mural";

    @Input() listaFavoritos: Pensamento[] = [];

    constructor(private service: PensamentoService, private router: Router) {}

    ngOnInit(): void {
        this.service.listar(this.paginaAtual, this.filtro, this.favoritos).subscribe((listaPensamentos) => {
            this.listaPensamentos = listaPensamentos;
        });
    }

    carregarMaisPensamentos() {
        this.service.listar(++this.paginaAtual, this.filtro, this.favoritos).subscribe((listaPensamentos) => {
            if (!listaPensamentos.length) {
                this.haMaisPensamentos = false;
            }
            this.listaPensamentos.push(...listaPensamentos);
        });
    }

    pesquisarPensamentos() {
        this.haMaisPensamentos = true;
        this.paginaAtual = 1;
        this.service.listar(this.paginaAtual, this.filtro, this.favoritos).subscribe((listaPensamentos) => {
            this.listaPensamentos = listaPensamentos;
        });
    }

    recarregarComponente() {
        this.favoritos = false;
        this.paginaAtual = 1;
        this.router.routeReuseStrategy.shouldReuseRoute = () => false;
        this.router.onSameUrlNavigation = "reload";
        this.router.navigate([this.router.url]);
    }

    listarFavoritos() {
        this.titulo = "Meus Favoritos";
        this.favoritos = true;
        this.paginaAtual = 1;
        this.haMaisPensamentos = true;
        this.service.listar(this.paginaAtual, this.filtro, this.favoritos).subscribe((listaPensamentosFavoritos) => {
            this.listaPensamentos = listaPensamentosFavoritos;
            this.listaFavoritos = listaPensamentosFavoritos;
        });
    }
}
