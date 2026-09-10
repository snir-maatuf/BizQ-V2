import React, { useState } from 'react';
import { Box, InputBase, Button, Divider } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate } from 'react-router-dom';
import { tokens } from '../../theme';

/**
 * Hero search. Service/business term + city → results page.
 * Wires to /FilterBusiness/all, which reads `q` and `city` from the query string.
 */
export default function SearchBar({ defaultCity = '' }) {
  const navigate = useNavigate();
  const [term, setTerm] = useState('');
  const [city, setCity] = useState(defaultCity);

  // keep city in sync once IP lookup resolves
  React.useEffect(() => {
    if (defaultCity && !city) setCity(defaultCity);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [defaultCity]);

  const submit = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (term.trim()) params.set('q', term.trim());
    if (city.trim()) params.set('city', city.trim());
    const qs = params.toString();
    navigate(`/FilterBusiness/all${qs ? `?${qs}` : ''}`);
  };

  const field = {
    flex: 1,
    minWidth: 0,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    px: { xs: 1.5, sm: 2.25 },
    py: { xs: 0.75, sm: 1 },
    '& .lbl': {
      fontSize: 10.5,
      letterSpacing: '0.09em',
      textTransform: 'uppercase',
      color: tokens.faint,
      fontWeight: 600,
    },
    '& .MuiInputBase-root': { fontSize: 15, color: tokens.ink, mt: '1px' },
    '& input::placeholder': { color: tokens.faint, opacity: 1 },
  };

  return (
    <Box
      component="form"
      onSubmit={submit}
      role="search"
      sx={{
        display: 'flex',
        alignItems: 'stretch',
        flexDirection: { xs: 'column', sm: 'row' },
        gap: { xs: 0.5, sm: 0.75 },
        width: '100%',
        maxWidth: 620,
        mx: 'auto',
        p: 1,
        borderRadius: { xs: tokens.radius.md, sm: tokens.radius.lg },
        backgroundColor: tokens.paper,
        border: `1px solid ${tokens.line}`,
        boxShadow: '0 10px 30px rgba(31,111,92,0.08)',
      }}
    >
      <Box sx={field}>
        <span className="lbl">Service or business</span>
        <InputBase
          value={term}
          onChange={(e) => setTerm(e.target.value)}
          placeholder="Haircut, dentist, personal trainer…"
          inputProps={{ 'aria-label': 'Service or business' }}
        />
      </Box>

      <Divider
        flexItem
        orientation="vertical"
        sx={{ display: { xs: 'none', sm: 'block' }, borderColor: tokens.line, my: 0.5 }}
      />
      <Divider sx={{ display: { xs: 'block', sm: 'none' }, borderColor: tokens.line, mx: 1.5 }} />

      <Box sx={{ ...field, flexGrow: { sm: 0.7 } }}>
        <span className="lbl">Where</span>
        <InputBase
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Your city"
          inputProps={{ 'aria-label': 'City' }}
        />
      </Box>

      <Button
        type="submit"
        variant="contained"
        color="primary"
        startIcon={<SearchIcon />}
        sx={{
          borderRadius: tokens.radius.md,
          px: 3,
          py: { xs: 1.1, sm: 0 },
          flexShrink: 0,
        }}
      >
        Search
      </Button>
    </Box>
  );
}
