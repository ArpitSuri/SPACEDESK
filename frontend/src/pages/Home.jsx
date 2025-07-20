import React, { useState, useEffect } from 'react';
import { Rocket, Satellite, Globe, Star, Zap, Target, Activity, Radio } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [isLoaded, setIsLoaded] = useState(false);
    const [activeStats, setActiveStats] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        setIsLoaded(true);
        const handleMouseMove = (e) => {
            setMousePosition({ x: e.clientX, y: e.clientY });
        };

        window.addEventListener('mousemove', handleMouseMove);

        // Cycle through stats
        const interval = setInterval(() => {
            setActiveStats(prev => (prev + 1) % 4);
        }, 3000);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            clearInterval(interval);
        };
    }, []);

    const stats = [
        { icon: Satellite, label: "Active Satellites", value: "2,847", color: "from-blue-400 to-cyan-400" },
        { icon: Globe, label: "Missions Complete", value: "156", color: "from-green-400 to-emerald-400" },
        { icon: Target, label: "Success Rate", value: "97.3%", color: "from-purple-400 to-pink-400" },
        { icon: Activity, label: "Live Streams", value: "12", color: "from-orange-400 to-red-400" }
    ];

    const features = [
        {
            icon: Radio,
            title: "Real-time Telemetry",
            description: "Monitor spacecraft data streams in real-time with advanced filtering",
            delay: "delay-100"
        },
        {
            icon: Star,
            title: "Stellar Observations",
            description: "Access deep space imagery and astronomical data",
            delay: "delay-200"
        },
        {
            icon: Zap,
            title: "Mission Control",
            description: "Command and control interface for active missions",
            delay: "delay-300"
        }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white overflow-hidden relative">
            {/* Animated Background */}
            <div className="absolute inset-0 overflow-hidden">
                {/* Cosmic particles */}
                {[...Array(50)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute w-1 h-1 bg-white rounded-full opacity-60"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            animation: `twinkle ${2 + Math.random() * 3}s infinite ${Math.random() * 2}s`,
                        }}
                    />
                ))}

                {/* Floating orbs */}
                <div className="absolute top-20 left-1/4 w-32 h-32 bg-gradient-to-r from-blue-600/10 to-purple-600/10 rounded-full blur-xl animate-pulse" />
                <div className="absolute bottom-32 right-1/3 w-48 h-48 bg-gradient-to-r from-cyan-600/5 to-blue-600/5 rounded-full blur-2xl animate-bounce" />

                {/* Interactive mouse follow effect */}
                <div
                    className="absolute w-6 h-6 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full blur-sm opacity-30 pointer-events-none transition-all duration-300"
                    style={{
                        left: mousePosition.x - 12,
                        top: mousePosition.y - 12,
                    }}
                />
            </div>

            <div className="relative z-10 container mx-auto px-6 py-12">
                {/* Hero Section */}
                <div className={`text-center mb-16 transition-all duration-1000 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                    <div className="relative inline-block">
                        <h1 className="text-7xl md:text-8xl font-black mb-6 bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent animate-pulse">
                            COSMOS
                        </h1>
                        <div className="absolute -top-4 -right-4 text-4xl animate-spin-slow">🚀</div>
                    </div>

                    <div className="max-w-3xl mx-auto">
                        <p className="text-xl md:text-2xl text-gray-400 mb-8 leading-relaxed">
                            Mission Control Dashboard
                        </p>
                        <p className="text-lg text-gray-500 mb-12">
                            Real-time cosmic data streams, stellar observations, and mission analytics
                            at the speed of light. Navigate the cosmos with precision.
                        </p>
                    </div>

                    {/* CTA Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
                        <button className="group relative px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full font-semibold text-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/25">
                            <span className="relative z-10">Launch Dashboard</span>
                            <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
                        </button>

                        <button className="px-8 py-4 border-2 border-gray-600 rounded-full font-semibold text-lg hover:border-gray-400 hover:bg-white/5 transition-all duration-300 cursor-pointer" onClick={()=>navigate("/missions")}>
                            View Missions
                        </button>
                    </div>
                </div>

                {/* Stats Section */}
                <div className={`grid grid-cols-2 md:grid-cols-4 gap-6 mb-16 transition-all duration-1000 delay-300 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                    {stats.map((stat, index) => {
                        const IconComponent = stat.icon;
                        return (
                            <div
                                key={index}
                                className={`relative p-6 rounded-2xl bg-gradient-to-br from-gray-900/80 to-black/60 backdrop-blur-lg border border-gray-700/30 transition-all duration-500 hover:scale-105 hover:bg-gray-800/40 ${activeStats === index ? 'ring-2 ring-blue-400 scale-105' : ''
                                    }`}
                            >
                                <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${stat.color} flex items-center justify-center mb-4`}>
                                    <IconComponent className="w-6 h-6 text-white" />
                                </div>
                                <h3 className="text-2xl font-bold mb-1">{stat.value}</h3>
                                <p className="text-gray-500 text-sm">{stat.label}</p>
                                <div className="absolute inset-0 bg-gradient-to-r from-blue-600/0 via-purple-600/5 to-cyan-600/0 rounded-2xl opacity-0 hover:opacity-100 transition-opacity duration-300" />
                            </div>
                        );
                    })}
                </div>

                {/* Features Grid */}
                <div className={`grid md:grid-cols-3 gap-8 mb-16 transition-all duration-1000 delay-500 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                    {features.map((feature, index) => {
                        const IconComponent = feature.icon;
                        return (
                            <div
                                key={index}
                                className={`group p-8 rounded-3xl bg-gradient-to-br from-gray-900/40 to-black/60 backdrop-blur-lg border border-gray-700/20 hover:border-gray-600/40 transition-all duration-500 hover:scale-105 hover:-translate-y-2 ${feature.delay}`}
                            >
                                <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                                    <IconComponent className="w-8 h-8 text-white" />
                                </div>
                                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                                <p className="text-gray-500 leading-relaxed">{feature.description}</p>
                            </div>
                        );
                    })}
                </div>

                {/* Bottom CTA */}
                <div className={`text-center transition-all duration-1000 delay-700 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                    <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-gradient-to-r from-gray-900/60 to-black/40 backdrop-blur-lg border border-gray-700/30">
                        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                        <span className="text-sm text-gray-400">System Status: All systems operational</span>
                    </div>
                </div>
            </div>

            <style jsx>{`
                @keyframes twinkle {
                    0%, 100% { opacity: 0.3; transform: scale(1); }
                    50% { opacity: 1; transform: scale(1.2); }
                }
                
                .animate-spin-slow {
                    animation: spin 8s linear infinite;
                }
            `}</style>
        </div>
    );
};

export default Home;


// import React, { useState, useEffect } from 'react';
// import { Rocket, Satellite, Globe, Star, Zap, Target, Activity, Radio } from 'lucide-react';

// const Home = () => {
//     const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
//     const [isLoaded, setIsLoaded] = useState(false);
//     const [activeStats, setActiveStats] = useState(0);

//     useEffect(() => {
//         setIsLoaded(true);
//         const handleMouseMove = (e) => {
//             setMousePosition({ x: e.clientX, y: e.clientY });
//         };

//         window.addEventListener('mousemove', handleMouseMove);

//         // Cycle through stats
//         const interval = setInterval(() => {
//             setActiveStats(prev => (prev + 1) % 4);
//         }, 3000);

//         return () => {
//             window.removeEventListener('mousemove', handleMouseMove);
//             clearInterval(interval);
//         };
//     }, []);

//     const stats = [
//         { icon: Satellite, label: "Active Satellites", value: "2,847", color: "from-blue-400 to-cyan-400" },
//         { icon: Globe, label: "Missions Complete", value: "156", color: "from-green-400 to-emerald-400" },
//         { icon: Target, label: "Success Rate", value: "97.3%", color: "from-purple-400 to-pink-400" },
//         { icon: Activity, label: "Live Streams", value: "12", color: "from-orange-400 to-red-400" }
//     ];

//     const features = [
//         {
//             icon: Radio,
//             title: "Real-time Telemetry",
//             description: "Monitor spacecraft data streams in real-time with advanced filtering",
//             delay: "delay-100"
//         },
//         {
//             icon: Star,
//             title: "Stellar Observations",
//             description: "Access deep space imagery and astronomical data",
//             delay: "delay-200"
//         },
//         {
//             icon: Zap,
//             title: "Mission Control",
//             description: "Command and control interface for active missions",
//             delay: "delay-300"
//         }
//     ];

//     return (
//         <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white overflow-hidden relative">
//             {/* Animated Background */}
//             <div className="absolute inset-0 overflow-hidden">
//                 {/* Cosmic particles */}
//                 {[...Array(50)].map((_, i) => (
//                     <div
//                         key={i}
//                         className="absolute w-1 h-1 bg-white rounded-full opacity-60"
//                         style={{
//                             left: `${Math.random() * 100}%`,
//                             top: `${Math.random() * 100}%`,
//                             animation: `twinkle ${2 + Math.random() * 3}s infinite ${Math.random() * 2}s`,
//                         }}
//                     />
//                 ))}

//                 {/* Solar System Animation */}
//                 <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96">
//                     {/* Sun (Central star) */}
//                     <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full opacity-80 animate-pulse shadow-lg shadow-yellow-400/50" />

//                     {/* Planet 1 - Close orbit */}
//                     <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 animate-spin-slow-20">
//                         <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full opacity-70" />
//                         <div className="absolute inset-0 border border-blue-400/20 rounded-full" />
//                     </div>

//                     {/* Planet 2 - Medium orbit */}
//                     <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-48 animate-spin-slow-30">
//                         <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-3 h-3 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full opacity-60" />
//                         <div className="absolute inset-0 border border-green-400/15 rounded-full" />
//                     </div>

//                     {/* Planet 3 - Far orbit with moon */}
//                     <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 animate-spin-slow-45">
//                         <div className="relative">
//                             <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-2.5 h-2.5 bg-gradient-to-r from-red-400 to-pink-500 rounded-full opacity-50" />
//                             {/* Moon orbiting the planet */}
//                             <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-8 h-8 animate-spin-reverse-fast">
//                                 <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-gray-300 rounded-full opacity-40" />
//                             </div>
//                         </div>
//                         <div className="absolute inset-0 border border-red-400/10 rounded-full" />
//                     </div>

//                     {/* Outer ring system */}
//                     <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 animate-spin-slow-60">
//                         <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-gradient-to-r from-purple-400 to-violet-500 rounded-full opacity-40" />
//                         <div className="absolute inset-0 border border-purple-400/8 rounded-full" />
//                     </div>
//                 </div>

//                 {/* Floating nebula clouds */}
//                 <div className="absolute top-20 left-1/4 w-32 h-32 bg-gradient-to-r from-blue-600/10 to-purple-600/10 rounded-full blur-xl animate-pulse" />
//                 <div className="absolute bottom-32 right-1/3 w-48 h-48 bg-gradient-to-r from-cyan-600/5 to-blue-600/5 rounded-full blur-2xl animate-bounce" />

//                 {/* Shooting stars */}
//                 <div className="absolute top-1/4 left-0 w-1 h-1 bg-white rounded-full opacity-80 animate-shooting-star" />
//                 <div className="absolute top-3/4 right-0 w-1 h-1 bg-blue-300 rounded-full opacity-60 animate-shooting-star-delayed" />

//                 {/* Interactive mouse follow effect */}
//                 <div
//                     className="absolute w-6 h-6 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full blur-sm opacity-30 pointer-events-none transition-all duration-300"
//                     style={{
//                         left: mousePosition.x - 12,
//                         top: mousePosition.y - 12,
//                     }}
//                 />
//             </div>

//             <div className="relative z-10 container mx-auto px-6 py-12">
//                 {/* Hero Section */}
//                 <div className={`text-center mb-16 transition-all duration-1000 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
//                     <div className="relative inline-block">
//                         <h1 className="text-7xl md:text-8xl font-black mb-6 bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent animate-pulse">
//                             COSMOS
//                         </h1>
//                         <div className="absolute -top-4 -right-4 text-4xl animate-spin-slow">🚀</div>
//                     </div>

//                     <div className="max-w-3xl mx-auto">
//                         <p className="text-xl md:text-2xl text-gray-400 mb-8 leading-relaxed">
//                             Mission Control Dashboard
//                         </p>
//                         <p className="text-lg text-gray-500 mb-12">
//                             Real-time cosmic data streams, stellar observations, and mission analytics
//                             at the speed of light. Navigate the cosmos with precision.
//                         </p>
//                     </div>

//                     {/* CTA Buttons */}
//                     <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
//                         <button className="group relative px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full font-semibold text-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/25">
//                             <span className="relative z-10">Launch Dashboard</span>
//                             <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
//                         </button>

//                         <button className="px-8 py-4 border-2 border-gray-600 rounded-full font-semibold text-lg hover:border-gray-400 hover:bg-white/5 transition-all duration-300">
//                             View Missions
//                         </button>
//                     </div>
//                 </div>

//                 {/* Stats Section */}
//                 <div className={`grid grid-cols-2 md:grid-cols-4 gap-6 mb-16 transition-all duration-1000 delay-300 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
//                     {stats.map((stat, index) => {
//                         const IconComponent = stat.icon;
//                         return (
//                             <div
//                                 key={index}
//                                 className={`relative p-6 rounded-2xl bg-gradient-to-br from-gray-900/80 to-black/60 backdrop-blur-lg border border-gray-700/30 transition-all duration-500 hover:scale-105 hover:bg-gray-800/40 ${activeStats === index ? 'ring-2 ring-blue-400 scale-105' : ''
//                                     }`}
//                             >
//                                 <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${stat.color} flex items-center justify-center mb-4`}>
//                                     <IconComponent className="w-6 h-6 text-white" />
//                                 </div>
//                                 <h3 className="text-2xl font-bold mb-1">{stat.value}</h3>
//                                 <p className="text-gray-500 text-sm">{stat.label}</p>
//                                 <div className="absolute inset-0 bg-gradient-to-r from-blue-600/0 via-purple-600/5 to-cyan-600/0 rounded-2xl opacity-0 hover:opacity-100 transition-opacity duration-300" />
//                             </div>
//                         );
//                     })}
//                 </div>

//                 {/* Features Grid */}
//                 <div className={`grid md:grid-cols-3 gap-8 mb-16 transition-all duration-1000 delay-500 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
//                     {features.map((feature, index) => {
//                         const IconComponent = feature.icon;
//                         return (
//                             <div
//                                 key={index}
//                                 className={`group p-8 rounded-3xl bg-gradient-to-br from-gray-900/40 to-black/60 backdrop-blur-lg border border-gray-700/20 hover:border-gray-600/40 transition-all duration-500 hover:scale-105 hover:-translate-y-2 ${feature.delay}`}
//                             >
//                                 <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
//                                     <IconComponent className="w-8 h-8 text-white" />
//                                 </div>
//                                 <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
//                                 <p className="text-gray-500 leading-relaxed">{feature.description}</p>
//                             </div>
//                         );
//                     })}
//                 </div>

//                 {/* Bottom CTA */}
//                 <div className={`text-center transition-all duration-1000 delay-700 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
//                     <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-gradient-to-r from-gray-900/60 to-black/40 backdrop-blur-lg border border-gray-700/30">
//                         <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
//                         <span className="text-sm text-gray-400">System Status: All systems operational</span>
//                     </div>
//                 </div>
//             </div>

//             <style jsx>{`
//                 @keyframes twinkle {
//                     0%, 100% { opacity: 0.3; transform: scale(1); }
//                     50% { opacity: 1; transform: scale(1.2); }
//                 }
                
//                 .animate-spin-slow {
//                     animation: spin 8s linear infinite;
//                 }
                
//                 .animate-spin-slow-20 {
//                     animation: spin 20s linear infinite;
//                 }
                
//                 .animate-spin-slow-30 {
//                     animation: spin 30s linear infinite;
//                 }
                
//                 .animate-spin-slow-45 {
//                     animation: spin 45s linear infinite;
//                 }
                
//                 .animate-spin-slow-60 {
//                     animation: spin 60s linear infinite;
//                 }
                
//                 .animate-spin-reverse-fast {
//                     animation: spin 8s linear infinite reverse;
//                 }
                
//                 @keyframes shooting-star {
//                     0% { transform: translateX(-100px) translateY(-100px); opacity: 0; }
//                     10% { opacity: 1; }
//                     90% { opacity: 1; }
//                     100% { transform: translateX(100vw) translateY(100vh); opacity: 0; }
//                 }
                
//                 .animate-shooting-star {
//                     animation: shooting-star 15s linear infinite;
//                 }
                
//                 .animate-shooting-star-delayed {
//                     animation: shooting-star 20s linear infinite 10s;
//                 }
//             `}</style>
//         </div>
//     );
// };

// export default Home;