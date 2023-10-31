let maxElems = 5;
let infinity = 1000000;

// an element in the priority queue
class pqElement {
    constructor(nodeID, value) {
        this.value = value;
        this.nodeID = nodeID;
    }
}

export default class PriorityQueue {
    constructor(numElems) {
        let arr = new Array(numElems).fill().map((elem) => (new pqElement(0, infinity)));
        this.arr = arr; // array storing the values of the priority queue
        this.count = 0; // number of elements in the priority queue
        // 0-indexing is followed for the priority queue
    }

    #bringDown(position) {
        let child1 = 2 * position + 1;
        let child2 = 2 * position + 2;
        if (this.arr[position].value <= this.arr[child1].value && this.arr[position].value <= this.arr[child2].value) { // element already at the bottom of the queue
            return;
        }
        if (this.arr[child1].value <= this.arr[child2].value) { // child1 will go up
            let temp = this.arr[child1];
            this.arr[child1] = this.arr[position];
            this.arr[position] = temp;
            this.#bringDown(position * 2 + 1); 
        }
        else { // child2 will go up
            let temp = this.arr[child2];
            this.arr[child2] = this.arr[position];
            this.arr[position] = temp;
            this.#bringDown(position * 2 + 2);
        }
        return;
    }

    #bringUp(position) {
        // console.log("bringUp called on " + position);
        if (position === 0) { // already at the top of the priority queue
            return;
        }
        let parent = Math.floor(Number((position - 1) / 2));
        if (!this.arr[parent]) {
            console.log("this position has no parent: " + position + " the index of parent: " + parent);
        }
        if (this.arr[position].value <= this.arr[parent].value) {
            let temp = this.arr[parent];
            this.arr[parent] = this.arr[position];
            this.arr[position] = temp;
            this.#bringUp(parent);
        }
        return;
    }

    push(nodeID, value) {
        let element = new pqElement(nodeID, value);
        this.arr[this.arr.length - 1] = element;
        // if (nodeID === 1) {
        // console.log("before bringup");
        // console.log(this.arr); }
        this.#bringUp(this.arr.length - 1);
        this.count += 1;
    }

    pop() {
        let retval = this.arr[0];
        this.count -= 1;
        this.arr[0].value = infinity;
        this.arr[0].nodeID = 0;
        this.#bringDown(0);
        return retval;
    }

    top() {
        return this.arr[0];
    }
}