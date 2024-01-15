import React from 'react'
import './style.scss'
import useFetch from '../../hooks/useFetch'
import { useParams } from 'react-router-dom'
import DetailsBanner from './detailsBanner/DetailsBanner'
import Cast from './cast/Cast'
import VideosSection from './videosSections/VideosSections'
import Similar from './carousels/Similar'
import Recommendation from './carousels/Recommendation'

const Details = () => {
  const { mediatype, id } = useParams()
  const { data, loading } = useFetch(`/${mediatype}/${id}/videos`)
  const { data: credits, loading: creditsLoading } = useFetch(`/${mediatype}/${id}/credits`)


  return (
    <div>
      <DetailsBanner video={data?.results?.[0]} crew={credits?.crew}/>
      <Cast data={credits?.cast} loading={creditsLoading}/>
      <VideosSection data={data} loading={loading}/>
      <Similar mediaType={mediatype} id={id}/>
      <Recommendation mediaType={mediatype} id={id}/>
    </div>
  )
}

export default Details
