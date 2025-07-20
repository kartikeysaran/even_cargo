import React from 'react';
import { Trash2 } from 'lucide-react';

// Helper function can live with the component that uses it
const getBucket = (employee) => {
    if (employee.knowsToRideScooty && employee.hasScooty) return 'NF1';
    if (employee.knowsToRideScooty && !employee.hasScooty) return 'NF2';
    if (!employee.knowsToRideScooty) return 'NF3';
    return 'N/A';
};

const EmployeeCard = ({ employee, onViewJourney, onDelete, deleteIconTooltip = "Delete Profile" }) => (
    <div className="bg-white p-4 rounded-lg shadow-md space-y-3 transition-shadow hover:shadow-lg flex flex-col justify-between">
        <div>
            <div className="flex justify-between items-start">
                <div>
                    <h3 className="font-bold text-lg text-gray-800">{employee.name}</h3>
                    <p className="text-sm text-gray-500">{employee.demographicDetails || 'No location'}</p>
                </div>
                <button 
                    onClick={onDelete} 
                    className="text-red-600 hover:text-red-800 p-1"
                    title={deleteIconTooltip} // Use a dynamic tooltip
                >
                    <Trash2 size={18} />
                </button>
            </div>
            <div className="text-sm mt-2">
                <p><strong>Bucket:</strong> <span className="font-semibold text-indigo-600">{getBucket(employee)}</span></p>
                <p><strong>Trainings:</strong> {employee.trainings?.length || 0}</p>
            </div>
        </div>
        <button onClick={onViewJourney} className="w-full mt-4 text-center bg-gray-200 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-300 transition-colors">
            View Journey
        </button>
    </div>
);

export default EmployeeCard;