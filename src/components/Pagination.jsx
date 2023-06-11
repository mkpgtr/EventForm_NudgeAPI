import axios from 'axios';
import React, { useEffect, useState } from 'react';

const Pagination = ({ events, currentEvents,setCurrentEvents, setEvents, page, limit }) => {
    const [totalPages, setTotalPages] = useState(0);
    const startIndex = (page - 1) * limit;
    const endIndex = Math.min(startIndex + limit, events.length);
    const visibleEvents = events.slice(startIndex, endIndex);
    const numVisibleEvents = visibleEvents.length;

  useEffect(() => {
    setTotalPages(Math.ceil(events.length / limit));
  }, [events, limit]);

  const handleClick = async (pageNumber) => {
    console.log(`Clicked on page ${pageNumber}`);
    try {
      const response = await axios.get(
        `http://localhost:5000/api/v3/app/events?page=${pageNumber}&limit=${limit}&type=latest`
      );
     setCurrentEvents(response.data)
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };

  const getCurrentEvents = async()=>{
   const response =  await axios.get(
        `http://localhost:5000/api/v3/app/events?page=${1}&limit=${limit}&type=latest`
      );

      setCurrentEvents(response.data)
  }
  useEffect(()=>{
    getCurrentEvents()
  },[])

  return (
    <div>
      {Array.from({ length: totalPages }, (_, index) => index + 1).map((pageNumber) => (
        <button
          key={pageNumber}
          onClick={() => handleClick(pageNumber)}
          disabled={pageNumber === page}
        >
          {pageNumber}
        </button>
      ))}
    </div>
  );
};

export default Pagination;
