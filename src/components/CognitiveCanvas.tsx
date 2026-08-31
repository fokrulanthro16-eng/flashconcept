"use client";

import React, { useState, useRef, useEffect, useMemo } from "react";
import {
  ZoomIn,
  ZoomOut,
  Maximize2,
  Filter,
  Sparkles,
  Zap,
  Activity,
  Layers,
  RefreshCw,
} from "lucide-react";
import { CognitiveNode, MeshEdge } from "@/types";

interface CognitiveCanvasProps {
  nodes: CognitiveNode[];
  edges: MeshEdge[];
  selectedNodeId: string | null;
  onSelectNode: (node: CognitiveNode | null) => void;
  isLoading?: boolean;
}

export const CognitiveCanvas: React.FC<CognitiveCanvasProps> = ({
  nodes,
  edges,
  selectedNodeId,
  onSelectNode,
  isLoading = false,
}) => {
  const [zoom, setZoom] = useState<number>(1);
  const [pan, setPan] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isDraggingCanvas, setIsDraggingCanvas] = useState<boolean>(false);
  const [dragStart, setDragStart] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [hoveredNodeId, setHoveredNodeId] = useState<string | null>(null);
  const [filterCategory, setFilterCategory] = useState<string>("all");
  const [layoutMode, setLayoutMode] = useState<"orbital" | "matrix" | "concentric">("orbital");
  const [pulseTime, setPulseTime] = useState<number>(0);

  const containerRef = useRef<HTMLDivElement>(null);

  // Pulse animation tick for vector edge packets
  useEffect(() => {
    const interval = setInterval(() => {
      setPulseTime((prev) => (prev + 0.06) % 1);
    }, 35);
    return () => clearInterval(interval);
  }, []);

  // Compute node coordinates based on layout mode
  const computedNodes = useMemo(() => {
    if (nodes.length === 0) return [];
    const centerX = 440;
    const centerY = 270;

    return nodes.map((node, idx) => {
      let x = node.position.x;
      let y = node.position.y;

      if (layoutMode === "matrix") {
        const cols = 3;
        const col = idx % cols;
        const row = Math.floor(idx / cols);
        x = 180 + col * 240;
        y = 110 + row * 170;
      } else if (layoutMode === "concentric") {
        const ring = idx % 2 === 0 ? 1 : 2;
        const ringRadius = ring === 1 ? 130 : 230;
        const angle = (idx / nodes.length) * 2 * Math.PI;
        x = centerX + Math.cos(angle) * ringRadius;
        y = centerY + Math.sin(angle) * ringRadius * 0.85;
      }

      return {
        ...node,
        computedX: x,
        computedY: y,
      };
    });
  }, [nodes, layoutMode]);

  const nodeMap = useMemo(() => {
    const map = new Map<string, (typeof computedNodes)[0]>();
    computedNodes.forEach((n) => map.set(n.id, n));
    return map;
  }, [computedNodes]);

  const visibleNodes = useMemo(() => {
    if (filterCategory === "all") return computedNodes;
    return computedNodes.filter((n) => n.category === filterCategory);
  }, [computedNodes, filterCategory]);

  const visibleNodeIds = useMemo(
    () => new Set(visibleNodes.map((n) => n.id)),
    [visibleNodes]
  );

  const visibleEdges = useMemo(() => {
    return edges.filter(
      (e) => visibleNodeIds.has(e.source) && visibleNodeIds.has(e.target)
    );
  }, [edges, visibleNodeIds]);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.target === containerRef.current || (e.target as HTMLElement).tagName === "svg") {
      setIsDraggingCanvas(true);
      setDragStart({ x: e.clientX - pan.x, y: e.clientY - pan.y });
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDraggingCanvas) {
      setPan({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y,
      });
    }
  };

  const handleMouseUp = () => {
    setIsDraggingCanvas(false);
  };

  const handleZoomIn = () => setZoom((z) => Math.min(z + 0.15, 2.0));
  const handleZoomOut = () => setZoom((z) => Math.max(z - 0.15, 0.6));
  const handleResetView = () => {
    setZoom(1);
    setPan({ x: 0, y: 0 });
  };

  return (
    <div
      ref={containerRef}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      className="relative w-full h-[520px] rounded-xl card-studio overflow-hidden select-none cursor-grab active:cursor-grabbing bg-studio-grid"
    >
      {/* Top Floating Controls Bar */}
      <div className="absolute top-3 left-3 right-3 z-20 flex flex-wrap items-center justify-between gap-2 pointer-events-auto">
        <div className="flex items-center space-x-2 bg-[#161618]/95 px-3 py-1.5 rounded-lg border-2 border-[#222226] shadow-tactile-sm">
          <div className="flex items-center space-x-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#FFAC3F] animate-ping" />
            <span className="text-xs font-bold text-white tracking-wide uppercase">
              Kinetic Vector Mesh
            </span>
          </div>
          <span className="text-[#222226]">|</span>
          <span className="text-[11px] font-mono text-[#63F78F] font-semibold">
            {nodes.length} Nodes &bull; {edges.length} Synapses
          </span>
        </div>

        {/* Layout & Filter Toolbar */}
        <div className="flex items-center space-x-2">
          {/* Category Filter */}
          <div className="flex items-center bg-[#161618]/95 px-2.5 py-1 rounded-lg border-2 border-[#222226] text-xs font-mono text-[#9CA3AF]">
            <Filter className="w-3.5 h-3.5 text-[#FFAC3F] mr-1.5" />
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="bg-transparent text-white text-xs focus:outline-none cursor-pointer"
            >
              <option value="all">All Vector Categories</option>
              <option value="axiom">Axioms (#FFAC3F)</option>
              <option value="vector_core">Vector Cores (#FFAC3F)</option>
              <option value="inference">Inferences (#63F78F)</option>
              <option value="synthetic">Synthetics (#63F78F)</option>
              <option value="quantum_bridge">Bridges</option>
              <option value="telemetry_sink">Sinks</option>
            </select>
          </div>

          {/* Layout Mode Switcher */}
          <div className="flex items-center bg-[#161618]/95 p-1 rounded-lg border-2 border-[#222226] text-xs font-bold space-x-1">
            <button
              onClick={() => setLayoutMode("orbital")}
              className={`px-2.5 py-1 rounded transition-all ${
                layoutMode === "orbital"
                  ? "bg-[#FFAC3F] text-black font-extrabold shadow-sm"
                  : "text-[#9CA3AF] hover:text-white"
              }`}
            >
              Orbital
            </button>
            <button
              onClick={() => setLayoutMode("concentric")}
              className={`px-2.5 py-1 rounded transition-all ${
                layoutMode === "concentric"
                  ? "bg-[#63F78F] text-black font-extrabold shadow-sm"
                  : "text-[#9CA3AF] hover:text-white"
              }`}
            >
              Rings
            </button>
            <button
              onClick={() => setLayoutMode("matrix")}
              className={`px-2.5 py-1 rounded transition-all ${
                layoutMode === "matrix"
                  ? "bg-white text-black font-extrabold shadow-sm"
                  : "text-[#9CA3AF] hover:text-white"
              }`}
            >
              Matrix
            </button>
          </div>

          {/* Zoom / Viewport Buttons */}
          <div className="flex items-center bg-[#161618]/95 p-1 rounded-lg border-2 border-[#222226] space-x-1 text-white">
            <button
              onClick={handleZoomIn}
              className="p-1.5 hover:bg-[#222226] hover:text-[#FFAC3F] rounded transition-colors"
              title="Zoom In"
            >
              <ZoomIn className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={handleZoomOut}
              className="p-1.5 hover:bg-[#222226] hover:text-[#FFAC3F] rounded transition-colors"
              title="Zoom Out"
            >
              <ZoomOut className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={handleResetView}
              className="p-1.5 hover:bg-[#222226] hover:text-[#63F78F] rounded transition-colors"
              title="Reset Viewport"
            >
              <Maximize2 className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Loading Overlay */}
      {isLoading && (
        <div className="absolute inset-0 z-30 bg-[#0D0D0E]/80 backdrop-blur-xs flex flex-col items-center justify-center space-y-3 font-mono">
          <RefreshCw className="w-8 h-8 text-[#FFAC3F] animate-spin" />
          <span className="text-xs text-[#FFAC3F] font-bold tracking-wider">
            Deconstructing Kinetic Nodes...
          </span>
        </div>
      )}

      {/* SVG Canvas */}
      <svg
        className="w-full h-full"
        style={{
          transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
          transformOrigin: "center center",
          transition: isDraggingCanvas ? "none" : "transform 0.15s ease-out",
        }}
      >
        <defs>
          <filter id="tactile-shadow" x="-30%" y="-30%" width="160%" height="160%">
            <feDropShadow dx="3" dy="3" stdDeviation="0" floodColor="#222226" />
          </filter>
          <filter id="glow-orange" x="-40%" y="-40%" width="180%" height="180%">
            <feDropShadow dx="0" dy="0" stdDeviation="6" floodColor="#FFAC3F" floodOpacity="0.7" />
          </filter>
          <filter id="glow-green" x="-40%" y="-40%" width="180%" height="180%">
            <feDropShadow dx="0" dy="0" stdDeviation="6" floodColor="#63F78F" floodOpacity="0.7" />
          </filter>
        </defs>

        {/* Dynamic Dashed Vector Edges */}
        <g className="edges-layer">
          {visibleEdges.map((edge) => {
            const sourceNode = nodeMap.get(edge.source);
            const targetNode = nodeMap.get(edge.target);
            if (!sourceNode || !targetNode) return null;

            const isEdgeHighlighted =
              selectedNodeId === edge.source ||
              selectedNodeId === edge.target ||
              hoveredNodeId === edge.source ||
              hoveredNodeId === edge.target;

            const currentPhase = (pulseTime + (edge.weight || 0.5)) % 1;
            const packetX =
              sourceNode.computedX + (targetNode.computedX - sourceNode.computedX) * currentPhase;
            const packetY =
              sourceNode.computedY + (targetNode.computedY - sourceNode.computedY) * currentPhase;

            const strokeColor = isEdgeHighlighted
              ? "#FFAC3F"
              : "rgba(255, 255, 255, 0.12)";

            return (
              <g key={edge.id}>
                {/* Dashed Vector Line */}
                <line
                  x1={sourceNode.computedX}
                  y1={sourceNode.computedY}
                  x2={targetNode.computedX}
                  y2={targetNode.computedY}
                  stroke={strokeColor}
                  strokeWidth={isEdgeHighlighted ? 2.5 : 1.5}
                  strokeDasharray="6,4"
                />

                {/* Traveling Vector Packet */}
                <circle
                  cx={packetX}
                  cy={packetY}
                  r={isEdgeHighlighted ? 4 : 2.5}
                  fill={sourceNode.accentColor || "#FFAC3F"}
                />
              </g>
            );
          })}
        </g>

        {/* Kinetic Nodes */}
        <g className="nodes-layer">
          {visibleNodes.map((node) => {
            const isSelected = selectedNodeId === node.id;
            const isHovered = hoveredNodeId === node.id;
            const isOrange = node.accentColor === "#FFAC3F";
            const mainColor = isOrange ? "#FFAC3F" : "#63F78F";

            return (
              <g
                key={node.id}
                transform={`translate(${node.computedX}, ${node.computedY})`}
                onClick={(e) => {
                  e.stopPropagation();
                  onSelectNode(isSelected ? null : node);
                }}
                onMouseEnter={() => setHoveredNodeId(node.id)}
                onMouseLeave={() => setHoveredNodeId(null)}
                className="cursor-pointer"
              >
                {/* Selection Halo */}
                {isSelected && (
                  <circle
                    r={38}
                    fill="none"
                    stroke={mainColor}
                    strokeWidth="2.5"
                    strokeDasharray="5,4"
                    filter={isOrange ? "url(#glow-orange)" : "url(#glow-green)"}
                  />
                )}

                {/* Outer Tactile Circle Box */}
                <circle
                  r={24}
                  fill="#161618"
                  stroke={isSelected ? mainColor : isHovered ? "#FFFFFF" : "#222226"}
                  strokeWidth={isSelected ? 3 : 2}
                  filter="url(#tactile-shadow)"
                />

                {/* Inner Kinetic Accent Dot */}
                <circle
                  r={8}
                  fill={mainColor}
                />

                {/* Center Core Pip */}
                <circle
                  r={3}
                  fill="#0D0D0E"
                />

                {/* Node Label Card Pill */}
                <g transform="translate(0, 36)">
                  <rect
                    x="-75"
                    y="-9"
                    width="150"
                    height="18"
                    rx="4"
                    fill="#161618"
                    stroke={isSelected ? mainColor : "#222226"}
                    strokeWidth="1.5"
                  />
                  <text
                    y="3.5"
                    textAnchor="middle"
                    className={`text-[10px] font-sans font-bold select-none ${
                      isSelected ? "fill-[#FFAC3F]" : isHovered ? "fill-white" : "fill-[#9CA3AF]"
                    }`}
                  >
                    {node.label.length > 20
                      ? `${node.label.slice(0, 18)}...`
                      : node.label}
                  </text>
                </g>

                {/* Latency Tag */}
                <text
                  y={58}
                  textAnchor="middle"
                  className="text-[9px] font-mono fill-[#63F78F] font-bold"
                >
                  {node.latencyMs}ms &bull; conf:{Math.round(node.confidence * 100)}%
                </text>
              </g>
            );
          })}
        </g>
      </svg>

      {/* Canvas Bottom Legend HUD */}
      <div className="absolute bottom-3 left-3 right-3 z-20 flex flex-wrap items-center justify-between gap-2 pointer-events-none">
        <div className="flex items-center space-x-3 bg-[#161618]/95 px-3 py-1.5 rounded-lg border-2 border-[#222226] text-xs font-mono pointer-events-auto">
          <span className="text-[#9CA3AF] font-bold">Vector Palette:</span>
          <div className="flex items-center space-x-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#FFAC3F]" />
            <span className="text-white font-semibold">Electric Orange (Axiom/Core)</span>
          </div>
          <div className="flex items-center space-x-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#63F78F]" />
            <span className="text-white font-semibold">Kinetic Green (Inference/Synth)</span>
          </div>
        </div>

        <div className="bg-[#161618]/95 px-3 py-1.5 rounded-lg border-2 border-[#222226] text-xs font-mono text-[#9CA3AF] pointer-events-auto flex items-center space-x-1.5">
          <Zap className="w-3.5 h-3.5 text-[#FFAC3F]" />
          <span>Click any node to trigger vector audio telemetry</span>
        </div>
      </div>
    </div>
  );
};
