import React, { useState, useEffect } from 'react';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc, Timestamp, arrayUnion, arrayRemove } from 'firebase/firestore';
import { db } from '../../firebase/config';
import Papa from 'papaparse'; // A powerful CSV parser library
import { Plus, Upload, Trash2, Edit, X } from 'lucide-react';

// Helper function to determine the girl's bucket category
const getBucket = (girl) => {
    if (girl.knowsToRideScooty && girl.hasScooty) return 'NF1';
    if (girl.knowsToRideScooty && !girl.hasScooty) return 'NF2';
    if (!girl.knowsToRideScooty) return 'NF3';
    return 'N/A';
};

const GirlProfiles = () => {
    const [girls, setGirls] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    // State for managing modals
    const [showAddGirlModal, setShowAddGirlModal] = useState(false);
    const [showCsvUploadModal, setShowCsvUploadModal] = useState(false);
    const [showTrainingModal, setShowTrainingModal] = useState(null); // Will hold the girl's ID

    const [newGirl, setNewGirl] = useState({
        name: '', age: '', contact: '', demographicLocation: '',
        sourceOfMobilization: '', program: '', employment_status: 'Unemployed',
        knowsToRideScooty: false, hasScooty: false
    });

    // --- Data Fetching ---
    const fetchGirls = async () => {
        setIsLoading(true);
        try {
            const snapshot = await getDocs(collection(db, 'girls'));
            const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setGirls(data);
        } catch (error) {
            console.error("Error fetching girl profiles:", error);
            alert("Could not fetch girl profiles.");
        }
        setIsLoading(false);
    };

    useEffect(() => {
        fetchGirls();
    }, []);

    // --- Girl Management ---
    const handleAddGirl = async () => {
        if (!newGirl.name || !newGirl.age) {
            alert('Name and Age are required.');
            return;
        }
        try {
            await addDoc(collection(db, 'girls'), {
                ...newGirl,
                age: parseInt(newGirl.age),
                trainings: [], // Initialize with an empty trainings array
                createdAt: Timestamp.now()
            });
            setShowAddGirlModal(false);
            fetchGirls(); // Refresh data
        } catch (error) {
            console.error("Error adding girl:", error);
        }
    };

    // --- CSV Upload ---
    const handleCsvUpload = (file) => {
        if (!file) return;

        Papa.parse(file, {
            header: true,
            skipEmptyLines: true,
            complete: async (results) => {
                const girlsFromCsv = results.data;
                // Basic validation
                if (!girlsFromCsv[0] || !girlsFromCsv[0].name || !girlsFromCsv[0].age) {
                    alert("CSV must have 'name' and 'age' columns.");
                    return;
                }

                try {
                    // Batch write to Firestore for efficiency
                    for (const girl of girlsFromCsv) {
                        await addDoc(collection(db, 'girls'), {
                            ...girl,
                            age: parseInt(girl.age) || 0,
                            knowsToRideScooty: girl.knowsToRideScooty === 'true',
                            hasScooty: girl.hasScooty === 'true',
                            trainings: [],
                            createdAt: Timestamp.now()
                        });
                    }
                    alert("Successfully uploaded and added all profiles!");
                    setShowCsvUploadModal(false);
                    fetchGirls();
                } catch (error) {
                    console.error("Error uploading CSV data:", error);
                    alert("An error occurred during the upload.");
                }
            }
        });
    };


    const filteredGirls = girls.filter(g =>
        ((g.name || '').toLowerCase().includes(searchTerm.toLowerCase())) ||
        ((g.demographicLocation || '').toLowerCase().includes(searchTerm.toLowerCase()))
    );

    return (
        <div className="p-6 md:p-8 bg-gray-50 min-h-screen">
            <div className="max-w-7xl mx-auto">
                <h2 className="text-3xl font-bold mb-6 text-gray-800">Girl Profiles Management</h2>

                <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
                    <input
                        type="text"
                        placeholder="Search by name or location..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="border p-2 rounded-lg w-full md:w-1/3"
                    />
                    <div className="flex gap-2">
                        <button onClick={() => setShowAddGirlModal(true)} className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
                            <Plus size={18} /> Add Girl
                        </button>
                        <button onClick={() => setShowCsvUploadModal(true)} className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition">
                            <Upload size={18} /> Upload CSV
                        </button>
                    </div>
                </div>

                {isLoading ? <p>Loading profiles...</p> : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredGirls.map(girl => (
                            <GirlCard key={girl.id} girl={girl} fetchGirls={fetchGirls} onManageTrainings={() => setShowTrainingModal(girl)} />
                        ))}
                    </div>
                )}
            </div>

            {showAddGirlModal && <AddGirlModal newGirl={newGirl} setNewGirl={setNewGirl} onSave={handleAddGirl} onClose={() => setShowAddGirlModal(false)} />}
            {showCsvUploadModal && <CsvUploadModal onUpload={handleCsvUpload} onClose={() => setShowCsvUploadModal(false)} />}
            {showTrainingModal && <TrainingManagementModal girl={showTrainingModal} fetchGirls={fetchGirls} onClose={() => setShowTrainingModal(null)} />}
        </div>
    );
};


// --- Components for Modals and Cards ---

const GirlCard = ({ girl, fetchGirls, onManageTrainings }) => {
    const handleDelete = async () => {
        if (window.confirm(`Are you sure you want to delete ${girl.name}?`)) {
            await deleteDoc(doc(db, 'girls', girl.id));
            fetchGirls();
        }
    };

    return (
        <div className="bg-white p-4 rounded-lg shadow-md space-y-3 transition-shadow hover:shadow-lg">
            <div className="flex justify-between items-start">
                <div>
                    <h3 className="font-bold text-lg text-gray-800">{girl.name || 'N/A'}, {girl.age || 'N/A'}</h3>
                    <p className="text-sm text-gray-500">{girl.demographicLocation || 'N/A'}</p>
                </div>
                <div className="flex gap-2">
                    <button onClick={onManageTrainings} className="text-blue-600 hover:text-blue-800"><Edit size={18} /></button>
                    <button onClick={handleDelete} className="text-red-600 hover:text-red-800"><Trash2 size={18} /></button>
                </div>
            </div>

            <div className="text-sm space-y-1">
                <p><strong>Status:</strong> <span className={`font-semibold ${girl.employment_status === 'Employed' ? 'text-green-600' : 'text-orange-600'}`}>{girl.employment_status || 'N/A'}</span></p>
                <p><strong>Bucket:</strong> <span className="font-semibold text-indigo-600">{getBucket(girl)}</span></p>
            </div>

            <div className="border-t pt-2">
                <h4 className="font-semibold text-sm mb-1">Trainings ({girl.trainings?.length || 0})</h4>
                <div className="text-xs space-y-1">
                    {girl.trainings && girl.trainings.length > 0 ?
                        girl.trainings.slice(0, 2).map((t, i) => <p key={i} className="truncate">✅ {t.name} - <span className="italic">{t.status}</span></p>) :
                        <p className="text-gray-400">No trainings added.</p>
                    }
                    {girl.trainings?.length > 2 && <p className="text-blue-500 font-semibold">...and more</p>}
                </div>
                <button onClick={onManageTrainings} className="text-sm text-blue-600 hover:underline mt-2 w-full text-left">Manage Trainings</button>
            </div>
        </div>
    );
};

const AddGirlModal = ({ newGirl, setNewGirl, onSave, onClose }) => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white p-6 rounded-lg w-full max-w-lg shadow-xl">
            <h3 className="text-xl font-bold mb-4">Add New Girl Profile</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input placeholder="Name" value={newGirl.name} onChange={e => setNewGirl({ ...newGirl, name: e.target.value })} className="border p-2 rounded" />
                <input type="number" placeholder="Age" value={newGirl.age} onChange={e => setNewGirl({ ...newGirl, age: e.target.value })} className="border p-2 rounded" />
                <input placeholder="Contact" value={newGirl.contact} onChange={e => setNewGirl({ ...newGirl, contact: e.target.value })} className="border p-2 rounded" />
                <input placeholder="Demographic Location" value={newGirl.demographicLocation} onChange={e => setNewGirl({ ...newGirl, demographicLocation: e.target.value })} className="border p-2 rounded" />
                <input placeholder="Source of Mobilization" value={newGirl.sourceOfMobilization} onChange={e => setNewGirl({ ...newGirl, sourceOfMobilization: e.target.value })} className="border p-2 rounded md:col-span-2" />
                <select value={newGirl.employment_status} onChange={e => setNewGirl({ ...newGirl, employment_status: e.target.value })} className="border p-2 rounded">
                    <option value="Unemployed">Unemployed</option>
                    <option value="Employed">Employed</option>
                    <option value="In-training">In-training</option>
                </select>

                <div className="md:col-span-2 space-y-2 border-t pt-4 mt-2">
                    <label className="flex items-center gap-2"><input type="checkbox" checked={newGirl.knowsToRideScooty} onChange={e => setNewGirl({ ...newGirl, knowsToRideScooty: e.target.checked })} /> Knows how to ride a scooty?</label>
                    <label className="flex items-center gap-2"><input type="checkbox" checked={newGirl.hasScooty} onChange={e => setNewGirl({ ...newGirl, hasScooty: e.target.checked })} /> Owns a scooty?</label>
                </div>
            </div>
            <div className="flex justify-end mt-6 gap-2">
                <button onClick={onClose} className="bg-gray-300 text-gray-800 px-4 py-2 rounded-lg">Cancel</button>
                <button onClick={onSave} className="bg-blue-600 text-white px-4 py-2 rounded-lg">Save Profile</button>
            </div>
        </div>
    </div>
);

const CsvUploadModal = ({ onUpload, onClose }) => {
    const [file, setFile] = useState(null);
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white p-6 rounded-lg w-full max-w-md shadow-xl text-center">
                <h3 className="text-xl font-bold mb-4">Upload CSV File</h3>
                <p className="text-sm text-gray-600 mb-4">Ensure your CSV has headers like: `name`, `age`, `contact`, `demographicLocation`, `knowsToRideScooty` (true/false), `hasScooty` (true/false).</p>
                <input type="file" accept=".csv" onChange={e => setFile(e.target.files[0])} className="w-full border p-2 rounded mb-4" />
                <div className="flex justify-center gap-2">
                    <button onClick={onClose} className="bg-gray-300 text-gray-800 px-4 py-2 rounded-lg">Cancel</button>
                    <button onClick={() => onUpload(file)} disabled={!file} className="bg-green-600 text-white px-4 py-2 rounded-lg disabled:bg-gray-400">Upload and Save</button>
                </div>
            </div>
        </div>
    )
};

const TrainingManagementModal = ({ girl, fetchGirls, onClose }) => {
    const [trainings, setTrainings] = useState(girl.trainings || []);
    const [newTrainingName, setNewTrainingName] = useState('');
    const [newTrainingStatus, setNewTrainingStatus] = useState('Not Started');

    const handleAddTraining = async () => {
        if (!newTrainingName.trim()) return;
        const girlRef = doc(db, 'girls', girl.id);
        const newTraining = { id: Date.now().toString(), name: newTrainingName, status: newTrainingStatus };
        await updateDoc(girlRef, { trainings: arrayUnion(newTraining) });
        setTrainings([...trainings, newTraining]);
        setNewTrainingName('');
        setNewTrainingStatus('Not Started');
    };

    const handleUpdateStatus = async (trainingId, newStatus) => {
        const updatedTrainings = trainings.map(t => t.id === trainingId ? { ...t, status: newStatus } : t);
        const girlRef = doc(db, 'girls', girl.id);
        await updateDoc(girlRef, { trainings: updatedTrainings });
        setTrainings(updatedTrainings);
    };

    const handleDeleteTraining = async (trainingToRemove) => {
        const girlRef = doc(db, 'girls', girl.id);
        await updateDoc(girlRef, { trainings: arrayRemove(trainingToRemove) });
        setTrainings(trainings.filter(t => t.id !== trainingToRemove.id));
    };

    const handleClose = () => {
        fetchGirls(); // Refresh the main list to reflect changes
        onClose();
    }

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white p-6 rounded-lg w-full max-w-2xl shadow-xl">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-bold">Manage Trainings for {girl.name}</h3>
                    <button onClick={handleClose}><X size={24} /></button>
                </div>

                {/* Add New Training Form */}
                <div className="flex gap-2 mb-6 p-4 bg-gray-100 rounded-lg">
                    <input type="text" placeholder="New Training Name" value={newTrainingName} onChange={e => setNewTrainingName(e.target.value)} className="flex-grow border p-2 rounded" />
                    <select value={newTrainingStatus} onChange={e => setNewTrainingStatus(e.target.value)} className="border p-2 rounded">
                        <option>Not Started</option>
                        <option>In Progress</option>
                        <option>Completed</option>
                    </select>
                    <button onClick={handleAddTraining} className="bg-blue-600 text-white px-4 py-2 rounded">Add</button>
                </div>

                {/* List of Existing Trainings */}
                <div className="space-y-2 max-h-80 overflow-y-auto">
                    {trainings.length > 0 ? trainings.map(training => (
                        <div key={training.id} className="flex justify-between items-center p-2 border rounded-lg">
                            <p className="font-semibold">{training.name}</p>
                            <div className="flex items-center gap-2">
                                <select value={training.status} onChange={e => handleUpdateStatus(training.id, e.target.value)} className="border p-1 rounded text-sm">
                                    <option>Not Started</option>
                                    <option>In Progress</option>
                                    <option>Completed</option>
                                </select>
                                <button onClick={() => handleDeleteTraining(training)} className="text-red-500 hover:text-red-700"><Trash2 size={18} /></button>
                            </div>
                        </div>
                    )) : <p className="text-center text-gray-500">No trainings have been added yet.</p>}
                </div>
            </div>
        </div>
    )
};


export default GirlProfiles;