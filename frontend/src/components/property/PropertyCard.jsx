import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toggleFavorite } from '../../redux/store';
import { motion } from 'framer-motion';
export default function PropertyCard({ property }) {
  const dispatch = useDispatch();
  const favorites = useSelector(state => state.properties.favorites);
  const propertyId = String(property?._id || property?.id || '');
  const isShortlisted = favorites.includes(propertyId);
  const formatCurrency = (num) => {
    if (num >= 10000000) return "₹" + (num / 10000000).toFixed(2) + " Cr";
    if (num >= 100000) return "₹" + (num / 100000).toFixed(2) + " L";
    return "₹" + num.toLocaleString();
  };
  const categoryLabel = (() => {
    const cat = property?.category;
    if (!cat) return property?.type || '';
    if (cat === 'apartment') return 'Apartment';
    if (cat === 'villa') return 'Villa';
    if (cat === 'independent-house') return 'Independent House';
    if (cat === 'plot') return 'Plot';
    if (cat === 'office') return 'Office';
    if (cat === 'shop') return 'Shop';
    return String(cat);
  })();
  const bhk = property?.bedrooms ?? property?.bhk;
  const areaText = property?.area ?? (property?.area ? `${property.area}` : '');
  const advertiser = property?.advertiserType
    ? String(property.advertiserType).charAt(0).toUpperCase() + String(property.advertiserType).slice(1)
    : '';
  return (
    <motion.div
      whileHover={{ y: -4, boxShadow: '0 10px 24px rgba(0,0,0,0.10)' }}
      transition={{ duration: 0.2 }}
      style={{
      backgroundColor: '#ffffff',
      border: '1px solid #e2e8f0',
      borderRadius: '10px',
      overflow: 'hidden',
      boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
      display: 'flex',
      flexDirection: 'column',
      position: 'relative'
    }}
    >
      {/* Cover Image Wrapper */}
      <div style={{ position: 'relative', height: '180px' }}>
        <img
          src={property.image || 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=600&q=80'}
          alt={property.title}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
        {property.verified && (
          <span style={{
            position: 'absolute',
            top: '12px',
            left: '12px',
            backgroundColor: '#16a34a',
            color: '#ffffff',
            fontSize: '11px',
            fontWeight: '700',
            padding: '3px 8px',
            borderRadius: '4px'
          }}>✓ Verified</span>
        )}
        
        {/* Shortlist Heart Button */}
        <button
          onClick={() => dispatch(toggleFavorite(propertyId))}
          style={{
            position: 'absolute',
            top: '12px',
            right: '12px',
            backgroundColor: '#ffffff',
            border: 'none',
            borderRadius: '50%',
            width: '32px',
            height: '32px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
          }}
        >
          <span style={{ color: isShortlisted ? '#f43f5e' : '#cbd5e1', fontSize: '18px' }}>
            {isShortlisted ? '♥' : '♡'}
          </span>
        </button>
      </div>
      {/* Property Details Content */}
      <div style={{ padding: '16px', flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        <h3 style={{ fontSize: '18px', fontWeight: '700', color: '#0054a6', margin: '0 0 4px 0' }}>
          {formatCurrency(Number(property.price || 0))}
        </h3>
        <h4 style={{
          fontSize: '14px',
          fontWeight: '600',
          margin: '0 0 8px 0',
          lineHeight: '1.4',
          height: '40px',
          overflow: 'hidden'
        }}>
          {property.title}
        </h4>
        <p style={{ fontSize: '12px', color: '#64748b', margin: '0 0 14px 0' }}>
          📍 {property.location}
        </p>
        {advertiser ? (
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginBottom: '10px' }}>
            <span style={{ fontSize: '11px', fontWeight: 900, color: '#0f172a', background: '#f1f5f9', border: '1px solid #e2e8f0', padding: '3px 8px', borderRadius: '999px' }}>
              Posted by {advertiser}
            </span>
            {property.featured ? (
              <span style={{ fontSize: '11px', fontWeight: 900, color: '#fff', background: '#0f172a', padding: '3px 8px', borderRadius: '999px' }}>
                Featured
              </span>
            ) : null}
          </div>
        ) : null}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          borderTop: '1px solid #f1f5f9',
          paddingTop: '10px',
          marginTop: 'auto',
          fontSize: '12px',
          color: '#475569'
        }}>
          <span><strong>BHK:</strong> {bhk || '-'}</span>
          <span><strong>Area:</strong> {areaText || '-'}</span>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginTop: '14px' }}>
          <Link to={`/property/${propertyId}`} style={{
            textDecoration: 'none',
            textAlign: 'center',
            backgroundColor: '#f1f5f9',
            color: '#1e293b',
            padding: '8px',
            borderRadius: '6px',
            fontSize: '13px',
            fontWeight: '600'
          }}>Details</Link>
          <button style={{
            backgroundColor: '#0054a6',
            color: '#ffffff',
            border: 'none',
            padding: '8px',
            borderRadius: '6px',
            fontSize: '13px',
            fontWeight: '600',
            cursor: 'pointer'
          }}>Contact</button>
        </div>
        {categoryLabel ? (
          <div style={{ marginTop: '10px', fontSize: '12px', color: '#64748b' }}>
            <strong>Type:</strong> {categoryLabel}
          </div>
        ) : null}
      </div>
    </motion.div>
  );
}
