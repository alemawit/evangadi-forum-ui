// import React, { useContext, useEffect, useRef, useState } from "react";
// import axios from "../../../Axios/Axios";
// import { AppState } from "../../../App";
// import classes from "./AnswerPage.module.css";
// import { useParams } from "react-router-dom";
// import { IoPersonCircle } from "react-icons/io5";
// import { FaCircleArrowRight } from "react-icons/fa6";
// import Loading from "../../../assets/images/loadingicon.gif";

// function truncateText(text, limit) {
//   if (text.length <= limit) return text;
//   return text.slice(0, limit) + "...";
// }

// function AnswerPage() {
//   const { user } = useContext(AppState);
//   const { questionid } = useParams();
//   const Answer = useRef();
//   const [showAnswer, setShowAnswer] = useState([]);
//   const [question, setQuestion] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const token = localStorage.getItem("token");

//   const [showFullDescription, setShowFullDescription] = useState(false);
//   const [expandedAnswers, setExpandedAnswers] = useState({}); // Track which answers are expanded

//   useEffect(() => {
//     async function fetchQuestionAndAnswers() {
//       setLoading(true); // Show loader while fetching data
//       try {
//         const questionResponse = await axios.get(
//           `api/questions/${questionid}`,
//           {
//             headers: { Authorization: `Bearer ${token}` },
//           }
//         );
//         setQuestion(questionResponse.data);

//         const answersResponse = await axios.get(`api/answers/${questionid}`, {
//           headers: { Authorization: `Bearer ${token}` },
//         });

//         // Ensure showAnswer is always an array
//         setShowAnswer(
//           Array.isArray(answersResponse.data) ? answersResponse.data : []
//         );
//       } catch (error) {
//         console.error("Error fetching question and answers:", error);
//       } finally {
//         setLoading(false); // Hide loader after fetching data
//       }
//     }

//     if (questionid) {
//       fetchQuestionAndAnswers();
//     }
//   }, [questionid, token]);

//   async function handleSubmit() {
//     const title = Answer.current.value;
//     if (!title) {
//       return alert("Please provide an answer");
//     }

//     try {
//       const response = await axios.post(
//         "api/answers",
//         {
//           questionid: questionid,
//           answer: title,
//         },
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );
//       alert("Answer posted successfully");
//       setShowAnswer([
//         ...showAnswer,
//         { username: user.username, answer: title, userid: user.userid },
//       ]);
//       Answer.current.value = "";
//     } catch (error) {
//       console.error("Error posting answer:", error);
//       alert("Error posting answer");
//     }
//   }

//   return (
//     <div className={classes.answerContainer}>
//       {loading ? (
//         <div className={classes.loader}>
//           <h1
//             style={{
//               display: "flex",
//               justifyContent: "center",
//               alignItems: "center",
//               height: "100vh",
//               margin: 0,
//             }}
//           >
//             <img src={Loading} alt="" />
//           </h1>
//         </div>
//       ) : (
//         <>
//           <div className={classes.right_arrow_title}>
//             <h3>Question</h3>
//           </div>
//           {question && (
//             <>
//               <div className={classes.questionInfo}>
//                 <div>
//                   <FaCircleArrowRight size={18} color="blue" />
//                 </div>
//                 <p className={classes.questionTitle}>{question.title}</p>
//               </div>
//               <div className={classes.questionInfo}>
//                 <p className={classes.questionDescription}>
//                   {showFullDescription
//                     ? question.content
//                     : truncateText(question.content, 100)}
//                   {question.content.length > 100 && (
//                     <span
//                       className={classes.showMore}
//                       onClick={() =>
//                         setShowFullDescription(!showFullDescription)
//                       }
//                     >
//                       {showFullDescription ? " Show Less" : " Show More"}
//                     </span>
//                   )}
//                 </p>
//               </div>
//             </>
//           )}

//           <div>
//             <h3 className={classes.answer_body}>Answers from the community</h3>
//           </div>

//           <div className={classes.answer_item_wrapper}>
//             {Array.isArray(showAnswer) && showAnswer.length > 0 ? (
//               showAnswer.map((answerElement) => (
//                 <div
//                   key={answerElement.answerid}
//                   className={classes.answerItem}
//                 >
//                   <div className={classes.avatarContainer}>
//                     <div>
//                       <p>
//                         <IoPersonCircle size={40} />
//                       </p>
//                       <p className={classes.username}>
//                         {answerElement.username}
//                       </p>
//                     </div>
//                     <div className={classes.old_answer}>
//                       {expandedAnswers[answerElement.answerid]
//                         ? answerElement.answer
//                         : truncateText(answerElement.answer, 50)}
//                       {answerElement.answer.length > 50 && (
//                         <span
//                           className={classes.showMore}
//                           onClick={() =>
//                             setExpandedAnswers((prev) => ({
//                               ...prev,
//                               [answerElement.answerid]:
//                                 !prev[answerElement.answerid],
//                             }))
//                           }
//                         >
//                           {expandedAnswers[answerElement.answerid]
//                             ? " Show Less"
//                             : " Show More"}
//                         </span>
//                       )}
//                     </div>
//                   </div>
//                 </div>
//               ))
//             ) : (
//               <p>No answers yet. Be the first to answer!</p>
//             )}
//           </div>
//           <div className={classes.answerInputContainer}>
//             <textarea
//               className={classes.textarea}
//               placeholder="Your answer ..."
//               ref={Answer}
//             ></textarea>
//             <div className={classes.submitButtonContainer}>
//               <button onClick={handleSubmit} className={classes.submitButton}>
//                 Post Answer
//               </button>
//             </div>
//           </div>
//         </>
//       )}
//     </div>
//   );
// }

// export default AnswerPage;

import React, { useContext, useEffect, useRef, useState } from "react";
import axios from "../../../Axios/Axios";
import { AppState } from "../../../App";
import classes from "./AnswerPage.module.css";
import { useParams } from "react-router-dom";
import { IoPersonCircle } from "react-icons/io5";
import { FaCircleArrowRight } from "react-icons/fa6";
import Loading from "../../../assets/images/loadingicon.gif";

function truncateText(text, limit) {
  if (text.length <= limit) return text;
  return text.slice(0, limit) + "...";
}

function AnswerPage() {
  const { user } = useContext(AppState);
  const { questionid } = useParams();
  const Answer = useRef();
  const [showAnswer, setShowAnswer] = useState([]);
  const [question, setQuestion] = useState(null);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");

  const [showFullDescription, setShowFullDescription] = useState(false);
  const [expandedAnswers, setExpandedAnswers] = useState({}); // Track which answers are expanded
  const [editingAnswerId, setEditingAnswerId] = useState(null); // Track which answer is being edited
  const [editedAnswer, setEditedAnswer] = useState("");

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

  const handleEdit = (answerId, answerContent) => {
    setEditingAnswerId(answerId);
    setEditedAnswer(answerContent);
  };

  const handleSaveEdit = async (answerId) => {
    if (!editedAnswer) {
      return alert("Please provide an edited answer");
    }

    try {
      await axios.put(
        `api/answers/${answerId}`,
        { answer: editedAnswer },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("Answer updated successfully");

      // Update the answer in the UI
      setShowAnswer(
        showAnswer.map((answer) =>
          answer.answerid === answerId
            ? { ...answer, answer: editedAnswer }
            : answer
        )
      );
      setEditingAnswerId(null);
      setEditedAnswer("");
    } catch (error) {
      console.error("Error updating answer:", error);
      alert("Error updating answer");
    }
  };

  const handleDelete = async (answerId) => {
    console.log(answerId);
    try {
      await axios.delete(`api/answers/${answerId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("Answer deleted successfully");

      // Remove the deleted answer from the UI
      setShowAnswer(
        showAnswer.filter((answer) => answer.answerid !== answerId)
      );
    } catch (error) {
      console.error("Error deleting answer:", error);
      alert("Error deleting answer");
    }
  };

  return (
    <div className={classes.answerContainer}>
      {loading ? (
        <div className={classes.loader}>
          <h1
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100vh",
              margin: 0,
            }}
          >
            <img src={Loading} alt="Loading" />
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
                  {showFullDescription
                    ? question.content
                    : truncateText(question.content, 100)}
                  {question.content.length > 100 && (
                    <span
                      className={classes.showMore}
                      onClick={() =>
                        setShowFullDescription(!showFullDescription)
                      }
                    >
                      {showFullDescription ? " Show Less" : " Show More"}
                    </span>
                  )}
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
                      {editingAnswerId === answerElement.answerid ? (
                        <>
                          <textarea
                            value={editedAnswer}
                            onChange={(e) => setEditedAnswer(e.target.value)}
                            className={classes.textarea}
                          />
                          <button
                            onClick={() =>
                              handleSaveEdit(answerElement.answerid)
                            }
                            className={classes.submitButton}
                          >
                            Save
                          </button>
                        </>
                      ) : (
                        <>
                          <p>
                            {expandedAnswers[answerElement.answerid]
                              ? answerElement.answer
                              : truncateText(answerElement.answer, 50)}
                          </p>
                          {answerElement.answer.length > 50 && (
                            <span
                              className={classes.showMore}
                              onClick={() =>
                                setExpandedAnswers((prev) => ({
                                  ...prev,
                                  [answerElement.answerid]:
                                    !prev[answerElement.answerid],
                                }))
                              }
                            >
                              {expandedAnswers[answerElement.answerid]
                                ? " Show Less"
                                : " Show More"}
                            </span>
                          )}
                          {answerElement.userid === user.userid && (
                            <div>
                              <button
                                onClick={() =>
                                  handleEdit(
                                    answerElement.answerid,
                                    answerElement.answer
                                  )
                                }
                                className={classes.editButton}
                              >
                                Edit
                              </button>
                              <button
                                onClick={() =>
                                  handleDelete(answerElement.answerid)
                                }
                                className={classes.deleteButton}
                              >
                                Delete
                              </button>
                            </div>
                          )}
                        </>
                      )}
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
