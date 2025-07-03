

import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import Login from '../components/forms/Login';
import Register from '../components/forms/Register';
import AddFirm from '../components/forms/AddFirm';
import AddProduct from '../components/forms/AddProduct';
import Welcome from '../components/forms/Welcome';
import AllProducts from '../components/AllProducts';

const Landingpage = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [showFirm, setShowFirm] = useState(false);
  const [showProduct, setShowProduct] = useState(false);
  const [showWelcome, setShowWelcome] = useState(false);
  const [showAllProducts, setShowAllProducts] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // renamed
  const [showFirmTitle, setShowFirmTitle] = useState(true);

  useEffect(() => {
    setIsLoggedIn(Boolean(localStorage.getItem('loginToken')));
  }, []);

  useEffect(() => {
    if (localStorage.getItem('firmName')) {
      setShowFirmTitle(false);
    }
  }, []);

  const onLogin = () => {
    setIsLoggedIn(true);
    setShowWelcome(true);
    setShowLogin(false);
    setShowRegister(false);
  }

  const LogOutHandler = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      localStorage.removeItem('loginToken');
      localStorage.removeItem('firmId');
      localStorage.removeItem('firmName');
      setIsLoggedIn(false);
      setShowFirmTitle(true);
      setShowLogin(false);
      setShowRegister(false);
      setShowFirm(false);
      setShowProduct(false);
      setShowWelcome(false);
      setShowAllProducts(false);
    }
  };

  const ShowLoginHandler = () => {
    setShowLogin(true);
    setShowRegister(false);
    setShowFirm(false);
    setShowProduct(false);
    setShowWelcome(false);
    setShowAllProducts(false);
  };

  const ShowRegisterHandler = () => {
    setShowRegister(true);
    setShowLogin(false);
    setShowFirm(false);
    setShowProduct(false);
    setShowWelcome(false);
    setShowAllProducts(false);
  };

  const ShowFirmHandler = () => {
    if (isLoggedIn) {
      setShowFirm(true);
      setShowProduct(false);
      setShowWelcome(false);
      setShowAllProducts(false);
      setShowLogin(false);
      setShowRegister(false);
    } else {
      alert("Please login");
      setShowLogin(true);
    }
  };

  const ShowProductHandler = () => {
    if (isLoggedIn) {
      setShowProduct(true);
      setShowFirm(false);
      setShowWelcome(false);
      setShowAllProducts(false);
      setShowLogin(false);
      setShowRegister(false);
    } else {
      alert("Please login");
      setShowLogin(true);
    }
  };

  const ShowAllProductsHandler = () => {
    if (isLoggedIn) {
      setShowAllProducts(true);
      setShowFirm(false);
      setShowProduct(false);
      setShowWelcome(false);
      setShowLogin(false);
      setShowRegister(false);
    } else {
      alert("Please login");
      setShowLogin(true);
    }
  };

  return (
    <section className='landingsection'>
      <Navbar
        ShowLoginHandler={ShowLoginHandler}
        ShowRegisterHandler={ShowRegisterHandler}
        showLogOut={isLoggedIn}
        LogOutHandler={LogOutHandler}
      />
      <div className="collectionSection">
        <Sidebar
          ShowFirmHandler={ShowFirmHandler}
          ShowProductHandler={ShowProductHandler}
          ShowAllProductsHandler={ShowAllProductsHandler}
          showFirmTitle={showFirmTitle}
        />
        {showLogin && <Login onLogin={onLogin} />}
        {showRegister && <Register ShowLoginHandler={ShowLoginHandler} />}
        {showFirm && isLoggedIn && <AddFirm />}
        {showProduct && isLoggedIn && <AddProduct />}
        {showWelcome && <Welcome />}
        {showAllProducts && isLoggedIn && <AllProducts />}
      </div>
    </section>
  );
};

export default Landingpage;
