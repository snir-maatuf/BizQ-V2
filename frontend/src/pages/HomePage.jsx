import React, { useEffect, useMemo, useState } from 'react';
import { Box, Typography, Stack, Chip } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { TOPICS } from '../features/HomePage/data';
import SearchBar from '../features/HomePage/SearchBar';
import HowItWorks from '../features/HomePage/HowItWorks';
import OwnerCta from '../features/HomePage/OwnerCta';
import SiteFooter from '../features/HomePage/SiteFooter';
import { getLocationByIP } from '../api/Location';
import { getBusinessCount } from '../api/Businesses';
import { tokens } from '../theme';

const COUNT_THRESHOLD = 12;

export default function HomePage() {
  const navigate = useNavigate();

  const [city, setCity] = useState(() => localStorage.getItem('currentCity') || '');
  const [count, setCount] = useState(null);

  useEffect(() => {
    let alive = true;
    getLocationByIP().then((loc) => {
      if (alive && loc?.city) setCity(loc.city);
    });
    getBusinessCount().then((n) => {
      if (alive) setCount(n);
    });
    return () => {
      alive = false;
    };
  }, []);

  const trustLine = useMemo(() => {
    const where = city ? `near ${city}` : 'near you';
    if (typeof count === 'number' && count >= COUNT_THRESHOLD) {
      return `${count.toLocaleString()} businesses taking bookings ${where}`;
    }
    return `Businesses taking bookings ${where}`;
  }, [count, city]);

  const goCategory = (name) => {
    const qs = city ? `?city=${encodeURIComponent(city)}` : '';
    navigate(`/FilterBusiness/${encodeURIComponent(name)}${qs}`);
  };

  return (
    <Box sx={{ minHeight: '100%', display: 'flex', flexDirection: 'column' }}>
      {/* Hero - grows to fill and centres its own readable column */}
      <Box
        sx={{
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center',
          px: { xs: 2.5, sm: 3 },
          py: { xs: 3, md: 2 },
        }}
      >
        <Box sx={{ maxWidth: 640, width: '100%' }}>
            <Typography
              variant="h1"
              sx={{
                fontSize: { xs: '2.05rem', sm: '2.5rem', md: '2.8rem' },
                mb: 1.25,
                textWrap: 'balance',
              }}
            >
              Book a local business near you.
            </Typography>

            <Typography
              sx={{
                fontSize: { xs: 15, md: 15.5 },
                color: tokens.inkSoft,
                maxWidth: '44ch',
                mx: 'auto',
                mb: { xs: 2.25, md: 2.5 },
              }}
            >
              Barbers, clinics, studios and tutors - find one nearby and grab a time.
              No phone calls, no account needed.
            </Typography>

            <SearchBar defaultCity={city} />

            <Stack
              direction="row"
              spacing={1}
              useFlexGap
              flexWrap="wrap"
              justifyContent="center"
              sx={{ mt: 2 }}
            >
              {TOPICS.map((t) => (
                <Chip
                  key={t.id}
                  label={t.name}
                  onClick={() => goCategory(t.name)}
                  clickable
                  variant="outlined"
                  sx={{
                    borderColor: tokens.line,
                    color: tokens.inkSoft,
                    fontSize: 13,
                    fontWeight: 500,
                    px: 0.5,
                    transition: 'background-color .18s ease, border-color .18s ease, transform .18s ease',
                    '&:hover': {
                      backgroundColor: tokens.greenSoft,
                      borderColor: '#cfe4dd',
                      transform: 'translateY(-1px)',
                    },
                  }}
                />
              ))}
            </Stack>

          <Typography sx={{ mt: 1.5, fontSize: 12.5, color: tokens.faint }}>{trustLine}</Typography>
        </Box>
      </Box>

      {/* Band - anchored to the bottom of the first screen */}
      <Box sx={{ flexShrink: 0 }}>
        <Box sx={{ px: { xs: 2.5, sm: 4, md: 6 } }}>
          <Stack spacing={{ xs: 2, md: 2.25 }} sx={{ maxWidth: 1200, mx: 'auto', pb: 2 }}>
            <HowItWorks />
            <OwnerCta />
          </Stack>
        </Box>
        {/* Footer spans the full width, like the top nav */}
        <SiteFooter city={city} />
      </Box>
    </Box>
  );
}
