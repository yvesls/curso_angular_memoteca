import { Component, OnInit } from "@angular/core";
import { PensamentoService } from "../pensamento.service";
import { Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
    selector: "app-criar-pensamento",
    templateUrl: "./criar-pensamento.component.html",
    styleUrls: ["./criar-pensamento.component.css"],
})
export class CriarPensamentoComponent implements OnInit {
    formulario!: FormGroup; // ! é o operador de excessão não null do typescript. O declarando, o objeto pode ser nulo

    constructor(private service: PensamentoService, private route: Router, private formBuilder: FormBuilder) {}

    ngOnInit(): void {
        this.formulario = this.formBuilder.group({
            conteudo: ["", Validators.compose([Validators.required, Validators.pattern(/(.|\s)*\S(.|\s)*/)])],
            autoria: ["", Validators.compose([Validators.required, Validators.minLength(3), Validators.pattern(/(.|\s)*\S(.|\s)*/)])],
            modelo: ["modelo2"],
        });
    }

    criarPensamento() {
        if (this.formulario.valid) {
            this.service.criar(this.formulario.value).subscribe(() => {
                this.route.navigate(["/listarPensamento"]);
            });
        }
    }

    cancelar() {
        this.route.navigate(["/listarPensamento"]);
    }

    habilitarBotao(): string {
        if (this.formulario.valid) {
            return "botao";
        }
        return "botao__desabilitado";
    }
}
