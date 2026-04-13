"use client";

export default function StarRating({ ratingText }) {
  const starMap = {
    "Excellent": 5,
    "Good": 4,
    "Average": 3,
    "Poor": 1
  };

  const score = starMap[ratingText] || 0;

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
      {[1, 2, 3, 4, 5].map((star) => (
        <span key={star} style={{ 
          color: star <= score ? '#FFD700' : '#D1D5DB', 
          fontSize: '1.2rem' 
        }}>
          ★
        </span>
      ))}
      <span style={{ fontSize: '0.9rem', color: '#6B7280', marginLeft: '5px' }}>
        ({ratingText})
      </span>
    </div>
  );
}
