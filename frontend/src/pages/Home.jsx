import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setProperties } from '../redux/store';
import SearchBar from '../components/home/SearchBar';
import PropertyCard from '../components/property/PropertyCard';
import { apiGet } from '../utils/api';
import { motion } from 'framer-motion';

const CATEGORY_LABELS = {
  apartment: 'Apartment',
  villa: 'Villa',
  'independent-house': 'Independent House',
  plot: 'Plot',
  office: 'Office',
  shop: 'Shop',
};

export default function Home() {
  const dispatch = useDispatch();
  const properties = useSelector(state => state.properties.items);
  const filters = useSelector(state => state.properties.filters);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        setLoading(true);
        setError('');
        const data = await apiGet('/api/properties?limit=24&sort=featured');
        if (cancelled) return;
        const items = Array.isArray(data) ? data : data?.items;
        dispatch(setProperties(Array.isArray(items) ? items : []));
      } catch (e) {
        if (cancelled) return;
        setError(e?.message || 'Failed to load properties');
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    if (properties.length === 0) load();
    return () => {
      cancelled = true;
    };
  }, [dispatch, properties.length]);

  // Client side filtration matching search query and tabs selection
  const filteredList = useMemo(() => {
    return properties.filter(item => {
      const type = item?.category ? CATEGORY_LABELS[item.category] || item.category : item?.type;
      if (filters.type !== 'all' && type !== filters.type) return false;
      if (filters.search) {
        const searchLower = filters.search.toLowerCase();
        return (
          String(item?.title || '').toLowerCase().includes(searchLower) ||
          String(item?.location || '').toLowerCase().includes(searchLower)
        );
      }
      return true;
    });
  }, [properties, filters.type, filters.search]);

  return (
    <div>
      {/* Search Header Banner */}
      <motion.section
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        style={{
        backgroundImage: 'linear-gradient(135deg, #002855 0%, #001226 100%)',
        color: '#ffffff',
        padding: '60px 20px 80px',
        textAlign: 'center'
      }}>
        <h1 style={{ fontSize: '36px', fontWeight: '800', margin: '0 0 10px 0' }}>
          Find Your Right Property Here
        </h1>
        <p style={{ fontSize: '15px', color: '#cbd5e1', margin: '0 0 30px 0' }}>
          Explore India's premium RERA-verified real estate listings, plots, and offices.
        </p>
        <SearchBar />
      </motion.section>
      {/* Property Results Grid Feed */}
      <section style={{ maxWidth: '1200px', margin: '40px auto', padding: '0 20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <div>
            <h2 style={{ fontSize: '22px', margin: 0 }}>Recommended for You</h2>
            <p style={{ fontSize: '13px', color: '#64748b', margin: '4px 0 0 0' }}>Based on recent trends and certified listings</p>
          </div>
          <span style={{ fontSize: '13px', fontWeight: '600', color: '#0054a6' }}>
            Found {filteredList.length} matches
          </span>
        </div>
        {loading && (
          <div style={{ padding: '12px 0', color: '#475569', fontWeight: '600' }}>
            Loading properties…
          </div>
        )}
        {error && (
          <div style={{ padding: '12px 0', color: '#b91c1c', fontWeight: '600' }}>
            {error}
          </div>
        )}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.25 }}
          style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: '24px'
        }}>
          {filteredList.map(item => (
            <PropertyCard key={item._id || item.id} property={item} />
          ))}
        </motion.div>
      </section>
    </div>
  );
}
