import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { loginFailure, loginStart, loginSuccess } from "../redux/userSlice";
import { auth, provider } from "../utils/firebase.js";
import { signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";
import "./Signin.css";

const SignIn = () => {
  const [signInForm, setSignInForm] = useState({
    email: "",
    password: "",
  });
  const [signUpForm, setSignUpForm] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [signupSuccess, setSignupSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSignInChange = (e) => {
    setSignInForm({ ...signInForm, [e.target.name]: e.target.value });
  };

  const handleSignUpChange = (e) => {
    setSignUpForm({ ...signUpForm, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    dispatch(loginStart());
    setError("");
    setLoading(true);
    try {
      const res = await axiosInstance.post("/auth/login", {
        email: signInForm.email,
        password: signInForm.password,
      });
      dispatch(loginSuccess(res.data));
      navigate("/");
    } catch (err) {
      const errorMessage = err.response?.data?.message || "Invalid credentials or server error.";
      setError(errorMessage);
      dispatch(loginFailure());
    } finally {
      setLoading(false);
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");
    setSignupSuccess(false);
    setLoading(true);
    try {
      await axiosInstance.post("/auth/register", signUpForm);
      setSignupSuccess(true);
      setSignUpForm({ name: "", email: "", password: "" });
    } catch (err) {
      const errorMessage = err.response?.data?.message || "Signup failed. Try a different username/email.";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const signInWithGoogle = async () => {
    dispatch(loginStart());
    setError("");
    setLoading(true);
    
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      
      const response = await axiosInstance.post("/auth/google", {
        name: user.displayName,
        email: user.email,
        img: user.photoURL,
      });
      
      dispatch(loginSuccess(response.data));
      navigate("/");
    } catch (error) {
      let errorMessage = "Google sign-in failed";
      
      if (error.code === 'auth/popup-closed-by-user') {
        errorMessage = "Sign-in popup was closed";
      } else if (error.code === 'auth/popup-blocked') {
        errorMessage = "Popup blocked by browser. Please allow popups and try again";
      } else if (error.code === 'auth/cancelled-popup-request') {
        errorMessage = "Sign-in was cancelled";
      } else if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      }
      
      setError(errorMessage);
      dispatch(loginFailure());
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signin-root">
      <div className="signin-box">
        <h1 className="signin-title">Sign in</h1>
        <h2 className="signin-subtitle">to continue to YouTube Clone</h2>
        <input
          className="signin-input"
          placeholder="email"
          name="email"
          value={signInForm.email}
          onChange={handleSignInChange}
          disabled={loading}
        />
        <input
          className="signin-input"
          type="password"
          placeholder="password"
          name="password"
          value={signInForm.password}
          onChange={handleSignInChange}
          disabled={loading}
        />
        <button
          className="signin-btn signin-btn-blue"
          type="button"
          onClick={handleLogin}
          disabled={loading}
        >
          {loading ? "Signing In..." : "Sign in"}
        </button>
        <div className="signin-or">or</div>
        <button
          className="signin-btn signin-btn-red"
          type="button"
          onClick={signInWithGoogle}
          disabled={loading}
        >
          {loading ? "Signing In with Google..." : "Sign in with Google"}
        </button>
        <div className="signin-or">or</div>
        <input
          className="signin-input"
          placeholder="username"
          name="name"
          value={signUpForm.name}
          onChange={handleSignUpChange}
          disabled={loading}
        />
        <input
          className="signin-input"
          placeholder="email"
          name="email"
          value={signUpForm.email}
          onChange={handleSignUpChange}
          disabled={loading}
        />
        <input
          className="signin-input"
          type="password"
          placeholder="password"
          name="password"
          value={signUpForm.password}
          onChange={handleSignUpChange}
          disabled={loading}
        />
        <button
          className="signin-btn signin-btn-green"
          type="button"
          onClick={handleSignup}
          disabled={loading}
        >
          {loading ? "Signing Up..." : "Sign up"}
        </button>
        {signupSuccess && (
          <div className="signin-success">Signup successful! Please sign in.</div>
        )}
        {error && (
          <div className="signin-error">{error}</div>
        )}
      </div>
      <div className="signin-footer">
        English(USA)
        <div className="signin-footer-links">
          <span>Help</span>
          <span>Privacy</span>
          <span>Terms</span>
        </div>
      </div>
    </div>
  );
};

export default SignIn;