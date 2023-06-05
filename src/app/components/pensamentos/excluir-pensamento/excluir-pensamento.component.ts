import { ActivatedRoute, Router } from "@angular/router";
import { Component, OnInit } from "@angular/core";
import { Pensamento } from "../pensamento";
import { PensamentoService } from "../pensamento.service";

@Component({
    selector: "app-excluir-pensamento",
    templateUrl: "./excluir-pensamento.component.html",
    styleUrls: ["./excluir-pensamento.component.css"],
})
export class ExcluirPensamentoComponent implements OnInit {
    pensamento: Pensamento = {
        id: 0,
        conteudo: "",
        autoria: "",
        modelo: "",
    };

    constructor(private pensamentoService: PensamentoService, private router: Router, private route: ActivatedRoute) {}

    excluirPensamento() {
        if (this.pensamento.id) {
            this.pensamentoService.excluir(this.pensamento.id).subscribe(() => {
                this.router.navigate(["/listarPensamento"]);
            });
        }
    }

    cancelar() {
        this.router.navigate(["/listarPensamento"]);
    }

    ngOnInit(): void {
        const id = this.route.snapshot.paramMap.get("id");
        this.pensamentoService.buscarPorId(parseInt(id!)).subscribe((pensamento) => {
            this.pensamento = pensamento;
        });
    }
}
