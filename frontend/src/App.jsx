import { useState } from "react";
import "./App.css";
import { devices as deviceData } from "./data/devices";

// Alchemical symbols for device types (Fullmetal Alchemist themed)
const SYMBOLS = {
  Router: "⬡",        // Transmutation Circle - The Gate
  Firewall: "⊛",      // Protection Array - Barrier Alchemy
  "L3 Switch": "☿",   // Mercury - Flow/Equivalent Exchange
  Switch: "◎",        // Ouroboros - Eternal Cycle
  Server: "☉",        // Sun/Gold - Philosopher's Stone
  PC: "☽",            // Moon/Silver - Human Soul
  default: "●"
};

// Layer colors for visual hierarchy
const LAYER_COLORS = {
  core: "#d4af37",      // Gold - Core layer
  distribution: "#c0c0c0", // Silver - Distribution
  access: "#b87333",    // Copper - Access
  endpoint: "#708090"   // Steel - Endpoints
};

// VLAN colors for visual grouping
const VLAN_COLORS = {
  10: "#ff6b6b",  // Red - Admin VLAN
  20: "#4ecdc4",  // Teal - Users VLAN
  30: "#45b7d1",  // Blue - Servers VLAN
  40: "#96ceb4"   // Green - Guest VLAN
};

// Generate sacred geometry patterns
const generatePentagramPoints = (cx, cy, radius, points = 5) => {
  const angleOffset = -Math.PI / 2; // Start from top
  const coords = [];
  for (let i = 0; i < points; i++) {
    const angle = angleOffset + (i * 2 * Math.PI) / points;
    coords.push({
      x: cx + radius * Math.cos(angle),
      y: cy + radius * Math.sin(angle)
    });
  }
  return coords;
};

const createPentagramPath = (points) => {
  // Connect every other point to create a star
  const order = [0, 2, 4, 1, 3, 0];
  return order.map((i, idx) => 
    `${idx === 0 ? 'M' : 'L'} ${points[i].x} ${points[i].y}`
  ).join(' ');
};

// Generate hexagram (six-pointed star) for additional symmetry
const generateHexagramPoints = (cx, cy, radius) => {
  const coords = [];
  for (let i = 0; i < 6; i++) {
    const angle = -Math.PI / 2 + (i * Math.PI) / 3;
    coords.push({
      x: cx + radius * Math.cos(angle),
      y: cy + radius * Math.sin(angle)
    });
  }
  return coords;
};

const createHexagramPath = (points) => {
  // Two overlapping triangles
  const triangle1 = `M ${points[0].x} ${points[0].y} L ${points[2].x} ${points[2].y} L ${points[4].x} ${points[4].y} Z`;
  const triangle2 = `M ${points[1].x} ${points[1].y} L ${points[3].x} ${points[3].y} L ${points[5].x} ${points[5].y} Z`;
  return `${triangle1} ${triangle2}`;
};

export default function App() {
  const [devices] = useState(deviceData);
  const [selected, setSelected] = useState(null);
  const [activeLayer, setActiveLayer] = useState(null);
  const [activeVlan, setActiveVlan] = useState(null);

  const center = 400;
  const svgSize = 800;
  
  // Ring radii for different layers (transmutation circle layout)
  const ringRadii = {
    core: 60,           // Ring 0 - Center core (routers)
    firewall: 120,      // Ring 1 - Firewalls
    distribution: 180,  // Ring 2 - Distribution switches
    access: 260,        // Ring 3 - Access switches
    endpoint: 340,      // Ring 4 - End devices
    outer: 380          // Decorative outer ring
  };
  
  const nodeRadius = 24;

  // Group devices by ring/layer
  const devicesByRing = {
    0: devices.filter(d => d.ring === 0), // Core routers
    1: devices.filter(d => d.ring === 1), // Firewalls
    2: devices.filter(d => d.ring === 2), // Distribution switches
    3: devices.filter(d => d.ring === 3), // Access switches
    4: devices.filter(d => d.ring === 4)  // Endpoints
  };

  // Calculate node positions based on ring and even distribution
  const calculateNodePositions = () => {
    const positions = [];
    
    Object.entries(devicesByRing).forEach(([ring, ringDevices]) => {
      const ringNum = parseInt(ring);
      let radius;
      
      switch(ringNum) {
        case 0: radius = ringRadii.core; break;
        case 1: radius = ringRadii.firewall; break;
        case 2: radius = ringRadii.distribution; break;
        case 3: radius = ringRadii.access; break;
        case 4: radius = ringRadii.endpoint; break;
        default: radius = ringRadii.distribution;
      }
      
      ringDevices.forEach((device, i) => {
        // Offset each ring for visual interest
        const ringOffset = ringNum * (Math.PI / 8);
        const angle = ringOffset + (i / ringDevices.length) * 2 * Math.PI - Math.PI / 2;
        
        positions.push({
          ...device,
          x: center + radius * Math.cos(angle),
          y: center + radius * Math.sin(angle),
          angle,
          radius
        });
      });
    });
    
    return positions;
  };

  const nodePositions = calculateNodePositions();

  // Generate connection data for hierarchical links
  const generateConnections = () => {
    const connections = [];
    
    // Core routers connect to each other
    const coreDevices = nodePositions.filter(d => d.ring === 0);
    if (coreDevices.length >= 2) {
      connections.push({
        from: coreDevices[0],
        to: coreDevices[1],
        type: 'core-link',
        cable: 'Copper Crossover',
        fromInterface: 'Gig0/0',
        toInterface: 'Gig0/0'
      });
    }
    
    // Core routers connect to firewalls
    const firewalls = nodePositions.filter(d => d.ring === 1);
    const coreToFwInterfaces = {
      'CORE-R1': { 'FW-N': 'Gig0/1', 'FW-S': 'Gig0/2' },
      'CORE-R2': { 'FW-E': 'Gig0/1', 'FW-W': 'Gig0/2' }
    };
    coreDevices.forEach(core => {
      firewalls.forEach((fw, i) => {
        // Each core connects to alternating firewalls
        if ((core.id === 'CORE-R1' && (fw.id === 'FW-N' || fw.id === 'FW-S')) ||
            (core.id === 'CORE-R2' && (fw.id === 'FW-E' || fw.id === 'FW-W'))) {
          connections.push({
            from: core,
            to: fw,
            type: 'core-to-firewall',
            cable: 'Copper Straight-Through',
            fromInterface: coreToFwInterfaces[core.id]?.[fw.id] || 'Gig0/1',
            toInterface: 'Gig1/1'
          });
        }
      });
    });
    
    // Firewalls connect to distribution switches
    const distSwitches = nodePositions.filter(d => d.ring === 2);
    firewalls.forEach(fw => {
      distSwitches.forEach(dsw => {
        // Match by cardinal direction
        if ((fw.id === 'FW-N' && dsw.id === 'DSW-N') ||
            (fw.id === 'FW-E' && dsw.id === 'DSW-E') ||
            (fw.id === 'FW-S' && dsw.id === 'DSW-S') ||
            (fw.id === 'FW-W' && dsw.id === 'DSW-W')) {
          connections.push({
            from: fw,
            to: dsw,
            type: 'firewall-to-dist',
            cable: 'Copper Straight-Through',
            fromInterface: 'Gig1/2',
            toInterface: 'Gig1/0/1'
          });
        }
      });
    });
    
    // Distribution switches connect to access switches
    const accessSwitches = nodePositions.filter(d => d.ring === 3);
    distSwitches.forEach(dsw => {
      accessSwitches.forEach(asw => {
        // Match by direction prefix
        const dswDir = dsw.id.split('-')[1];
        const aswDir = asw.id.split('-')[1].charAt(0);
        if (dswDir === aswDir) {
          const aswNum = asw.id.slice(-1);
          connections.push({
            from: dsw,
            to: asw,
            type: 'dist-to-access',
            cable: 'Copper Straight-Through',
            fromInterface: `Gig1/0/${parseInt(aswNum) + 1}`,
            toInterface: 'Gig0/1'
          });
        }
      });
    });
    
    // Access switches connect to endpoints
    const endpoints = nodePositions.filter(d => d.ring === 4);
    let portCounter = {};
    accessSwitches.forEach(asw => {
      endpoints.forEach(ep => {
        // Match by VLAN
        if (asw.vlan === ep.vlan) {
          // Only connect first access switch of each direction to endpoints
          if (asw.id.endsWith('1')) {
            if (!portCounter[asw.id]) portCounter[asw.id] = 1;
            connections.push({
              from: asw,
              to: ep,
              type: 'access-to-endpoint',
              cable: 'Copper Straight-Through',
              fromInterface: `Fa0/${portCounter[asw.id]++}`,
              toInterface: 'Fa0'
            });
          }
        }
      });
    });
    
    return connections;
  };

  const connections = generateConnections();

  // Generate pentagram points for decoration
  const pentagramOuter = generatePentagramPoints(center, center, ringRadii.access - 20);
  const pentagramInner = generatePentagramPoints(center, center, ringRadii.firewall + 20);
  const hexagramPoints = generateHexagramPoints(center, center, ringRadii.distribution);

  // Check if a device should be highlighted
  const isHighlighted = (device) => {
    if (activeLayer && device.layer !== activeLayer) return false;
    if (activeVlan && device.vlan !== activeVlan) return false;
    return true;
  };

  return (
    <div className="transmutation-container">
      {/* Header */}
      <header className="header">
        <h1 className="header-title">Network Transmutation Circle</h1>
        <p className="header-subtitle">Enterprise Topology Visualization System</p>
        <p className="header-doctrine">"To obtain, something of equal value must be given"</p>
      </header>

      {/* Filter Controls */}
      <div className="filter-controls">
        <div className="filter-group">
          <span className="filter-label">Layer:</span>
          <button 
            className={`filter-btn ${activeLayer === null ? 'active' : ''}`}
            onClick={() => setActiveLayer(null)}
          >All</button>
          <button 
            className={`filter-btn ${activeLayer === 'core' ? 'active' : ''}`}
            onClick={() => setActiveLayer('core')}
          >Core</button>
          <button 
            className={`filter-btn ${activeLayer === 'distribution' ? 'active' : ''}`}
            onClick={() => setActiveLayer('distribution')}
          >Distribution</button>
          <button 
            className={`filter-btn ${activeLayer === 'access' ? 'active' : ''}`}
            onClick={() => setActiveLayer('access')}
          >Access</button>
          <button 
            className={`filter-btn ${activeLayer === 'endpoint' ? 'active' : ''}`}
            onClick={() => setActiveLayer('endpoint')}
          >Endpoints</button>
        </div>
        <div className="filter-group">
          <span className="filter-label">VLAN:</span>
          <button 
            className={`filter-btn ${activeVlan === null ? 'active' : ''}`}
            onClick={() => setActiveVlan(null)}
          >All</button>
          <button 
            className={`filter-btn vlan-10 ${activeVlan === 10 ? 'active' : ''}`}
            onClick={() => setActiveVlan(10)}
          >VLAN 10</button>
          <button 
            className={`filter-btn vlan-20 ${activeVlan === 20 ? 'active' : ''}`}
            onClick={() => setActiveVlan(20)}
          >VLAN 20</button>
          <button 
            className={`filter-btn vlan-30 ${activeVlan === 30 ? 'active' : ''}`}
            onClick={() => setActiveVlan(30)}
          >VLAN 30</button>
          <button 
            className={`filter-btn vlan-40 ${activeVlan === 40 ? 'active' : ''}`}
            onClick={() => setActiveVlan(40)}
          >VLAN 40</button>
        </div>
      </div>

      {/* Main Content */}
      <main className="main-content">
        {/* Transmutation Circle SVG */}
        <div className="circle-container">
          <svg 
            width={svgSize} 
            height={svgSize} 
            viewBox={`0 0 ${svgSize} ${svgSize}`}
            className="transmutation-circle"
          >
            <defs>
              {/* Gradient for glow effects */}
              <radialGradient id="coreGlow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#d4af37" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#d4af37" stopOpacity="0" />
              </radialGradient>
              
              {/* Layer-specific gradients */}
              <radialGradient id="coreLayerGlow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor={LAYER_COLORS.core} stopOpacity="0.2" />
                <stop offset="100%" stopColor={LAYER_COLORS.core} stopOpacity="0" />
              </radialGradient>
              
              {/* Filter for node glow */}
              <filter id="goldGlow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
                <feMerge>
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
              
              {/* VLAN color filters */}
              {Object.entries(VLAN_COLORS).map(([vlan, color]) => (
                <filter key={`vlan-glow-${vlan}`} id={`vlanGlow${vlan}`} x="-50%" y="-50%" width="200%" height="200%">
                  <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                  <feFlood floodColor={color} floodOpacity="0.5" result="color"/>
                  <feComposite in="color" in2="coloredBlur" operator="in" result="coloredBlur"/>
                  <feMerge>
                    <feMergeNode in="coloredBlur"/>
                    <feMergeNode in="SourceGraphic"/>
                  </feMerge>
                </filter>
              ))}
            </defs>

            {/* Outer decorative ring with runes */}
            <g className="rotating-ring">
              <circle
                cx={center}
                cy={center}
                r={ringRadii.outer}
                className="circle-outer"
              />
              {/* Decorative marks around outer circle - 72 for more precision */}
              {Array.from({ length: 72 }).map((_, i) => {
                const angle = (i / 72) * 2 * Math.PI;
                const x1 = center + (ringRadii.outer - 8) * Math.cos(angle);
                const y1 = center + (ringRadii.outer - 8) * Math.sin(angle);
                const x2 = center + (ringRadii.outer + 2) * Math.cos(angle);
                const y2 = center + (ringRadii.outer + 2) * Math.sin(angle);
                return (
                  <line
                    key={`tick-${i}`}
                    x1={x1}
                    y1={y1}
                    x2={x2}
                    y2={y2}
                    stroke={i % 9 === 0 ? "#b8a070" : "#3a3a3a"}
                    strokeWidth={i % 9 === 0 ? 2 : 1}
                    opacity={i % 9 === 0 ? 0.8 : 0.4}
                  />
                );
              })}
            </g>

            {/* Endpoint ring (outermost device ring) */}
            <circle
              cx={center}
              cy={center}
              r={ringRadii.endpoint}
              className="circle-ring endpoint-ring"
              strokeDasharray="8 4"
            />

            {/* Access layer ring */}
            <circle
              cx={center}
              cy={center}
              r={ringRadii.access}
              className="circle-ring access-ring"
            />

            {/* Distribution layer ring */}
            <circle
              cx={center}
              cy={center}
              r={ringRadii.distribution}
              className="circle-ring distribution-ring"
            />

            {/* Firewall ring */}
            <circle
              cx={center}
              cy={center}
              r={ringRadii.firewall}
              className="circle-ring firewall-ring"
            />

            {/* Core ring */}
            <circle
              cx={center}
              cy={center}
              r={ringRadii.core}
              className="circle-ring core-ring"
            />

            {/* Hexagram pattern (distribution layer) */}
            <path
              d={createHexagramPath(hexagramPoints)}
              className="hexagram-line"
              fill="none"
            />

            {/* Pentagram pattern (outer) */}
            <path
              d={createPentagramPath(pentagramOuter)}
              className="pentagram-line"
              fill="none"
            />

            {/* Pentagram pattern (inner) */}
            <path
              d={createPentagramPath(pentagramInner)}
              className="pentagram-line inner-pentagram"
              fill="none"
            />

            {/* Cardinal direction lines */}
            {[0, 1, 2, 3].map(i => {
              const angle = (i * Math.PI) / 2;
              return (
                <line
                  key={`cardinal-${i}`}
                  x1={center + ringRadii.core * Math.cos(angle)}
                  y1={center + ringRadii.core * Math.sin(angle)}
                  x2={center + ringRadii.access * Math.cos(angle)}
                  y2={center + ringRadii.access * Math.sin(angle)}
                  className="geometry-line cardinal"
                />
              );
            })}

            {/* Diagonal lines (8-point symmetry) */}
            {[0, 1, 2, 3, 4, 5, 6, 7].map(i => {
              const angle = (i * Math.PI) / 4;
              return (
                <line
                  key={`diagonal-${i}`}
                  x1={center}
                  y1={center}
                  x2={center + ringRadii.firewall * Math.cos(angle)}
                  y2={center + ringRadii.firewall * Math.sin(angle)}
                  className="geometry-line diagonal"
                />
              );
            })}

            {/* Hierarchical connection lines */}
            {connections.map((conn, i) => {
              const isActive = selected && (selected.id === conn.from.id || selected.id === conn.to.id);
              const fromHighlighted = isHighlighted(conn.from);
              const toHighlighted = isHighlighted(conn.to);
              const bothHighlighted = fromHighlighted && toHighlighted;
              
              return (
                <line
                  key={`conn-${i}`}
                  x1={conn.from.x}
                  y1={conn.from.y}
                  x2={conn.to.x}
                  y2={conn.to.y}
                  className={`connection-line ${conn.type} ${isActive ? 'active' : ''} ${bothHighlighted ? '' : 'dimmed'}`}
                  strokeDasharray={conn.type === 'access-to-endpoint' ? '4 2' : 'none'}
                />
              );
            })}

            {/* Ring connection arcs (connecting nodes on same ring) */}
            {[1, 2, 3].map(ring => {
              const ringDevices = nodePositions.filter(d => d.ring === ring);
              return ringDevices.map((device, i) => {
                const nextDevice = ringDevices[(i + 1) % ringDevices.length];
                return (
                  <line
                    key={`ring-${ring}-${i}`}
                    x1={device.x}
                    y1={device.y}
                    x2={nextDevice.x}
                    y2={nextDevice.y}
                    className="ring-connection"
                    opacity={0.2}
                  />
                );
              });
            })}

            {/* Center core glow */}
            <circle
              cx={center}
              cy={center}
              r={ringRadii.core - 10}
              fill="url(#coreGlow)"
            />

            {/* Center element (The Gate of Truth) */}
            <circle
              cx={center}
              cy={center}
              r={25}
              className="center-core"
            />
            <text
              x={center}
              y={center + 2}
              className="center-symbol"
            >
              ⊕
            </text>

            {/* Device nodes */}
            {nodePositions.map((node) => {
              const isSelected = selected?.id === node.id;
              const symbol = SYMBOLS[node.type] || SYMBOLS.default;
              const highlighted = isHighlighted(node);
              const layerColor = LAYER_COLORS[node.layer] || '#888';
              const vlanColor = node.vlan ? VLAN_COLORS[node.vlan] : null;
              
              return (
                <g
                  key={node.id}
                  className={`node-group ${isSelected ? 'selected' : ''} ${highlighted ? '' : 'dimmed'}`}
                  onClick={() => setSelected(node)}
                  style={{ transform: `translate(0, 0)` }}
                >
                  {/* VLAN indicator ring */}
                  {vlanColor && (
                    <circle
                      cx={node.x}
                      cy={node.y}
                      r={nodeRadius + 4}
                      fill="none"
                      stroke={vlanColor}
                      strokeWidth="2"
                      opacity={highlighted ? 0.6 : 0.2}
                      className="vlan-indicator"
                    />
                  )}
                  
                  {/* Outer node circle */}
                  <circle
                    cx={node.x}
                    cy={node.y}
                    r={nodeRadius}
                    className="node-circle-outer"
                    style={{ stroke: layerColor }}
                    filter={isSelected ? "url(#goldGlow)" : "none"}
                  />
                  
                  {/* Inner node circle */}
                  <circle
                    cx={node.x}
                    cy={node.y}
                    r={nodeRadius - 6}
                    className="node-circle-inner"
                  />
                  
                  {/* Device type symbol */}
                  <text
                    x={node.x}
                    y={node.y + 1}
                    className="node-symbol"
                  >
                    {symbol}
                  </text>
                  
                  {/* Device ID label */}
                  <text
                    x={node.x}
                    y={node.y + nodeRadius + 12}
                    className="node-label"
                  >
                    {node.id}
                  </text>
                </g>
              );
            })}

            {/* Layer labels */}
            <text x={center} y={center - ringRadii.core - 8} className="layer-label">CORE</text>
            <text x={center} y={center - ringRadii.firewall - 8} className="layer-label">SECURITY</text>
            <text x={center} y={center - ringRadii.distribution - 8} className="layer-label">DISTRIBUTION</text>
            <text x={center} y={center - ringRadii.access - 8} className="layer-label">ACCESS</text>
            <text x={center} y={center - ringRadii.endpoint - 8} className="layer-label">ENDPOINTS</text>
          </svg>
        </div>

        {/* Information Panel */}
        <aside className="info-panel">
          <div className="panel-header">
            <h2 className="panel-title">Element Codex</h2>
            <p className="panel-subtitle">Network Configuration Data</p>
          </div>
          
          <div className="panel-content">
            {selected ? (
              <div className="device-details">
                <div className="device-header">
                  <h3 className="device-name">{selected.name}</h3>
                  <span className="device-type" style={{ borderColor: LAYER_COLORS[selected.layer] }}>
                    {selected.type}
                  </span>
                </div>
                
                <div className="device-meta">
                  <span className="meta-label">ID</span>
                  <span className="meta-value">{selected.id}</span>
                  
                  {selected.model && (
                    <>
                      <span className="meta-label">Model</span>
                      <span className="meta-value">{selected.model}</span>
                    </>
                  )}
                  
                  <span className="meta-label">Symbol</span>
                  <span className="meta-value gold">{selected.symbol}</span>
                  
                  <span className="meta-label">Layer</span>
                  <span className="meta-value" style={{ color: LAYER_COLORS[selected.layer] }}>
                    {selected.layer?.toUpperCase()}
                  </span>
                  
                  {selected.vlan && (
                    <>
                      <span className="meta-label">VLAN</span>
                      <span className="meta-value" style={{ color: VLAN_COLORS[selected.vlan] }}>
                        VLAN {selected.vlan}
                      </span>
                    </>
                  )}
                </div>
                
                {/* Connections section */}
                {(() => {
                  const deviceConnections = connections.filter(
                    c => c.from.id === selected.id || c.to.id === selected.id
                  );
                  if (deviceConnections.length > 0) {
                    return (
                      <div className="connections-section">
                        <div className="config-header">
                          <span className="config-label">Connections</span>
                          <span className="config-line" />
                        </div>
                        <div className="connections-list">
                          {deviceConnections.map((conn, idx) => {
                            const isFrom = conn.from.id === selected.id;
                            const otherDevice = isFrom ? conn.to : conn.from;
                            const myInterface = isFrom ? conn.fromInterface : conn.toInterface;
                            const otherInterface = isFrom ? conn.toInterface : conn.fromInterface;
                            return (
                              <div key={idx} className="connection-item">
                                <div className="connection-devices">
                                  <span className="connection-interface">{myInterface}</span>
                                  <span className="connection-arrow">→</span>
                                  <span className="connection-target">{otherDevice.id}</span>
                                  <span className="connection-interface">({otherInterface})</span>
                                </div>
                                <div className="connection-cable">
                                  <span className="cable-type">{conn.cable}</span>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    );
                  }
                  return null;
                })()}
                
                <div className="config-section">
                  <div className="config-header">
                    <span className="config-label">Configuration</span>
                    <span className="config-line" />
                  </div>
                  <pre className="config-block">{selected.config}</pre>
                </div>
                
                {/* Security indicators */}
                <div className="security-section">
                  <div className="config-header">
                    <span className="config-label">Security Controls</span>
                    <span className="config-line" />
                  </div>
                  <div className="security-badges">
                    {selected.config?.includes('access-list') && (
                      <span className="security-badge acl">ACL</span>
                    )}
                    {selected.config?.includes('port-security') && (
                      <span className="security-badge port-sec">Port Security</span>
                    )}
                    {selected.config?.includes('vlan') && (
                      <span className="security-badge vlan-iso">VLAN Isolation</span>
                    )}
                    {selected.config?.includes('bpduguard') && (
                      <span className="security-badge bpdu">BPDU Guard</span>
                    )}
                    {selected.config?.includes('password') && (
                      <span className="security-badge auth">Authentication</span>
                    )}
                    {selected.type === 'Firewall' && (
                      <span className="security-badge firewall">Firewall</span>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <div className="empty-state">
                <svg className="empty-icon" viewBox="0 0 64 64" fill="none">
                  <circle cx="32" cy="32" r="28" stroke="#3a3a3a" strokeWidth="2"/>
                  <circle cx="32" cy="32" r="20" stroke="#3a3a3a" strokeWidth="1" strokeDasharray="4 2"/>
                  <circle cx="32" cy="32" r="12" stroke="#3a3a3a" strokeWidth="1"/>
                  <circle cx="32" cy="32" r="6" stroke="#b8a070" strokeWidth="1"/>
                  <line x1="32" y1="4" x2="32" y2="60" stroke="#3a3a3a" strokeWidth="0.5" opacity="0.5"/>
                  <line x1="4" y1="32" x2="60" y2="32" stroke="#3a3a3a" strokeWidth="0.5" opacity="0.5"/>
                </svg>
                <p className="empty-text">Select a node to view its configuration</p>
                <p className="empty-hint">Click on any element in the transmutation circle</p>
              </div>
            )}
          </div>
          
          {/* Network Statistics */}
          <div className="stats-section">
            <h3 className="stats-title">Network Statistics</h3>
            <div className="stats-grid">
              <div className="stat-item">
                <span className="stat-value">{devices.filter(d => d.layer === 'core').length}</span>
                <span className="stat-label">Core Devices</span>
              </div>
              <div className="stat-item">
                <span className="stat-value">{devices.filter(d => d.layer === 'distribution').length}</span>
                <span className="stat-label">Distribution</span>
              </div>
              <div className="stat-item">
                <span className="stat-value">{devices.filter(d => d.layer === 'access').length}</span>
                <span className="stat-label">Access</span>
              </div>
              <div className="stat-item">
                <span className="stat-value">{devices.filter(d => d.layer === 'endpoint').length}</span>
                <span className="stat-label">Endpoints</span>
              </div>
              <div className="stat-item">
                <span className="stat-value">4</span>
                <span className="stat-label">VLANs</span>
              </div>
              <div className="stat-item">
                <span className="stat-value">{devices.filter(d => d.type === 'Firewall').length}</span>
                <span className="stat-label">Firewalls</span>
              </div>
            </div>
          </div>
        </aside>
      </main>

      {/* Legend */}
      <div className="legend">
        <div className="legend-section">
          <h4 className="legend-title">Device Types</h4>
          <div className="legend-items">
            {Object.entries(SYMBOLS).filter(([k]) => k !== 'default').map(([type, symbol]) => (
              <div key={type} className="legend-item">
                <span className="legend-symbol">{symbol}</span>
                <span className="legend-label">{type}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="legend-section">
          <h4 className="legend-title">Network Layers</h4>
          <div className="legend-items">
            {Object.entries(LAYER_COLORS).map(([layer, color]) => (
              <div key={layer} className="legend-item">
                <span className="legend-color" style={{ backgroundColor: color }}></span>
                <span className="legend-label">{layer.charAt(0).toUpperCase() + layer.slice(1)}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="legend-section">
          <h4 className="legend-title">VLAN Segments</h4>
          <div className="legend-items">
            <div className="legend-item"><span className="legend-color" style={{ backgroundColor: VLAN_COLORS[10] }}></span>VLAN 10 - Admin</div>
            <div className="legend-item"><span className="legend-color" style={{ backgroundColor: VLAN_COLORS[20] }}></span>VLAN 20 - Users</div>
            <div className="legend-item"><span className="legend-color" style={{ backgroundColor: VLAN_COLORS[30] }}></span>VLAN 30 - Servers</div>
            <div className="legend-item"><span className="legend-color" style={{ backgroundColor: VLAN_COLORS[40] }}></span>VLAN 40 - Guest</div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="footer">
        <p className="footer-text">Equivalent Exchange Protocol v2.0 — {devices.length} Devices Active</p>
      </footer>
    </div>
  );
}
