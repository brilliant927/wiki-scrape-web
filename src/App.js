
import './App.css';
import React, { useState} from 'react';
import axios from 'axios';
import Table from './Table';

function App() {
  const [searchResult, setSearchResult] = useState([]);
  
  const callAPI = (reqParam) => {
    axios.post(process.env.REACT_APP_API || 'http://localhost:8000/scrap', reqParam)
    .then((res) => {
      setSearchResult(prevState => [...prevState, { ...reqParam, count: res.data.data }]);
    })
    .catch((error) => {
      console.log(error);
    });
  };
  
  const handleSubmit = (event) => {
    callAPI({
      webSiteUrl: event.target.webSiteUrl.value,
      searchWord: event.target.searchWord.value
    });
    event.preventDefault();
  };
  
  return (
    <div className='mx-10 mt-10 flex flex-col justify-center' >
        <form onSubmit = {handleSubmit}>
          <div className=" flex flex-row space-x-2 items-end mb-4">
            <div className="w-md">
              <label>Website URL: </label>
              <input id="webSiteUrl" name="webSiteUrl" type="text" value="https://en.wikipedia.org/wiki/Tokyo" required 
              className="relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Website Url" />
            </div>
            <div>
              <label>Search Word:</label>
              <input id="searchWord" name="searchWord" type="text" value="city"  required className="relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Search Word"/>
            </div>
            <div className="flex items-end flex-col">
              <button type="submit" className="h-1/2 flex items-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                Search
              </button>
            </div>
          </div>
        </form>
        <div>
          <Table rows={searchResult} />
        </div>
      
    </div>
  );
}

export default App;
