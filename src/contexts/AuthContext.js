import React, { useContext, useState, useEffect } from 'react';
import { auth, db  } from '../firebase/config';
import { onAuthStateChanged, signInWithEmailAndPassword, signOut, createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc, Timestamp } from 'firebase/firestore';

const AuthContext = React.createContext();

export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);

    function login(email, password) {
        return signInWithEmailAndPassword(auth, email, password);
    }

    function logout() {
        return signOut(auth);
    }

    async function signup(email, password, companyName) {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        const companyDocRef = doc(db, 'companies', user.uid);
        await setDoc(companyDocRef, {
            companyName: companyName,
            adminEmail: user.email,
            createdAt: Timestamp.now(),
            plan: 'basic' 
        });

        const projectDocRef = doc(db, 'companies', user.uid, 'projects', 'projectABC');
        await setDoc(projectDocRef, {
            name: 'My First Project',
            objective: 'Define the main goal of this project.',
            timeline: 'e.g., Q3 2025 - Q4 2025',
            intendedOutcome: 'Describe what success looks like.'
        });
        
        return userCredential;
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, user => {
            setCurrentUser(user);
            setLoading(false);
        });
        return unsubscribe;
    }, []);

    const value = {
        currentUser,
        login,
        logout,
        signup 
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
}