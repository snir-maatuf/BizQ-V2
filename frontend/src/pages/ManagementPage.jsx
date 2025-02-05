import React, { useState, useEffect } from 'react';
import { db, auth } from '../firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { signOut } from 'firebase/auth';
import '../App.css';
import Background from '../features/Generics/Background';
import { useNavigate } from 'react-router-dom';

const ManagementPage = () => {
  const [businessData, setBusinessData] = useState(null);
  const [services, setServices] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBusinessData = async () => {
      const userId = auth.currentUser?.uid;
      if (userId) {
        const docRef = doc(db, 'businesses', userId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setBusinessData(docSnap.data());
          setServices(docSnap.data().services || '');
        }
      }
    };

    fetchBusinessData();
  }, []);

  const handleUpdateServices = async () => {
    const userId = auth.currentUser?.uid;
    if (userId) {
      const docRef = doc(db, 'businesses', userId);
      await updateDoc(docRef, { services });
      alert('Services updated successfully!');
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
    navigate('/login');
  };

  return (
    <>
      <Background />
      <div className="container">
        <h1>Business Management</h1>
        {businessData ? (
          <>
            <h2>Welcome, {businessData.name}</h2>
            <p>Category: {businessData.category}</p>
            <textarea
              value={services}
              onChange={(e) => setServices(e.target.value)}
              placeholder="Update your services"
            />
            <button onClick={handleUpdateServices}>Update Services</button>
            <button onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </>
  );
};

export default ManagementPage;