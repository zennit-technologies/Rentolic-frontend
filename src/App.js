import './App.css';
import { Routes } from 'react-router-dom';
import { Route } from 'react-router-dom';
import Footer from './Components/Common/Footer/Footer';
import HomepageScreen from './Screens/HomepageScreen/HomepageScreen';
import Header from './Components/Common/Header/Header';
import CodePageScreen from './Screens/CodePageScreen/Code/CodeScreen';
import SignIn from './Components/LoginPageComponents/SignIn/SignIn';
import SignUp from './Components/LoginPageComponents/SignUp/SignUp';
import Specification from './Components/SpecificationPageComponents/Specification/Specification';
import SimiliarProduct from './Components/SpecificationPageComponents/SimiliarProduct/SimiliarProduct';
import Review from './Components/SpecificationPageComponents/Review/Review';
import AllCategorysPage from './Screens/AllProducts/AllProductPage/AllCategorysPage';
import { UserAuthContextProvider } from "../src/context/UserAuthContext";
import ProductsScreen from './Components/ProductsComponents/Products/ProductsScreen';
import SpecificationPage from './Screens/SpecificationPageScreen/SpecificationPage';
import PostAdScreen from './Screens/PostadScreen/PostAdScreen';
import ProfileEdit from './Components/ProfileComponents/ProfileEdit';

// NEW
import BlogScreen from './Screens/SettingScreen/BlogScreen/BlogScreen';
import PrivacyScreen from './Screens/SettingScreen/PrivacyScreen/PrivacyScreen';
import TermScreen from './Screens/SettingScreen/TermsScreen/TermScreen';
import BackToTop from './Components/Common/BackToBack/BackToTop';
import TextScreen from './Screens/TextOnly.jsx/TextScreen';
import AboutScreen from './Screens/SettingScreen/AboutScreen/AboutScreen';
import ContectUs from './Screens/ContectUsScreen/ContectUs';
import AllCategoryPanel from './Screens/AllCategoryScreen/AllCategoryPanel';
import RequestCategory from './Components/RequestComponets/RequestCategory';
import RequestSubCategory from './Components/RequestComponets/RequestSubCategory';
import SearchProduct from './Components/Search/SearchProduct';
import ViewMyAds from './Components/ProfileComponents/ViewMyAds';
import RequestCity from './Components/RequestComponets/RequestCity';
import ForgitPassword from './Components/LoginPageComponents/SignIn/ForgitPassword';



function App() {
  return (
    <>
      <UserAuthContextProvider>
        
        <Header />
        <BackToTop /> 
        <Routes>
          <Route path="/" element={<HomepageScreen />} />/
          <Route path="/category/:category_name/:category_id" element={<AllCategorysPage />} />
          <Route path="/sub-category/:sub_category_name/:sub_category_id" element={<ProductsScreen />} />
          <Route path="/product/:product_name/:product_id" element={<SpecificationPage />} />
          {/* <Route path="/codepagescreen" element={<CodePageScreen />} /> */}
          <Route path="/post-ad" element={<PostAdScreen />} />
          <Route path="/signIn" element={<SignIn />} />
          <Route path="/profile" element={<ProfileEdit />} />
          <Route path="/forgot-password" element={<ForgitPassword />} />

          {/* <Route path="/signUp" element={<SignUp />} /> */}
          {/* <Route path="/specification" element={<Specification />} /> */}
          {/* <Route path="/similiarproduct" element={<SimiliarProduct />} /> */} 
          {/* <Route path="/review" element={<Review />} /> */}

          {/* NEW */}
          <Route path="/blogs" element={<BlogScreen />} />
          <Route path="/privacy-policy" element={<PrivacyScreen />} />
          <Route path="/terms-&-condition" element={<TermScreen />} />
          <Route path="/about-us" element={<AboutScreen />} />
          <Route path="/contact-us" element={<ContectUs />} />
          <Route path="/all-category" element={<AllCategoryPanel />} />

          <Route path="/request-category" element={<RequestCategory />} />
          <Route path="/request-subcategory" element={<RequestSubCategory />} />
          <Route path="/request-city" element={<RequestCity />} />


          {/* TEXT ONLY */}
          <Route path="/text" element={<TextScreen />} />

          {/* Search Bar */}
          <Route path="/search/:data" element={<SearchProduct />} />

          {/* New Route of View My Ads */}
          <Route path="/view-my-ad" element={<ViewMyAds />} />



        </Routes>
        <Footer />
      </UserAuthContextProvider>

    </>
  );
}

export default App;
