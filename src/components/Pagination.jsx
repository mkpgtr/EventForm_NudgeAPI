import axios from 'axios';
import React from 'react';

const Pagination = ({ events, setEvents, page, limit }) => {
  const totalPages = Math.ceil(events.length / limit);
  const pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1);


  const handleClick = (pageNumber) => {
    // Handle click logic here, such as updating the page state
    // or fetching the data for the selected page
    console.log(`Clicked on page ${pageNumber}`);

    getEvents(pageNumber)
  };

  const getEvents = async(pageNumber)=>{
    const event = await axios.get(`http://localhost:5000/api/v3/app/events?page=${pageNumber}&limit=2&type=latest`)
    console.log(event)
    setEvents(event.data)
  }

  return (
    <div>
      {pageNumbers.map((pageNumber) => (
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
