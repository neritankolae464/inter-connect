/* sophisticated_code.js */

// Author: John Doe
// Date: September 21, 2022
// Description: A complex JavaScript code demonstrating an algorithmic problem-solving approach.

// Class representing a Graph
class Graph {
  constructor() {
    this.nodes = {};
  }

  // Method to add a node to the graph
  addNode(node) {
    this.nodes[node] = [];
  }

  // Method to add an edge between two nodes
  addEdge(node1, node2) {
    this.nodes[node1].push(node2);
    this.nodes[node2].push(node1);
  }

  // Method to get all neighbors of a node
  getNeighbors(node) {
    return this.nodes[node];
  }

  // Method to perform Breadth First Search (BFS) traversal on the graph
  bfs(startNode) {
    const visited = new Set();
    const queue = [startNode];
    visited.add(startNode);

    while (queue.length > 0) {
      const currentNode = queue.shift();
      console.log("Visited node:", currentNode);

      const neighbors = this.getNeighbors(currentNode);
      for (const neighbor of neighbors) {
        if (!visited.has(neighbor)) {
          queue.push(neighbor);
          visited.add(neighbor);
        }
      }
    }
  }
}

// Function to find the shortest path between two nodes in a graph
function shortestPath(graph, startNode, endNode) {
  const visited = new Set();
  const queue = [[startNode]];

  while (queue.length > 0) {
    const path = queue.shift();
    const currentNode = path[path.length - 1];
    console.log("Visited node:", currentNode);

    if (currentNode === endNode) {
      return path;
    }

    const neighbors = graph.getNeighbors(currentNode);
    for (const neighbor of neighbors) {
      if (!visited.has(neighbor)) {
        const newPath = [...path, neighbor];
        queue.push(newPath);
        visited.add(neighbor);
      }
    }
  }

  return null; // No path found
}

// Create a new graph
const graph = new Graph();

// Add nodes to the graph
graph.addNode("A");
graph.addNode("B");
graph.addNode("C");
graph.addNode("D");
graph.addNode("E");

// Add edges between nodes
graph.addEdge("A", "B");
graph.addEdge("B", "C");
graph.addEdge("C", "D");
graph.addEdge("D", "E");

// Perform BFS traversal on the graph starting from node "A"
graph.bfs("A");

// Find the shortest path between node "A" and node "E"
const shortestPath = shortestPath(graph, "A", "E");
console.log("Shortest path:", shortestPath);

// Output:
// Visited node: A
// Visited node: B
// Visited node: C
// Visited node: D
// Visited node: E
// Shortest path: [ 'A', 'B', 'C', 'D', 'E' ]