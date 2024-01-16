import { useState, useEffect } from "react";
import { fetchData } from "./utils/api";
import { useSelector, useDispatch } from "react-redux";
import { getAPIconfiguration, getGenres } from "./store/homeSlice";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Home from "./pages/home/Home";
import Details from "./pages/details/Details";
import SearchResult from "./pages/searchResult/SearchResult";
import Explore from "./pages/explore/Explore";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import PageNotFound from "./pages/pageNotFound/PageNotFound";

function App() {
  const dispatch = useDispatch();
  const { url } = useSelector((state) => state.home);

  useEffect(() => {
    test();
    genersCall()
  }, []);

  const test = () => {
    fetchData("/configuration").then((res) => {
      console.log(res);
      const url = {
        backdrop: res.images.secure_base_url + "original",
        poster: res.images.secure_base_url + "original",
        profile: res.images.secure_base_url + "original",
      };

      dispatch(getAPIconfiguration(url));
    });
  };

  const genersCall = async()=>{
    let promises = []
    let endPoints = ["tv","movie"]
    let allGeners = {}

    endPoints.forEach((url)=>{
      promises.push(fetchData(`/genre/${url}/list`))
    })

    const data = await Promise.all(promises)
    console.log(data)
    data.map(({genres})=>{
      return genres.map((item)=>(allGeners[item.id]=item))
    })

    dispatch(getGenres(allGeners))
  }


  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:mediatype/:id" element={<Details />} />
        <Route path="/search/:query" element={<SearchResult />} />
        <Route path="/explore/:mediatype" element={<Explore />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
