import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
    FaHome,
    FaBars,
    FaCloud,
    FaSatelliteDish,
    FaSatellite
} from 'react-icons/fa';
import {
    FaMagnifyingGlassLocation,
    FaDownLeftAndUpRightToCenter
} from 'react-icons/fa6';

const Sidebar = () => {
    const [isOpen, setIsOpen] = useState(true);
    const location = useLocation();
    const navigate = useNavigate();

    const menuItems = [
        { label: 'Home', icon: <FaHome />, path: '/' },
        { label: 'Satellites', icon: <FaSatellite />, path: '/satellites' },
        { label: 'Missions', icon: <FaMagnifyingGlassLocation />, path: '/missions' },
        { label: 'Planet Weather', icon: <FaCloud />, path: '/weather' },
        { label: 'ISS Telemetry', icon: <FaSatelliteDish />, path: '/telemetry' },
        { label: 'Anamoly Detector', icon: <FaDownLeftAndUpRightToCenter />, path: '/ai-anamoly' }
    ];

    // Keyboard Shortcuts (Alt+1, Alt+2, etc.)
    useEffect(() => {
        const handleKeyPress = (e) => {
            if (e.altKey) {
                const index = parseInt(e.key) - 1;
                if (index >= 0 && index < menuItems.length) {
                    navigate(menuItems[index].path);
                }
            }
        };
        window.addEventListener('keydown', handleKeyPress);
        return () => window.removeEventListener('keydown', handleKeyPress);
    }, [navigate]);

    return (
        <div className={`transition-all duration-300 ${isOpen ? 'w-64' : 'w-20'} h-screen bg-gradient-to-b from-[#0b0f1a] to-[#131c31] p-4 text-white flex flex-col`}>
            <div className="flex justify-between items-center mb-6">
                <span className={`text-xl font-bold tracking-wide bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent cursor-pointer
                     ${isOpen ? 'block' : 'hidden'}`} onClick={()=>{navigate("/")}}>
                    SPACEDESK
                </span>
                <button onClick={() => setIsOpen(!isOpen)} className="text-xl">
                    <FaBars className="cursor-pointer text-white mx-2" />
                </button>
            </div>

            <nav className="flex flex-col gap-2">
                {menuItems.map((item, idx) => {
                    const isActive = location.pathname === item.path;
                    return (
                        <Link
                            key={idx}
                            to={item.path}
                            className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200 group
                                ${isActive
                                    ? 'bg-gradient-to-r from-cyan-500 to-purple-500 text-white shadow-lg'
                                    : 'hover:bg-white/10'
                                }`}
                        >
                            <span className="text-2xl  group-hover:text-cyan-300">{item.icon}</span>
                            <span className={`${isOpen ? 'block' : 'hidden'} group-hover:text-cyan-200`}>
                                {item.label}
                            </span>
                        </Link>
                    );
                })}
            </nav>
        </div>
    );
};

export default Sidebar;


