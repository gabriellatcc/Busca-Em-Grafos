// objetivo: ponto a ate o b com limite 3
const limite = 3;
const ligacao = [
    ["a", "i", 34],
    ["a", "c", 12],
    ["a", "f", 15],
    ["f", "d", 25],
    ["c", "d", 18],
    ["c", "e", 30],
    ["d", "b", 20],
    ["e", "g", 15],
    ["b", "h", 22],
    ["g", "j", 28],
    ["h", "j", 10],
    ["i", "g", 40]
];

//devolver array e um custo entao e um objeto com atributo de caminho e custo
var melhorCaminho = amplitude("a", "b", limite);
console.log(
    "\n\n\x1b[46m\x1b[30m" +
    `O melhor caminho de A até B com ${limite}:\n` +
    "\x1b[0m" +
    melhorCaminho.caminho +
    "\n\x1b[46m\x1b[30m" +
    "Custo:\n" +
    "\x1b[0m" +
    melhorCaminho.custo +
    "\n"
);

function amplitude(origem, destino, limiteMax) {
    var arrayPontosPassados = [origem];
    var lacoAtual = 0;
    class CaminhoValido {
        constructor(laco) {
            this.laco = laco;
            this.ligacoes = [];
        }

        adicionarLigacao(ligacao) {
            this.ligacoes.push(ligacao);
        }

        temLigacao(ligacao) {
            return this.ligacoes.some(lig => JSON.stringify(lig) === JSON.stringify(ligacao));
        }
    }
    var arrayCaminhosValidosPorNivel = [];


    while (lacoAtual < limiteMax && !arrayPontosPassados.includes(destino))
    {

        console.log("\n1. laco atual: " + lacoAtual+ "\narrayPontosPassados: " + arrayPontosPassados);
        // slice o array de pontos passados e copia para comparar pontos ja conhecidos antes desse nível
        var fronteiraAtual = arrayPontosPassados.slice();
        var pontosNovosDoNivel = [];
        for(var pontoPassado=0; pontoPassado < fronteiraAtual.length; pontoPassado++){
            for(var indiceLigacao=0; indiceLigacao < ligacao.length; indiceLigacao++)
            {
                //1a verificacao: se alguma letra seja ela a ou b da ligacao tem algum dos pontos passados
                if(ligacao[indiceLigacao][0]
                    .includes(fronteiraAtual[pontoPassado])
                || ligacao[indiceLigacao][1]
                    .includes(fronteiraAtual[pontoPassado]))
                {
                    console.log("\n2. ligacao que tem ponto ja passado " + ligacao[indiceLigacao]);
                    //2a verificacao: se o caminho valido não tem no laco anterior uma ligacao
                    var objetoDoNivel = arrayCaminhosValidosPorNivel.find(obj => obj.laco === lacoAtual);
                    if (!objetoDoNivel) {
                        objetoDoNivel = new CaminhoValido(lacoAtual);
                        arrayCaminhosValidosPorNivel.push(objetoDoNivel);
                    }

                    if (!objetoDoNivel.temLigacao(ligacao[indiceLigacao])){
                        objetoDoNivel.adicionarLigacao(ligacao[indiceLigacao]);
                        var pontoDescoberto =
                            ligacao[indiceLigacao][0] == fronteiraAtual[pontoPassado]
                                ? ligacao[indiceLigacao][1]
                                : ligacao[indiceLigacao][1] == fronteiraAtual[pontoPassado]
                                    ? ligacao[indiceLigacao][0]
                                    : null;

                        if (pontoDescoberto
                            && !arrayPontosPassados.includes(pontoDescoberto)
                            && !pontosNovosDoNivel.includes(pontoDescoberto)) {
                            pontosNovosDoNivel.push(pontoDescoberto);
                            console.log("\n3. novo ponto descoberto no nivel " + lacoAtual + ": " + pontoDescoberto);
                        }
                    }
                }
            }
        }
        arrayPontosPassados.push(...pontosNovosDoNivel);
        lacoAtual++;
        console.log("\n4. arrayPontosPassados: " + arrayPontosPassados);
    }


    console.log("\n5. caminhosValidos por nivel:\n" + (() => {
        return arrayCaminhosValidosPorNivel.map(obj => {
            var ligacoesTexto = obj.ligacoes.map(lig => lig.join(', ')).join('\n');
            return `nivel ${obj.laco}:\n` + ligacoesTexto;
        }).join('\n\n');
    })());

    //processar respostas validas para devolver string
    var caminho = ["a","z"];
    var custo = 58;
    return { caminho: caminho.toString(), custo: custo };
}