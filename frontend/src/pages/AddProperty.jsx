import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { setProperties } from '../redux/store';
export default function AddProperty() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const properties = useSelector(state => state.properties.items);
  const [formData, setFormData] = useState({
    title: '',
    location: '',
    price: '',
    bhk: '3',
    area: '',
    type: 'Apartment'
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    
    const newProp = {
      id: properties.length + 1,
      title: formData.title,
      location: formData.location,
      price: parseInt(formData.price),
      bhk: parseInt(formData.bhk),
      area: parseInt(formData.area),
      type: formData.type,
      verified: true,
      image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=600&q=80"
    };
    dispatch(setProperties([newProp, ...properties]));
    alert("Property posted successfully!");
    navigate('/');
  };
  return (
    <div style={{ maxWidth: '600px', margin: '40px auto', padding: '24px', backgroundColor: '#ffffff', borderRadius: '12px', border: '1px solid #cbd5e1', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
      <h2 style={{ margin: '0 0 8px 0' }}>Post Your Property</h2>
      <p style={{ color: '#64748b', fontSize: '13px', margin: '0 0 24px 0' }}>Sell or rent your residential flat to buyers instantly.</p>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '16px' }}>
          <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', marginBottom: '6px' }}>Property Title *</label>
          <input
            type="text"
            required
            placeholder="e.g. Spacious 3 BHK Duplex Flat in Kompally"
            value={formData.title}
            onChange={e => setFormData({ ...formData, title: e.target.value })}
            style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1' }}
          />
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', marginBottom: '6px' }}>Property Type *</label>
            <select
              value={formData.type}
              onChange={e => setFormData({ ...formData, type: e.target.value })}
              style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1', cursor: 'pointer' }}
            >
              <option value="Apartment">Apartment</option>
              <option value="Villa">Villa</option>
              <option value="Plot">Plot / Land</option>
            </select>
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', marginBottom: '6px' }}>BHK Configuration *</label>
            <select
              value={formData.bhk}
              onChange={e => setFormData({ ...formData, bhk: e.target.value })}
              style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1', cursor: 'pointer' }}
            >
              <option value="1">1 BHK</option>
              <option value="2">2 BHK</option>
              <option value="3">3 BHK</option>
              <option value="4">4+ BHK</option>
            </select>
          </div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', marginBottom: '6px' }}>Total Price (INR) *</label>
            <input
              type="number"
              required
              placeholder="e.g. 7500000"
              value={formData.price}
              onChange={e => setFormData({ ...formData, price: e.target.value })}
              style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1' }}
            />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', marginBottom: '6px' }}>Super Area (Sq.Ft) *</label>
            <input
              type="number"
              required
              placeholder="e.g. 1540"
              value={formData.area}
              onChange={e => setFormData({ ...formData, area: e.target.value })}
              style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1' }}
            />
          </div>
        </div>
        <div style={{ marginBottom: '24px' }}>
          <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', marginBottom: '6px' }}>Locality & City *</label>
          <input
            type="text"
            required
            placeholder="e.g. Kompally, Hyderabad"
            value={formData.location}
            onChange={e => setFormData({ ...formData, location: e.target.value })}
            style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1' }}
          />
        </div>
        <button type="submit" style={{
          width: '100%',
          backgroundColor: '#0054a6',
          color: '#ffffff',
          border: 'none',
          padding: '14px',
          borderRadius: '6px',
          fontWeight: '700',
          fontSize: '15px',
          cursor: 'pointer'
        }}>Submit Listing Details</button>
      </form>
    </div>
  );
}
