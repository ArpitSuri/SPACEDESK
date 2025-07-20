// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// export default function WeatherForcast() {
//     const [planets, setPlanets] = useState([]);
//     const [selectedPlanet, setSelectedPlanet] = useState('');
//     const [planetData, setPlanetData] = useState(null);
//     const [location, setLocation] = useState('');
//     const [earthData, setEarthData] = useState(null);
//     const [loading, setLoading] = useState(false);

//     useEffect(() => {
//         axios.get('http://localhost:3000/api/planets')
//             .then(res => setPlanets(res.data))
//             .catch(err => console.error(err));
//     }, []);

//     const fetchPlanetData = async (planet) => {
//         setLoading(true);
//         setPlanetData(null);
//         setEarthData(null);
//         try {
//             const res = await axios.get(`http://localhost:3000/api/planets/${planet}`);
//             setPlanetData(res.data);
//         } catch (err) {
//             console.error(err);
//         }
//         setLoading(false);
//     };

//     const fetchEarthByLocation = async () => {
//         if (!location) return;
//         setLoading(true);
//         setPlanetData(null);
//         try {
//             const res = await axios.get(`http://localhost:3000/api/earth/location/${location}`);
//             setEarthData(res.data);
//         } catch (err) {
//             console.error(err);
//         }
//         setLoading(false);
//     };

//     const renderData = (data) => {
//         if (!data) return null;
//         return (
//             <div className="space-y-2">
//                 {data.sol && <div><strong>Sol:</strong> {data.sol}</div>}
//                 {data.season && <div><strong>Season:</strong> {data.season}</div>}

//                 {data.location && <div><strong>Location:</strong> {data.location}</div>}
//                 {data.coordinates && (
//                     <div>
//                         <strong>Coordinates:</strong> {data.coordinates.lat}, {data.coordinates.lon}
//                     </div>
//                 )}

//                 {data.temperature && (
//                     <div>
//                         <strong>Temperature:</strong>
//                         <div className="ml-4">
//                             {data.temperature.current !== undefined && <div>Current: {data.temperature.current}{data.temperature.unit}</div>}
//                             {data.temperature.feels_like !== undefined && <div>Feels Like: {data.temperature.feels_like}{data.temperature.unit}</div>}
//                             {data.temperature.min !== undefined && <div>Min: {data.temperature.min}{data.temperature.unit}</div>}
//                             {data.temperature.max !== undefined && <div>Max: {data.temperature.max}{data.temperature.unit}</div>}
//                             {data.temperature.day !== undefined && <div>Day: {data.temperature.day}{data.temperature.unit}</div>}
//                             {data.temperature.night !== undefined && <div>Night: {data.temperature.night}{data.temperature.unit}</div>}
//                             {data.temperature.avg !== undefined && <div>Average: {data.temperature.avg}{data.temperature.unit}</div>}
//                             {data.temperature.cloud_tops !== undefined && <div>Cloud Tops: {data.temperature.cloud_tops}{data.temperature.unit}</div>}
//                         </div>
//                     </div>
//                 )}

//                 {data.pressure && data.pressure.value && (
//                     <div>
//                         <strong>Pressure:</strong> {data.pressure.value} {data.pressure.unit}
//                     </div>
//                 )}
//                 {data.pressure && data.pressure.average && (
//                     <div>
//                         <strong>Pressure:</strong> {data.pressure.average} {data.pressure.unit}
//                     </div>
//                 )}

//                 {data.humidity && <div><strong>Humidity:</strong> {data.humidity}</div>}

//                 {data.wind && (
//                     <div>
//                         <strong>Wind:</strong>
//                         <div className="ml-4">
//                             {data.wind.speed !== undefined && <div>Speed: {data.wind.speed} {data.wind.unit}</div>}
//                             {data.wind.direction && <div>Direction: {data.wind.direction}</div>}
//                             {data.wind.gust !== undefined && <div>Gust: {data.wind.gust} {data.wind.unit}</div>}
//                         </div>
//                     </div>
//                 )}

//                 {data.atmosphere && <div><strong>Atmosphere:</strong> {data.atmosphere}</div>}
//                 {data.gravity && <div><strong>Gravity:</strong> {data.gravity}</div>}
//                 {data.ring_system && <div><strong>Ring System:</strong> {data.ring_system}</div>}
//                 {data.axial_tilt && <div><strong>Axial Tilt:</strong> {data.axial_tilt}</div>}
//                 {data.great_red_spot && (
//                     <div>
//                         <strong>Great Red Spot:</strong>
//                         <div className="ml-4">
//                             {data.great_red_spot.diameter && <div>Diameter: {data.great_red_spot.diameter}</div>}
//                             {data.great_red_spot.wind_speed && <div>Wind Speed: {data.great_red_spot.wind_speed}</div>}
//                         </div>
//                     </div>
//                 )}

//                 {data.clouds && <div><strong>Clouds:</strong> {data.clouds}</div>}
//                 {data.visibility && <div><strong>Visibility:</strong> {data.visibility}</div>}
//                 {data.conditions && <div><strong>Conditions:</strong> {data.conditions}</div>}
//                 {data.sunrise && <div><strong>Sunrise:</strong> {data.sunrise}</div>}
//                 {data.sunset && <div><strong>Sunset:</strong> {data.sunset}</div>}
//             </div>
//         );
//     };

//     return (
//         <div className="min-h-screen bg-gray-100 p-4">
//             <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
//                 <h1 className="text-2xl font-bold mb-4 text-center">Solar System Weather Dashboard</h1>

//                 <div className="mb-4 flex flex-wrap gap-2 justify-center">
//                     {planets.map(planet => (
//                         <button
//                             key={planet}
//                             className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded capitalize text-sm sm:text-base"
//                             onClick={() => {
//                                 setSelectedPlanet(planet);
//                                 fetchPlanetData(planet);
//                             }}
//                         >
//                             {planet}
//                         </button>
//                     ))}
//                 </div>

//                 <div className="mb-4 flex flex-col sm:flex-row gap-2 items-center justify-center">
//                     <input
//                         type="text"
//                         placeholder="Enter Earth location"
//                         className="p-2 border rounded w-full sm:w-64"
//                         value={location}
//                         onChange={(e) => setLocation(e.target.value)}
//                     />
//                     <button
//                         className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded w-full sm:w-auto"
//                         onClick={fetchEarthByLocation}
//                     >
//                         Fetch Earth Weather
//                     </button>
//                 </div>

//                 {loading && <p className="text-center text-gray-500">Loading...</p>}

//                 {planetData && (
//                     <div className="bg-white p-4 rounded shadow overflow-x-auto">
//                         <h2 className="text-xl font-semibold mb-2">{planetData.planet}</h2>
//                         {renderData(planetData.data)}
//                     </div>
//                 )}

//                 {earthData && (
//                     <div className="bg-white p-4 rounded shadow overflow-x-auto mt-4">
//                         <h2 className="text-xl font-semibold mb-2">Earth Weather in {location}</h2>
//                         {renderData(earthData.data)}
//                     </div>
//                 )}
//             </div>
//         </div>
//     );
// }


import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function WeatherForcast() {
    const [planets, setPlanets] = useState(['mercury', 'venus', 'earth', 'mars', 'jupiter', 'saturn', 'uranus', 'neptune']);
    const [selectedPlanet, setSelectedPlanet] = useState('');
    const [planetData, setPlanetData] = useState(null);
    const [location, setLocation] = useState('');
    const [earthData, setEarthData] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
      axios.get('http://localhost:3000/api/planets')
        .then(res => setPlanets(res.data))
        .catch(err => console.error(err));
    }, []);

    // // Mock data for demonstration
    // const mockPlanetData = {
    //     mars: {
    //         planet: 'Mars',
    //         data: {
    //             sol: 3847,
    //             season: 'Late Summer',
    //             temperature: {
    //                 avg: -63,
    //                 min: -89,
    //                 max: -12,
    //                 unit: '°C'
    //             },
    //             pressure: {
    //                 average: 750,
    //                 unit: 'Pa'
    //             },
    //             wind: {
    //                 speed: 16,
    //                 direction: 'SW',
    //                 unit: 'm/s'
    //             },
    //             atmosphere: '95.3% CO₂, 2.7% N₂, 1.6% Ar',
    //             gravity: '3.71 m/s²'
    //         }
    //     },
    //     jupiter: {
    //         planet: 'Jupiter',
    //         data: {
    //             temperature: {
    //                 cloud_tops: -145,
    //                 unit: '°C'
    //             },
    //             wind: {
    //                 speed: 150,
    //                 unit: 'm/s'
    //             },
    //             atmosphere: '89% H₂, 10% He, 1% other',
    //             gravity: '24.79 m/s²',
    //             great_red_spot: {
    //                 diameter: '16,350 km',
    //                 wind_speed: '432 km/h'
    //             }
    //         }
    //     },
    //     saturn: {
    //         planet: 'Saturn',
    //         data: {
    //             temperature: {
    //                 cloud_tops: -178,
    //                 unit: '°C'
    //             },
    //             wind: {
    //                 speed: 500,
    //                 unit: 'm/s'
    //             },
    //             atmosphere: '96% H₂, 3% He, 1% other',
    //             gravity: '10.44 m/s²',
    //             ring_system: 'Prominent ring system with ice and rock particles'
    //         }
    //     }
    // };

    // const mockEarthData = {
    //     data: {
    //         location: 'New York',
    //         coordinates: { lat: 40.7128, lon: -74.0060 },
    //         temperature: {
    //             current: 22,
    //             feels_like: 24,
    //             min: 18,
    //             max: 26,
    //             unit: '°C'
    //         },
    //         pressure: {
    //             value: 1013,
    //             unit: 'hPa'
    //         },
    //         humidity: '65%',
    //         wind: {
    //             speed: 12,
    //             direction: 'NW',
    //             gust: 18,
    //             unit: 'km/h'
    //         },
    //         conditions: 'Partly Cloudy',
    //         visibility: '10 km',
    //         clouds: '40%',
    //         sunrise: '06:24',
    //         sunset: '19:47'
    //     }
    // };

    const fetchPlanetData = async (planet) => {
        setLoading(true);
        setPlanetData(null);
        setEarthData(null);

        // Original axios call (commented out)
        try {
          const res = await axios.get(`http://localhost:3000/api/planets/${planet}`);
          setPlanetData(res.data);
        } catch (err) {
          console.error(err);
        }

        // Simulate API call for demo
        setTimeout(() => {
            // setPlanetData(mockPlanetData[planet] || {
            //     planet: planet.charAt(0).toUpperCase() + planet.slice(1),
            //     data: {
            //         temperature: { avg: Math.floor(Math.random() * 200) - 100, unit: '°C' },
            //         atmosphere: 'Data unavailable',
            //         gravity: `${(Math.random() * 20 + 1).toFixed(2)} m/s²`
            //     }
            // });
            setLoading(false);
        }, 1000);
    };

    const fetchEarthByLocation = async () => {
        if (!location) return;
        setLoading(true);
        setPlanetData(null);

        // Original axios call (commented out)
        try {
          const res = await axios.get(`http://localhost:3000/api/earth/location/${location}`);
          setEarthData(res.data);
        } catch (err) {
          console.error(err);
        }

        // Simulate API call for demo
        setTimeout(() => {
            // setEarthData(mockEarthData);
            setLoading(false);
        }, 1000);
    };

    const renderData = (data) => {
        if (!data) return null;
        return (
            <div className="space-y-3">
                {data.sol && <div className="flex justify-between"><span className="text-gray-400">Sol:</span><span className="text-white font-medium">{data.sol}</span></div>}
                {data.season && <div className="flex justify-between"><span className="text-gray-400">Season:</span><span className="text-white font-medium">{data.season}</span></div>}

                {data.location && <div className="flex justify-between"><span className="text-gray-400">Location:</span><span className="text-white font-medium">{data.location}</span></div>}
                {data.coordinates && (
                    <div className="flex justify-between">
                        <span className="text-gray-400">Coordinates:</span>
                        <span className="text-white font-medium">{data.coordinates.lat}°, {data.coordinates.lon}°</span>
                    </div>
                )}

                {data.temperature && (
                    <div className="border-t border-gray-700 pt-3">
                        <div className="text-cyan-400 font-medium mb-2">Temperature</div>
                        <div className="grid grid-cols-2 gap-2 text-sm">
                            {data.temperature.current !== undefined && <div className="flex justify-between"><span className="text-gray-400">Current:</span><span className="text-white">{data.temperature.current}{data.temperature.unit}</span></div>}
                            {data.temperature.feels_like !== undefined && <div className="flex justify-between"><span className="text-gray-400">Feels Like:</span><span className="text-white">{data.temperature.feels_like}{data.temperature.unit}</span></div>}
                            {data.temperature.min !== undefined && <div className="flex justify-between"><span className="text-gray-400">Min:</span><span className="text-white">{data.temperature.min}{data.temperature.unit}</span></div>}
                            {data.temperature.max !== undefined && <div className="flex justify-between"><span className="text-gray-400">Max:</span><span className="text-white">{data.temperature.max}{data.temperature.unit}</span></div>}
                            {data.temperature.day !== undefined && <div className="flex justify-between"><span className="text-gray-400">Day:</span><span className="text-white">{data.temperature.day}{data.temperature.unit}</span></div>}
                            {data.temperature.night !== undefined && <div className="flex justify-between"><span className="text-gray-400">Night:</span><span className="text-white">{data.temperature.night}{data.temperature.unit}</span></div>}
                            {data.temperature.avg !== undefined && <div className="flex justify-between"><span className="text-gray-400">Average:</span><span className="text-white">{data.temperature.avg}{data.temperature.unit}</span></div>}
                            {data.temperature.cloud_tops !== undefined && <div className="flex justify-between"><span className="text-gray-400">Cloud Tops:</span><span className="text-white">{data.temperature.cloud_tops}{data.temperature.unit}</span></div>}
                        </div>
                    </div>
                )}

                {(data.pressure?.value || data.pressure?.average) && (
                    <div className="flex justify-between">
                        <span className="text-gray-400">Pressure:</span>
                        <span className="text-white font-medium">
                            {data.pressure.value || data.pressure.average} {data.pressure.unit}
                        </span>
                    </div>
                )}

                {data.humidity && <div className="flex justify-between"><span className="text-gray-400">Humidity:</span><span className="text-white font-medium">{data.humidity}</span></div>}

                {data.wind && (
                    <div className="border-t border-gray-700 pt-3">
                        <div className="text-purple-400 font-medium mb-2">Wind</div>
                        <div className="space-y-1 text-sm">
                            {data.wind.speed !== undefined && <div className="flex justify-between"><span className="text-gray-400">Speed:</span><span className="text-white">{data.wind.speed} {data.wind.unit}</span></div>}
                            {data.wind.direction && <div className="flex justify-between"><span className="text-gray-400">Direction:</span><span className="text-white">{data.wind.direction}</span></div>}
                            {data.wind.gust !== undefined && <div className="flex justify-between"><span className="text-gray-400">Gust:</span><span className="text-white">{data.wind.gust} {data.wind.unit}</span></div>}
                        </div>
                    </div>
                )}

                {data.atmosphere && <div className="flex justify-between"><span className="text-gray-400">Atmosphere:</span><span className="text-white font-medium text-xs">{data.atmosphere}</span></div>}
                {data.gravity && <div className="flex justify-between"><span className="text-gray-400">Gravity:</span><span className="text-white font-medium">{data.gravity}</span></div>}
                {data.ring_system && <div className="border-t border-gray-700 pt-2"><span className="text-gray-400">Ring System:</span><p className="text-white text-sm mt-1">{data.ring_system}</p></div>}

                {data.great_red_spot && (
                    <div className="border-t border-gray-700 pt-3">
                        <div className="text-red-400 font-medium mb-2">Great Red Spot</div>
                        <div className="space-y-1 text-sm">
                            {data.great_red_spot.diameter && <div className="flex justify-between"><span className="text-gray-400">Diameter:</span><span className="text-white">{data.great_red_spot.diameter}</span></div>}
                            {data.great_red_spot.wind_speed && <div className="flex justify-between"><span className="text-gray-400">Wind Speed:</span><span className="text-white">{data.great_red_spot.wind_speed}</span></div>}
                        </div>
                    </div>
                )}

                {(data.clouds || data.visibility || data.conditions || data.sunrise || data.sunset) && (
                    <div className="border-t border-gray-700 pt-3">
                        <div className="text-blue-400 font-medium mb-2">Conditions</div>
                        <div className="space-y-1 text-sm">
                            {data.conditions && <div className="flex justify-between"><span className="text-gray-400">Conditions:</span><span className="text-white">{data.conditions}</span></div>}
                            {data.clouds && <div className="flex justify-between"><span className="text-gray-400">Clouds:</span><span className="text-white">{data.clouds}</span></div>}
                            {data.visibility && <div className="flex justify-between"><span className="text-gray-400">Visibility:</span><span className="text-white">{data.visibility}</span></div>}
                            {data.sunrise && <div className="flex justify-between"><span className="text-gray-400">Sunrise:</span><span className="text-white">{data.sunrise}</span></div>}
                            {data.sunset && <div className="flex justify-between"><span className="text-gray-400">Sunset:</span><span className="text-white">{data.sunset}</span></div>}
                        </div>
                    </div>
                )}
            </div>
        );
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
                        className="absolute w-1 h-1 bg-white rounded-full opacity-30"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            animationDelay: `${Math.random() * 3}s`
                        }}
                    ></div>
                ))}
            </div>

            <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-6xl font-bold mb-4 bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
                        PLANETS WEATHER FORCAST
                    </h1>
                    <p className="text-gray-300 text-lg mb-2"></p>
                    <p className="text-gray-500 text-sm max-w-2xl mx-auto">
                        Real-time cosmic data streams, stellar observations, and planetary analytics at the speed of light.
                        Navigate the cosmos with precision.
                    </p>
                </div>


                {/* Planet Selection */}
                <div className="mb-8">
                    <h2 className="text-xl font-semibold text-white mb-4 text-center">Select Celestial Body</h2>
                    <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3 max-w-4xl mx-auto">
                        {planets.map(planet => (
                            <button
                                key={planet}
                                className="bg-gray-900/50 backdrop-blur-sm border border-gray-700 hover:border-blue-500 text-white px-4 py-3 rounded-lg capitalize transition-all duration-300 hover:bg-gray-800/50 hover:scale-105 cursor-pointer"
                                onClick={() => {
                                    setSelectedPlanet(planet);
                                    fetchPlanetData(planet);
                                }}
                            >
                                {planet}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Earth Location Input */}
                <div className="mb-8 max-w-md mx-auto">
                    <div className="flex flex-col sm:flex-row gap-3">
                        <input
                            type="text"
                            placeholder="Enter Earth location"
                            className="flex-1 p-3 bg-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:border-cyan-500 focus:outline-none transition-colors"
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                        />
                        <button
                            className="bg-gradient-to-r from-green-500 to-cyan-500 hover:from-green-600 hover:to-cyan-600 text-white px-6 py-3 rounded-lg  cursor-pointer font-medium transition-all duration-300"
                            onClick={fetchEarthByLocation}
                        >
                            Scan Earth
                        </button>
                    </div>
                </div>

                {/* Loading */}
                {/* {loading && (
                    <div className="text-center py-8">
                        <div className="inline-block w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4"></div>
                        <p className="text-gray-300">Scanning cosmic frequencies...</p>
                    </div>
                )} */}

                {/* Planet Data Card */}
                {planetData && (
                    <div className="mb-8 max-w-2xl mx-auto">
                        <div className="bg-gray-900/30 backdrop-blur-md border border-gray-700 rounded-2xl p-6 shadow-2xl">
                            <h2 className="text-2xl font-bold  mb-6 text-center bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                                {planetData.planet}
                            </h2>
                            {renderData(planetData.data)}
                        </div>
                    </div>
                )}

                {/* Earth Data Card */}
                {earthData && (
                    <div className="mb-8 max-w-2xl mx-auto">
                        <div className="bg-gray-900/30 backdrop-blur-md border border-gray-700 rounded-2xl p-6 shadow-2xl">
                            <h2 className="text-2xl font-bold  mb-6 text-center bg-gradient-to-r from-green-400 to-cyan-400 bg-clip-text text-transparent">
                                Earth Weather - {location}
                            </h2>
                            {renderData(earthData.data)}
                        </div>
                    </div>
                )}

                {/* Stats Cards */}
                {/* <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-16">
                    <div className="bg-gray-900/30 backdrop-blur-md border border-gray-700 rounded-xl p-6">
                        <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center mb-4">
                            <div className="w-6 h-6 bg-blue-500 rounded"></div>
                        </div>
                        <div className="text-3xl font-bold text-white mb-2">2,847</div>
                        <div className="text-gray-400 text-sm">Active Satellites</div>
                    </div>

                    <div className="bg-gray-900/30 backdrop-blur-md border border-gray-700 rounded-xl p-6">
                        <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center mb-4">
                            <div className="w-6 h-6 bg-green-500 rounded-full"></div>
                        </div>
                        <div className="text-3xl font-bold text-white mb-2">156</div>
                        <div className="text-gray-400 text-sm">Missions Complete</div>
                    </div>

                    <div className="bg-gray-900/30 backdrop-blur-md border border-gray-700 rounded-xl p-6">
                        <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center mb-4">
                            <div className="w-6 h-6 bg-purple-500 rounded-full"></div>
                        </div>
                        <div className="text-3xl font-bold text-white mb-2">97.3%</div>
                        <div className="text-gray-400 text-sm">Success Rate</div>
                    </div>

                    <div className="bg-gray-900/30 backdrop-blur-md border border-blue-500 rounded-xl p-6">
                        <div className="w-12 h-12 bg-orange-500/20 rounded-xl flex items-center justify-center mb-4">
                            <div className="w-6 h-6 bg-orange-500 rounded"></div>
                        </div>
                        <div className="text-3xl font-bold text-white mb-2">12</div>
                        <div className="text-gray-400 text-sm">Live Streams</div>
                    </div>
                </div> */}
            </div>
        </div>
    );
}