// objetivo: ponto a ate o b com limite 3
const limite = 3;
const ligacoes = [
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
]

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
    //vou comparar a origem e depois com todos os destinos do array e origens
    //armazenar os que a origem aparece:
    // defino o nivel 2
    // utilizo os que armazenei para comparar com onde aparecem  e armazeno
    // defino o proximo nivel

    //a variavel que vai servir de comparacao vai mudar smepre que sai de um nivel e entra em outro 
    // mapear ligacoes com A
    // mapear ligacoes com I, C
    // mapear ligacoes com G, D, E
    // mapear ligacoes com E, B, G
    // mapear ligacoes com C, /, I, GJ
    // mapear ligacoes com D, /, /, H
    // mapear ligacoes com B, /, /, B

    //laco para percorrer os niveis
    var arrayPontosPassados = [origem];

    var lacoAtual = 0;
    var caminhoValido = [
        //nivel,
        //ponto,
        //custo
    ];

    while(lacoAtual < limiteMax && !arrayPontosPassados.includes(destino))
    {
        console.log("\n1. laco atual: " + lacoAtual);
        // Redefinir origem
        //PASSARPARA O PROXIMO NIVEL ED ESTINO VALIDO
        console.log("\n2. quantidade de ligacoes: " + ligacoes.length);
        //eu acho que tem como colocar uma condicao no for ja
        for(var pontoPassado=0; pontoPassado < arrayPontosPassados.length; pontoPassado++){
            for(var indiceLigacao=0; indiceLigacao < ligacoes.length; indiceLigacao++)
            {
                if(ligacoes[indiceLigacao][0].includes(arrayPontosPassados) || ligacoes[indiceLigacao][1].includes(arrayPontosPassados))
                {
                    console.log("\n3. ligacao que tem ponto ja passado " + ligacoes[indiceLigacao]);
                    caminhoValido.push(lacoAtual, ligacoes[indiceLigacao]);
                    console.log("\n4. caminhoValido: " + caminhoValido);
                    break;
                }
            }
        }
        console.log("\n5. arrayPontosPassados: " + arrayPontosPassados);

        lacoAtual ++;
    }


    //processar respostas validas para devolver string
    var caminho = ["a","z"];
    var custo = 58;
    return { caminho: caminho.toString(), custo: custo };
}