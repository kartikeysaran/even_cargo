import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';
import { Plus, Eye, Lock, Unlock, Calendar, Users, TrendingUp } from 'lucide-react';
import {
  collection, addDoc, getDocs, doc, getDoc, query, orderBy
} from 'firebase/firestore';
import { db } from '../../firebase/config'; 

const EvenCargoDashboard = () => {
  const [data, setData] = useState([]);
  const [isAddMode, setIsAddMode] = useState(false);
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [secretPassword, setSecretPassword] = useState('');
  const [newEntry, setNewEntry] = useState({
    date: '',
    girls_mobilized: '',
    girls_trained: '',
    girls_employed: '',
    location: '',
    program: ''
  });

  useEffect(() => {
    const fetchPassword = async () => {
      try {
        const docRef = doc(db, 'settings', 'admin');
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setSecretPassword(docSnap.data().password);
        } else {
          console.warn('No password found in Firebase');
        }
      } catch (error) {
        console.error('Error fetching password:', error);
      }
    };

    fetchPassword();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const q = query(collection(db, 'dashboardData'), orderBy('date', 'asc'));
        const snapshot = await getDocs(q);
        const fetchedData = snapshot.docs.map(doc => doc.data());
        setData(fetchedData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handlePasswordSubmit = () => {
    if (password === secretPassword) {
      setIsAuthenticated(true);
      setPassword('');
    } else {
      alert('Incorrect password');
      setPassword('');
    }
  };

  const handleAddEntry = async () => {
    if (!newEntry.date || !newEntry.location || !newEntry.girls_mobilized || 
        !newEntry.girls_trained || !newEntry.girls_employed) {
      alert('Please fill all required fields');
      return;
    }

    const entry = {
      ...newEntry,
      girls_mobilized: parseInt(newEntry.girls_mobilized),
      girls_trained: parseInt(newEntry.girls_trained),
      girls_employed: parseInt(newEntry.girls_employed),
      timestamp: new Date().toISOString(),
      month: new Date(newEntry.date).toLocaleDateString('en-US', { month: 'short' })
    };

    try {
      await addDoc(collection(db, 'dashboardData'), entry);
      setData(prev => [...prev, entry]);
      setNewEntry({
        date: '', girls_mobilized: '', girls_trained: '', girls_employed: '',
        location: '', program: ''
      });
      setIsAuthenticated(false);
      setIsAddMode(false);
      alert('Data added successfully!');
    } catch (error) {
      console.error('Error adding entry:', error);
      alert('Failed to add data.');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handlePasswordSubmit();
    }
  };

  const totalStats = {
    total_mobilized: data.reduce((sum, item) => sum + (item.girls_mobilized || 0), 0),
    total_trained: data.reduce((sum, item) => sum + (item.girls_trained || 0), 0),
    total_employed: data.reduce((sum, item) => sum + (item.girls_employed || 0), 0)
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">EvenCargo Dashboard</h1>
              <p className="text-gray-600 mt-1">Empowering Women Through Skills & Employment</p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setIsAddMode(false)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                  !isAddMode ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                <Eye size={20} />
                View Dashboard
              </button>
              <button
                onClick={() => setIsAddMode(true)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                  isAddMode ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                <Plus size={20} />
                Add Data
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {!isAddMode ? (
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-xl shadow-sm border">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-blue-100 rounded-lg">
                    <Users className="text-blue-600" size={24} />
                  </div>
                  <div>
                    <p className="text-gray-600 text-sm">Total Mobilized</p>
                    <p className="text-2xl font-bold text-gray-900">{totalStats.total_mobilized}</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow-sm border">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-green-100 rounded-lg">
                    <TrendingUp className="text-green-600" size={24} />
                  </div>
                  <div>
                    <p className="text-gray-600 text-sm">Total Trained</p>
                    <p className="text-2xl font-bold text-gray-900">{totalStats.total_trained}</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow-sm border">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-purple-100 rounded-lg">
                    <Calendar className="text-purple-600" size={24} />
                  </div>
                  <div>
                    <p className="text-gray-600 text-sm">Total Employed</p>
                    <p className="text-2xl font-bold text-gray-900">{totalStats.total_employed}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-white p-6 rounded-xl shadow-sm border">
                <h3 className="text-lg font-semibold mb-4">Monthly Progress</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="girls_mobilized" fill="#3B82F6" name="Mobilized" />
                    <Bar dataKey="girls_trained" fill="#10B981" name="Trained" />
                    <Bar dataKey="girls_employed" fill="#8B5CF6" name="Employed" />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-sm border">
                <h3 className="text-lg font-semibold mb-4">Employment Trend</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="girls_employed" stroke="#8B5CF6" strokeWidth={3} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
              <div className="p-6 border-b">
                <h3 className="text-lg font-semibold">Recent Data</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Month</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Mobilized</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Trained</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Employed</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {data.map((item, index) => (
                      <tr key={index} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {item.month || item.date}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {item.girls_mobilized}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {item.girls_trained}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {item.girls_employed}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {item.location}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        ) : (
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-xl shadow-sm border p-8">
              <h2 className="text-2xl font-bold mb-6 text-center">Add New Data</h2>
              
              {!isAuthenticated ? (
                <div className="space-y-6">
                  <div className="text-center">
                    <Lock className="mx-auto text-gray-400 mb-4" size={48} />
                    <p className="text-gray-600 mb-6">Enter password to add data</p>
                  </div>
                  <div>
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter password"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      onKeyPress={handleKeyPress}
                    />
                  </div>
                  <button
                    onClick={handlePasswordSubmit}
                    className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                  >
                    Authenticate
                  </button>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="text-center mb-6">
                    <Unlock className="mx-auto text-green-500 mb-2" size={32} />
                    <p className="text-green-600 font-medium">Authenticated - Add your data</p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
                      <input
                        type="date"
                        value={newEntry.date}
                        onChange={(e) => setNewEntry({...newEntry, date: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                      <input
                        type="text"
                        value={newEntry.location}
                        onChange={(e) => setNewEntry({...newEntry, location: e.target.value})}
                        placeholder="e.g., Mumbai, Delhi"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Girls Mobilized</label>
                      <input
                        type="number"
                        value={newEntry.girls_mobilized}
                        onChange={(e) => setNewEntry({...newEntry, girls_mobilized: parseInt(e.target.value) || ''})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Girls Trained</label>
                      <input
                        type="number"
                        value={newEntry.girls_trained}
                        onChange={(e) => setNewEntry({...newEntry, girls_trained: parseInt(e.target.value) || ''})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Girls Employed</label>
                      <input
                        type="number"
                        value={newEntry.girls_employed}
                        onChange={(e) => setNewEntry({...newEntry, girls_employed: parseInt(e.target.value) || ''})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Program</label>
                    <input
                      type="text"
                      value={newEntry.program}
                      onChange={(e) => setNewEntry({...newEntry, program: e.target.value})}
                      placeholder="e.g., Skill Development, Employment Drive"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  
                  <div className="flex gap-4">
                    <button
                      onClick={() => setIsAuthenticated(false)}
                      className="flex-1 bg-gray-500 text-white py-3 px-4 rounded-lg hover:bg-gray-600 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleAddEntry}
                      className="flex-1 bg-green-600 text-white py-3 px-4 rounded-lg hover:bg-green-700 transition-colors"
                    >
                      Add Data
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EvenCargoDashboard;