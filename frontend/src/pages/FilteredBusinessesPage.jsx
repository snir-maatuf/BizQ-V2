import React, { useEffect, useState, useCallback } from 'react';
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

  // עיר של המשתמש (מזוהה אוטומטית)
  const [userCity, setUserCity] = useState('');
  const [cityFilterActive, setCityFilterActive] = useState(false);
  const [userCityText, setUserCityText] = useState('');
  const [manualCity, setManualCity] = useState('');

  useEffect(() => {
    const fetchLocationAndBusinesses = async () => {
      setLoading(true);

      // 1. זיהוי עיר (אם אפשר)
      try {
        const location = await getLocationByIP();
        let city = location?.city || '';
        city = city.toLowerCase();
        setUserCity(city);
        setUserCityText(city
          ? `זוהתה העיר שלך: ${city}`
          : `לא הצלחנו לזהות את מיקומך`);
      } catch (err) {
        setUserCity('');
        setUserCityText(`לא הצלחנו לזהות את מיקומך`);
      }

      // 2. שליפת עסקים
      try {
        const businessesRef = collection(db, 'businesses');
        let q;
        if (category && category !== 'all') {
          q = query(businessesRef, where('category', '==', category));
        } else {
          q = query(businessesRef);
        }

        const querySnapshot = await getDocs(q);
        const fetchedBusinesses = querySnapshot.docs.map((doc) => {
          const data = doc.data();
          return {
            id: doc.id,
            businessName: data.businessName ?? '',
            description: data.description ?? '',
            city: data.city ?? '',
            ...data,
          };
        });

        setBusinesses(fetchedBusinesses);
      } catch (error) {
        console.error('Error fetching businesses:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchLocationAndBusinesses();
    // eslint-disable-next-line
  }, [category]);

  // סינון עסקים - תמיד עובד על פי הסטייט הנוכחי
  const filterBusinesses = useCallback(() => {
    const search = (searchTerm || '').toLowerCase();
    const cityToFilter =
      cityFilterActive && userCity
        ? userCity.toLowerCase()
        : (manualCity || '').toLowerCase();

    const filtered = businesses.filter((business) => {
      const name = (business.businessName || '').toLowerCase();
      const desc = (business.description || '').toLowerCase();
      const cityName = (business.city || '').toLowerCase();

      const matchesSearch = name.includes(search) || desc.includes(search);
      const matchesCity = !cityToFilter || cityName.includes(cityToFilter);

      return matchesSearch && matchesCity;
    });

    setFilteredBusinesses(filtered);
  }, [businesses, searchTerm, manualCity, cityFilterActive, userCity]);

  // עדכון סינון בכל שינוי רלוונטי
  useEffect(() => {
    filterBusinesses();
  }, [filterBusinesses]);

  // פעולות משתמש
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleLocationInput = (event) => {
    setManualCity(event.target.value);
  };

  const handleCityFilterToggle = () => {
    setCityFilterActive((prev) => !prev);
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
          {/* כפתור הפעלת סינון לעיר שלי */}
          {userCity && (
            <Stack direction="row" spacing={2} alignItems="center" justifyContent="center">
              <Typography>
                {cityFilterActive
                  ? `מציג תוצאות לעיר שלך: ${userCity}`
                  : `ניתן לסנן לעיר שלך: ${userCity}`}
              </Typography>
              <IconButton
                onClick={handleCityFilterToggle}
                color={cityFilterActive ? "primary" : "default"}
                aria-label="סנן לפי העיר שלי"
              >
                <SearchIcon />
              </IconButton>
            </Stack>
          )}

          {/* שדה חיפוש + שדה עיר ידני */}
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
            <TextField
              fullWidth
              placeholder="חפש לפי שם או תיאור"
              value={searchTerm}
              onChange={handleSearch}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: '20px',
                },
              }}
            />

            {/* שדה עיר ידני */}
            <TextField
              fullWidth
              placeholder="הכנס עיר"
              value={manualCity}
              onChange={handleLocationInput}
              disabled={cityFilterActive} // מנטרלים אם הסינון לעיר שלי פעיל
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

          {/* רשימת העסקים */}
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
                  לא נמצאו עסקים מתאימים.
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
