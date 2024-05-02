import axios from "axios";
import React, { useEffect, useState } from "react";
import { useAuthContext } from "../context/AuthProvider";
import { toastWarnNotify } from "../helpers/ToastNotify";
import ScrollToTop from "../components/ScrollToTop";
import SerieCard from "../components/SerieCard";


const API_KEY = process.env.REACT_APP_TMDB_KEY;
const FEATURED_API = `https://api.themoviedb.org/3/discover/tv?api_key=${API_KEY}`;
const SEARCH_API = `https://api.themoviedb.org/3/search/tv?api_key=${API_KEY}&query=`;

const Series = () => {
  const { currentUser } = useAuthContext();
  const [loading, setLoading] = useState(false)
  const [series, setSeries] = useState([])
  const [searchTerm, setSearchTerm] = useState("")

  const getSeries = async (URL)=> {
    setLoading(true)
    try {
      const res = await axios(URL)
      setSeries(res.data.results)
      
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (searchTerm && currentUser) {
      getSeries(SEARCH_API+searchTerm)
    } else if (!currentUser){
      toastWarnNotify("Please log in to search")
    } else {
      toastWarnNotify("Please enter a text to search")
    }
    setSearchTerm("")
  }

  console.log(series)
  useEffect(() => {
    getSeries(FEATURED_API)
  }, [])
  
  return <div>
      <form onSubmit={handleSubmit} className="flex justify-center p-2">
        <input
          type="search"
          className="w-80 h-8 rounded-md p-1 m-2 dark:text-white"
          placeholder="Search a serie..."
          onChange={(e) => setSearchTerm(e.target.value)}
          value={searchTerm}
        />
        <button className="btn-danger-bordered">Search</button>
      </form>
      <div className="flex justify-center flex-wrap">
        {loading ? (
          <div
            className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full text-blue-600 mt-52"
            role="status"
          >
            <span className="visually-hidden">Loading...</span>
          </div>
        ) : (
          series.map((serie) => <SerieCard key={serie.id} {...serie} />)
        )}
      </div>
      <ScrollToTop/>
    </div>;
};

export default Series;
