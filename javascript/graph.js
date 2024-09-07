class Graph {
  constructor(paths) {
    // this.graph = {};

    // if (paths.length === 1 && paths[0].length === 1) {
    //   this.graph[paths[0][0]] = new Set();
    //   return;
    // }

    // for (const path of paths) {
    //   for (let i = 0; i < path.length - 1; i++) {
    //     const v1 = path[i];
    //     const v2 = path[i+1];
    //     if (!this.graph[v1])
    //       this.graph[v1] = new Set([v2]);
    //     else
    //       this.graph[v1].add(v2);
    //     if (!this.graph[v2])
    //       this.graph[v2] = new Set([v1]);
    //     else
    //       this.graph[v2].add(v1);
    //   }
    // }

    this.graph = paths.reduce((graph, path) => this.constructor.populate(graph, path), {});
  }

  static populate(graph, path) {
    return path.reduce((graph, v1, i) => {
      const v2 = path[i+1];
      graph[v1] = graph[v1] || new Set();
      if (v2) {
        graph[v1].add(v2);
        graph[v2] = graph[v2] || new Set([]);
        graph[v2].add(v1);
      }

      return graph;
    }, graph);
  }

  isAdjacent(vertexA, vertexB) {
    return this.graph[vertexA].has(vertexB);
  }

  // array is an adjacency list
  addVertex(vertex, array) {
    // for (const vertex2 of array) {
    //   if (!this.graph[vertex])
    //     this.graph[vertex] = new Set([vertex2]);
    //   else
    //     this.graph[vertex].add(vertex2);
    //   if (!this.graph[vertex2])
    //     this.graph[vertex2] = new Set([vertex]);
    //   else
    //     this.graph[vertex2].add(vertex);
    // }

    this.graph[vertex] = new Set(array);
    array.reduce((graph, v) => {
      graph[v] = graph[v] || new Set([]);
      graph[v].add(vertex);
      return graph;
    }, this.graph);
  }
}

if (require.main === module) {
  // add your own tests in here
  let graph = new Graph([]);

  console.log("Expecting: {}");
  console.log(graph.graph);

  console.log("");

  graph = new Graph([["a", "b", "c"], ["b", "d"]]);

  console.log('Expecting: { a: { "b" }, b: { "a", "c", "d" }, c: { "b" }, d: { "b" }}');
  console.log(graph.graph);

  console.log("");

  console.log("Expecting: true");
  console.log(graph.isAdjacent("a", "b"));

  console.log("");

  console.log("Expecting: false");
  console.log(graph.isAdjacent("a", "c"));

  console.log("");

  graph.addVertex("e", ["a", "d"]);
  console.log('Expecting: { a: { "b", "e" }, b: { "a", "c", "d" }, c: { "b" }, d: { "b", "e" }, e: { "a", "d" } }');
  console.log(graph.graph);

  console.log("")
}

module.exports = Graph;

// Please add your pseudocode to this file
// And a written explanation of your solution
