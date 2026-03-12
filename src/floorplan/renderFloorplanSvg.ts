import type { ResolvedFloorplan, ResolvedFloorplanNode } from './floorplanAdapter';

type FloorplanSvgOptions = {
  currentSceneId?: string;
  onSceneClick?: (sceneId: string, node: ResolvedFloorplanNode) => void;
  onSceneHover?: (sceneId: string | null, node?: ResolvedFloorplanNode) => void;
  showLabels?: boolean;
};

const SVG_NS = 'http://www.w3.org/2000/svg';

function createSvgElement<K extends keyof SVGElementTagNameMap>(
  tagName: K,
): SVGElementTagNameMap[K] {
  return document.createElementNS(SVG_NS, tagName);
}

function setClassNames(element: Element, classNames: Array<string | false | null | undefined>): void {
  const value = classNames.filter(Boolean).join(' ');
  if (value) {
    element.setAttribute('class', value);
  }
}

function bindSceneInteractions(
  nodeGroup: SVGGElement,
  node: ResolvedFloorplanNode,
  options: FloorplanSvgOptions,
): void {
  if (!node.interactive || !node.sceneId) {
    return;
  }

  nodeGroup.setAttribute('tabindex', '0');
  nodeGroup.setAttribute('role', 'button');
  nodeGroup.setAttribute('aria-label', node.label);

  if (options.onSceneClick) {
    nodeGroup.addEventListener('click', () => {
      options.onSceneClick?.(node.sceneId!, node);
    });
    nodeGroup.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        options.onSceneClick?.(node.sceneId!, node);
      }
    });
  }

  if (options.onSceneHover) {
    nodeGroup.addEventListener('mouseenter', () => {
      options.onSceneHover?.(node.sceneId!, node);
    });
    nodeGroup.addEventListener('mouseleave', () => {
      options.onSceneHover?.(null, node);
    });
    nodeGroup.addEventListener('focus', () => {
      options.onSceneHover?.(node.sceneId!, node);
    });
    nodeGroup.addEventListener('blur', () => {
      options.onSceneHover?.(null, node);
    });
  }
}

export function renderFloorplanSvg(
  svg: SVGSVGElement,
  floorplan: ResolvedFloorplan,
  options: FloorplanSvgOptions = {},
): void {
  svg.innerHTML = '';
  svg.setAttribute('viewBox', `0 0 ${floorplan.width} ${floorplan.height}`);
  svg.setAttribute('preserveAspectRatio', 'xMidYMid meet');

  const pathsGroup = createSvgElement('g');
  pathsGroup.setAttribute('class', 'vr-floorplan-paths');

  for (const segment of floorplan.pathSegments) {
    const line = createSvgElement('line');
    line.setAttribute('x1', segment.from.x.toString());
    line.setAttribute('y1', segment.from.y.toString());
    line.setAttribute('x2', segment.to.x.toString());
    line.setAttribute('y2', segment.to.y.toString());
    line.setAttribute('class', 'vr-floorplan-path');
    pathsGroup.appendChild(line);
  }

  svg.appendChild(pathsGroup);

  const nodesGroup = createSvgElement('g');
  nodesGroup.setAttribute('class', 'vr-floorplan-nodes');

  for (const node of floorplan.renderNodes) {
    const isCurrent = Boolean(node.sceneId && node.sceneId === options.currentSceneId);
    const nodeGroup = createSvgElement('g');
    setClassNames(nodeGroup, [
      'vr-floorplan-node',
      isCurrent && 'is-current',
      !node.interactive && 'is-disabled',
      node.interactive && 'is-interactive',
    ]);
    nodeGroup.setAttribute('data-node-id', node.id);
    if (node.sceneId) {
      nodeGroup.setAttribute('data-scene-id', node.sceneId);
    }

    const title = createSvgElement('title');
    title.textContent = node.label;
    nodeGroup.appendChild(title);

    const hit = createSvgElement('circle');
    hit.setAttribute('cx', node.x.toString());
    hit.setAttribute('cy', node.y.toString());
    hit.setAttribute('r', '22');
    hit.setAttribute('class', 'vr-floorplan-node-hit');
    nodeGroup.appendChild(hit);

    const dot = createSvgElement('circle');
    dot.setAttribute('cx', node.x.toString());
    dot.setAttribute('cy', node.y.toString());
    dot.setAttribute('r', isCurrent ? '12' : '8');
    dot.setAttribute('class', 'vr-floorplan-node-dot');
    nodeGroup.appendChild(dot);

    if (options.showLabels !== false) {
      const label = createSvgElement('text');
      label.setAttribute('x', node.x.toString());
      label.setAttribute('y', (node.y + (isCurrent ? 30 : 24)).toString());
      label.setAttribute('text-anchor', 'middle');
      label.setAttribute('class', 'vr-floorplan-node-label');
      label.textContent = node.label;
      nodeGroup.appendChild(label);
    }

    bindSceneInteractions(nodeGroup, node, options);
    nodesGroup.appendChild(nodeGroup);
  }

  svg.appendChild(nodesGroup);
}
