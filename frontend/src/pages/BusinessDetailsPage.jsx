import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { db } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';
import { Stack, Typography, CircularProgress } from '@mui/material';

const BusinessDetailsPage = () => {
  const { userId } = useParams();
  const [business, setBusiness] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBusinessDetails = async () => {
      try {
        const docRef = doc(db, 'businesses', userId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setBusiness(docSnap.data());
        } else {
          console.log('No such business!');
        }
      } catch (error) {
        console.error('Error fetching business details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBusinessDetails();
  }, [userId]);

  if (loading) return <CircularProgress sx={{ margin: 'auto' }} />;

  if (!business) return <Typography>No business details found.</Typography>;

  return (
    <Stack spacing={2} sx={{ padding: '20px' }}>
      <Typography variant="h4">{business.businessName}</Typography>
      <Typography>{business.description || 'No description available.'}</Typography>
      <Typography>{`City: ${business.address?.city || 'N/A'}`}</Typography>
      <Typography>{`Phone: ${business.phone || 'N/A'}`}</Typography>
      <Typography>{`Created At: ${
        business.createdAt?.toDate().toLocaleString() || 'N/A'
      }`}</Typography>
    </Stack>
  );
};

export default BusinessDetailsPage;
