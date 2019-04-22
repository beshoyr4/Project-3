import React from 'react';
import ConcertItem from "../ConcertItem"

const ConcertList = (props) => {
  const concertItems = props.gifs.map((concert) => {
    return <ConcertItem key={concert.id} concertResult={concert} />
  });

  return (
    <ul>{concertItems}</ul>
  );
};

export default ConcertList;