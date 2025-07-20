import React, { useState } from 'react';
import { X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const AddEmployeeToProjectModal = ({ isOpen, onClose, onSave, availableEmployees }) => {
    const [selectedEmployeeIds, setSelectedEmployeeIds] = useState([]);
     const navigate = useNavigate();

     const goToCreateEmployee = () => {
        onClose(); // Close the modal first
        navigate('/dashboard/profiles'); // Then navigate
    };

    if (!isOpen) return null;

    const handleSelectEmployee = (employeeId) => {
        setSelectedEmployeeIds(prev =>
            prev.includes(employeeId)
                ? prev.filter(id => id !== employeeId) // Uncheck if already selected
                : [...prev, employeeId] // Check if not selected
        );
    };

    const handleSave = () => {
        onSave(selectedEmployeeIds);
        onClose();
        setSelectedEmployeeIds([]); // Reset selection
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white p-6 rounded-lg w-full max-w-md shadow-xl">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-bold">Add Employees to Project</h3>
                    <button onClick={onClose}><X size={24} /></button>
                </div>

                <div className="max-h-80 overflow-y-auto border rounded-lg p-2 space-y-2">
                    {availableEmployees.length > 0 ? (
                        availableEmployees.map(emp => (
                            <div key={emp.id} className="flex items-center p-2 rounded hover:bg-gray-100">
                                <input
                                    type="checkbox"
                                    id={`emp-${emp.id}`}
                                    className="mr-3 h-4 w-4"
                                    checked={selectedEmployeeIds.includes(emp.id)}
                                    onChange={() => handleSelectEmployee(emp.id)}
                                />
                                <label htmlFor={`emp-${emp.id}`} className="flex-grow cursor-pointer">
                                    <p className="font-semibold">{emp.name}</p>
                                    <p className="text-sm text-gray-500">{emp.demographicDetails}</p>
                                </label>
                            </div>
                        ))
                    ) : (
                        <p className="text-center text-gray-500 py-4">No available employees to add.</p>
                    )}
                </div>

                <div className="text-center mt-4 border-t pt-4">
                    <p className="text-sm text-gray-600">Need to add someone new to the company?</p>
                    <button
                        onClick={goToCreateEmployee}
                        className="text-blue-600 hover:underline font-semibold mt-1"
                    >
                        Create a New Employee Profile
                    </button>
                </div>

                <div className="flex justify-end mt-6 gap-2">
                    <button onClick={onClose} className="bg-gray-300 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-400">Cancel</button>
                    <button
                        onClick={handleSave}
                        disabled={selectedEmployeeIds.length === 0}
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
                    >
                        Add Selected ({selectedEmployeeIds.length})
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AddEmployeeToProjectModal;