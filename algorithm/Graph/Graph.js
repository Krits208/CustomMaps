import GraphNode from "./GraphNode.js";

// an item in the adjacency list of the graph
class adjListObj {
    constructor(nodeID, time, desc) {
        this.nodeID = nodeID;
        this.time = time;
        this.desc = desc;
    }
}

// the graph object
export default class Graph {
    constructor(nodeCount) {
        this.adj = new Array(nodeCount + 1).fill().map((el) => ([])); // 1 indexing will be followed for the graph nodes
        this.nextID = 1;
        this.nodeCount = nodeCount;
        this.nodeList = new Array(1);
    }

    // this method will add a node to the graph
    addNode(desc) {
        let retval = new GraphNode(this.nextID, desc);
        this.nodeList.push(retval);
        this.nextID += 1;
        return retval;
    }

    // this method will add an edge between two nodes in the graph
    addPath(node1, node2, time, desc, descReverse) {
        for (let i = 0; i < this.adj[node1.nodeID].length; i++) {
            if (this.adj[node1.nodeID][i].nodeID === node2.nodeID) { // edge already exists between node1 and node2, so we do not do anything
                return;
            }
        }
        // insert an edge between node1 and node2
        this.adj[node1.nodeID].push(new adjListObj(node2.nodeID, time, desc));
        this.adj[node2.nodeID].push(new adjListObj(node1.nodeID, time, descReverse));
    }
}