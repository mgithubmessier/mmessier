'use client';

import React, { useEffect, useState } from 'react';
import * as d3 from 'd3';
import { Button, Paper } from '@mui/material';

const drag = (simulation: d3.Simulation<d3.SimulationNodeDatum, undefined>) => {
  function dragstarted(event: any) {
    if (!event.active) simulation.alphaTarget(0.3).restart();
    event.subject.fx = event.subject.x;
    event.subject.fy = event.subject.y;
  }

  function dragged(event: any) {
    event.subject.fx = event.x;
    event.subject.fy = event.y;
  }

  function dragended(event: any) {
    if (!event.active) simulation.alphaTarget(0);
    event.subject.fx = null;
    event.subject.fy = null;
  }

  return d3
    .drag()
    .on('start', dragstarted)
    .on('drag', dragged)
    .on('end', dragended);
};

const runForceGraph = (
  container: HTMLDivElement,
  linkData: LinkData[],
  nodeData: NodeData[],
  width: number = 300,
  height: number = 300,
  nodeRadius = 15
) => {
  const nodes = [...nodeData];
  const links = [...linkData];

  const forceNode = d3.forceManyBody();
  const forceLink = d3
    .forceLink(links)
    .distance(200)
    .id((_, index) => {
      if (index !== undefined) {
        return nodes[index].id;
      }
      return '';
    });

  // START INITIALIZE SVG
  const svg = d3
    .select(container)
    .append('svg')
    .attr('width', width)
    .attr('height', height)
    .attr('viewBox', [-width / 2, -height / 2, width, height])
    .attr('style', 'max-width: 100%; height: auto; height: intrinsic;');
  // END INITIALIZE SVG

  // START LINE LOGIC
  const link = svg.append('g').selectAll('line').data(links).join('line');

  link
    .attr('stroke', (l) => l.stroke || '#999')
    .attr('stroke-opacity', (l) => l.strokeOpacity || 0.6)
    .attr('stroke-width', (l) => l.strokeWidth || 1.5)
    .attr('stroke-linecap', (l) => l.strokeLinecap || 'round');
  // END LINE LOGIC

  // START ARROWHEAD LOGIC
  const arrowPoints: [number, number][] = [
    [0, 0],
    [0, 6],
    [6, 3],
  ];
  const markerBoxHeight = 6;
  const markerBoxWidth = 6;
  const refY = markerBoxHeight / 2;

  svg
    .append('defs')
    .append('marker')
    .attr('id', `arrow`)
    .attr('viewBox', [0, 0, markerBoxWidth, markerBoxHeight])
    .attr('refY', refY)
    .attr('refX', nodeRadius + 2)
    .attr('markerWidth', markerBoxWidth)
    .attr('markerHeight', markerBoxHeight)
    .attr('orient', 'auto-start-reverse')
    .append('path')
    .attr('d', d3.line()(arrowPoints))
    .attr('stroke', 'black');

  link
    .attr('marker-end', ({ targetArrow }) => {
      return targetArrow ? 'url(#arrow)' : null;
    })
    .attr('marker-start', ({ sourceArrow = true }) => {
      return sourceArrow ? 'url(#arrow)' : null;
    });
  // END ARROWHEAD LOGIC

  const simulation = d3
    .forceSimulation(nodes)
    .force('link', forceLink)
    .force('charge', forceNode)
    .force('center', d3.forceCenter())
    .on('tick', () => {
      link
        .attr('x1', (d: any) => d.source.x)
        .attr('y1', (d: any) => d.source.y)
        .attr('x2', (d: any) => d.target.x)
        .attr('y2', (d: any) => d.target.y);

      node.attr('transform', (d) => `translate(${d.x}, ${d.y})`);
    })
    .force(
      'collide',
      d3.forceCollide(() => nodeRadius * 2)
    );

  const node = svg
    .append('g')
    .selectAll('.node')
    .data(nodes)
    .join('g')
    .attr('class', 'node')
    .attr('id', (n) => `node${n.id}`)
    .call(drag(simulation as any) as any);

  node
    .append('circle')
    .attr('fill', (n) => n.fillColor || 'black')
    .attr('r', () => nodeRadius)
    .attr('stroke', (n) => n.stroke || '#fff')
    .attr('stroke-opacity', (n) => n.strokeOpacity || 1)
    .attr('stroke-width', (n) => n.strokeWidth || 1.5)
    .style('cursor', 'pointer')
    .on('mouseover', function (event, n) {
      d3.select(`#node${n.id}`).attr('class', '');
      d3.select(`#label${n.id}`).transition().duration(250).style('opacity', 1);
      d3.select(`#subLabel${n.id}`)
        .transition()
        .duration(250)
        .style('opacity', 1);
      d3.selectAll('.node').transition().duration(250).style('opacity', 0.15);
      d3.selectAll('line').transition().duration(250).style('opacity', 0.15);
    })
    .on('mouseout', (event, n) => {
      d3.select(`#node${n.id}`).attr('class', 'node');
      d3.select(`#label${n.id}`).attr('class', 'text');
      d3.select(`#label${n.id}`).transition().duration(250).style('opacity', 0);
      d3.select(`#subLabel${n.id}`).attr('class', 'text');
      d3.select(`#subLabel${n.id}`)
        .transition()
        .duration(250)
        .style('opacity', 0);
      d3.selectAll('.node').transition().duration(250).style('opacity', 1);
      d3.selectAll('line').transition().duration(250).style('opacity', 1);
    })
    .on('click', (event, n) => {
      n.onClick?.(n.id);
    });

  const fontSize = 16;
  node
    .append('text')
    .text((d) => {
      return d.label || '';
    })
    .style('fill', '#000')
    .style('font-size', fontSize)
    .attr('x', () => nodeRadius + 4)
    .attr('y', (n) => (n.subLabel ? -5 : 5))
    .style('opacity', 0)
    .style('pointer-events', 'none')
    .attr('id', (n) => `label${n.id}`);
  node
    .append('text')
    .text((d) => {
      return d.subLabel || '';
    })
    .style('fill', '#000')
    .style('font-size', fontSize)
    .attr('x', () => nodeRadius + 4)
    .attr('y', () => 15)
    .style('opacity', 0)
    .style('pointer-events', 'none')
    .attr('id', (n) => `subLabel${n.id}`);

  return {
    destroy: () => {
      simulation.stop();
      svg.remove();
    },
    nodes: () => {
      return svg.node();
    },
  };
};

export type LinkData = {
  id: string;
  source: string;
  target: string;
  stroke?: string;
  strokeOpacity?: number;
  strokeWidth?: number;
  strokeLinecap?: string;
  sourceArrow?: boolean;
  targetArrow?: boolean;
};

export type NodeData = d3.SimulationNodeDatum & {
  id: string;
  label?: string;
  subLabel?: string;
  fillColor?: string;
  stroke?: string;
  strokeOpacity?: number;
  strokeWidth?: number;
  onClick?: (id: string) => void;
};

type ForceGraphProps = {
  nodeRadius?: number;
  nodes: NodeData[];
  links: LinkData[];
  width?: number;
  height?: number;
  hiddenByDefault?: boolean;
};

export function ForceGraph({
  nodes,
  links,
  width,
  height,
  nodeRadius,
  hiddenByDefault = true,
}: ForceGraphProps) {
  const containerRef = React.useRef(null);
  const [hideGraph, setHideGraph] = useState(hiddenByDefault);

  useEffect(() => {
    if (containerRef.current && !hideGraph) {
      const { destroy } = runForceGraph(
        containerRef.current,
        links,
        nodes,
        width,
        height,
        nodeRadius
      );
      return destroy;
    }
  }, [JSON.stringify(nodes), JSON.stringify(links), width, height, hideGraph]);

  return (
    <div style={{ position: 'relative', minHeight: 50 }}>
      <Button
        onClick={() => setHideGraph(!hideGraph)}
        variant="outlined"
        style={{ position: 'absolute', top: 12, left: 12 }}
      >
        {!hideGraph ? 'Hide Graph' : 'Show Graph'}
      </Button>
      {!hideGraph ? <Paper ref={containerRef} /> : null}
    </div>
  );
}
