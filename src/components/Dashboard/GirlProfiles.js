// src/components/GirlProfiles.jsx
import React, { useState, useEffect } from 'react';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc, Timestamp } from 'firebase/firestore';
import { db } from '../../firebase/config';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '../../firebase/config';
import Papa from 'papaparse';



const GirlProfiles = () => {
    const [girls, setGirls] = useState([]);
    const [showAddGirl, setShowAddGirl] = useState(false);
    const [csvData, setCsvData] = useState([]);
    const [showCsvUpload, setShowCsvUpload] = useState(false);

    const [editingTraining, setEditingTraining] = useState(null); // {girlId, index, data}
    const [expandedTrainingsFor, setExpandedTrainingsFor] = useState(null);
    const [newGirl, setNewGirl] = useState({
        name: '',
        age: '',
        contact: '',
        location: '',
        program: '',
        employment_status: ''
    });
    const [searchQuery, setSearchQuery] = useState('');
    const [filterProgram, setFilterProgram] = useState('');
    const [filterStatus, setFilterStatus] = useState('');
    const [trainingPopupFor, setTrainingPopupFor] = useState(null);


    const [trainingInput, setTrainingInput] = useState({
        name: '',
        status: 'Not Started',
        date: ''
    }); const handleExportCSV = () => {
        const csvData = girls.map(girl => {
            return {
                name: girl.name,
                age: girl.age,
                contact: girl.contact,
                location: girl.location,
                program: girl.program,
                employment_status: girl.employment_status,
                skills: girl.skills ? JSON.stringify(girl.skills) : '',
                trainings: girl.trainings ? JSON.stringify(girl.trainings) : '',
                documents: girl.documents ? JSON.stringify(girl.documents) : ''
            };
        });

        const csv = Papa.unparse(csvData);
        const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);

        const link = document.createElement("a");
        link.setAttribute("href", url);
        link.setAttribute("download", "girl_profiles.csv");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const handleFileUpload = async (girlId) => {
        if (!selectedFile) return;

        try {
            const storageRef = ref(storage, `girl_documents/${girlId}/${selectedFile.name}`);
            await uploadBytes(storageRef, selectedFile);
            const fileUrl = await getDownloadURL(storageRef);

            const girlRef = doc(db, 'girls', girlId);

            // Get current documents array if any
            const currentGirl = girls.find(g => g.id === girlId);
            const existingDocs = currentGirl.documents || [];

            const newDocument = {
                name: selectedFile.name,
                url: fileUrl,
                uploadedAt: Timestamp.now()
            };

            // Append new document
            await updateDoc(girlRef, {
                documents: [...existingDocs, newDocument]
            });

            setSelectedFile(null);
            setUploadingFor(null);
            fetchGirls(); // refresh
            alert("File uploaded and saved!");
        } catch (err) {
            console.error("Upload failed:", err);
        }
    };
    const handleUpdateTraining = async () => {
        const { girlId, index, data } = editingTraining;

        const girlRef = doc(db, 'girls', girlId);
        const girl = girls.find(g => g.id === girlId);

        if (!girl) return;

        const updatedTrainings = [...(girl.trainings || [])];
        updatedTrainings[index] = data;

        try {
            await updateDoc(girlRef, { trainings: updatedTrainings });
            setEditingTraining(null);
            fetchGirls();
        } catch (err) {
            console.error("Error updating training", err);
        }
    };

    const getTrainingCompletion = (girl) => {
        const trainings = girl.trainings || [];
        const total = trainings.length;
        const completed = trainings.filter(t => t.status === 'Completed').length;

        const percent = total > 0 ? Math.round((completed / total) * 100) : 0;

        return { total, completed, percent };
    };

    const handleDeleteTraining = async (girlId, index) => {
        if (!window.confirm("Delete this training?")) return;

        const girlRef = doc(db, 'girls', girlId);
        const girl = girls.find(g => g.id === girlId);

        if (!girl) return;

        const updatedTrainings = [...(girl.trainings || [])];
        updatedTrainings.splice(index, 1);

        try {
            await updateDoc(girlRef, { trainings: updatedTrainings });
            fetchGirls();
        } catch (err) {
            console.error("Error deleting training", err);
        }
    };

    const [selectedFile, setSelectedFile] = useState(null);
    const [uploadingFor, setUploadingFor] = useState(null);

    const handleAddTraining = async (girlId) => {
    if (!trainingInput.name) { // Removed date requirement
        alert("Please enter training name");
        return;
    }

    try {
        const girlRef = doc(db, 'girls', girlId);
        const girlDoc = girls.find(g => g.id === girlId);

        const updatedTrainings = [
            ...(girlDoc.trainings || []),
            { 
                ...trainingInput,
                date: trainingInput.date || 'No date set' // Handle empty date
            }
        ];

        await updateDoc(girlRef, { trainings: updatedTrainings });

        setTrainingInput({ name: '', status: 'Not Started', date: '' });
        fetchGirls();
    } catch (err) {
        console.error("Error adding training", err);
    }
};

    const [searchTerm, setSearchTerm] = useState('');
    const [programFilter, setProgramFilter] = useState('');
    const [employmentFilter, setEmploymentFilter] = useState('');

    const defaultSkills = {
        communication: 1,
        driving: 1,
        digital_literacy: 1
    };

    const [showSkillEditorFor, setShowSkillEditorFor] = useState(null);
    const [skillsData, setSkillsData] = useState(defaultSkills);

    const handleSaveSkills = async (girlId) => {
        try {
            const docRef = doc(db, 'girls', girlId);
            await updateDoc(docRef, { skills: skillsData });
            setShowSkillEditorFor(null);
            setSkillsData(defaultSkills);
            fetchGirls();
        } catch (err) {
            console.error("Failed to update skills", err);
        }
    };

    const exportToCSV = () => {
        const headers = [
            "Name", "Age", "Contact", "Location", "Program", "Employment Status",
            "Skills", "Trainings"
        ];

        const rows = girls.map(girl => [
            girl.name,
            girl.age,
            girl.contact,
            girl.location,
            girl.program,
            girl.employment_status,
            girl.skills ? Object.entries(girl.skills).map(([key, val]) => `${key}: ${val}`).join("; ") : '',
            girl.trainings ? girl.trainings.map(t => `${t.name} (${t.status}) on ${t.date}`).join(" | ") : ''
        ]);

        let csvContent = "data:text/csv;charset=utf-8,"
            + [headers.join(","), ...rows.map(e => e.map(x => `"${x}"`).join(","))].join("\n");

        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", "girl_profiles.csv");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const [editingId, setEditingId] = useState(null);
    const [editGirl, setEditGirl] = useState(null);

    // Handle Save after Edit
    const handleUpdateGirl = async () => {
        if (!editGirl) return;

        try {
            const docRef = doc(db, 'girls', editingId);
            await updateDoc(docRef, {
                ...editGirl,
                age: parseInt(editGirl.age),
            });
            setEditingId(null);
            setEditGirl(null);
            fetchGirls(); // reload list
        } catch (err) {
            console.error("Error updating profile", err);
        }
    };

    // Handle Delete
    const handleDeleteGirl = async (id) => {
        if (!window.confirm("Are you sure you want to delete this profile?")) return;
        try {
            await deleteDoc(doc(db, 'girls', id));
            fetchGirls(); // reload
        } catch (err) {
            console.error("Error deleting profile", err);
        }
    };

    const fetchGirls = async () => {
        try {
            const snapshot = await getDocs(collection(db, 'girls'));
            const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setGirls(data);
        } catch (err) {
            console.error("Error fetching girl profiles", err);
        }
    };

    useEffect(() => {
        fetchGirls();
    }, []);

    const handleAddGirl = async () => {
        const { name, age, contact, location, program, employment_status } = newGirl;
        if (!name || !age || !contact || !location || !program || !employment_status) {
            alert('Please fill all fields');
            return;
        }

        try {
            await addDoc(collection(db, 'girls'), {
                ...newGirl,
                age: parseInt(age),
                createdAt: Timestamp.now()
            });
            setNewGirl({ name: '', age: '', contact: '', location: '', program: '', employment_status: '' });
            fetchGirls();
        } catch (err) {
            console.error("Error adding girl", err);
        }
    };

    return (
        <div className="p-6 max-w-5xl mx-auto">
            <h2 className="text-2xl font-bold mb-6">Girl Profiles</h2>
            <div className="flex justify-center gap-4 mb-6">
                <button
                    className="bg-green-600 text-white px-4 py-2 rounded"
                    onClick={() => setShowAddGirl(true)}
                >
                    Add Girl
                </button>

                <button
                    className="bg-blue-600 text-white px-4 py-2 rounded"
                    onClick={() => setShowCsvUpload(true)}
                >
                    Upload Dataset
                </button>

                <button
                    className="bg-purple-600 text-white px-4 py-2 rounded"
                    onClick={exportToCSV}
                >
                    Export CSV
                </button>
            </div>

            <div className="mb-6">
                <div className="flex justify-center mb-4">
                    <input
                        type="text"
                        placeholder="Search by name, location or contact"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full md:w-1/2 border border-gray-300 p-2 rounded-lg"
                    />
                </div>

                <div className="flex flex-wrap justify-center gap-4">
                    <select
                        value={programFilter}
                        onChange={(e) => setProgramFilter(e.target.value)}
                        className="border border-gray-300 p-2 rounded"
                    >
                        <option value="">All Programs</option>
                        {[...new Set(girls.map(g => g.program))].map((program, i) => (
                            <option key={i} value={program}>{program}</option>
                        ))}
                    </select>

                    <select
                        value={employmentFilter}
                        onChange={(e) => setEmploymentFilter(e.target.value)}
                        className="border border-gray-300 p-2 rounded"
                    >
                        <option value="">All Status</option>
                        {[...new Set(girls.map(g => g.employment_status))].map((status, i) => (
                            <option key={i} value={status}>{status}</option>
                        ))}
                    </select>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {girls
                    .filter(girl =>
                        (girl.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            girl.location?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            girl.contact?.toLowerCase().includes(searchTerm.toLowerCase())) &&
                        (programFilter === '' || girl.program === programFilter) &&
                        (employmentFilter === '' || girl.employment_status === employmentFilter)
                    )
                    .map(girl => (
                        <div key={girl.id} className="space-y-2">
                            {editingId === girl.id ? (
                                <div className="border rounded-lg p-4 bg-yellow-50 shadow-sm space-y-2">
                                    {['name', 'age', 'contact', 'location', 'program', 'employment_status'].map(field => (
                                        <input
                                            key={field}
                                            value={editGirl[field]}
                                            onChange={(e) => setEditGirl(prev => ({ ...prev, [field]: e.target.value }))}
                                            className="w-full px-2 py-1 border border-gray-300 rounded"
                                            placeholder={field}
                                        />
                                    ))}
                                    <div className="flex gap-2 mt-2">
                                        <button className="bg-green-600 text-white px-4 py-1 rounded" onClick={handleUpdateGirl}>
                                            Save
                                        </button>
                                        <button
                                            className="bg-gray-400 text-white px-4 py-1 rounded"
                                            onClick={() => {
                                                setEditingId(null);
                                                setEditGirl(null);
                                            }}
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <div className="border rounded-lg p-4 bg-white shadow-sm space-y-1">
                                    <h3 className="font-semibold text-lg">{girl.name}</h3>
                                    <p className="text-sm text-gray-600">Age: {girl.age}</p>
                                    <p className="text-sm text-gray-600">Contact: {girl.contact}</p>
                                    <p className="text-sm text-gray-600">Location: {girl.location}</p>
                                    <p className="text-sm text-gray-600">Program: {girl.program}</p>
                                    <p className="text-sm text-gray-600">Status: {girl.employment_status}</p>
                                    {girl.trainings && girl.trainings.length > 0 && (
                                        <div className="mt-2 space-y-1">
                                            <p className="text-sm text-gray-700 font-medium">
                                                Training Completion: {getTrainingCompletion(girl).percent}% ({getTrainingCompletion(girl).completed}/{getTrainingCompletion(girl).total})
                                            </p>
                                            <div className="w-full h-3 bg-gray-200 rounded-full">
                                                <div
                                                    className="h-full bg-green-500 rounded-full"
                                                    style={{ width: `${getTrainingCompletion(girl).percent}%` }}
                                                ></div>
                                            </div>
                                        </div>
                                    )}
                                    {girl.skills && (
                                        <div className="text-sm text-gray-600">
                                            <p className="font-medium mb-1">Skills:</p>
                                            <ul className="space-y-1">
                                                {Object.entries(girl.skills).map(([skill, level]) => (
                                                    <li key={skill} className="capitalize">
                                                        {skill.replace('_', ' ')}: {level}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}

                                    <div className="flex gap-2 mt-2">
                                        <button
                                            className="bg-blue-600 text-white px-3 py-1 rounded"
                                            onClick={() => {
                                                setEditingId(girl.id);
                                                setEditGirl({ ...girl });
                                            }}
                                        >
                                            Edit
                                        </button>
                                        <button
                                            className="bg-red-600 text-white px-3 py-1 rounded"
                                            onClick={() => handleDeleteGirl(girl.id)}
                                        >
                                            Delete
                                        </button>
                                        <button
                                            className="bg-yellow-500 text-white px-3 py-1 rounded"
                                            onClick={() => {
                                                setShowSkillEditorFor(girl.id);
                                                setSkillsData(girl.skills || defaultSkills);
                                            }}
                                        >
                                            Assess Skills
                                        </button>
                                    </div>
                                </div>
                            )}

                            {girl.documents && girl.documents.length > 0 && (
                                <div className="mt-3 border-t pt-3">
                                    <h4 className="font-semibold mb-2">Documents</h4>
                                    <ul className="text-sm text-blue-700 space-y-1">
                                        {girl.documents.map((doc, idx) => (
                                            <li key={idx}>
                                                📄 <a href={doc.url} target="_blank" rel="noopener noreferrer">{doc.name}</a>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            {/* {uploadingFor === girl.id ? (
                                <div className="mt-2 space-y-2">
                                    <input
                                        type="file"
                                        onChange={(e) => setSelectedFile(e.target.files[0])}
                                        className="block w-full text-sm"
                                    />
                                    <button
                                        className="bg-green-600 text-white px-3 py-1 rounded"
                                        onClick={() => handleFileUpload(girl.id)}
                                    >
                                        Upload File
                                    </button>
                                    <button
                                        className="bg-gray-400 text-white px-3 py-1 rounded"
                                        onClick={() => {
                                            setUploadingFor(null);
                                            setSelectedFile(null);
                                        }}
                                    >
                                        Cancel
                                    </button>
                                </div>
                            ) : (
                                <button
                                    className="bg-purple-600 text-white px-3 py-1 rounded"
                                    onClick={() => setUploadingFor(girl.id)}
                                >
                                    Upload Document
                                </button>
                            )} */}

                            {showSkillEditorFor === girl.id && (
                                <div className="mt-2 p-4 border rounded bg-gray-50 space-y-3">
                                    <h4 className="text-md font-semibold">Skill Assessment</h4>
                                    {Object.keys(defaultSkills).map(skill => (
                                        <div key={skill} className="grid grid-cols-12 gap-2 items-center">
                                            <label className="col-span-4 capitalize text-sm">
                                                {skill.replace('_', ' ')}
                                            </label>
                                            <input
                                                type="range"
                                                min={1}
                                                max={5}
                                                value={skillsData[skill]}
                                                onChange={(e) =>
                                                    setSkillsData(prev => ({ ...prev, [skill]: parseInt(e.target.value) }))
                                                }
                                                className="col-span-6"
                                            />
                                            <span className="col-span-2 text-center font-medium">
                                                {skillsData[skill]}
                                            </span>
                                        </div>
                                    ))}
                                    <div className="flex gap-2 mt-3">
                                        <button
                                            className="bg-green-600 text-white px-4 py-1 rounded"
                                            onClick={() => handleSaveSkills(girl.id)}
                                        >
                                            Save Skills
                                        </button>
                                        <button
                                            className="bg-gray-400 text-white px-4 py-1 rounded"
                                            onClick={() => {
                                                setShowSkillEditorFor(null);
                                                setSkillsData(defaultSkills);
                                            }}
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </div>
                            )}

                            {/* Training Section */}
                            {expandedTrainingsFor === girl.id ? (
    <div className="mt-3 border-t pt-3 space-y-2">
        <h4 className="font-semibold">Trainings</h4>

        {Array.isArray(girl.trainings) && girl.trainings.length > 0 ? (
            <ul className="text-sm text-gray-700 space-y-1">
                {girl.trainings.map((t, index) => (
                    <li key={index} className="flex justify-between items-center">
                        <div>
                            📘 <strong>{t.name}</strong> - <em>{t.status}</em> {t.date && `(${t.date})`}
                        </div>
                        <div className="flex gap-1">
                            <button 
                                onClick={() => setEditingTraining({
                                    girlId: girl.id,
                                    index,
                                    data: {...t}
                                })}
                                className="text-xs bg-blue-100 text-blue-600 px-1 rounded"
                            >
                                Edit
                            </button>
                            <button 
                                onClick={() => handleDeleteTraining(girl.id, index)}
                                className="text-xs bg-red-100 text-red-600 px-1 rounded"
                            >
                                Delete
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        ) : (
            <p className="text-sm text-gray-500">No trainings available.</p>
        )}

        <button
            className="bg-indigo-600 text-white px-2 py-1 text-sm rounded"
            onClick={() => setTrainingPopupFor(girl)}
        >
            Add Training
        </button>

        <button
            className="text-sm text-blue-600 mt-2"
            onClick={() => setExpandedTrainingsFor(null)}
        >
            🔼 Hide Trainings
        </button>
    </div>
) : (
    <button
        className="text-sm text-blue-600 mt-2"
        onClick={() => setExpandedTrainingsFor(girl.id)}
    >
        🔽 View Trainings
    </button>
)}
                        </div>
                    ))}

                {showAddGirl && (
                    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
                        <div className="bg-white p-6 rounded-lg w-full max-w-lg relative">
                            <button
                                className="absolute top-2 right-2 text-gray-500 hover:text-black"
                                onClick={() => setShowAddGirl(false)}
                            >
                                ❌
                            </button>

                            <h3 className="text-xl font-bold mb-4">Add New Girl</h3>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                {['name', 'age', 'contact', 'location', 'program', 'employment_status'].map(field => (
                                    <input
                                        key={field}
                                        type={field === 'age' ? 'number' : 'text'}
                                        placeholder={field.replace('_', ' ')}
                                        value={newGirl[field]}
                                        onChange={(e) => setNewGirl(prev => ({ ...prev, [field]: e.target.value }))}
                                        className="border border-gray-300 p-2 rounded-lg w-full"
                                    />
                                ))}
                            </div>

                            <div className="flex justify-end">
                                <button
                                    onClick={handleAddGirl}
                                    className="bg-blue-600 text-white px-4 py-2 rounded mr-2"
                                >
                                    Save
                                </button>
                                <button
                                    onClick={() => setShowAddGirl(false)}
                                    className="bg-gray-400 text-white px-4 py-2 rounded"
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {trainingPopupFor && (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-40">
        <div className="bg-white p-6 rounded-lg w-full max-w-md space-y-4 shadow-xl">
            <h2 className="text-xl font-semibold">
                Adding Training for {trainingPopupFor.name}
            </h2>

            <div>
                <label className="block text-sm font-medium text-gray-700">Training Name *</label>
                <input
                    type="text"
                    placeholder="Required"
                    value={trainingInput.name}
                    onChange={(e) =>
                        setTrainingInput((prev) => ({ ...prev, name: e.target.value }))
                    }
                    className="w-full border p-2 rounded mt-1"
                    required
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700">Status</label>
                <select
                    value={trainingInput.status}
                    onChange={(e) =>
                        setTrainingInput((prev) => ({ ...prev, status: e.target.value }))
                    }
                    className="w-full border p-2 rounded mt-1"
                >
                    <option value="Not Started">Not Started</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                </select>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700">Completion Date (Optional)</label>
                <input
                    type="date"
                    value={trainingInput.date}
                    onChange={(e) =>
                        setTrainingInput((prev) => ({ ...prev, date: e.target.value }))
                    }
                    className="w-full border p-2 rounded mt-1"
                />
            </div>

            <div className="flex justify-end gap-2">
                <button
                    className="bg-gray-400 text-white px-4 py-1 rounded"
                    onClick={() => {
                        setTrainingPopupFor(null);
                        setTrainingInput({ name: '', status: 'Not Started', date: '' });
                    }}
                >
                    Cancel
                </button>
                <button
                    className="bg-indigo-600 text-white px-4 py-1 rounded"
                    onClick={() => {
                        handleAddTraining(trainingPopupFor.id);
                        setTrainingPopupFor(null);
                    }}
                >
                    Add Training
                </button>
            </div>
        </div>
    </div>
)}
                {editingTraining && (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
        <div className="bg-white p-4 rounded-lg w-full max-w-md space-y-3 shadow">
            <h3 className="text-lg font-semibold">Edit Training</h3>

            <div>
                <label className="block text-sm font-medium text-gray-700">Training Name *</label>
                <input
                    type="text"
                    className="w-full border p-2 rounded mt-1"
                    value={editingTraining.data.name}
                    onChange={(e) =>
                        setEditingTraining(prev => ({
                            ...prev,
                            data: { ...prev.data, name: e.target.value }
                        }))
                    }
                    required
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700">Status</label>
                <select
                    className="w-full border p-2 rounded mt-1"
                    value={editingTraining.data.status}
                    onChange={(e) =>
                        setEditingTraining(prev => ({
                            ...prev,
                            data: { ...prev.data, status: e.target.value }
                        }))
                    }
                >
                    <option value="Not Started">Not Started</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                </select>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700">Completion Date (Optional)</label>
                <input
                    type="date"
                    className="w-full border p-2 rounded mt-1"
                    value={editingTraining.data.date}
                    onChange={(e) =>
                        setEditingTraining(prev => ({
                            ...prev,
                            data: { ...prev.data, date: e.target.value }
                        }))
                    }
                />
            </div>

            <div className="flex justify-end gap-2">
                <button
                    className="bg-gray-400 text-white px-3 py-1 rounded"
                    onClick={() => setEditingTraining(null)}
                >
                    Cancel
                </button>
                <button
                    className="bg-green-600 text-white px-3 py-1 rounded"
                    onClick={() => handleUpdateTraining()}
                >
                    Save
                </button>
            </div>
        </div>
    </div>
)}

                {showCsvUpload && (
                    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-30 flex items-center justify-center z-50">
                        <div className="bg-white p-6 rounded-lg w-[400px]">
                            <h3 className="text-lg font-semibold mb-4">Upload CSV Dataset</h3>
                            <input
                                type="file"
                                accept=".csv"
                                onChange={(e) => {
                                    const file = e.target.files[0];
                                    if (!file) return;

                                    Papa.parse(file, {
                                        header: true,
                                        skipEmptyLines: true,
                                        complete: function (results) {
                                            setCsvData(results.data);
                                        },
                                    });
                                }}
                            />
                            {csvData.length > 0 && (
                                <>
                                    <p className="mt-3 text-sm text-gray-600">Preview ({csvData.length} entries)</p>
                                    <ul className="max-h-32 overflow-auto text-sm text-gray-800 bg-gray-100 p-2 rounded mb-3">
                                        {csvData.slice(0, 5).map((item, idx) => (
                                            <li key={idx}>{item.name} - {item.age} - {item.contact}</li>
                                        ))}
                                    </ul>
                                    <button
                                        className="bg-green-600 text-white px-4 py-1 rounded"
                                        onClick={async () => {
                                            for (let girl of csvData) {
                                                await addDoc(collection(db, 'girls'), {
                                                    ...girl,
                                                    age: parseInt(girl.age),
                                                    createdAt: Timestamp.now()
                                                });
                                            }
                                            alert("Girls added successfully!");
                                            setCsvData([]);
                                            setShowCsvUpload(false);
                                            fetchGirls();
                                        }}
                                    >
                                        Upload to Database
                                    </button>
                                </>
                            )}
                            <button
                                className="mt-2 text-red-600 text-sm"
                                onClick={() => setShowCsvUpload(false)}
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                )}


            </div>
        </div>
    );
};

export default GirlProfiles;
