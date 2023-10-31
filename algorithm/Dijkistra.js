import PriorityQueue from "./PriorityQueue.js";

let infinity = 1000000;

export default function findShortestPath(G, source, dest) {
    let nodeCount = G.nodeCount;
    let pq = new PriorityQueue(G.nodeCount * 3);
    let prevNodes = new Array(nodeCount + 1).fill(-1);
    let visited = new Array(nodeCount + 1).fill(false);
    let distances = new Array(nodeCount + 1).fill(infinity);
    distances[source.nodeID] = 0;
    pq.push(source.nodeID, 0);
    while (true) {
        let topElem = { ...pq.top() };
        // console.log("about to relax " + topElem.nodeID);
        // console.log(pq.arr);
        // if (topElem.nodeID === 0) {
        //     break;
        // }
        // if (topElem.nodeID === 2) {
        //     console.log("before visiting 2");
        //     console.log(pq.arr);
        // }
        // if (topElem.nodeID === 1) {
        //     console.log("before removing 1");
        //     console.log(pq.arr);
        // }
        pq.pop();
        // if (topElem.nodeID === 1) {
        //     console.log("after removing 1");
        //     console.log(pq.arr);
        // }
        // if (topElem.nodeID === 2) {
        //     console.log("after popping 2");
        //     console.log(pq.arr);
        // }
        if (topElem.nodeID === dest.nodeID) {
            break;
        }
        if (!visited[topElem.nodeID]) {
            visited[topElem.nodeID] = true;
            G.adj[topElem.nodeID].forEach((node) => {
                if (!visited[node.nodeID]) {
                    if (distances[node.nodeID] > distances[topElem.nodeID] + node.time) {
                        distances[node.nodeID] = parseFloat(distances[topElem.nodeID]) + parseFloat(node.time);
                        // if (topElem.nodeID === 2) {
                        //     console.log("before pushing 1");
                        //     console.log(pq.arr);
                        // }
                        pq.push(node.nodeID, node.time + topElem.value);
                        // if (topElem.nodeID === 2) {
                        //     console.log("after pushing 1");
                        //     console.log(pq.arr);
                        // }
                        prevNodes[node.nodeID] = topElem.nodeID;
                    }
                }
            });
        }

        // if (topElem.nodeID === 2) {
        //     console.log("after visiting 2");
        //     console.log(pq.arr);
        // }
    }
    let path = [];
    let currNode = dest.nodeID;
    while (true) {
        path.push(currNode);
        currNode = prevNodes[currNode];
        if (currNode === -1) {
            break;
        }
    }

    return path.reverse();
}