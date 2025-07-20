import React, { useState } from 'react';
import { doc, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore';
import { db } from '../../firebase/config';
import { useAuth } from '../../contexts/AuthContext';
import { ArrowLeft, Trash2 } from 'lucide-react';

const JourneyView = ({ employee, onBack, fetchEmployees }) => {
    const [trainings, setTrainings] = useState(employee.trainings || []);
    const [newTrainingName, setNewTrainingName] = useState('');
    const [newTrainingStatus, setNewTrainingStatus] = useState('Not Started');
    const { currentUser } = useAuth();
    
    // Ensure we don't proceed if there's no user or employee
    const employeeDocRef = currentUser ? doc(db, 'companies', currentUser.uid, 'employees', employee.id) : null;

    const handleAddTraining = async () => {
        if (!employeeDocRef || !newTrainingName.trim()) return;
        const newTraining = { id: Date.now().toString(), name: newTrainingName, status: newTrainingStatus, cost: 0, time: '' };
        await updateDoc(employeeDocRef, { trainings: arrayUnion(newTraining) });
        setTrainings([...trainings, newTraining]);
        setNewTrainingName('');
        setNewTrainingStatus('Not Started');
    };

    const handleUpdateTraining = async (trainingId, field, value) => {
        if (!employeeDocRef) return;
        const updatedTrainings = trainings.map(t => t.id === trainingId ? { ...t, [field]: value } : t);
        await updateDoc(employeeDocRef, { trainings: updatedTrainings });
        setTrainings(updatedTrainings);
    };

    const handleDeleteTraining = async (trainingToRemove) => {
        if (!employeeDocRef) return;
        await updateDoc(employeeDocRef, { trainings: arrayRemove(trainingToRemove) });
        setTrainings(trainings.filter(t => t.id !== trainingToRemove.id));
    };

    const handleClose = () => {
        if (fetchEmployees) fetchEmployees(); // Optional refresh callback
        onBack();
    };

    return (
        // The JSX for JourneyView remains the same as you provided
        <div className="p-6 md:p-8 bg-gray-50 min-h-screen"> <div className="max-w-4xl mx-auto"> <button onClick={handleClose} className="flex items-center gap-2 text-blue-600 mb-4 hover:underline"> <ArrowLeft size={18} /> Back </button> <div className="bg-white p-6 rounded-lg shadow-md"> <h2 className="text-3xl font-bold text-gray-800 mb-4">Journey of {employee.name}</h2> {/* ... Rest of the JSX ... */} </div> </div> </div>
    );
};

export default JourneyView;