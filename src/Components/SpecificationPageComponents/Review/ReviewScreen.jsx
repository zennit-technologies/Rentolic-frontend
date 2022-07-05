import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { loadReview } from '../../../Actions/reviewAction';
import Rating from '@mui/material/Rating';

const ReviewScreen = ({ product }) => {
  let dispatch = useDispatch();
  const { reviews } = useSelector(state => state.reviewData);
  const filterReview = reviews.filter((cur) => cur.product_id === parseInt(product))
  console.log("rev", filterReview)
  useEffect(() => {
    dispatch(loadReview());
  }, []);
  return (
    <>
      <div className="row">
        {
          filterReview.length !== 0 ? filterReview.map((cur) => {
            return <div class="card m-2 col-12">
              <div class="card-header">
                <h5 class="card-title text-capitalize">{cur.name}</h5>
                <Rating name="read-only" value={cur.rating} readOnly />
              </div>
              <div class="card-body">
                <blockquote class="blockquote mb-0">
                  <p>{cur.review}</p>
                  {/* <footer class="blockquote-footer">{cur.email}</footer> */}
                </blockquote>
              </div>
            </div>
          }) : <h2>No Review Found</h2>
        }
      </div>
    </>
  )
}

export default ReviewScreen
