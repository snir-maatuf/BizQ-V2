import React, { useEffect, useState, useCallback } from 'react';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
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
import { tokens } from '../theme';

const FilteredBusinessesPage = () => {
  const { category } = useParams();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [businesses, setBusinesses] = useState([]);
  const [filteredBusinesses, setFilteredBusinesses] = useState([]);
  const [loading, setLoading] = useState(true);
  // pre-filled from the home search bar: /FilterBusiness/all?q=…&city=…
  const [searchTerm, setSearchTerm] = useState(() => searchParams.get('q') || '');

  // עיר של המשתמש (מזוהה אוטומטית)
  const [userCity, setUserCity] = useState('');
  const [cityFilterActive, setCityFilterActive] = useState(false);
  const [userCityText, setUserCityText] = useState('');
  const [manualCity, setManualCity] = useState(() => searchParams.get('city') || '');

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
    <Stack alignItems="center" sx={{ minHeight: '80vh', py: { xs: 3, md: 5 } }}>
      <FrostedBackground>
        <Stack spacing={2.5} sx={{ width: '100%', maxWidth: 760, flexGrow: 1 }}>
          {/* כפתור הפעלת סינון לעיר שלי */}
          {userCity && (
            <Stack direction="row" spacing={1.5} alignItems="center" justifyContent="center">
              <Typography sx={{ fontSize: 14, color: tokens.muted }}>
                {cityFilterActive
                  ? `מציג תוצאות לעיר שלך: ${userCity}`
                  : `ניתן לסנן לעיר שלך: ${userCity}`}
              </Typography>
              <IconButton
                onClick={handleCityFilterToggle}
                color={cityFilterActive ? 'primary' : 'default'}
                aria-label="סנן לפי העיר שלי"
                size="small"
              >
                <SearchIcon fontSize="small" />
              </IconButton>
            </Stack>
          )}

          {/* שדה חיפוש + שדה עיר ידני */}
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            alignItems="stretch"
            spacing={1}
            sx={{
              backgroundColor: tokens.paper,
              borderRadius: tokens.radius.lg,
              border: `1px solid ${tokens.line}`,
              padding: '8px',
            }}
          >
            <TextField
              fullWidth
              size="small"
              placeholder="חפש לפי שם או תיאור"
              value={searchTerm}
              onChange={handleSearch}
              sx={{ '& .MuiOutlinedInput-root': { bgcolor: tokens.fieldFill } }}
            />
            <TextField
              fullWidth
              size="small"
              placeholder="הכנס עיר"
              value={manualCity}
              onChange={handleLocationInput}
              disabled={cityFilterActive}
              sx={{ '& .MuiOutlinedInput-root': { bgcolor: tokens.fieldFill } }}
            />
          </Stack>

          {/* רשימת העסקים */}
          <Stack
            sx={{
              width: '100%',
              overflowY: 'auto',
              maxHeight: '52vh',
              pr: 0.5,
            }}
          >
            <Stack spacing={1.5}>
              {filteredBusinesses.length > 0 ? (
                filteredBusinesses.map((business) => (
                  <Card
                    key={business.id}
                    onClick={() => navigateToBusiness(business.id)}
                    elevation={0}
                    sx={{
                      borderRadius: tokens.radius.md,
                      border: `1px solid ${tokens.line}`,
                      cursor: 'pointer',
                      transition: 'border-color .16s ease, background-color .16s ease',
                      '&:hover': {
                        borderColor: '#cfe4dd',
                        backgroundColor: tokens.greenSoft,
                      },
                    }}
                  >
                    <CardContent sx={{ '&:last-child': { pb: 2 } }}>
                      <Typography
                        variant="h6"
                        sx={{
                          fontSize: 17,
                          direction: isHebrew(business?.businessName) ? 'rtl' : 'ltr',
                        }}
                      >
                        {business.businessName}
                      </Typography>
                      <Typography
                        sx={{
                          mt: 0.5,
                          fontSize: 14,
                          color: tokens.muted,
                          direction: isHebrew(business?.description) ? 'rtl' : 'ltr',
                          display: '-webkit-box',
                          WebkitBoxOrient: 'vertical',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          WebkitLineClamp: 3,
                        }}
                      >
                        {business.description || 'No description available.'}
                      </Typography>
                      <Typography sx={{ mt: 0.75, fontSize: 12.5, color: tokens.faint }}>
                        {`City: ${business.city || 'N/A'}`}
                      </Typography>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <Typography sx={{ fontSize: 15, color: tokens.muted, textAlign: 'center', py: 4 }}>
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
