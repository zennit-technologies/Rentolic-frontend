import { combineReducers } from 'redux';
import categoryReducer from '../categoryReducer';
import subCategoryReducer from '../subCategoryReducer';
import cityReducer from '../cityReducer';
import productReducer from '../productReducer';
import adminReducer from '../adminReducer';
import bookingReducer from '../bookingReducer';
import userComplaintReducer from '../userComplaintReducer';
import usersReducer from '../usersReducer';
import userProfileReducer from '../userProfileReducer';
import lenderReducer from '../lenderReducer'
import adReducer from '../adReducer'
import pendingCategoryReducer from '../pendingCategoryReducer'
import pendingSubCategoryReducer from '../pendingSubCategoryReducer'
import pendingProductReducer from '../pendingProductReducer'
import statesReducer from '../statesReducer'
import testiReducer from '../testiReducer'
import reviewReducer from '../reviewReducer'
import blogReducer from '../blogReducer'
import termsReducer from '../termsReducer'
import privacyReducer from '../privacyReducer'
import sliderReducer from '../sliderReducer'
import productClickReducer from '../productClickReducer'
import aboutReducer from '../aboutReducer'
import contactReducer from '../contactReducer'
import ContactWebSiteReducer from '../ContactWebSiteReducer'
import starsReducer from '../starsReducer'

const rootReducer = combineReducers({
    categoryData: categoryReducer,
    subCategoryData: subCategoryReducer,
    cityData: cityReducer,
    productData: productReducer,
    adminData: adminReducer,
    bookingData: bookingReducer,
    userComplaintData: userComplaintReducer,
    usersData: usersReducer,
    userProfileData: userProfileReducer,
    lenderData : lenderReducer,
    adData : adReducer,
    pendingCategoryData : pendingCategoryReducer,
    pendingSubCategoryData : pendingSubCategoryReducer,
    pendingProductData : pendingProductReducer,
    testiData : testiReducer,
    reviewData : reviewReducer,
    blogData : blogReducer,
    termsData : termsReducer,
    privacyData : privacyReducer,
    sliderData : sliderReducer,
    productClickData : productClickReducer,
    aboutData : aboutReducer, 
    contactData : contactReducer,
    ContactWebSiteData : ContactWebSiteReducer,
    statesData : statesReducer,
    starsData : starsReducer,
});


export default rootReducer;