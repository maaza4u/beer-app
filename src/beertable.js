import React, { useState, useEffect,useCallback } from 'react';
import { Table, Pagination } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import moment from 'moment';
import { setBeers } from './redux/actions';
import './beertable.css';

const BeerTable = () => {
  const dispatch = useDispatch();
  const beers = useSelector((state) => state.beers);

  const [currentPage, setCurrentPage] = useState(1);
  const [brewedBefore, setBrewedBefore] = useState('');
  const [brewedAfter, setBrewedAfter] = useState('');

//   const formattedDate = moment('2023-10-18').format('MMMM Do YYYY');
// console.log(formattedDate);  // Output: October 18th 2023

  const fetchBeers = useCallback(async (page) => {
    let url = `https://api.punkapi.com/v2/beers?page=${page}&per_page=10`;
  
    if (brewedBefore) {
        const formattedBeforeDate = moment(brewedBefore).format('MM-YYYY');
      url += `&brewed_before=${formattedBeforeDate}`;
    }
  
    if (brewedAfter) {
        const formattedAfterDate = moment(brewedAfter).format('MM-YYYY');
      url += `&brewed_after=${formattedAfterDate}`;
    }
  
    const response = await axios.get(url);
    dispatch(setBeers(response.data));
  }, [brewedBefore, brewedAfter, dispatch]);

  useEffect(() => {
    const fetchAndSetBeers = async () => {
      await fetchBeers(currentPage);
    };
  
    fetchAndSetBeers();
  }, [currentPage, brewedBefore, brewedAfter, fetchBeers]);  // Include fetchBeers in the dependencies array
  

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleBrewedBeforeChange = (event) => {
    setBrewedBefore(event.target.value);
  };

  const handleBrewedAfterChange = (event) => {
    setBrewedAfter(event.target.value);
  };

  const formattedDate = moment('2023-10-18').format('MMMM Do YYYY');
console.log(formattedDate);  // Output: October 18th 2023


  return (
    <div>
      <div className="filter">
        <label htmlFor="brewedBefore">Brewed Before: </label>
        <input
          type="date"
          id="brewedBefore"
          value={brewedBefore}
          onChange={handleBrewedBeforeChange}
        />
        <label htmlFor="brewedAfter">Brewed After: </label>
        <input
          type="date"
          id="brewedAfter"
          value={brewedAfter}
          onChange={handleBrewedAfterChange}
        />
      </div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Tagline</th>
            <th>First Brewed</th>
          </tr>
        </thead>
        <tbody>
          {beers.map((beer) => (
            <tr key={beer.id}>
              <td>{beer.name}</td>
              <td>{beer.tagline}</td>
              <td>{beer.first_brewed}</td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Pagination>
        <Pagination.Prev
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        />
        <Pagination.Item active>{currentPage}</Pagination.Item>
        <Pagination.Next onClick={() => handlePageChange(currentPage + 1)} />
      </Pagination>
    </div>
  );
};

export default BeerTable;

