import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Users, TrendingUp, Calendar, Eye } from 'lucide-react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase/config';
import { useNavigate } from 'react-router-dom';

const EvenCargoDashboard = () => {
    const [girls, setGirls] = useState([]);
    const [stats, setStats] = useState({
        today: 0,
        week: 0,
        month: 0,
        year: 0
    });
    const [showModal, setShowModal] = useState(false);
    const [modalData, setModalData] = useState([]);
    const [modalTitle, setModalTitle] = useState('');

    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const snapshot = await getDocs(collection(db, 'girls'));
                const girlsData = snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
                setGirls(girlsData);
                calculateStats(girlsData);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchData();
    }, []);

    const calculateStats = (data) => {
        const now = new Date();
        const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        const weekStart = new Date(now.setDate(now.getDate() - now.getDay()));
        const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
        const yearStart = new Date(now.getFullYear(), 0, 1);

        const trainedEmployed = data.filter(g => g.employment_status?.toLowerCase() === 'employed' && g.trainings?.some(t => t.status === 'Completed'));

        const stats = {
            today: trainedEmployed.filter(g => g.createdAt?.toDate() >= today).length,
            week: trainedEmployed.filter(g => g.createdAt?.toDate() >= weekStart).length,
            month: trainedEmployed.filter(g => g.createdAt?.toDate() >= monthStart).length,
            year: trainedEmployed.filter(g => g.createdAt?.toDate() >= yearStart).length
        };
        setStats(stats);
    };

    const handleStatClick = (period) => {
        const now = new Date();
        let startDate;

        switch (period) {
            case 'Today':
                startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
                break;
            case 'This Week':
                startDate = new Date(now.setDate(now.getDate() - now.getDay()));
                break;
            case 'This Month':
                startDate = new Date(now.getFullYear(), now.getMonth(), 1);
                break;
            case 'This Year':
                startDate = new Date(now.getFullYear(), 0, 1);
                break;
            default:
                startDate = new Date(0);
        }

        const filteredGirls = girls.filter(g =>
            g.employment_status?.toLowerCase() === 'employed' &&
            g.trainings?.some(t => t.status === 'Completed') &&
            g.createdAt?.toDate() >= startDate
        );

        setModalData(filteredGirls);
        setModalTitle(`${period}'s Trained & Employed`);
        setShowModal(true);
    };

    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <div className="max-w-7xl mx-auto">

                {/* Login and Project Overview */}
                <div className="bg-white p-6 rounded-lg shadow-md mb-8">
                    <h1 className="text-3xl font-bold text-gray-800">Project ABC</h1>
                    <p className="text-gray-600 mt-2">
                        <strong>Objective/Goal:</strong> To empower young women by providing them with the necessary skills and opportunities for sustainable employment.
                    </p>
                    <p className="text-gray-600 mt-1">
                        <strong>Timeline:</strong> 2024 - 2026
                    </p>
                    <p className="text-gray-600 mt-1">
                        <strong>Intended Outcome:</strong> To train and employ over 500 women, fostering financial independence and community growth.
                    </p>
                </div>

                {/* Dashboard */}
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-2xl font-semibold mb-6">Trained & Employed Dashboard</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <StatCard title="Today" value={stats.today} onClick={() => handleStatClick('Today')} />
                        <StatCard title="Week till Date" value={stats.week} onClick={() => handleStatClick('This Week')} />
                        <StatCard title="Month till Date" value={stats.month} onClick={() => handleStatClick('This Month')} />
                        <StatCard title="Year till Date" value={stats.year} onClick={() => handleStatClick('This Year')} />
                    </div>

                    <div className="mt-8">
                        <button
                            onClick={() => navigate('/dashboard/profiles')}
                            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                        >
                            Manage Girl Profiles
                        </button>
                    </div>
                </div>

            </div>

            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-lg w-full max-w-2xl">
                        <h3 className="text-xl font-bold mb-4">{modalTitle}</h3>
                        <ul className="space-y-2 max-h-96 overflow-y-auto">
                            {modalData.map(girl => (
                                <li key={girl.id} className="border p-2 rounded">
                                    <p><strong>Name:</strong> {girl.name}</p>
                                    <p><strong>Location:</strong> {girl.location}</p>
                                    <p><strong>Program:</strong> {girl.program}</p>
                                </li>
                            ))}
                        </ul>
                        <button
                            onClick={() => setShowModal(false)}
                            className="mt-4 bg-red-500 text-white px-4 py-2 rounded"
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

const StatCard = ({ title, value, onClick }) => (
    <div
        className="bg-gray-50 p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer"
        onClick={onClick}
    >
        <p className="text-gray-600 text-sm">{title}</p>
        <p className="text-3xl font-bold text-blue-600">{value}</p>
    </div>
);

export default EvenCargoDashboard;