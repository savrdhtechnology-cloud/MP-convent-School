import React, { useState, useEffect, useRef } from 'react';
import { 
  Bus, 
  X, 
  Phone, 
  ShieldCheck, 
  Navigation, 
  Radio, 
  Pause, 
  Play, 
  ZoomIn, 
  ZoomOut, 
  RotateCcw, 
  MapPin, 
  Clock, 
  Users, 
  CheckCircle2, 
  AlertTriangle, 
  Layers,
  Sparkles,
  ChevronRight,
  Info
} from 'lucide-react';
import { SCHOOL_INFO } from '../data/schoolData';

export interface RouteStop {
  id: string;
  name: string;
  time: string;
  studentCount: number;
  progress: number; // 0 to 1 along curve
  x: number; // percentage coordinate 0-100
  y: number; // percentage coordinate 0-100
  passed: boolean;
  isDestination?: boolean;
}

export interface BusRouteData {
  id: string;
  routeCode: string;
  name: string;
  busNumber: string;
  driverName: string;
  driverPhone: string;
  driverVerified: boolean;
  conductorName: string;
  conductorPhone: string;
  speedLimitKmH: number;
  initialSpeedKmH: number;
  regionLabel: string;
  studentAssigned: {
    name: string;
    classGrade: string;
    pickupStop: string;
    pickupTime: string;
  };
  stops: RouteStop[];
}

export const GPS_ROUTES: BusRouteData[] = [
  {
    id: 'route-1',
    routeCode: 'Route 01: Samardha - Mandideep - MPCS Campus',
    name: 'Samardha - Mandideep - MPCS Campus',
    busNumber: 'MP-04-E-8891',
    driverName: 'Mr. Harish Meena',
    driverPhone: '+91 98260 11223',
    driverVerified: true,
    conductorName: 'Mr. Rajesh Yadav',
    conductorPhone: '+91 98261 44556',
    speedLimitKmH: 45,
    initialSpeedKmH: 38,
    regionLabel: 'BHOPAL METROPOLITAN & NARMADAPURAM CORRIDOR',
    studentAssigned: {
      name: 'Aaditya Verma',
      classGrade: 'Class X-A',
      pickupStop: 'Samardha Main Bus Stand',
      pickupTime: '07:20 AM'
    },
    stops: [
      { id: 's1', name: 'Mandideep Industrial Area', time: '07:05 AM', studentCount: 12, progress: 0.12, x: 14, y: 55, passed: true },
      { id: 's2', name: 'Samardha Main Bus Stand', time: '07:20 AM', studentCount: 14, progress: 0.36, x: 37, y: 65, passed: true },
      { id: 's3', name: '11th Mile By-pass Square', time: '07:35 AM', studentCount: 8, progress: 0.62, x: 61, y: 56, passed: true },
      { id: 's4', name: 'MP Convent School Campus', time: '07:50 AM', studentCount: 4, progress: 1.0, x: 84, y: 45, passed: false, isDestination: true }
    ]
  },
  {
    id: 'route-3',
    routeCode: 'Route 03: Barna Colony - Bari Stand - MPCS Campus',
    name: 'Bari Market - Barna Colony - Shaktinagar Campus',
    busNumber: 'MP-38-P-1204',
    driverName: 'Mr. Kailash Singh',
    driverPhone: '+91 98934 61015',
    driverVerified: true,
    conductorName: 'Mr. Jagdish Sen',
    conductorPhone: '+91 94254 61015',
    speedLimitKmH: 40,
    initialSpeedKmH: 34,
    regionLabel: 'RAISEN DISTRICT & BARI METROPOLITAN CORRIDOR',
    studentAssigned: {
      name: 'Pooja Shrivastava',
      classGrade: 'Class VIII-B',
      pickupStop: 'Barna Colony Stop',
      pickupTime: '07:30 AM'
    },
    stops: [
      { id: 'r3-1', name: 'Barna Colony Stop', time: '07:30 AM', studentCount: 10, progress: 0.15, x: 15, y: 52, passed: true },
      { id: 'r3-2', name: 'Kishanpur Phata', time: '07:42 AM', studentCount: 8, progress: 0.38, x: 36, y: 64, passed: true },
      { id: 'r3-3', name: 'Bari Old Bus Stand', time: '07:55 AM', studentCount: 15, progress: 0.64, x: 60, y: 54, passed: true },
      { id: 'r3-4', name: 'MP Convent School Campus', time: '08:15 AM', studentCount: 5, progress: 1.0, x: 84, y: 45, passed: false, isDestination: true }
    ]
  },
  {
    id: 'route-2',
    routeCode: 'Route 02: Pipaliya - Barna Dam - MPCS Campus',
    name: 'Pipaliya - Barna Dam Loop',
    busNumber: 'MP-38-P-0891',
    driverName: 'Mr. Radheshyam Patel',
    driverPhone: '+91 97521 88401',
    driverVerified: true,
    conductorName: 'Mr. Ramu Lodhi',
    conductorPhone: '+91 97521 88402',
    speedLimitKmH: 40,
    initialSpeedKmH: 32,
    regionLabel: 'BARNA RESERVOIR & RURAL FEEDER ZONE',
    studentAssigned: {
      name: 'Aarav Patel',
      classGrade: 'Class II-A',
      pickupStop: 'Pipaliya Square',
      pickupTime: '07:15 AM'
    },
    stops: [
      { id: 'r2-1', name: 'Pipaliya Square', time: '07:15 AM', studentCount: 9, progress: 0.15, x: 16, y: 56, passed: true },
      { id: 'r2-2', name: 'Barna Dam Canal Road', time: '07:30 AM', studentCount: 11, progress: 0.40, x: 38, y: 62, passed: true },
      { id: 'r2-3', name: 'Tehsil Colony Turn', time: '07:45 AM', studentCount: 6, progress: 0.65, x: 62, y: 53, passed: true },
      { id: 'r2-4', name: 'MP Convent School Campus', time: '08:00 AM', studentCount: 3, progress: 1.0, x: 84, y: 45, passed: false, isDestination: true }
    ]
  }
];

interface LiveGpsTrackerModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultRouteId?: string;
  studentName?: string;
  studentClass?: string;
}

export const LiveGpsTrackerModal: React.FC<LiveGpsTrackerModalProps> = ({
  isOpen,
  onClose,
  defaultRouteId = 'route-1',
  studentName,
  studentClass
}) => {
  const [selectedRouteId, setSelectedRouteId] = useState<string>(defaultRouteId);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [mapMode, setMapMode] = useState<'map' | 'satellite'>('map');
  const [syncSeconds, setSyncSeconds] = useState<number>(4);
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [speed, setSpeed] = useState<number>(38);
  const [busProgress, setBusProgress] = useState<number>(0.68); // 0 to 1 along the curve
  const [approachingStop, setApproachingStop] = useState<string>('MP Convent School Campus');
  const [etaMinutes, setEtaMinutes] = useState<number>(7);

  // Active Route Object
  const currentRoute = GPS_ROUTES.find(r => r.id === selectedRouteId) || GPS_ROUTES[0];
  const activeStudentName = studentName || currentRoute.studentAssigned.name;
  const activeStudentClass = studentClass || currentRoute.studentAssigned.classGrade;

  // Real-time animation loop
  useEffect(() => {
    if (!isOpen) return;

    // Timer to update sync countdown & subtle bus movement
    const interval = setInterval(() => {
      if (!isPaused) {
        setSyncSeconds(prev => (prev <= 1 ? 5 : prev - 1));
        
        // Progress bus slightly forward along curve, looping between 0.58 and 0.88 for live demo
        setBusProgress(prev => {
          const next = prev + 0.003;
          if (next > 0.96) return 0.55;
          return next;
        });

        // Fluctuate speed realistically
        setSpeed(prev => {
          const delta = (Math.random() - 0.5) * 3;
          const nextSpeed = Math.round(Math.max(26, Math.min(44, prev + delta)));
          return nextSpeed;
        });

        // ETA calculation
        setEtaMinutes(prev => Math.max(2, Math.round((1 - busProgress) * 20)));
      }
    }, 1200);

    return () => clearInterval(interval);
  }, [isOpen, isPaused, busProgress]);

  if (!isOpen) return null;

  // Cubic Bezier interpolation for accurate road positioning
  // Route curve control points: P0=(10, 52), P1=(25, 75), P2=(50, 72), P3=(65, 52), P4=(75, 40), P5=(85, 45)
  // Simplified mathematical trajectory along the curve in the screenshot
  const calculateBusCoords = (t: number) => {
    // Piecewise spline for smooth road path
    // 0 -> start, 1 -> destination
    const startX = 12;
    const startY = 54;
    const mid1X = 37;
    const mid1Y = 65;
    const mid2X = 62;
    const mid2Y = 55;
    const endX = 84;
    const endY = 45;

    let x = 0;
    let y = 0;
    let angle = 0;

    if (t < 0.4) {
      const subT = t / 0.4;
      x = startX + (mid1X - startX) * subT;
      y = startY + (mid1Y - startY) * Math.sin(subT * Math.PI * 0.5);
      angle = 15; // heading downward
    } else if (t < 0.75) {
      const subT = (t - 0.4) / 0.35;
      x = mid1X + (mid2X - mid1X) * subT;
      y = mid1Y + (mid2Y - mid1Y) * subT;
      angle = -12; // heading upward
    } else {
      const subT = (t - 0.75) / 0.25;
      x = mid2X + (endX - mid2X) * subT;
      y = mid2Y + (endY - mid2Y) * subT;
      angle = -8;
    }

    return { x, y, angle };
  };

  const busPos = calculateBusCoords(busProgress);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 md:p-6 animate-in fade-in duration-200">
      
      {/* Outer Modal Container */}
      <div className="bg-[#0b1322] w-full max-w-5xl rounded-2xl md:rounded-3xl shadow-2xl overflow-hidden border border-slate-700/60 flex flex-col max-h-[96vh] text-white">
        
        {/* 1. MODAL TOP HEADER */}
        <div className="px-4 sm:px-6 py-4 flex items-center justify-between border-b border-slate-800 bg-[#070d18]">
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-amber-500 text-slate-950 flex items-center justify-center font-black shadow-lg shadow-amber-500/20">
              <Bus className="w-6 h-6 stroke-[2.5]" />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="font-extrabold text-base sm:text-lg text-white tracking-tight">
                  Live GPS Tracker • {currentRoute.routeCode}
                </h2>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Tracking assigned school bus for <span className="text-amber-400 font-bold">{activeStudentName}</span> ({activeStudentClass})
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white flex items-center justify-center transition-colors border border-slate-700"
            title="Close GPS Tracker"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 2. ROUTE & LIVE TELEMETRY BAR */}
        <div className="bg-[#0e1a2f] px-4 sm:px-6 py-3.5 border-b border-slate-800/80 flex flex-wrap items-center justify-between gap-3">
          
          {/* Left: Route Title & Live Pulse */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2">
              <div className="relative flex items-center justify-center">
                <div className="w-3 h-3 rounded-full bg-emerald-500 animate-ping absolute opacity-75"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-400"></div>
              </div>
              <h3 className="font-extrabold text-sm sm:text-base text-white">
                {currentRoute.routeCode}
              </h3>
              <span className="text-xs font-mono font-bold bg-amber-400/20 text-amber-300 border border-amber-400/40 px-2 py-0.5 rounded-md">
                {currentRoute.busNumber}
              </span>
            </div>

            <span className="text-xs text-slate-400 flex items-center gap-1.5 font-mono">
              <Radio className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
              Live GPS Satellite Active • Sync: <strong className="text-slate-200">{syncSeconds}s ago</strong>
            </span>
          </div>

          {/* Right: Metrics & Controls */}
          <div className="flex flex-wrap items-center gap-2.5 text-xs">
            
            {/* Speed Pill */}
            <div className="bg-slate-900/80 border border-slate-700/80 px-3 py-1.5 rounded-xl flex items-center gap-1.5 shadow-xs font-medium text-slate-300">
              <span className="text-amber-400">⚡ Speed:</span>
              <strong className="text-white font-bold">{speed} km/h</strong>
            </div>

            {/* Approaching Pill */}
            <div className="bg-slate-900/80 border border-slate-700/80 px-3 py-1.5 rounded-xl flex items-center gap-1.5 shadow-xs font-medium text-slate-300 max-w-[220px] truncate">
              <Navigation className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
              <span className="text-slate-400">Approaching:</span>
              <strong className="text-cyan-200 truncate">{approachingStop}</strong>
            </div>

            {/* Pause/Resume Toggle */}
            <button
              onClick={() => setIsPaused(!isPaused)}
              className={`px-3 py-1.5 rounded-xl font-bold flex items-center gap-1.5 transition-all ${
                isPaused 
                  ? 'bg-emerald-600 hover:bg-emerald-500 text-white' 
                  : 'bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-md shadow-amber-500/20'
              }`}
            >
              {isPaused ? <Play className="w-3.5 h-3.5 fill-current" /> : <Pause className="w-3.5 h-3.5 fill-current" />}
              <span>{isPaused ? 'Resume Feed' : 'Pause Feed'}</span>
            </button>

            {/* Map / Satellite Toggle */}
            <div className="bg-slate-900/90 p-0.5 rounded-xl border border-slate-700 flex items-center text-[11px] font-bold">
              <button
                onClick={() => setMapMode('map')}
                className={`px-2.5 py-1 rounded-lg transition-all ${mapMode === 'map' ? 'bg-slate-700 text-white' : 'text-slate-400 hover:text-white'}`}
              >
                Map
              </button>
              <button
                onClick={() => setMapMode('satellite')}
                className={`px-2.5 py-1 rounded-lg transition-all ${mapMode === 'satellite' ? 'bg-slate-700 text-white' : 'text-slate-400 hover:text-white'}`}
              >
                Satellite
              </button>
            </div>

          </div>

        </div>

        {/* 3. INTERACTIVE GPS VECTOR CANVAS MAP */}
        <div className="relative flex-1 min-h-[380px] sm:min-h-[440px] bg-[#081220] overflow-hidden select-none border-b border-slate-800">
          
          {/* Subtle Grid Background Pattern */}
          <div 
            className="absolute inset-0 opacity-20 pointer-events-none"
            style={{
              backgroundImage: 'radial-gradient(rgba(255, 255, 255, 0.15) 1px, transparent 1px)',
              backgroundSize: '24px 24px'
            }}
          />

          {/* Region Label Top-Left */}
          <div className="absolute top-4 left-6 z-10 pointer-events-none">
            <span className="text-[11px] font-mono tracking-widest text-slate-500 font-bold uppercase">
              {currentRoute.regionLabel}
            </span>
          </div>

          {/* SVG Road Network & Trajectory */}
          <svg 
            className="absolute inset-0 w-full h-full" 
            viewBox="0 0 1000 600" 
            preserveAspectRatio="none"
            style={{ transform: `scale(${zoomLevel})`, transformOrigin: 'center center', transition: 'transform 0.2s ease-out' }}
          >
            <defs>
              {/* Glow Filters */}
              <filter id="glow-teal" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
              <filter id="glow-amber" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="4" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
              <filter id="glow-red" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="5" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Background Secondary Ambient Road Networks */}
            <path
              d="M 50 250 Q 200 180, 400 280 T 850 480"
              fill="none"
              stroke="#132742"
              strokeWidth="14"
              strokeLinecap="round"
            />
            <path
              d="M 120 450 Q 400 550, 650 350 T 920 180"
              fill="none"
              stroke="#132742"
              strokeWidth="16"
              strokeLinecap="round"
            />
            <path
              d="M 300 100 Q 550 250, 750 180 T 950 320"
              fill="none"
              stroke="#132742"
              strokeWidth="12"
              strokeLinecap="round"
            />

            {/* Main School Bus Arterial Highway (Curved Path) */}
            {/* 1. Underlying Dark Road Base */}
            <path
              d="M 120 330 C 250 420, 380 430, 620 340 S 760 260, 840 275"
              fill="none"
              stroke="#1b3354"
              strokeWidth="18"
              strokeLinecap="round"
            />

            {/* 2. Covered Route Segment (Solid Emerald / Teal with Glow) */}
            <path
              d="M 120 330 C 250 420, 380 430, 620 340"
              fill="none"
              stroke="#10b981"
              strokeWidth="6"
              strokeLinecap="round"
              filter="url(#glow-teal)"
            />

            {/* 3. Active Upcoming Segment (Glowing Amber Dashed Line) */}
            <path
              d="M 620 340 S 760 260, 840 275"
              fill="none"
              stroke="#f59e0b"
              strokeWidth="6"
              strokeDasharray="10 8"
              strokeLinecap="round"
              filter="url(#glow-amber)"
              className="animate-pulse"
            />

          </svg>

          {/* Render Interactive Route Stops & Badges */}
          {currentRoute.stops.map((stop) => {
            return (
              <div
                key={stop.id}
                className="absolute z-20 transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300 group"
                style={{ left: `${stop.x}%`, top: `${stop.y}%` }}
              >
                {/* Node Ring Marker */}
                <div className="relative flex items-center justify-center">
                  {stop.isDestination ? (
                    // Destination School Campus Marker (Red Glowing Pulse)
                    <div className="relative flex items-center justify-center">
                      <div className="w-8 h-8 rounded-full bg-rose-500/30 animate-ping absolute"></div>
                      <div className="w-6 h-6 rounded-full bg-rose-500 border-2 border-white shadow-lg flex items-center justify-center">
                        <div className="w-2 h-2 rounded-full bg-white"></div>
                      </div>
                    </div>
                  ) : (
                    // Passed or Normal Stop (Teal Ring)
                    <div className="relative flex items-center justify-center">
                      <div className="w-5 h-5 rounded-full bg-[#0b1728] border-3 border-emerald-400 shadow-md flex items-center justify-center">
                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-300"></div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Floating Stop Label Box (Matching screenshot styling) */}
                <div 
                  className={`mt-2 px-3 py-1.5 rounded-xl border shadow-xl backdrop-blur-md whitespace-nowrap text-center ${
                    stop.isDestination 
                      ? 'bg-[#1e131d]/90 border-rose-500/60 text-white' 
                      : 'bg-[#0e1a2f]/90 border-slate-700 text-slate-200'
                  }`}
                >
                  <p className="text-[11px] font-extrabold text-white truncate max-w-[170px]">
                    {stop.name}
                  </p>
                  <p className="text-[10px] font-mono text-slate-400 mt-0.5">
                    {stop.time} ({stop.studentCount} studs)
                  </p>
                </div>
              </div>
            );
          })}

          {/* 4. LIVE ANIMATED BUS MARKER (Vehicle Icon + Aura + Speed Tag) */}
          <div
            className="absolute z-30 transform -translate-x-1/2 -translate-y-1/2 transition-all duration-500 ease-out"
            style={{ 
              left: `${busPos.x}%`, 
              top: `${busPos.y}%` 
            }}
          >
            {/* Speed Badge Tag Above Bus */}
            <div className="relative -top-3 flex flex-col items-center">
              <div className="bg-amber-400 text-slate-950 font-black text-[10px] font-mono px-2.5 py-0.5 rounded-md shadow-lg border border-amber-300 whitespace-nowrap">
                BUS • {speed} km/h
              </div>
            </div>

            {/* Glowing Bus Vehicle Body */}
            <div className="relative flex items-center justify-center">
              {/* Outer Golden Aura Ring */}
              <div className="w-12 h-12 rounded-full bg-amber-400/20 animate-ping absolute"></div>
              <div className="w-10 h-10 rounded-full bg-amber-400/40 blur-xs absolute"></div>
              
              {/* Bus Capsule Icon */}
              <div 
                className="w-9 h-9 rounded-xl bg-gradient-to-br from-amber-400 to-amber-500 border-2 border-white shadow-2xl flex items-center justify-center text-slate-950 transform"
                style={{ transform: `rotate(${busPos.angle}deg)` }}
              >
                <Bus className="w-5 h-5 fill-slate-950 stroke-[2.5]" />
              </div>
            </div>
          </div>

          {/* Map Legend Overlay at Bottom-Left */}
          <div className="absolute bottom-4 left-6 z-10 flex items-center gap-4 text-xs font-semibold text-slate-300 bg-slate-900/80 px-4 py-2 rounded-xl border border-slate-800 backdrop-blur-md">
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-1 bg-emerald-400 rounded-full"></div>
              <span>Covered Route</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-1 bg-amber-400 rounded-full border-t border-dashed border-amber-300"></div>
              <span>Active Segment</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-2.5 h-2.5 bg-rose-500 rounded-full"></div>
              <span>MP Convent School</span>
            </div>
          </div>

          {/* Zoom & View Controls Overlay at Bottom-Right */}
          <div className="absolute bottom-4 right-6 z-10 flex flex-col gap-1.5">
            <button
              onClick={() => setZoomLevel(prev => Math.min(1.4, prev + 0.1))}
              className="w-8 h-8 rounded-lg bg-slate-900/90 hover:bg-slate-800 text-slate-300 hover:text-white flex items-center justify-center border border-slate-700 transition-colors shadow-md"
              title="Zoom In"
            >
              <ZoomIn className="w-4 h-4" />
            </button>
            <button
              onClick={() => setZoomLevel(prev => Math.max(0.8, prev - 0.1))}
              className="w-8 h-8 rounded-lg bg-slate-900/90 hover:bg-slate-800 text-slate-300 hover:text-white flex items-center justify-center border border-slate-700 transition-colors shadow-md"
              title="Zoom Out"
            >
              <ZoomOut className="w-4 h-4" />
            </button>
            <button
              onClick={() => setZoomLevel(1)}
              className="w-8 h-8 rounded-lg bg-slate-900/90 hover:bg-slate-800 text-slate-300 hover:text-white flex items-center justify-center border border-slate-700 transition-colors shadow-md"
              title="Reset View"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>

        </div>

        {/* 4. DRIVER & SAFETY VERIFICATION FOOTER BAR */}
        <div className="bg-[#070d18] px-4 sm:px-6 py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          
          {/* Driver & Conductor Card */}
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0">
              <Bus className="w-6 h-6" />
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h4 className="font-extrabold text-sm sm:text-base text-white">{currentRoute.driverName}</h4>
                {currentRoute.driverVerified && (
                  <span className="text-[10px] font-extrabold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 px-2 py-0.5 rounded-full">
                    Verified Driver
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Conductor: <strong className="text-slate-300">{currentRoute.conductorName}</strong> ({currentRoute.conductorPhone})
              </p>
            </div>
          </div>

          {/* Right Action & Security Badges */}
          <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
            
            {/* Call Driver Button */}
            <a
              href={`tel:${currentRoute.driverPhone}`}
              className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs sm:text-sm px-5 py-3 rounded-xl shadow-lg shadow-emerald-600/20 transition-all transform hover:scale-105"
            >
              <Phone className="w-4 h-4 fill-current" />
              <span>Call Driver ({currentRoute.driverPhone})</span>
            </a>

            {/* Safety & CCTV Compliance Badge */}
            <div className="flex items-center gap-2.5 bg-slate-900/90 border border-slate-800 px-4 py-2.5 rounded-xl text-xs">
              <ShieldCheck className="w-5 h-5 text-amber-400 shrink-0" />
              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-bold">CCTV & Speed Governor</span>
                <strong className="text-emerald-400 font-extrabold">Active & Calibrated</strong>
              </div>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
};
