import React from 'react';

// Need to fix this: <img src={concert.concertResult} />

const ConcertItem = (concert) => {
  return (
    <li>
      <img src={concert.concertResult} />
    </li>
  )
};

export default ConcertItem;