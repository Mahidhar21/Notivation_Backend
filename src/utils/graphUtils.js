export const toReactFlowGraph = (nodes, edges) => {
  const rfNodes = nodes.map((n, index) => ({
    id: String(n.id),
    data: { label: n.title },
    position: { x: (index % 10) * 200, y: Math.floor(index / 10) * 150 }
  }));

  const rfEdges = edges.map((e) => ({
    id: String(e.id),
    source: String(e.source_note_id),
    target: String(e.target_note_id),
    data: { relation_type: e.relation_type }
  }));

  return { nodes: rfNodes, edges: rfEdges };
};

export const bfsNeighbors = (graph, startId) => {
  const id = Number(startId);
  const neighbors = new Set();
  for (const edge of graph.edges) {
    if (edge.source_note_id === id) neighbors.add(edge.target_note_id);
    if (edge.target_note_id === id) neighbors.add(edge.source_note_id);
  }
  return Array.from(neighbors);
};

export const bfsExplore = (graph, startId, maxDepth = 2) => {
  const start = Number(startId);
  const visited = new Set([start]);
  const queue = [{ id: start, depth: 0 }];
  const reachable = new Set([start]);

  while (queue.length) {
    const { id, depth } = queue.shift();
    if (depth >= maxDepth) continue;

    for (const edge of graph.edges) {
      const neighborIds = [];
      if (edge.source_note_id === id) neighborIds.push(edge.target_note_id);
      if (edge.target_note_id === id) neighborIds.push(edge.source_note_id);
      for (const n of neighborIds) {
        if (!visited.has(n)) {
          visited.add(n);
          reachable.add(n);
          queue.push({ id: n, depth: depth + 1 });
        }
      }
    }
  }

  return {
    startId: start,
    depth: maxDepth,
    nodes: Array.from(reachable),
    edges: graph.edges.filter(
      (e) => reachable.has(e.source_note_id) && reachable.has(e.target_note_id)
    )
  };
};

