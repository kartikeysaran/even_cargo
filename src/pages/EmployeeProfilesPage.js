// src/pages/EmployeeProfilesPage.js

// CHANGE #1: Import useCallback from React
import React, { useState, useEffect, useCallback } from 'react';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc, Timestamp, arrayUnion, arrayRemove } from 'firebase/firestore';
import { db } from '../firebase/config';
import { useAuth } from '../contexts/AuthContext';
import { Plus, Trash2, X, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// --- Helper components (JourneyView, AddEmployeeModal, EmployeeCard) remain the same ---
// They are included here for completeness.
const getBucket = (employee) => {
    if (employee.knowsToRideScooty && employee.hasScooty) return 'NF1';
    if (employee.knowsToRideScooty && !employee.hasScooty) return 'NF2';
    if (!employee.knowsToRideScooty) return 'NF3';
    return 'N/A';
};

const JourneyView = ({ employee, onBack, fetchEmployees }) => {
    const [trainings, setTrainings] = useState(employee.trainings || []);
    const [newTrainingName, setNewTrainingName] = useState('');
    const [newTrainingStatus, setNewTrainingStatus] = useState('Not Started');
    const { currentUser } = useAuth();
    const employeeDocRef = doc(db, 'companies', currentUser.uid, 'employees', employee.id);
    const handleAddTraining = async () => { if (!newTrainingName.trim()) return; const newTraining = { id: Date.now().toString(), name: newTrainingName, status: newTrainingStatus, cost: 0, time: '' }; await updateDoc(employeeDocRef, { trainings: arrayUnion(newTraining) }); setTrainings([...trainings, newTraining]); setNewTrainingName(''); setNewTrainingStatus('Not Started'); };
    const handleUpdateTraining = async (trainingId, field, value) => { const updatedTrainings = trainings.map(t => t.id === trainingId ? { ...t, [field]: value } : t); await updateDoc(employeeDocRef, { trainings: updatedTrainings }); setTrainings(updatedTrainings); };
    const handleDeleteTraining = async (trainingToRemove) => { await updateDoc(employeeDocRef, { trainings: arrayRemove(trainingToRemove) }); setTrainings(trainings.filter(t => t.id !== trainingToRemove.id)); };
    const handleClose = () => { fetchEmployees(); onBack(); };
    return ( <div className="p-6 md:p-8 bg-gray-50 min-h-screen"> <div className="max-w-4xl mx-auto"> <button onClick={handleClose} className="flex items-center gap-2 text-blue-600 mb-4 hover:underline"> <ArrowLeft size={18} /> Back to All Profiles </button> <div className="bg-white p-6 rounded-lg shadow-md"> <h2 className="text-3xl font-bold text-gray-800 mb-4">Journey of {employee.name}</h2> <div className="grid grid-cols-1 md:grid-cols-3 gap-4 border-b pb-4 mb-4 text-sm"> <div><strong>Input Date:</strong> {employee.createdAt?.toDate().toLocaleDateString() || 'N/A'}</div> <div><strong>Source of Mobilization:</strong> {employee.sourceOfMobilization || 'N/A'}</div> <div><strong>Demographic Details:</strong> {employee.demographicDetails || 'N/A'}</div> <div className="font-bold">Bucket: <span className="text-indigo-600">{getBucket(employee)}</span></div> <div><strong>Current Status:</strong> {employee.employmentStatus || 'N/A'}</div> </div> <h3 className="text-xl font-semibold mb-4">Training Map</h3> <div className="space-y-4"> <div className="flex flex-col md:flex-row gap-2 p-4 bg-gray-100 rounded-lg"> <input type="text" placeholder="New Training Name" value={newTrainingName} onChange={e => setNewTrainingName(e.target.value)} className="flex-grow border p-2 rounded" /> <select value={newTrainingStatus} onChange={e => setNewTrainingStatus(e.target.value)} className="border p-2 rounded"> <option>Not Started</option> <option>In Progress</option> <option>Completed</option> </select> <button onClick={handleAddTraining} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Add</button> </div> <div className="space-y-2"> {trainings.length > 0 ? trainings.map(t => ( <div key={t.id} className="grid grid-cols-12 gap-2 items-center p-2 border rounded-lg"> <div className="col-span-12 md:col-span-4 font-semibold">{t.name}</div> <div className="col-span-6 md:col-span-3"> <select value={t.status} onChange={e => handleUpdateTraining(t.id, 'status', e.target.value)} className="w-full border p-1 rounded text-sm"> <option>Not Started</option><option>In Progress</option><option>Completed</option> </select> </div> <div className="col-span-6 md:col-span-2"> <input type="text" placeholder="Time" value={t.time || ''} onChange={e => handleUpdateTraining(t.id, 'time', e.target.value)} className="w-full border p-1 rounded text-sm" /> </div> <div className="col-span-6 md:col-span-2"> <input type="number" placeholder="Cost" value={t.cost || 0} onChange={e => handleUpdateTraining(t.id, 'cost', parseFloat(e.target.value))} className="w-full border p-1 rounded text-sm" /> </div> <div className="col-span-6 md:col-span-1 text-right"> <button onClick={() => handleDeleteTraining(t)} className="text-red-500 hover:text-red-700"><Trash2 size={18} /></button> </div> </div> )) : <p className="text-center text-gray-500 py-4">No trainings have been assigned yet.</p>} </div> </div> </div> </div> </div> );};
const AddEmployeeModal = ({ onSave, onClose }) => { const [newData, setNewData] = useState({ name: '', demographicDetails: '', sourceOfMobilization: '', knowsToRideScooty: false, hasScooty: false, employmentStatus: 'Unemployed', }); const handleSave = () => { if (!newData.name.trim()) { alert('Name is required.'); return; } onSave(newData); onClose(); }; return ( <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"> <div className="bg-white p-6 rounded-lg w-full max-w-lg shadow-xl"> <div className="flex justify-between items-center mb-4"> <h3 className="text-xl font-bold">Add New Employee Profile</h3> <button onClick={onClose}><X size={24} /></button> </div> <div className="grid grid-cols-1 md:grid-cols-2 gap-4"> <input placeholder="Name" value={newData.name} onChange={e => setNewData({ ...newData, name: e.target.value })} className="border p-2 rounded" /> <input placeholder="Demographic Details" value={newData.demographicDetails} onChange={e => setNewData({ ...newData, demographicDetails: e.target.value })} className="border p-2 rounded" /> <input placeholder="Source of Mobilization" value={newData.sourceOfMobilization} onChange={e => setNewData({ ...newData, sourceOfMobilization: e.target.value })} className="border p-2 rounded md:col-span-2" /> <select value={newData.employmentStatus} onChange={e => setNewData({ ...newData, employmentStatus: e.target.value })} className="border p-2 rounded"> <option value="Unemployed">Unemployed</option> <option value="In-training">In-training</option> <option value="Employed">Employed</option> </select> <div className="md:col-span-2 space-y-2 border-t pt-4 mt-2"> <label className="flex items-center gap-2"><input type="checkbox" checked={newData.knowsToRideScooty} onChange={e => setNewData({ ...newData, knowsToRideScooty: e.target.checked })} /> Knows how to ride a scooty?</label> <label className="flex items-center gap-2"><input type="checkbox" checked={newData.hasScooty} onChange={e => setNewData({ ...newData, hasScooty: e.target.checked })} /> Owns a scooty?</label> </div> </div> <div className="flex justify-end mt-6 gap-2"> <button onClick={onClose} className="bg-gray-300 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-400">Cancel</button> <button onClick={handleSave} className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">Save Profile</button> </div> </div> </div> ); };
const EmployeeCard = ({ employee, onViewJourney, onDelete }) => ( <div className="bg-white p-4 rounded-lg shadow-md space-y-3 transition-shadow hover:shadow-lg flex flex-col justify-between"> <div> <div className="flex justify-between items-start"> <div> <h3 className="font-bold text-lg text-gray-800">{employee.name}</h3> <p className="text-sm text-gray-500">{employee.demographicDetails || 'No location'}</p> </div> <button onClick={onDelete} className="text-red-600 hover:text-red-800 p-1"><Trash2 size={18} /></button> </div> <div className="text-sm mt-2"> <p><strong>Bucket:</strong> <span className="font-semibold text-indigo-600">{getBucket(employee)}</span></p> <p><strong>Trainings:</strong> {employee.trainings?.length || 0}</p> </div> </div> <button onClick={onViewJourney} className="w-full mt-4 text-center bg-gray-200 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-300 transition-colors"> View Journey </button> </div> );

// --- The Main Page Component ---
const EmployeeProfilesPage = () => {
    const [employees, setEmployees] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedEmployee, setSelectedEmployee] = useState(null);
    const [showAddModal, setShowAddModal] = useState(false);
    
    const { currentUser } = useAuth();
    const navigate = useNavigate();

    const employeesCollectionRef = collection(db, 'companies', currentUser.uid, 'employees');

    // CHANGE #2: Wrap fetchEmployees in useCallback
     const fetchEmployees = useCallback(async () => {
        // 1. Don't do anything if there is no user.
        if (!currentUser) {
            setIsLoading(false); // Make sure to stop loading if there's no user
            return;
        }

        setIsLoading(true);
        try {
            // 2. Create the collection reference *inside* the function.
            const employeesCollectionRef = collection(db, 'companies', currentUser.uid, 'employees');
            const snapshot = await getDocs(employeesCollectionRef);
            const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setEmployees(data);
        } catch (error) {
            console.error("Error fetching employee profiles:", error);
            // Optionally set an error state here to show a message to the user
        } finally {
            // 3. This will now reliably be called once the fetch is complete.
            setIsLoading(false);
        }
    }, [currentUser]); // The dependency is now the stable currentUser object

    // This effect will now only re-run when fetchEmployees is recreated,
    // which only happens when currentUser changes.
    useEffect(() => {
        fetchEmployees();
    }, [fetchEmployees]);

    const handleAddEmployee = async (newEmployeeData) => {
        if (!currentUser) return;
        const employeesCollectionRef = collection(db, 'companies', currentUser.uid, 'employees');
        try {
            // Add the new projectIds array when creating an employee
            await addDoc(employeesCollectionRef, { ...newEmployeeData, trainings: [], projectIds: [], createdAt: Timestamp.now() });
            fetchEmployees(); // Re-fetch the list
        } catch (error) {
            console.error("Error adding employee:", error);
        }
    };
    
    const handleDeleteEmployee = async (employeeId) => {
        if (!currentUser) return;
        if (window.confirm("Are you sure you want to permanently delete this profile?")) {
            const employeeDocRef = doc(db, 'companies', currentUser.uid, 'employees', employeeId);
            try {
                await deleteDoc(employeeDocRef);
                fetchEmployees(); // Re-fetch the list
            } catch (error) {
                console.error("Error deleting employee:", error);
            }
        }
    };
    
    const filteredEmployees = employees.filter(e =>
        (e.name || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
        (e.demographicDetails || '').toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (selectedEmployee) {
        // Pass fetchEmployees down so JourneyView can refresh the list on close
        return <JourneyView employee={selectedEmployee} onBack={() => setSelectedEmployee(null)} fetchEmployees={fetchEmployees} />;
    }

        return (
        <div className="p-6 md:p-8 bg-gray-50 min-h-screen">
            <div className="max-w-7xl mx-auto">
                <button onClick={() => navigate('/dashboard')} className="flex items-center gap-2 text-blue-600 mb-4 hover:underline">
                    <ArrowLeft size={18} /> Back to Dashboard
                </button>
                <h2 className="text-3xl font-bold mb-6 text-gray-800">Employee Profiles Management</h2>
                
                <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
                    <input
                        type="text"
                        placeholder="Search by name or location..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="border p-2 rounded-lg w-full md:w-1/3"
                    />
                    <button onClick={() => setShowAddModal(true)} className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
                        <Plus size={18} /> Add Employee
                    </button>
                </div>

                {isLoading ? <p className="text-center py-10">Loading profiles...</p> : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredEmployees.length > 0 ? filteredEmployees.map(emp => (
                            <EmployeeCard 
                                key={emp.id} 
                                employee={emp} 
                                onViewJourney={() => setSelectedEmployee(emp)}
                                onDelete={() => handleDeleteEmployee(emp.id)}
                            />
                        )) : (
                           <p className="md:col-span-3 text-center py-10 text-gray-500">No profiles found. Try adjusting your search or add a new employee.</p>
                        )}
                    </div>
                )}
            </div>
            {showAddModal && <AddEmployeeModal onSave={handleAddEmployee} onClose={() => setShowAddModal(false)} />}
        </div>
    );
};

export default EmployeeProfilesPage;