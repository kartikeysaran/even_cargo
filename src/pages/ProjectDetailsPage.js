import React, { useState, useEffect, useCallback } from 'react';
import { doc, getDoc, collection, getDocs, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore';
import { db } from '../firebase/config';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Plus, UserPlus } from 'lucide-react';
import AddEmployeeToProjectModal from './AddEmployeeToProjectModal'; // Import the new modal

import EmployeeCard from '../components/employees/EmployeeCard'; // Import reusable card
import JourneyView from '../components/employees/JourneyView';   // Import reusable journey view

const ProjectDetailsPage = () => {
    const { projectId } = useParams();
    const navigate = useNavigate();
    const { currentUser } = useAuth();

    const [project, setProject] = useState(null);
    const [employeesInProject, setEmployeesInProject] = useState([]);
    const [availableEmployees, setAvailableEmployees] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);

     const [selectedEmployee, setSelectedEmployee] = useState(null);

    // Using useCallback to stabilize the function reference
    const fetchProjectData = useCallback(async () => {
        if (!currentUser) return;
        setIsLoading(true);

        try {
            // 1. Fetch the project details
            const projectRef = doc(db, 'companies', currentUser.uid, 'projects', projectId);
            const projectSnap = await getDoc(projectRef);
            if (projectSnap.exists()) {
                setProject({ id: projectSnap.id, ...projectSnap.data() });
            }

            // 2. Fetch all employees and filter them
            const employeesSnapshot = await getDocs(collection(db, 'companies', currentUser.uid, 'employees'));
            const allEmployees = employeesSnapshot.docs.map(d => ({ id: d.id, ...d.data() }));

            const inProject = [];
            const notInProject = [];

            allEmployees.forEach(emp => {
                // We use an array 'projectIds' now for more flexibility
                if (emp.projectIds && emp.projectIds.includes(projectId)) {
                    inProject.push(emp);
                } else {
                    notInProject.push(emp);
                }
            });

            setEmployeesInProject(inProject);
            setAvailableEmployees(notInProject);

        } catch (error) {
            console.error("Error fetching project data:", error);
        } finally {
            setIsLoading(false);
        }
    }, [currentUser, projectId]);

    useEffect(() => {
        fetchProjectData();
    }, [fetchProjectData]);

    const handleAddEmployees = async (selectedEmployeeIds) => {
        if (!currentUser || selectedEmployeeIds.length === 0) return;

        try {
            // Use batch updates for efficiency in the future if needed, but this works fine
            for (const employeeId of selectedEmployeeIds) {
                const employeeRef = doc(db, 'companies', currentUser.uid, 'employees', employeeId);
                await updateDoc(employeeRef, {
                    projectIds: arrayUnion(projectId) // Add the projectId to the employee's array
                });
            }
            // Refresh the data on the page to show the newly added employees
            fetchProjectData();
        } catch (error) {
            console.error("Error adding employees to project: ", error);
        }
    };

    const handleRemoveEmployee = async (employeeId) => {
        if (!currentUser) return;
        if (window.confirm("Are you sure you want to remove this employee from the project?")) {
            const employeeRef = doc(db, 'companies', currentUser.uid, 'employees', employeeId);
            try {
                await updateDoc(employeeRef, {
                    projectIds: arrayRemove(projectId) // Use arrayRemove to pull the ID
                });
                fetchProjectData(); // Refresh the list
            } catch (error) {
                console.error("Error removing employee from project:", error);
            }
        }
    };

    if (selectedEmployee) {
        return (
            <JourneyView
                employee={selectedEmployee}
                onBack={() => setSelectedEmployee(null)} // Go back to the project page
                fetchEmployees={fetchProjectData} // Pass the refresh function
            />
        );
    }

    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <div className="max-w-7xl mx-auto">
                <button onClick={() => navigate('/dashboard')} className="text-blue-600 hover:underline mb-4">
                    ← Back to Dashboard
                </button>
                {project && (
                    <div className="bg-white p-6 rounded-lg shadow-md mb-8">
                        <h2 className="text-3xl font-bold text-gray-800">{project.name}</h2>
                        <p className="text-gray-600 mt-2"><strong>Objective:</strong> {project.objective}</p>
                    </div>
                )}

                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-2xl font-bold">Employees in this Project</h3>
                    <button
                        onClick={() => setShowModal(true)}
                        className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                    >
                        <UserPlus size={18} /> Add Existing Employee
                    </button>
                </div>

                {isLoading ? <p>Loading employees...</p> : (
                    <>
                        {employeesInProject.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {employeesInProject.map(employee => (
                                     <EmployeeCard
                                        key={employee.id}
                                        employee={employee}
                                        onViewJourney={() => setSelectedEmployee(employee)}
                                        onDelete={() => handleRemoveEmployee(employee.id)}
                                        deleteIconTooltip="Remove from Project" // Custom tooltip!
                                    />
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-10 px-6 bg-white rounded-lg shadow-md">
                                <h4 className="text-lg font-semibold text-gray-700">No employees have been added to this project yet.</h4>
                                <p className="text-gray-500 mt-2">You can add existing employees or create new profiles first.</p>
                                <div className="mt-6 flex justify-center gap-4">
                                     <button
                                        onClick={() => navigate('/dashboard/profiles')}
                                        className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
                                    >
                                        <Plus size={18} /> Create a New Employee
                                    </button>
                                </div>
                            </div>
                        )}
                    </>
                )}
            </div>

            <AddEmployeeToProjectModal
                isOpen={showModal}
                onClose={() => setShowModal(false)}
                onSave={handleAddEmployees}
                availableEmployees={availableEmployees}
            />
        </div>
    );
};

export default ProjectDetailsPage;