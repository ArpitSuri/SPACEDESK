

import React, { useEffect, useRef, useState } from "react";
import * as Chart from "chart.js";

const MAX_POINTS = 30;
const UPDATE_INTERVAL = 1000;

const chartConfigs = [
    { id: "altitudeChart", label: "Altitude", color: "#66fcf1", unit: "km", icon: "📡", category: "Position" },
    { id: "velocityChart", label: "Velocity", color: "#f1c40f", unit: "km/s", icon: "⚡", category: "Motion" },
    { id: "powerChart", label: "Power Level", color: "#e74c3c", unit: "%", icon: "🔋", category: "Systems" },
    { id: "tempChart", label: "Temperature", color: "#3498db", unit: "°C", icon: "🌡️", category: "Environment" },
    { id: "fuelChart", label: "Fuel Level", color: "#9b59b6", unit: "%", icon: "⛽", category: "Resources" },
    { id: "orientationChart", label: "Orientation", color: "#2ecc71", unit: "°", icon: "🧭", category: "Navigation" },
];

const getSimulatedData = () => ({
    altitude: (400 + Math.random() * 10).toFixed(2),
    velocity: (7.66 + Math.random() * 0.2).toFixed(2),
    power: 60 + Math.floor(Math.random() * 40),
    temperature: Math.floor(Math.random() * 100) - 20,
    fuel: Math.floor(Math.random() * 100),
    orientation: (-180 + Math.random() * 360).toFixed(2),
});

const createChart = (ctx, label, color, unit) => {
    Chart.Chart.register(...Chart.registerables);
    return new Chart.Chart(ctx, {
        type: "line",
        data: {
            labels: [],
            datasets: [
                {
                    label: `${label} (${unit})`,
                    data: [],
                    borderColor: color,
                    backgroundColor: color + "20",
                    tension: 0.4,
                    fill: true,
                    borderWidth: 2,
                    pointRadius: 4,
                    pointHoverRadius: 6,
                    pointBackgroundColor: color,
                    pointBorderColor: '#1a1a1a',
                    pointBorderWidth: 2,
                },
            ],
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            animation: {
                duration: 300,
                easing: 'easeInOutQuart',
            },
            interaction: {
                intersect: false,
                mode: 'index',
            },
            scales: {
                x: {
                    title: {
                        display: true,
                        text: "Time",
                        color: "#9ca3af",
                        font: { size: 12 }
                    },
                    ticks: {
                        color: "#6b7280",
                        font: { size: 11 },
                        maxTicksLimit: 6
                    },
                    grid: {
                        color: "#374151",
                        borderColor: "#4b5563"
                    },
                },
                y: {
                    title: {
                        display: true,
                        text: `${label} (${unit})`,
                        color: "#9ca3af",
                        font: { size: 12 }
                    },
                    ticks: {
                        color: "#6b7280",
                        font: { size: 11 }
                    },
                    grid: {
                        color: "#374151",
                        borderColor: "#4b5563"
                    },
                },
            },
            plugins: {
                legend: {
                    labels: {
                        color: "#e5e7eb",
                        font: { size: 12 }
                    }
                },
                tooltip: {
                    backgroundColor: 'rgba(17, 24, 39, 0.9)',
                    titleColor: '#f3f4f6',
                    bodyColor: '#d1d5db',
                    borderColor: color,
                    borderWidth: 1,
                },
            },
        },
    });
};

const TelemetryDashboard = () => {
    const chartRefs = useRef({});
    const canvasRefs = useRef({});
    const [isActive, setIsActive] = useState(true);
    const [missionTime, setMissionTime] = useState(0);
    const [currentData, setCurrentData] = useState({});

    useEffect(() => {
        // Initialize charts
        chartConfigs.forEach(({ id, label, color, unit }) => {
            if (canvasRefs.current[id]) {
                const ctx = canvasRefs.current[id].getContext("2d");

                // Destroy any existing chart
                if (chartRefs.current[id]) {
                    chartRefs.current[id].destroy();
                }

                chartRefs.current[id] = createChart(ctx, label, color, unit);
            }
        });

        let missionTimer = 0;
        const interval = setInterval(() => {
            if (isActive) {
                const telemetry = getSimulatedData();
                setCurrentData(telemetry);
                const now = new Date().toLocaleTimeString();
                missionTimer++;
                setMissionTime(missionTimer);

                const update = (id, value) => {
                    const chart = chartRefs.current[id];
                    if (chart) {
                        chart.data.labels.push(now);
                        chart.data.datasets[0].data.push(value);
                        if (chart.data.labels.length > MAX_POINTS) {
                            chart.data.labels.shift();
                            chart.data.datasets[0].data.shift();
                        }
                        chart.update('none');
                    }
                };

                update("altitudeChart", telemetry.altitude);
                update("velocityChart", telemetry.velocity);
                update("powerChart", telemetry.power);
                update("tempChart", telemetry.temperature);
                update("fuelChart", telemetry.fuel);
                update("orientationChart", telemetry.orientation);
            }
        }, UPDATE_INTERVAL);

        return () => {
            clearInterval(interval);
            chartConfigs.forEach(({ id }) => {
                if (chartRefs.current[id]) {
                    chartRefs.current[id].destroy();
                }
            });
        };
    }, [isActive]);

    const getStatusColor = (value, type) => {
        switch (type) {
            case 'power':
            case 'fuel':
                return value > 70 ? 'text-green-400' : value > 30 ? 'text-yellow-400' : 'text-red-400';
            case 'temperature':
                return Math.abs(value) < 50 ? 'text-green-400' : 'text-yellow-400';
            default:
                return 'text-cyan-400';
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black relative overflow-hidden">
            {/* Floating cosmic orbs */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-blue-500 rounded-full opacity-5 animate-pulse"></div>
                <div className="absolute top-3/4 right-1/4 w-24 h-24 bg-purple-500 rounded-full opacity-10 animate-pulse delay-1000"></div>
                <div className="absolute top-1/2 right-1/3 w-16 h-16 bg-cyan-500 rounded-full opacity-5 animate-pulse delay-2000"></div>
                <div className="absolute bottom-1/4 left-1/3 w-20 h-20 bg-pink-500 rounded-full opacity-5 animate-pulse delay-500"></div>
            </div>

            {/* Stars */}
            <div className="absolute inset-0">
                {[...Array(50)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute w-1 h-1 bg-white rounded-full opacity-30 animate-pulse"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            animationDelay: `${Math.random() * 3}s`
                        }}
                    ></div>
                ))}
            </div>

            <div className="relative z-10 p-4 sm:p-6 lg:p-8">
                {/* Header */}
                <div className="text-center mb-8">
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
                        INTERNATIONAL SPACE STATION TELEMETRY
                    </h1>
                    <p className="text-gray-300 text-lg mb-2">Real-time Mission Data Stream</p>
                    <p className="text-gray-500 text-sm max-w-2xl mx-auto">
                        Live telemetry data from orbital systems. Mission elapsed time: {Math.floor(missionTime / 60)}m {missionTime % 60}s
                    </p>
                </div>

                {/* Mission Control Panel */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
                    <button
                        onClick={() => setIsActive(!isActive)}
                        className={`px-6 py-3  cursor-pointer rounded-full font-medium transition-all duration-300 transform hover:scale-105 ${isActive
                                ? 'bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white'
                                : 'bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white'
                            }`}
                    >
                        {isActive ? '⏸️ Pause Stream' : '▶️ Resume Stream'}
                    </button>
                    <div className="flex items-center space-x-3">
                        <div className={`w-3 h-3 rounded-full animate-pulse ${isActive ? 'bg-green-400' : 'bg-red-400'}`}></div>
                        <span className="text-gray-300 text-sm">
                            {isActive ? 'LIVE DATA STREAM' : 'STREAM PAUSED'}
                        </span>
                    </div>
                </div>

                {/* Current Values Display */}
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
                    {chartConfigs.map(({ id, label, icon, color, unit }) => {
                        const dataKey = id.replace('Chart', '');
                        const value = currentData[dataKey];
                        return (
                            <div key={id} className="bg-gray-900/30 backdrop-blur-md border border-gray-700 rounded-xl p-4 text-center hover:border-gray-600 transition-all duration-300">
                                <div className="text-2xl mb-2">{icon}</div>
                                <div className="text-xs text-gray-400 mb-1">{label}</div>
                                <div className={`text-xl font-bold ${getStatusColor(value, dataKey)}`}>
                                    {value || '--'}
                                    <span className="text-xs text-gray-500 ml-1">{unit}</span>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Charts Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-1 xl:grid-cols-1 gap-6">
                    {chartConfigs.map(({ id, label, icon, color, category }) => (
                        <div
                            key={id}
                            className="bg-gray-900/30 h-[50vh] backdrop-blur-md border border-gray-700 rounded-2xl p-6 shadow-2xl hover:border-gray-600 transition-all duration-300 group"
                        >
                            <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center space-x-3">
                                    <div className="text-2xl">{icon}</div>
                                    <div>
                                        <h2 className="text-lg font-semibold text-white group-hover:text-cyan-400 transition-colors">
                                            {label}
                                        </h2>
                                        <p className="text-xs text-gray-500">{category}</p>
                                    </div>
                                </div>
                                <div
                                    className="w-3 h-3 rounded-full animate-pulse"
                                    style={{ backgroundColor: color }}
                                ></div>
                            </div>
                            <div className="h-80 sm:h-80 lg:h-80">
                                <canvas
                                    ref={(el) => (canvasRefs.current[id] = el)}
                                    id={id}
                                    className="w-full h-full"
                                />
                            </div>
                        </div>
                    ))}
                </div>

                {/* Status Bar */}
                <div className="mt-8 bg-gray-900/30 backdrop-blur-md border border-gray-700 rounded-xl p-4">
                    <div className="flex flex-col sm:flex-row justify-between items-center text-sm text-gray-400">
                        <div className="flex items-center space-x-4 mb-2 sm:mb-0">
                            <span>🛰️ Mission Status: OPERATIONAL</span>
                            <span>🔗 Connection: STABLE</span>
                        </div>
                        <div className="flex items-center space-x-4">
                            <span>📊 Data Points: {MAX_POINTS}</span>
                            <span>⏱️ Update Rate: {UPDATE_INTERVAL}ms</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TelemetryDashboard;