import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { PensamentoService } from "../pensamento.service";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
    selector: "app-editar-pensamento",
    templateUrl: "./editar-pensamento.component.html",
    styleUrls: ["./editar-pensamento.component.css"],
})
export class EditarPensamentoComponent implements OnInit {
    formulario!: FormGroup;

    constructor(private pensamentoService: PensamentoService, private router: Router, private route: ActivatedRoute, private formBuilder: FormBuilder) {}

    editarPensamento() {
        if (this.formulario.valid) {
            this.pensamentoService.editar(this.formulario.value).subscribe(() => {
                this.router.navigate(["/listarPensamento"]);
            });
        }
    }

    habilitarBotao(): string {
        if (this.formulario.valid) {
            return "botao";
        }
        return "botao__desabilitado";
    }

    cancelar() {
        this.router.navigate(["/listarPensamento"]);
    }

    ngOnInit(): void {
        const id = this.route.snapshot.paramMap.get("id");
        this.pensamentoService.buscarPorId(parseInt(id!)).subscribe((pensamento) => {
            this.formulario = this.formBuilder.group({
                id: [pensamento.id],
                conteudo: [pensamento.conteudo, Validators.compose([Validators.required, Validators.pattern(/(.|\s)*\S(.|\s)*/)])],
                autoria: [pensamento.autoria, Validators.compose([Validators.required, Validators.minLength(3), Validators.pattern(/(.|\s)*\S(.|\s)*/)])],
                modelo: [pensamento.modelo],
            });
        });
    }
}
