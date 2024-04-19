import React from 'react';
import { Link } from 'react-router-dom';
import { MDBNavbar, MDBNavbarNav, MDBNavbarItem, MDBContainer } from 'mdb-react-ui-kit';
import { getAuth, signOut } from 'firebase/auth';
// import '../NavigationBar.css'; // Import your CSS file
import '../ui.css'


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
        <MDBNavbar expand='lg' light style={{ backgroundColor: 'rgb(31, 31, 31)', color: 'white' }}>
            <MDBContainer fluid>
                <MDBNavbarNav className='me-auto mb-2 mb-lg-0' style={{ display: 'flex' }}>
                    <MDBNavbarItem style={{ width: '75px' }}>
                        <Link className='nav-link' to='/home' style={{ color: 'white' }}>Home</Link>
                    </MDBNavbarItem>
                    {user && (
                        <>
                            <MDBNavbarItem style={{ width: '150px' }}>
                                <Link className='nav-link' to='/account' style={{ color: 'white' }}>My Account</Link>
                            </MDBNavbarItem>
                            <MDBNavbarItem style={{ width: '100px' }}>
                                <button className='btn btn-link nav-link' style={{ color: 'white' }} onClick={handleSignOut}>
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
