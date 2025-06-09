import React, { useState, useEffect } from 'react';
import axiosInstance from '../axiosInstace';
import Navbar from './navbar';
import Footer from './footer';
import './Styles/HomePage.css';
import { useLocation } from 'react-router-dom';

export default function UserHome() {
  const location = useLocation();
  const email = new URLSearchParams(location.search).get('email');
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get(`/user/${email}`);
        console.log("Response status:", response.status);
        if (response.status === 200) {
          setUserData(response.data);
        }else {
          setError('An unexpected error occurred.');
        }
      } catch (error) {
        if(error.response && error.response.status === 401){
          window.location.href = '/Login';
          return;
        }
        console.log('Error fetching data:', error);
        setError('An error occurred while fetching user data. Please try again.');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [email]);

  return (
    <>
      <Navbar name='Syed' />
      <div className="container">
        {loading ? (
          <p>Loading user data...</p> // More descriptive loading message
        ) : error ? (
          <p>{error}</p>
        ) : (
          <>
            <h1>Welcome to the Dashboard, {userData?.fullname}!</h1> {/* Optional chaining */}
            {userData && (
              <>
                <div>
                  <h3>Name: </h3>
                  <p>{userData.fullname}</p>
                </div>
                <div>
                  <h3>Email: </h3>
                  <p>{userData.email}</p> {/* Adjust based on your backend data structure */}
                </div>
              </>
            )}
          </>
        )}
      </div>
      <Footer />
    </>
  );
}