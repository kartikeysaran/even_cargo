import React, { useState, useEffect } from 'react';
import { collection, getDocs, doc, addDoc } from 'firebase/firestore';
import { db } from '../firebase/config';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const DashboardPage = () => {
    const [projects, setProjects] = useState([]);
    const [showAddProjectModal, setShowAddProjectModal] = useState(false);
    const { currentUser, logout } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!currentUser) return;

        const fetchProjects = async () => {
            try {
                const projectsSnapshot = await getDocs(collection(db, 'companies', currentUser.uid, 'projects'));
                const projectsData = projectsSnapshot.docs.map(d => ({ ...d.data(), id: d.id }));
                setProjects(projectsData);
            } catch (error) {
                console.error("Error fetching projects:", error);
            }
        };
        fetchProjects();
    }, [currentUser]);

    const handleAddProject = async (newProjectData) => {
        try {
            await addDoc(collection(db, 'companies', currentUser.uid, 'projects'), newProjectData);
            // Refresh projects list
            const projectsSnapshot = await getDocs(collection(db, 'companies', currentUser.uid, 'projects'));
            const projectsData = projectsSnapshot.docs.map(d => ({ ...d.data(), id: d.id }));
            setProjects(projectsData);
        } catch (error) {
            console.error("Error adding project:", error);
        }
    };

    const handleLogout = async () => {
        try {
            await logout();
            navigate('/login');
        } catch (error) {
            console.error("Failed to log out", error);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <div className="max-w-7xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-800">Company Dashboard</h1>
                    <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600">Logout</button>
                </div>

                <div className="mb-8">
                    <button onClick={() => setShowAddProjectModal(true)} className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600">
                        Add Project
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {projects.map(project => (
                        <div key={project.id} className="bg-white p-6 rounded-lg shadow-md cursor-pointer" onClick={() => navigate(`/project/${project.id}`)}>
                            <h2 className="text-2xl font-bold text-gray-800">{project.name || 'Project Name'}</h2>
                            <p className="text-gray-600 mt-2"><strong>Objective:</strong> {project.objective}</p>
                        </div>
                    ))}
                </div>
            </div>

            {showAddProjectModal && (
                <AddProjectModal
                    onSave={handleAddProject}
                    onClose={() => setShowAddProjectModal(false)}
                />
            )}
        </div>
    );
};

const AddProjectModal = ({ onSave, onClose }) => {
    const [newProject, setNewProject] = useState({ name: '', objective: '' });

    const handleSave = () => {
        if (!newProject.name.trim()) {
            alert('Project name is required.');
            return;
        }
        onSave(newProject);
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white p-6 rounded-lg w-full max-w-lg shadow-xl">
                <h3 className="text-xl font-bold">Add New Project</h3>
                <div className="mt-4">
                    <input
                        placeholder="Project Name"
                        value={newProject.name}
                        onChange={e => setNewProject({ ...newProject, name: e.target.value })}
                        className="border p-2 rounded w-full"
                    />
                    <textarea
                        placeholder="Project Objective"
                        value={newProject.objective}
                        onChange={e => setNewProject({ ...newProject, objective: e.target.value })}
                        className="border p-2 rounded w-full mt-4"
                        rows="4"
                    ></textarea>
                </div>
                <div className="flex justify-end mt-6 gap-2">
                    <button onClick={onClose} className="bg-gray-300 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-400">Cancel</button>
                    <button onClick={handleSave} className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">Save Project</button>
                </div>
            </div>
        </div>
    );
};

export default DashboardPage;