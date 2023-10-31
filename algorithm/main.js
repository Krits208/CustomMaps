import Graph from "./Graph/Graph.js";
import findShortestPath from "./Dijkistra.js";

let G = new Graph(10);

let bakul = G.addNode("bakul");
let parijaat = G.addNode("parijaat");
let nilgiri = G.addNode("nilgiri");
let generator = G.addNode("generator");
let vc = G.addNode("vc");
let jc = G.addNode("jc");
let kadamb = G.addNode("kadamb");

G.addPath(bakul, parijaat, 2);
G.addPath(parijaat, kadamb, 1);

G.addPath(kadamb, jc, 2);
G.addPath(jc, generator, 3);
G.addPath(generator, vc, 2.1);

G.addPath(kadamb, vc, 7);

G.addPath(bakul, nilgiri, 2);
G.addPath(nilgiri, vc, 4);



let path = findShortestPath(G, kadamb, vc);
path.forEach((elem) => {
    console.log(G.nodeList[elem].desc);
});

