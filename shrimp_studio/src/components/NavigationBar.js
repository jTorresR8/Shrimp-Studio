import React from 'react';
import { Link } from 'react-router-dom';
import { MDBNavbar, MDBNavbarNav, MDBNavbarItem, MDBContainer } from 'mdb-react-ui-kit';
import { getAuth, signOut } from 'firebase/auth';
import '../NavigationBar.css'; // Import your CSS file



const NavigationBar = ({ user }) => {
  const auth = getAuth();

  const handleSignOut = () => {
      signOut(auth).then(() => {
          // Sign-out successful.
      }).catch((error) => {
          // An error happened.
      });
  };

  return (
      <MDBNavbar expand='lg' light bgColor='white'>
          <MDBContainer fluid>
              <MDBNavbarNav className='me-auto mb-2 mb-lg-0'>
                  <MDBNavbarItem>
                      <Link className='nav-link' to='/home'>Home</Link>
                  </MDBNavbarItem>
                  {user && (
                      <>
                          <MDBNavbarItem>
                              <Link className='nav-link' to='/account'>My Account</Link>
                          </MDBNavbarItem>
                          <MDBNavbarItem>
                              <button className='btn btn-link nav-link' onClick={handleSignOut}>
                                  Sign Out
                              </button>
                          </MDBNavbarItem>
                      </>
                  )}
              </MDBNavbarNav>
          </MDBContainer>
      </MDBNavbar>
  );
};


export default NavigationBar;
