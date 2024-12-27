import React, { useEffect, useState, useContext } from "react";
import axios from "../../../Axios/Axios";
import { AppState } from "../../../App";
import { Link } from "react-router-dom";
import { BsPersonCircle } from "react-icons/bs";
import classes from "./AllQuestions.module.css"; // Import the CSS Module
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";

function AllQuestions() {
  const [isHovered, setIsHovered] = useState(false);
  const [searchTerm, setSearchTerm] = useState(""); // State for search term
  const { user } = useContext(AppState);
  const token = localStorage.getItem("token");
  const [questions, setQuestions] = useState([]);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [questionsPerPage] = useState(10); // Number of questions per page

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);

  // Fetch all questions and sort them by creation date
  async function fetchAllQuestions() {
    try {
      const response = await axios.get("api/questions", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const sortedQuestions = response.data.sort(
        (a, b) => new Date(b.created_at) - new Date(a.created_at)
      );
      setQuestions(sortedQuestions); // Set the questions in the state after sorting
    } catch (error) {
      console.log("Error fetching questions: ", error);
    }
  }

  // useEffect to fetch questions on component mount
  useEffect(() => {
    fetchAllQuestions();
  }, []);

  // Handle the search term change
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Filter questions based on the search term
  const filteredQuestions = questions.filter((question) => {
    return (
      question.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      question.username.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  // Get current questions for the page
  const indexOfLastQuestion = currentPage * questionsPerPage;
  const indexOfFirstQuestion = indexOfLastQuestion - questionsPerPage;
  const currentQuestions = filteredQuestions.slice(
    indexOfFirstQuestion,
    indexOfLastQuestion
  );

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Calculate total pages
  const totalPages = Math.ceil(filteredQuestions.length / questionsPerPage);

  return (
    <div className={classes.container}>
      <div className={classes.searchContainer}>
        <input
          type="text"
          placeholder="Search questions..."
          value={searchTerm}
          onChange={handleSearchChange}
          className={classes.searchInput}
        />
      </div>

      <div className={classes.questionsContainer}>
        {currentQuestions.map((element) => (
          <div key={element.questionid} className={classes.questionItem}>
            {/* Avatar Icon */}
            <div className={classes.avatarContainer}>
              <BsPersonCircle size={48} className="text-blue-600" />
              <p tabIndex="0" className={classes.username}>
                {element.username}
              </p>
            </div>

            {/* Question Info */}
            <Link
              to={`answerpage/${element.questionid}`}
              className={classes.questionInfo}
            >
              <div className={classes.questionInfo}>
                <p tabIndex="0" className={classes.questionTitle}>
                  {element.title}
                </p>
              </div>
            </Link>

            {/* Navigation Arrow */}
            <div>
              <Link to={`/home/answerpage/${element.questionid}`}>
                <span className={classes.navigationArrow}>
                  <ArrowForwardIosRoundedIcon
                    style={{ color: isHovered ? "orange" : "black" }}
                    size={100}
                    onMouseEnter={handleMouseEnter} // Trigger hover
                    onMouseLeave={handleMouseLeave} // Revert when hover ends
                  />
                </span>
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination Controls */}
      <div className={classes.pagination}>
        {totalPages > 1 && (
          <ul className={classes.pageNumbers}>
            {[...Array(totalPages).keys()].map((number) => (
              <li key={number + 1} className={classes.pageNumber}>
                <button onClick={() => paginate(number + 1)}>
                  {number + 1}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default AllQuestions;
