import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CriarPensamentoComponent } from "./components/pensamentos/criar-pensamento/criar-pensamento.component";
import { ListarPensamentoComponent } from "./components/pensamentos/listar-pensamento/listar-pensamento.component";
import { ExcluirPensamentoComponent } from "./components/pensamentos/excluir-pensamento/excluir-pensamento.component";
import { EditarPensamentoComponent } from "./components/pensamentos/editar-pensamento/editar-pensamento.component";

const routes: Routes = [
    {
        path: "",
        redirectTo: "listarPensamento", // sempre que criar uma rota com caminho vazio, é preciso adicionar o pathMatch
        pathMatch: "full", // considera toda a url passada e direciona para listar pensamento
    },
    {
        path: "criarPensamento",
        component: CriarPensamentoComponent,
    },
    {
        path: "listarPensamento",
        component: ListarPensamentoComponent,
    },
    {
        path: "pensamentos/excluirPensamento/:id",
        component: ExcluirPensamentoComponent,
    },
    {
        path: "pensamentos/editarPensamento/:id",
        component: EditarPensamentoComponent,
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
