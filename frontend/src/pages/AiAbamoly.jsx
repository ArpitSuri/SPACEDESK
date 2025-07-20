import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Satellite, Activity, Zap, Thermometer, AlertTriangle, Play, Square, TrendingUp } from 'lucide-react';

const CosmosAnomalyDashboard = () => {
    const [telemetry, setTelemetry] = useState(null);
    const [analysis, setAnalysis] = useState(null);
    const [isMonitoring, setIsMonitoring] = useState(false);
    const [anomalyHistory, setAnomalyHistory] = useState([]);
    const [dataMode, setDataMode] = useState('sample');
    const [lastAnomalyKey, setLastAnomalyKey] = useState(null);
    const [notifications, setNotifications] = useState([]);

    // Simulate telemetry data generation
    const generateTelemetryData = () => {
        const baseValues = { power: 150, voltage: 28, temperature: 45 };
        const variance = { power: 30, voltage: 5, temperature: 15 };

        // Add some anomalies occasionally
        const isAnomaly = Math.random() < 0.1;
        const anomalyMultiplier = isAnomaly ? (Math.random() > 0.5 ? 1.8 : 0.4) : 1;

        return {
            power: Math.round(baseValues.power * anomalyMultiplier + (Math.random() - 0.5) * variance.power),
            voltage: Math.round((baseValues.voltage + (Math.random() - 0.5) * variance.voltage) * 10) / 10,
            temperature: Math.round((baseValues.temperature + (Math.random() - 0.5) * variance.temperature) * 10) / 10,
            timestamp: new Date().toISOString()
        };
    };

    // Simulate analysis
    const analyzeData = (currentData, history) => {
        if (!history || history.length < 5) return { isAnomaly: false };

        const recentHistory = history.slice(-10);
        const avgPower = recentHistory.reduce((sum, d) => sum + d.power, 0) / recentHistory.length;
        const stdDev = Math.sqrt(recentHistory.reduce((sum, d) => sum + Math.pow(d.power - avgPower, 2), 0) / recentHistory.length);
        const zScore = Math.abs(currentData.power - avgPower) / stdDev;

        return {
            isAnomaly: zScore > 2,
            zScore: Math.round(zScore * 100) / 100,
            movingAvg: Math.round(avgPower),
            deviation: Math.round((currentData.power - avgPower) * 100) / 100
        };
    };

    const fetchTelemetry = async () => {
        // Simulate API call with mock data
        const current = generateTelemetryData();
        const history = telemetry?.history || [];
        const newHistory = [...history, current].slice(-50); // Keep last 50 points

        const newTelemetry = {
            current,
            history: newHistory
        };

        setTelemetry(newTelemetry);
        return current;
    };

    const analyzeTelemetry = async () => {
        if (!telemetry) return;

        const analysisResult = analyzeData(telemetry.current, telemetry.history);
        setAnalysis(analysisResult);

        if (analysisResult.isAnomaly) {
            const currentAnomalyKey = `${telemetry.current.power}-${analysisResult.zScore}`;

            if (currentAnomalyKey !== lastAnomalyKey) {
                const anomaly = {
                    id: Date.now(),
                    timestamp: new Date().toLocaleTimeString(),
                    power: telemetry.current.power,
                    zScore: analysisResult.zScore,
                    deviation: analysisResult.deviation,
                };

                setAnomalyHistory((prev) => [anomaly, ...prev].slice(0, 10));
                setLastAnomalyKey(currentAnomalyKey);

                // Add notification
                const notification = {
                    id: Date.now(),
                    message: `Anomaly Detected! Power: ${telemetry.current.power}W (Z-score: ${analysisResult.zScore})`,
                    type: 'error'
                };

                setNotifications(prev => [notification, ...prev].slice(0, 5));

                // Remove notification after 5 seconds
                setTimeout(() => {
                    setNotifications(prev => prev.filter(n => n.id !== notification.id));
                }, 5000);
            }
        } else {
            setLastAnomalyKey(null);
        }
    };

    useEffect(() => {
        let interval;
        if (isMonitoring) {
            interval = setInterval(async () => {
                await fetchTelemetry();
                setTimeout(analyzeTelemetry, 100); // Small delay to ensure telemetry is updated
            }, 2000);
        }
        return () => clearInterval(interval);
    }, [isMonitoring, telemetry]);

    const StatCard = ({ icon: Icon, title, value, subtitle, color, animated = false }) => (
        <div className={`bg-gray-900/80 backdrop-blur-sm rounded-xl p-6 border border-gray-800/50 hover:border-gray-700/50 transition-all duration-300 hover:transform hover:scale-105 ${animated ? 'animate-pulse' : ''}`}>
            <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-lg ${color}`}>
                    <Icon className="w-6 h-6 text-white" />
                </div>
                {animated && (
                    <div className="w-2 h-2 bg-red-500 rounded-full animate-ping"></div>
                )}
            </div>
            <div className="space-y-1">
                <p className="text-2xl font-bold text-white">{value}</p>
                <p className="text-gray-400 text-sm">{title}</p>
                {subtitle && <p className="text-xs text-gray-500">{subtitle}</p>}
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-black text-white relative overflow-hidden">
            {/* Animated background stars */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {[...Array(100)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute w-1 h-1 bg-white rounded-full animate-pulse"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            animationDelay: `${Math.random() * 3}s`,
                            animationDuration: `${2 + Math.random() * 3}s`
                        }}
                    />
                ))}
            </div>

            <div className="relative z-10 max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
                {/* Header */}
                <header className="text-center mb-8 sm:mb-12">
                    <div className="flex items-center justify-center mb-4">
                        <h1 className="text-3xl sm:text-4xl lg:text-6xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                            Satellite Telemetry Anomaly Detection System
                        </h1>
                    </div>
                    <p className="text-gray-300 text-sm sm:text-lg mb-6 sm:mb-8"></p>

                    <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-center justify-center">
                        <select
                            value={dataMode}
                            onChange={(e) => setDataMode(e.target.value)}
                            disabled={isMonitoring}
                            className="px-4 py-2 bg-gray-900/80 border border-gray-700 rounded-lg text-white backdrop-blur-sm focus:border-blue-400 transition-colors"
                        >
                            <option value="sample">Live</option>
                            <option value="historical">Historical Data</option>
                        </select>

                        <button
                            onClick={() => setIsMonitoring(!isMonitoring)}
                            className={`px-6 py-2 rounded-lg font-medium transition-all duration-300 flex items-center  cursor-pointer gap-2 ${isMonitoring
                                    ? 'bg-red-500 hover:bg-red-600 shadow-lg shadow-red-500/25'
                                    : 'bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 shadow-lg shadow-blue-500/25'
                                }`}
                        >
                            {isMonitoring ? (
                                <>
                                    <Square className="w-4 h-4" />
                                    Stop Monitoring
                                </>
                            ) : (
                                <>
                                    <Play className="w-4 h-4" />
                                    Start Monitoring
                                </>
                            )}
                        </button>
                    </div>
                </header>

                {/* Notifications */}
                <div className="fixed top-4 right-4 z-50 space-y-2">
                    {notifications.map((notification) => (
                        <div
                            key={notification.id}
                            className="bg-red-500/90 backdrop-blur-sm text-white px-4 py-3 rounded-lg shadow-lg border border-red-400/50 animate-slide-in-right max-w-sm"
                        >
                            <div className="flex items-center gap-2">
                                <AlertTriangle className="w-5 h-5 animate-pulse" />
                                <span className="text-sm font-medium">{notification.message}</span>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
                    <StatCard
                        icon={Zap}
                        title="Power Output"
                        value={telemetry?.current?.power ? `${telemetry.current.power}W` : '--'}
                        subtitle={telemetry?.current?.timestamp ? new Date(telemetry.current.timestamp).toLocaleTimeString() : ''}
                        color="bg-gradient-to-br from-blue-500 to-cyan-600"
                        animated={analysis?.isAnomaly && isMonitoring}
                    />

                    <StatCard
                        icon={Activity}
                        title="Voltage"
                        value={telemetry?.current?.voltage ? `${telemetry.current.voltage}V` : '--'}
                        color="bg-gradient-to-br from-green-500 to-emerald-600"
                    />

                    <StatCard
                        icon={Thermometer}
                        title="Temperature"
                        value={telemetry?.current?.temperature ? `${telemetry.current.temperature}°C` : '--'}
                        color="bg-gradient-to-br from-purple-500 to-pink-600"
                    />

                    <StatCard
                        icon={TrendingUp}
                        title="Status"
                        value={analysis?.isAnomaly ? 'ANOMALY' : 'NORMAL'}
                        subtitle={analysis?.zScore ? `Z-Score: ${analysis.zScore}` : ''}
                        color={analysis?.isAnomaly ? 'bg-gradient-to-br from-red-500 to-orange-600' : 'bg-gradient-to-br from-green-500 to-emerald-600'}
                        animated={analysis?.isAnomaly}
                    />
                </div>

                {/* Chart */}
                <div className="bg-black/80 backdrop-blur-sm rounded-xl p-4 sm:p-6 border border-gray-800/50 mb-8">
                    <h2 className="text-lg sm:text-xl font-semibold mb-4 flex items-center gap-2">
                        <Activity className="w-5 h-5 text-blue-400" />
                        Power Output Timeline
                    </h2>
                    <div className="h-64 sm:h-80">
                        {telemetry?.history && telemetry.history.length > 0 ? (
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={telemetry.history}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#1F2937" />
                                    <XAxis
                                        dataKey="timestamp"
                                        tickFormatter={(value) => new Date(value).toLocaleTimeString()}
                                        stroke="#6B7280"
                                        fontSize={12}
                                    />
                                    <YAxis stroke="#6B7280" fontSize={12} />
                                    <Tooltip
                                        contentStyle={{
                                            backgroundColor: 'rgba(0, 0, 0, 0.95)',
                                            border: '1px solid #1F2937',
                                            borderRadius: '8px',
                                            color: '#F9FAFB'
                                        }}
                                        labelFormatter={(value) => `Time: ${new Date(value).toLocaleTimeString()}`}
                                    />
                                    <Legend />
                                    <Line
                                        type="monotone"
                                        dataKey="power"
                                        stroke="#60A5FA"
                                        strokeWidth={2}
                                        dot={{ fill: '#60A5FA', strokeWidth: 2, r: 4 }}
                                        activeDot={{ r: 6, stroke: '#60A5FA', strokeWidth: 2 }}
                                        name="Power (W)"
                                    />
                                </LineChart>
                            </ResponsiveContainer>
                        ) : (
                            <div className="flex items-center justify-center h-full text-gray-400">
                                <div className="text-center">
                                    <Activity className="w-12 h-12 mx-auto mb-2 opacity-50" />
                                    <p>Start monitoring to see telemetry data</p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Anomaly History */}
                <div className="bg-black/80 backdrop-blur-sm rounded-xl p-4 sm:p-6 border border-gray-800/50">
                    <h2 className="text-lg sm:text-xl font-semibold mb-4 flex items-center gap-2">
                        <AlertTriangle className="w-5 h-5 text-red-400" />
                        Recent Anomalies
                    </h2>
                    {anomalyHistory.length > 0 ? (
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                                <thead>
                                    <tr className="border-b border-gray-800">
                                        <th className="text-left py-3 px-2 sm:px-4 text-gray-400">Time</th>
                                        <th className="text-left py-3 px-2 sm:px-4 text-gray-400">Power (W)</th>
                                        <th className="text-left py-3 px-2 sm:px-4 text-gray-400">Z-Score</th>
                                        <th className="text-left py-3 px-2 sm:px-4 text-gray-400">Deviation</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {anomalyHistory.map((anomaly, index) => (
                                        <tr
                                            key={anomaly.id}
                                            className={`border-b border-gray-900 hover:bg-gray-900/50 transition-colors ${index === 0 ? 'animate-fade-in' : ''
                                                }`}
                                        >
                                            <td className="py-3 px-2 sm:px-4 text-gray-400">{anomaly.timestamp}</td>
                                            <td className="py-3 px-2 sm:px-4 font-medium text-red-400">{anomaly.power}</td>
                                            <td className="py-3 px-2 sm:px-4">{anomaly.zScore}</td>
                                            <td className="py-3 px-2 sm:px-4">{anomaly.deviation}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <div className="text-center py-8 text-gray-400">
                            <AlertTriangle className="w-12 h-12 mx-auto mb-2 opacity-50" />
                            <p>No anomalies detected yet</p>
                            <p className="text-sm mt-1">System is operating normally</p>
                        </div>
                    )}
                </div>
            </div>

            <style jsx>{`
                @keyframes slide-in-right {
                    from {
                        transform: translateX(100%);
                        opacity: 0;
                    }
                    to {
                        transform: translateX(0);
                        opacity: 1;
                    }
                }
                
                @keyframes fade-in {
                    from {
                        opacity: 0;
                        transform: translateY(-10px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                
                .animate-slide-in-right {
                    animation: slide-in-right 0.3s ease-out;
                }
                
                .animate-fade-in {
                    animation: fade-in 0.5s ease-out;
                }
            `}</style>
        </div>
    );
};

export default CosmosAnomalyDashboard;