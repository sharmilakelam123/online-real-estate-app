import React from 'react';
export default function Footer() {
  return (
    <footer style={{
      backgroundColor: '#0b1523',
      color: '#94a3b8',
      padding: '40px 20px 20px',
      borderTop: '5px solid #0054a6',
      marginTop: '60px'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        display: 'flex',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '30px',
        marginBottom: '30px'
      }}>
        <div>
          <h3 style={{ color: '#ffffff', margin: '0 0 10px 0' }}>RealFinder</h3>
          <p style={{ fontSize: '13px', maxWidth: '300px', lineHeight: '1.6' }}>
            India's professional property finder. Search verified residential flats, luxury villas, and plots.
          </p>
        </div>
        <div>
          <h4 style={{ color: '#ffffff', margin: '0 0 12px 0' }}>Quick Links</h4>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, fontSize: '13px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <li>About Us</li>
            <li>Post Property</li>
            <li>RERA Rules</li>
            <li>Contact Support</li>
          </ul>
        </div>
      </div>
      <div style={{
        borderTop: '1px solid rgba(255,255,255,0.05)',
        paddingTop: '20px',
        textAlign: 'center',
        fontSize: '12px'
      }}>
        &copy; 2026 RealFinder Clone. All rights reserved.
      </div>
    </footer>
  );
}
