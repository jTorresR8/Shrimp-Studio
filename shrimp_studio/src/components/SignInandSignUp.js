import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase-config';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import 'bootstrap/dist/css/bootstrap.min.css';
import './AquaticTheme.css';

const SignInandSignUp = () => {
  const [signInEmail, setSignInEmail] = useState('');
  const [signInPassword, setSignInPassword] = useState('');
  const [signUpEmail, setSignUpEmail] = useState('');
  const [signUpPassword, setSignUpPassword] = useState('');
  const [error, setError] = useState(null);

  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, signInEmail, signInPassword);
    } catch (error) {
      setError(error.message);
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, signUpEmail, signUpPassword);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="aquatic-background py-5">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card aquatic-card">
              <div className="card-body">
                <h2 className="mb-4 text-center aquatic-title">
                  <span className="shrimp-icon">🦐</span> Shrimp Studio 🦐
                </h2>
                <div className="mb-4">
                  <form onSubmit={handleSignIn}>
                    <div className="mb-3">
                      <label htmlFor="signInEmail" className="form-label">
                        Email
                      </label>
                      <input
                        type="email"
                        id="signInEmail"
                        className="form-control aquatic-input"
                        placeholder="Email"
                        value={signInEmail}
                        onChange={(e) => setSignInEmail(e.target.value)}
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="signInPassword" className="form-label">
                        Password
                      </label>
                      <input
                        type="password"
                        id="signInPassword"
                        className="form-control aquatic-input"
                        placeholder="Password"
                        value={signInPassword}
                        onChange={(e) => setSignInPassword(e.target.value)}
                      />
                    </div>
                    <button type="submit" className="btn btn-primary aquatic-button">
                      Sign In
                    </button>
                  </form>
                  {error && <p className="text-danger">{error}</p>}
                </div>
                <div>
                  <form onSubmit={handleSignUp}>
                    <div className="mb-3">
                      <label htmlFor="signUpEmail" className="form-label">
                        Email
                      </label>
                      <input
                        type="email"
                        id="signUpEmail"
                        className="form-control aquatic-input"
                        placeholder="Email"
                        value={signUpEmail}
                        onChange={(e) => setSignUpEmail(e.target.value)}
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="signUpPassword" className="form-label">
                        Password
                      </label>
                      <input
                        type="password"
                        id="signUpPassword"
                        className="form-control aquatic-input"
                        placeholder="Password"
                        value={signUpPassword}
                        onChange={(e) => setSignUpPassword(e.target.value)}
                      />
                    </div>
                    <button type="submit" className="btn btn-secondary aquatic-button">
                      Sign Up
                    </button>
                  </form>
                  {error && <p className="text-danger">{error}</p>}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignInandSignUp;