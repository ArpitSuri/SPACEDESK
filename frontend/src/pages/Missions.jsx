
import React, { useState, useEffect } from 'react';
import { Rocket, Satellite, Calendar, MapPin, Zap, CheckCircle, Clock, AlertTriangle, Star, Target, Radio, Activity } from 'lucide-react';

const missions = [
    {
        id: 1,
        name: "Apollo 11",
        agency: "NASA",
        status: "Completed",
        priority: "high",
        destination: "Moon",
        crew: 3,
        timeline: [
            { stage: "Launch", time: "1969-07-16T13:32:00Z", status: "completed" },
            { stage: "Lunar Orbit Insertion", time: "1969-07-19T17:21:00Z", status: "completed" },
            { stage: "Moon Landing", time: "1969-07-20T20:17:00Z", status: "completed" },
            { stage: "Earth Return", time: "1969-07-24T16:50:00Z", status: "completed" }
        ]
    },
    {
        id: 2,
        name: "Mars 2020 (Perseverance)",
        agency: "NASA",
        status: "Active",
        priority: "critical",
        destination: "Mars",
        crew: 0,
        timeline: [
            { stage: "Launch", time: "2020-07-30T11:50:00Z", status: "completed" },
            { stage: "Mars Landing", time: "2021-02-18T20:55:00Z", status: "completed" },
            { stage: "Rover Deployment", time: "2021-03-04T00:00:00Z", status: "active" },
            { stage: "Sample Collection", time: "2024-12-01T00:00:00Z", status: "active" }
        ]
    },
    {
        id: 3,
        name: "Artemis III",
        agency: "NASA",
        status: "Planned",
        priority: "critical",
        destination: "Moon South Pole",
        crew: 4,
        timeline: [
            { stage: "Launch Preparation", time: "2026-06-01T00:00:00Z", status: "planned" },
            { stage: "Lunar Gateway", time: "2026-06-15T00:00:00Z", status: "planned" },
            { stage: "Moon Landing", time: "2026-06-20T00:00:00Z", status: "planned" }
        ]
    },
    {
        id: 4,
        name: "James Webb Deep Field",
        agency: "NASA/ESA",
        status: "Active",
        priority: "high",
        destination: "L2 Lagrange Point",
        crew: 0,
        timeline: [
            { stage: "Launch", time: "2021-12-25T12:20:00Z", status: "completed" },
            { stage: "L2 Arrival", time: "2022-01-24T00:00:00Z", status: "completed" },
            { stage: "First Images", time: "2022-07-12T00:00:00Z", status: "completed" },
            { stage: "Deep Field Survey", time: "2024-01-01T00:00:00Z", status: "active" }
        ]
    },
    {
        id: 5,
        name: "Europa Clipper",
        agency: "NASA",
        status: "Active",
        priority: "high",
        destination: "Jupiter/Europa",
        crew: 0,
        timeline: [
            { stage: "Launch", time: "2024-10-14T16:06:00Z", status: "completed" },
            { stage: "Mars Flyby", time: "2025-03-01T00:00:00Z", status: "active" },
            { stage: "Jupiter Arrival", time: "2030-04-11T00:00:00Z", status: "planned" }
        ]
    },
    {
        id: 6,
        name: "Starship Moon Mission",
        agency: "SpaceX",
        status: "Testing",
        priority: "medium",
        destination: "Moon",
        crew: 8,
        timeline: [
            { stage: "Orbital Test", time: "2024-03-14T00:00:00Z", status: "completed" },
            { stage: "Refueling Test", time: "2025-01-15T00:00:00Z", status: "active" },
            { stage: "Crewed Test", time: "2025-08-01T00:00:00Z", status: "planned" }
        ]
    }
];

const getStatusIcon = (status) => {
    switch (status) {
        case 'Completed': return <CheckCircle className="w-5 h-5 text-green-400" />;
        case 'Active': return <Activity className="w-5 h-5 text-blue-400 animate-pulse" />;
        case 'Planned': return <Clock className="w-5 h-5 text-yellow-400" />;
        case 'Testing': return <AlertTriangle className="w-5 h-5 text-orange-400" />;
        default: return <Radio className="w-5 h-5 text-gray-400" />;
    }
};

const getPriorityColor = (priority) => {
    switch (priority) {
        case 'critical': return 'from-red-500 to-pink-500';
        case 'high': return 'from-blue-500 to-cyan-500';
        case 'medium': return 'from-yellow-500 to-orange-500';
        default: return 'from-gray-500 to-slate-500';
    }
};

const getTimelineStatusColor = (status) => {
    switch (status) {
        case 'completed': return 'bg-green-500';
        case 'active': return 'bg-blue-500 animate-pulse';
        case 'planned': return 'bg-yellow-500';
        default: return 'bg-gray-500';
    }
};

const MissionCard = ({ mission, onClick, index }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div
            className={`group relative p-6 rounded-3xl bg-gradient-to-br from-gray-900/60 to-black/80 backdrop-blur-lg border border-gray-700/30 cursor-pointer transition-all duration-500 hover:scale-105 hover:-translate-y-2 hover:border-gray-600/50 hover:shadow-2xl hover:shadow-blue-500/20 ${index % 2 === 0 ? 'animate-fade-in-up' : 'animate-fade-in-down'
                }`}
            onClick={() => onClick(mission)}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            style={{ animationDelay: `${index * 100}ms` }}
        >
            {/* Priority indicator */}
            <div className={`absolute top-3 right-3 w-3 h-3 rounded-full bg-gradient-to-r ${getPriorityColor(mission.priority)} animate-pulse`} />

            {/* Mission type icon */}
            <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${getPriorityColor(mission.priority)} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                {mission.crew > 0 ? <Rocket className="w-6 h-6 text-white" /> : <Satellite className="w-6 h-6 text-white" />}
            </div>

            <h2 className="text-xl font-bold text-white mb-2 group-hover:text-blue-300 transition-colors duration-300">
                {mission.name}
            </h2>

            <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2 text-gray-400">
                    <Target className="w-4 h-4" />
                    <span className="text-sm">{mission.agency}</span>
                </div>

                <div className="flex items-center gap-2 text-gray-400">
                    <MapPin className="w-4 h-4" />
                    <span className="text-sm">{mission.destination}</span>
                </div>

                {mission.crew > 0 && (
                    <div className="flex items-center gap-2 text-gray-400">
                        <Star className="w-4 h-4" />
                        <span className="text-sm">{mission.crew} crew members</span>
                    </div>
                )}
            </div>

            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    {getStatusIcon(mission.status)}
                    <span className={`text-sm font-medium ${mission.status === 'Active' ? 'text-blue-400' :
                            mission.status === 'Completed' ? 'text-green-400' :
                                mission.status === 'Planned' ? 'text-yellow-400' : 'text-orange-400'
                        }`}>
                        {mission.status}
                    </span>
                </div>

                <div className="flex items-center gap-1">
                    {[...Array(mission.timeline.length)].map((_, i) => (
                        <div key={i} className={`w-2 h-2 rounded-full ${getTimelineStatusColor(mission.timeline[i]?.status || 'planned')}`} />
                    ))}
                </div>
            </div>

            {/* Hover effect overlay */}
            <div className={`absolute inset-0 bg-gradient-to-r from-blue-600/0 via-purple-600/10 to-cyan-600/0 rounded-3xl transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'
                }`} />
        </div>
    );
};

const TimelineModal = ({ mission, onClose }) => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setIsVisible(true);
    }, []);

    const handleClose = () => {
        setIsVisible(false);
        setTimeout(onClose, 300);
    };

    return (
        <div className={`fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 transition-all duration-300 ${isVisible ? 'opacity-100' : 'opacity-0'
            }`}>
            <div className={`bg-gradient-to-br from-gray-900/95 to-black/95 backdrop-blur-lg rounded-3xl border border-gray-700/50 p-8 w-full max-w-2xl max-h-[90vh] overflow-y-auto m-4 transform transition-all duration-500 ${isVisible ? 'scale-100 translate-y-0' : 'scale-95 translate-y-10'
                }`}>
                {/* Header */}
                <div className="flex items-start justify-between mb-6">
                    <div>
                        <h2 className="text-3xl font-bold  mb-2 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                            {mission.name}
                        </h2>
                        <div className="flex items-center gap-4 text-gray-400">
                            <span className="flex items-center gap-2">
                                <Target className="w-4 h-4" />
                                {mission.agency}
                            </span>
                            <span className="flex items-center gap-2">
                                <MapPin className="w-4 h-4" />
                                {mission.destination}
                            </span>
                        </div>
                    </div>

                    <button
                        onClick={handleClose}
                        className="p-2 rounded-full bg-gray-800/50 hover:bg-gray-700/50 transition-colors duration-300 cursor-pointer"
                    >
                        <div className="w-6 h-6 text-gray-400 hover:text-white transition-colors duration-300">✕</div>
                    </button>
                </div>

                {/* Status and Priority */}
                <div className="flex items-center gap-4 mb-8">
                    <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-gray-800/50 to-black/50 border border-gray-700/50">
                        {getStatusIcon(mission.status)}
                        <span className="text-sm font-medium text-white">{mission.status}</span>
                    </div>

                    <div className={`px-4 py-2 rounded-full bg-gradient-to-r ${getPriorityColor(mission.priority)} text-white text-sm font-medium`}>
                        {mission.priority.toUpperCase()} PRIORITY
                    </div>
                </div>

                {/* Timeline */}
                <div className="space-y-6">
                    <h3 className="text-xl font-bold text-white flex items-center gap-2">
                        <Calendar className="w-5 h-5 text-blue-400" />
                        Mission Timeline
                    </h3>

                    <div className="relative">
                        {/* Timeline line */}
                        <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 via-purple-500 to-cyan-500 opacity-30" />

                        {mission.timeline.map((event, index) => (
                            <div key={index} className="relative flex items-start gap-4 pb-6 last:pb-0">
                                {/* Timeline dot */}
                                <div className={`relative z-10 w-3 h-3 rounded-full ${getTimelineStatusColor(event.status)} flex-shrink-0 mt-2`}>
                                    <div className={`absolute inset-0 rounded-full ${getTimelineStatusColor(event.status)} animate-ping opacity-20`} />
                                </div>

                                {/* Event content */}
                                <div className="flex-1 bg-gradient-to-r from-gray-800/30 to-transparent rounded-xl p-4 border border-gray-700/20">
                                    <h4 className="font-semibold text-white mb-1">{event.stage}</h4>
                                    <p className="text-gray-400 text-sm mb-2">
                                        {new Date(event.time).toLocaleDateString('en-US', {
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric',
                                            hour: '2-digit',
                                            minute: '2-digit'
                                        })}
                                    </p>
                                    <div className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${event.status === 'completed' ? 'bg-green-500/20 text-green-300' :
                                            event.status === 'active' ? 'bg-blue-500/20 text-blue-300' :
                                                'bg-yellow-500/20 text-yellow-300'
                                        }`}>
                                        <div className={`w-2 h-2 rounded-full ${getTimelineStatusColor(event.status)}`} />
                                        {event.status.toUpperCase()}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Close button */}
                <div className="flex justify-center mt-8">
                    <button
                        onClick={handleClose}
                        className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full font-semibold text-white hover:scale-105 hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300 cursor-pointer"
                    >
                        Close Mission Details
                    </button>
                </div>
            </div>
        </div>
    );
};

const Mission = () => {
    const [selectedMission, setSelectedMission] = useState(null);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        setIsLoaded(true);
        const handleMouseMove = (e) => {
            setMousePosition({ x: e.clientX, y: e.clientY });
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white relative overflow-hidden">
            {/* Cosmic Background */}
            <div className="absolute inset-0 overflow-hidden">
                {/* Stars */}
                {[...Array(100)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute w-1 h-1 bg-white rounded-full opacity-40"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            animation: `twinkle ${3 + Math.random() * 4}s infinite ${Math.random() * 3}s`,
                        }}
                    />
                ))}

                {/* Nebula effects */}
                <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-gradient-to-r from-purple-600/5 to-blue-600/5 rounded-full blur-3xl animate-pulse" />
                <div className="absolute bottom-1/3 left-1/3 w-48 h-48 bg-gradient-to-r from-cyan-600/5 to-green-600/5 rounded-full blur-2xl animate-bounce" />

                {/* Mouse follower */}
                <div
                    className="absolute w-8 h-8 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full blur-sm pointer-events-none transition-all duration-500"
                    style={{
                        left: mousePosition.x - 16,
                        top: mousePosition.y - 16,
                    }}
                />
            </div>

            {/* Content */}
            <div className="relative z-10 container mx-auto px-6 py-12">
                {/* Header */}
                <div className={`text-center mb-16 transition-all duration-1000 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                    <h1 className="text-6xl md:text-7xl font-black mb-4 bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
                        MISSION CONTROL
                    </h1>
                    <p className="text-xl text-gray-400 mb-8">
                        Active space missions across the solar system
                    </p>
                    <div className="flex items-center justify-center gap-6 text-sm text-gray-500">
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                            <span>Completed</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
                            <span>Active</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 bg-yellow-500 rounded-full animate-pulse"></div>
                            <span>Planned</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 bg-orange-500 rounded-full animate-pulse"></div>
                            <span>Testing</span>
                        </div>
                    </div>
                </div>

                {/* Mission Cards Grid */}
                <div className={`grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 transition-all duration-1000 delay-300 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                    {missions.map((mission, index) => (
                        <MissionCard
                            key={mission.id}
                            mission={mission}
                            onClick={setSelectedMission}
                            index={index}
                        />
                    ))}
                </div>
            </div>

            {/* Modal */}
            {selectedMission && (
                <TimelineModal mission={selectedMission} onClose={() => setSelectedMission(null)} />
            )}

            <style jsx>{`
                @keyframes twinkle {
                    0%, 100% { opacity: 0.2; transform: scale(1); }
                    50% { opacity: 1; transform: scale(1.3); }
                }
                
                @keyframes fade-in-up {
                    from { opacity: 0; transform: translateY(30px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                
                @keyframes fade-in-down {
                    from { opacity: 0; transform: translateY(-30px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                
                .animate-fade-in-up {
                    animation: fade-in-up 0.8s ease-out forwards;
                }
                
                .animate-fade-in-down {
                    animation: fade-in-down 0.8s ease-out forwards;
                }
            `}</style>
        </div>
    );
};

export default Mission;