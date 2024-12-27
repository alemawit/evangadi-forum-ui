import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { AppState } from "../../../App";
import classes from "./Home.module.css"; // Import CSS module for styles
import AllQuestions from "../AllQuestions/AllQuestions";
import Loading from '../../../assets/images/loadingicon.gif'

const Home = () => {
  const { user } = useContext(AppState); // Access the logged-in user from context
  const { questionid } = useParams(); // Extract the questionid from the URL
  const [question, setQuestion] = useState(null); // State to store a single question
  const [loading, setLoading] = useState(true); // State to indicate loading status
  const [searchQuery, setSearchQuery] = useState(""); // State for search query

  // Handle changes in the search bar (for all questions)
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value); // Update the search query
  };

  useEffect(() => {
    // Simulate loading delay
    const timeout = setTimeout(() => {
      setLoading(false); // Set loading to false after delay
    }, 2000); // Set the delay time (2 seconds in this example)

    // Clear the timeout on component unmount
    return () => clearTimeout(timeout);
  }, []); // Run this effect only once on component mount

  return (
    <div className={classes.home}>
      {/* Loading Indicator */}
      {loading ? (
        <div className={classes.loadingContainer}>
          <div className={classes.loadingMessage}>
            <h1
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100vh", // Full viewport height
                margin: 0, // Remove default margin
              }}
            >
              <img src={Loading} alt="" />
            </h1>
          </div>
        </div>
      ) : (
        <>
          {/* Header Section */}
          <header className={classes.header}>
            {/* Ask Question Button (only visible if logged in) */}
            <Link to={"/questionpage"}>
              <div className={classes.askQuestion}>
                {user ? (
                  <button>Ask Question</button>
                ) : (
                  <p>Please log in to ask a question.</p>
                )}
              </div>
            </Link>

            <div className={classes.welcomeMessage}>
              {/* Dynamically render the logged-in user's name */}
              Welcome: <span>{user?.username || "Guest"}</span>
            </div>
          </header>

          {/* Main Content Section */}
          <main className={classes.mainContent}>
            {/* Search Bar */}
            {/* <div className={classes.searchBar}>
              <input
                type="text"
                placeholder="Search questions"
                value={searchQuery}
                onChange={handleSearchChange}
              />
            </div> */}

            {/* Question Display (if questionid is available) */}
            <AllQuestions />
          </main>
        </>
      )}
    </div>
  );
};

export default Home;
