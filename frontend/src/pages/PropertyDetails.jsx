import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { apiPost } from '../utils/api';
import { saveRecentlyViewed, saveContactedLead } from '../utils/activity';
export default function PropertyDetails() {
  const { id } = useParams();
  const properties = useSelector(state => state.properties.items);
  const property = properties.find(p => String(p?._id || p?.id) === String(id));
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('I am interested. Please call me back.');
  const [preferredVisitAt, setPreferredVisitAt] = useState('');
  const [submitting, setSubmitting] = useState(false);
  if (!property) {
    return (
      <div style={{ textAlign: 'center', padding: '60px 20px' }}>
        <h2>Property Not Found</h2>
        <p>The requested listing could not be found or has been removed.</p>
        <Link to="/" style={{ color: '#0054a6', fontWeight: '600' }}>Return Home</Link>
      </div>
    );
  }

  useEffect(() => {
    saveRecentlyViewed(property._id || property.id);
  }, [property._id, property.id]);
  return (
    <div style={{ maxWidth: '1200px', margin: '40px auto', padding: '0 20px' }}>
      <Link to="/" style={{ color: '#0054a6', textDecoration: 'none', fontWeight: '600' }}>← Back to Listings</Link>
      
      <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '32px', marginTop: '20px' }}>
        {/* Left Side Details */}
        <div>
          <div style={{ height: '400px', borderRadius: '12px', overflow: 'hidden', marginBottom: '24px' }}>
            <img src={property.image} alt={property.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
          
          <h1 style={{ fontSize: '28px', fontWeight: '800', margin: '0 0 10px 0' }}>{property.title}</h1>
          <p style={{ color: '#64748b', fontSize: '15px', margin: '0 0 20px 0' }}>📍 {property.location}</p>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '16px',
            backgroundColor: '#f8fafc',
            padding: '20px',
            borderRadius: '8px',
            marginBottom: '24px',
            border: '1px solid #e2e8f0'
          }}>
            <div>
              <span style={{ fontSize: '11px', color: '#64748b', textTransform: 'uppercase', fontWeight: '600' }}>Price</span>
              <h3 style={{ margin: '4px 0 0 0', color: '#0054a6' }}>
                ₹{(Number(property.price || 0) / 10000000).toFixed(2)} Cr
              </h3>
            </div>
            <div>
              <span style={{ fontSize: '11px', color: '#64748b', textTransform: 'uppercase', fontWeight: '600' }}>BHK</span>
              <h3 style={{ margin: '4px 0 0 0' }}>{property.bedrooms ?? property.bhk ?? '-'} BHK</h3>
            </div>
            <div>
              <span style={{ fontSize: '11px', color: '#64748b', textTransform: 'uppercase', fontWeight: '600' }}>Area</span>
              <h3 style={{ margin: '4px 0 0 0' }}>{property.area ?? '-'}</h3>
            </div>
          </div>
          <div>
            <h3>Overview</h3>
            <p style={{ color: '#475569', lineHeight: '1.7' }}>
              Premium real estate opportunity situated in the heart of {property.location.split(',')[0]}. Designed with state of the art layouts, standard air ventilation, natural lighting, and modern building standards. Immediate registration and ready to occupy.
            </p>
          </div>
        </div>
        {/* Right Side Agent Sidebar Form */}
        <div>
          <div style={{
            backgroundColor: '#ffffff',
            border: '1px solid #cbd5e1',
            borderRadius: '12px',
            padding: '24px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
            position: 'sticky',
            top: '100px'
          }}>
            <h3 style={{ margin: '0 0 6px 0' }}>Contact Builder / Owner</h3>
            <p style={{ fontSize: '12px', color: '#64748b', margin: '0 0 20px 0' }}>Instant site visits, RERA registrations.</p>
            
            <form
              onSubmit={async (e) => {
                e.preventDefault();
                try {
                  setSubmitting(true);
                  const lead = await apiPost('/api/leads', {
                    propertyId: property._id || property.id,
                    name,
                    phone,
                    message,
                    preferredVisitAt: preferredVisitAt || null,
                  });
                  saveContactedLead(lead);
                  alert("Enquiry registered! Check Dashboard → Enquiries / My Activity → Contacted.");
                  setName('');
                  setPhone('');
                  setPreferredVisitAt('');
                } catch (err) {
                  alert(err?.message || "Failed to submit enquiry");
                } finally {
                  setSubmitting(false);
                }
              }}
            >
              <input
                type="text"
                placeholder="Name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                style={{ width: '100%', padding: '10px', marginBottom: '12px', borderRadius: '6px', border: '1px solid #cbd5e1' }}
              />
              <input
                type="tel"
                placeholder="Mobile Phone"
                required
                pattern="[0-9]{10}"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                style={{ width: '100%', padding: '10px', marginBottom: '12px', borderRadius: '6px', border: '1px solid #cbd5e1' }}
              />
              <input
                type="datetime-local"
                value={preferredVisitAt}
                onChange={(e) => setPreferredVisitAt(e.target.value)}
                style={{ width: '100%', padding: '10px', marginBottom: '12px', borderRadius: '6px', border: '1px solid #cbd5e1' }}
              />
              <textarea
                placeholder="Message"
                rows="3"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                style={{ width: '100%', padding: '10px', marginBottom: '16px', borderRadius: '6px', border: '1px solid #cbd5e1' }}
              ></textarea>
              <button type="submit" style={{
                width: '100%',
                backgroundColor: '#ff8f00',
                color: '#ffffff',
                border: 'none',
                padding: '12px',
                borderRadius: '6px',
                fontWeight: '700',
                fontSize: '14px',
                cursor: 'pointer'
              }} disabled={submitting}>{submitting ? 'Submitting…' : 'Request Call Back'}</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
