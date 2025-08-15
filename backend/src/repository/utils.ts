import fs from "fs";

function salvarPagina(html: string) {
    fs.writeFileSync("pagina.html", html, "utf8");
    console.log("Página salva como pagina.html");
}

function salvarJSON(produtos: Object[]) {
    fs.writeFileSync("produtos.json", JSON.stringify(produtos, null, 2), "utf8");
    console.log("Produtos salvos como produtos.json");
}

export { salvarPagina, salvarJSON };