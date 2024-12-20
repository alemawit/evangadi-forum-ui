import React, { useContext, useEffect, useRef, useState } from "react";
import axios from "../../../Axios/Axios";
import { AppState } from "../../../App";
import classes from "./AnswerPage.module.css";
import { useParams } from "react-router-dom";
import { IoPersonCircle } from "react-icons/io5";
import { FaCircleArrowRight } from "react-icons/fa6";
import Loading from "../../../assets/images/loadingicon.gif";

function AnswerPage() {
  const { user } = useContext(AppState);
  const { questionid } = useParams();
  const Answer = useRef();
  const [showAnswer, setShowAnswer] = useState([]);
  const [question, setQuestion] = useState(null);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");

  useEffect(() => {
    async function fetchQuestionAndAnswers() {
      setLoading(true); // Show loader while fetching data
      try {
        const questionResponse = await axios.get(
          `api/questions/${questionid}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setQuestion(questionResponse.data);

        const answersResponse = await axios.get(`api/answers/${questionid}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        // Ensure showAnswer is always an array
        setShowAnswer(
          Array.isArray(answersResponse.data) ? answersResponse.data : []
        );
      } catch (error) {
        console.error("Error fetching question and answers:", error);
        // alert("Error fetching question or answers");
      } finally {
        setLoading(false); // Hide loader after fetching data
      }
    }

    if (questionid) {
      fetchQuestionAndAnswers();
    }
  }, [questionid, token]);

  async function handleSubmit() {
    const title = Answer.current.value;
    if (!title) {
      return alert("Please provide an answer");
    }

    try {
      const response = await axios.post(
        "api/answers",
        {
          questionid: questionid,
          answer: title,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log(response);
      alert("Answer posted successfully");
      setShowAnswer([
        ...showAnswer,
        { username: user.username, answer: title, userid: user.userid },
      ]);
      Answer.current.value = "";
    } catch (error) {
      console.error("Error posting answer:", error);
      alert("Error posting answer");
    }
  }

  return (
    <div className={classes.answerContainer}>
      {loading ? (
        <div className={classes.loader}>
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
      ) : (
        <>
          <div className={classes.right_arrow_title}>
            <h3>Question</h3>
          </div>
          {question && (
            <>
              <div className={classes.questionInfo}>
                <div>
                  <FaCircleArrowRight size={18} color="blue" />
                </div>
                <p className={classes.questionTitle}>{question.title}</p>
              </div>
              <div className={classes.questionInfo}>
                <p className={classes.questionDescription}>
                  {question.content}
                </p>
              </div>
            </>
          )}

          <div>
            <h3 className={classes.answer_body}>Answers from the community</h3>
          </div>

          <div className={classes.answer_item_wrapper}>
            {Array.isArray(showAnswer) && showAnswer.length > 0 ? (
              showAnswer.map((answerElement) => (
                <div
                  key={answerElement.answerid}
                  className={classes.answerItem}
                >
                  <div className={classes.avatarContainer}>
                    <div>
                      <p>
                        <IoPersonCircle size={40} />
                      </p>
                      <p className={classes.username}>
                        {answerElement.username}
                      </p>
                    </div>
                    <div className={classes.old_answer}>
                      {answerElement.answer}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p>No answers yet. Be the first to answer!</p>
            )}
          </div>
          <div className={classes.answerInputContainer}>
            <textarea
              className={classes.textarea}
              placeholder="Your answer ..."
              ref={Answer}
            ></textarea>
            <div className={classes.submitButtonContainer}>
              <button onClick={handleSubmit} className={classes.submitButton}>
                Post Answer
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default AnswerPage;
