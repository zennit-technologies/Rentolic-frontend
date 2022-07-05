import React from 'react'
import RentalStatistics from '../../Components/HomePageComponent/RentalStatistics/RentalStatistics'
import Intro from '../../Components/HomePageComponent/Intro/Intro'
import Introo from '../../Components/HomePageComponent/Introo/Introo'
import AllCategoryPanel from '../../Components/HomePageComponent/AllCategoryPanel/AllCategoryPanel'
import ClientTestiPanel from '../../Components/HomePageComponent/ClientTestiPanel/ClientTestiPanel'
import Slider from '../../Components/HomePageComponent/Slider/Slider'
import BasicBlog from '../../Components/HomePageComponent/BasicBlog/BasicBlog'
import WeeklyProducts from '../../Components/HomePageComponent/WeeklyProducts/WeeklyProducts'
const HomepageScreen = () => {
  return (
    <>
    
      <Slider />

      <Intro />

      {/* <RentalStatistics /> */}

      <WeeklyProducts />

      {/* ALL CATEGORY START */}
      <AllCategoryPanel />
      {/* ALL CATEGORY STOP */}

      <ClientTestiPanel />

      {/* <Introo /> */}
    </>
  )
}

export default HomepageScreen
