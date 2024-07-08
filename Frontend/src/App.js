import './App.css';

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Statistics from './components/Statastics';
import TransactionsTable from './components/TransactionsTable';
import SearchBar from './components/SearchBar';
import Pagination from './components/Pagination';
import MonthSelector from './components/MonthSelector';
import BarChart from './components/BarChart';

const App = () => {
  const [transactions, setTransactions] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [month, setMonth] = useState('3'); // Default to March
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchTransactions();
  }, [month, searchText, page]);

  const fetchTransactions = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/transactions`, {
        params: {
          month,
          search: searchText,
          page
        }
      });
      console.log(response)
      setTransactions(response.data.transactions);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error('Error fetching transactions:', error);
    }
  };

  const handleSearch = (text) => {
    setSearchText(text);
    setPage(1); // Reset to first page on new search
  };

  const handleMonthChange = (event) => {
    setMonth(event.target.value);
    setPage(1); // Reset to first page on month change
  };

  const handleNextPage = () => {
    if (page < totalPages) {
      setPage(page + 1);
    }
  };

  const handlePrevPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  return (
    // <div className="App">
    //   <div className="min-h-screen bg-gray-100 p-4">
    //     <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md">
    //       <h1 className=" font-bold mb-4">Transaction List</h1>
    //       <MonthSelector month={month} handleMonthChange={handleMonthChange} />
    //       <SearchBar searchText={searchText} handleSearch={handleSearch} />
    //       <TransactionsTable transactions={transactions} />
    //       <Pagination page={page} totalPages={totalPages} handleNextPage={handleNextPage} handlePrevPage={handlePrevPage} />
    //     </div>
    //   </div>
    // </div>
    // <div className="min-h-screen bg-gray-100 p-4 bg-slate-500">
    //   <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md bg-gray-200">
    //     <h1 className="text-2xl font-bold mb-4">Transaction List</h1>
    //     <MonthSelector month={month} handleMonthChange={handleMonthChange} />
    //     <Statistics month={month} />
    //     <SearchBar searchText={searchText} handleSearch={handleSearch} />
    //     <TransactionsTable transactions={transactions} />
    //     <Pagination page={page} totalPages={totalPages} handleNextPage={handleNextPage} handlePrevPage={handlePrevPage} />
    //   </div>
    // </div>
    // <div className="min-h-screen bg-gray-100 p-4">
    //   <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md">
    //     <h1 className="text-2xl font-bold mb-4">Transaction List</h1>
    //     <MonthSelector month={month} handleMonthChange={handleMonthChange} />
    //     <Statistics month={month} />
    //     <BarChart month={month} />
    //     <SearchBar searchText={searchText} handleSearch={handleSearch} />
    //     <TransactionsTable transactions={transactions} />
    //     <Pagination page={page} totalPages={totalPages} handleNextPage={handleNextPage} handlePrevPage={handlePrevPage} />
    //   </div>
    // </div>
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-4">Transaction List</h1>
        <MonthSelector month={month} handleMonthChange={handleMonthChange} />
        <Statistics month={month} />
        <BarChart month={month} />
        <SearchBar searchText={searchText} handleSearch={handleSearch} />
        <TransactionsTable transactions={transactions} />
        <Pagination page={page} totalPages={totalPages} handleNextPage={handleNextPage} handlePrevPage={handlePrevPage} />
      </div>
    </div>
  );
};

export default App;
