import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { db } from '../firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';
import {
  Stack,
  Typography,
  CircularProgress,
  Card,
  CardContent,
  TextField,
  IconButton,
} from '@mui/material';
import FrostedBackground from '../features/Generics/FrostedBackground';
import SearchIcon from '@mui/icons-material/Search';
import { getLocationByIP } from '../api/Location';
import { isHebrew } from '../utils/common';

const FilteredBusinessesPage = () => {
  const { category } = useParams();
  const navigate = useNavigate();
  const [businesses, setBusinesses] = useState([]);
  const [filteredBusinesses, setFilteredBusinesses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [manualCity, setManualCity] = useState(''); // Manual city input
  const [userCityText, setUserCityText] = useState('');

  useEffect(() => {
    const fetchLocationAndBusinesses = async () => {
      setLoading(true);
      try {
        // Fetch user's city from IP and set it as the default manualCity
        const location = await getLocationByIP();
        let city = location?.city || '';
        city = city.toLowerCase();
        setManualCity(city);
        setUserCityText(`Showing results for your city: ${city}`);
        if (city == '') {
          setUserCityText(`Couldn't find your location`);
        }

        // Fetch businesses from Firestore
        const businessesRef = collection(db, 'businesses');
        let q;
        if (category && category !== 'all') {
          q = query(businessesRef, where('category', '==', category));
        } else {
          q = query(businessesRef);
        }

        const querySnapshot = await getDocs(q);
        const fetchedBusinesses = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setBusinesses(fetchedBusinesses);
      } catch (error) {
        console.error('Error fetching businesses or location:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchLocationAndBusinesses();
  }, [category]);

  useEffect(() => {
    if (businesses.length > 0) {
      filterBusinesses(searchTerm, manualCity);
    }
  }, [businesses, searchTerm, manualCity]);

  const handleSearch = (event) => {
    const value = event.target.value.toLowerCase();
    setSearchTerm(value);
    filterBusinesses(value, manualCity);
  };

  const handleLocationInput = (event) => {
    setUserCityText('');
    const value = event.target.value.toLowerCase();
    setManualCity(value);
    filterBusinesses(searchTerm, value);
  };

  const filterBusinesses = (search, city) => {
    const filtered = businesses.filter((business) => {
      const matchesSearch =
        business.businessName.toLowerCase().includes(search) ||
        (business.description &&
          business.description.toLowerCase().includes(search));
      const matchesCity =
        !city || // No manual city filter applied
        (business.city &&
          business.city.toLowerCase().includes(city));

      return matchesSearch && matchesCity;
    });

    setFilteredBusinesses(filtered);
  };

  const navigateToBusiness = (id) => {
    navigate(`/BusinessOwner/${id}`);
  };

  if (loading)
  return (
    <Stack
      alignItems="center"
      justifyContent="center"
      sx={{ height: '80vh' }}
    >
      <FrostedBackground>
        <Stack
          alignItems="center"
          justifyContent="center"
          sx={{ height: '100%' }}
        >
          <CircularProgress />
        </Stack>
      </FrostedBackground>
    </Stack>
  );

  return (
    <Stack alignItems="center" sx={{ height: '80vh' }}>
      <FrostedBackground>
        <Stack spacing={3}>
          {/* Show user city */}
          {category !== 'all' && (
            <Typography
              variant="h6"
              align="center"
              sx={{ marginBottom: '10px' }}
            >
              {userCityText}
            </Typography>
          )}

          {/* Search and Location Input */}
          <Stack
            direction="row"
            alignItems="center"
            spacing={2}
            sx={{
              backgroundColor: 'white',
              borderRadius: '20px',
              padding: '10px',
              boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
              marginBottom: '20px',
            }}
          >
            {/* Search Bar */}
            <TextField
              fullWidth
              placeholder="Search by name or description"
              value={searchTerm}
              onChange={handleSearch}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: '20px',
                },
              }}
            />

            {/* Manual City Input */}
            <TextField
              fullWidth
              placeholder="Enter a city"
              value={manualCity}
              onChange={handleLocationInput}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: '20px',
                },
              }}
            />
            <IconButton>
              <SearchIcon />
            </IconButton>
          </Stack>

          {/* Filtered Businesses */}
          <Stack
            sx={{
              width: '1000px',
              overflowY: 'auto',
              height: '50vh',
              paddingBottom: '5px',
            }}
          >
            <Stack spacing={3}>
              {filteredBusinesses.length > 0 ? (
                filteredBusinesses.map((business) => (
                  <Card
                    key={business.id}
                    onClick={() => navigateToBusiness(business.id)}
                    sx={{
                      borderRadius: '15px',
                      boxShadow: '0 2px 6px rgba(0, 0, 0, 0.1)',
                      cursor: 'pointer',
                      '&:hover': {
                        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                      },
                    }}
                  >
                    <CardContent>
                      <Typography
                        variant="h6"
                        sx={{
                          direction: isHebrew(business?.businessName)
                            ? 'rtl'
                            : 'ltr',
                        }}
                      >
                        {business.businessName}
                      </Typography>
                      <Typography
                        sx={{
                          direction: isHebrew(business?.description)
                            ? 'rtl'
                            : 'ltr',
                          display: '-webkit-box',
                          WebkitBoxOrient: 'vertical',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          WebkitLineClamp: 3,
                        }}
                      >
                        {business.description || 'No description available.'}
                      </Typography>
                      <Typography>{`City: ${
                        business.city || 'N/A'
                      }`}</Typography>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <Typography variant="body1" align="center">
                  No matching businesses found.
                </Typography>
              )}
            </Stack>
          </Stack>
        </Stack>
      </FrostedBackground>
    </Stack>
  );
};

export default FilteredBusinessesPage;
