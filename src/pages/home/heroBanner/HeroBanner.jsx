import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useFetch from "../../../hooks/useFetch";
import { useSelector } from "react-redux";
import Img from "../../../components/lazyLoadImg/Img";
import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";
import './style.scss'

const HeroBanner = () => {
  const { url } = useSelector((state) => state.home);
  const [background, setBackground] = useState("");
  const [query, setquery] = useState("");
  const navigate = useNavigate();

  const { data, loading } = useFetch("/movie/upcoming");

  useEffect(() => {
    if(!loading){
    const bg = url?.backdrop + data?.results?.[Math.floor(Math.random() * 15)]?.backdrop_path;
    setBackground(bg);
    }
  }, [data]);

  const searchQueryHandler = (event) => {
    if (event.key === "Enter" && query.length > 0) {
      navigate(`/search/${query}`);
    }
  };

  const clickQueryHandler = () => {
      navigate(`/search/${query}`);
  };

  return (
    <div className="heroBanner">
      {!loading && (
        <div className="backdrop-img">
          <Img src={background} />
        </div>
      )}
      <div className="opacity-layer"></div>
        <ContentWrapper>
          <div className="heroBannerContent">
            <span className="title">Welcome</span>
            <span className="subTitle">
              Millions of movies, TV shows and people to discover. Explore now
            </span>
            <div className="searchInput">
              <input
                type="text"
                placeholder="Search for movies and TV shows"
                onChange={(e) => setquery(e.target.value)}
                onKeyUp={searchQueryHandler}
              />
              <button className="searchBtn" onClick={clickQueryHandler}>Search</button>
            </div>
          </div>
        </ContentWrapper>
    </div>
  );
};

export default HeroBanner;
