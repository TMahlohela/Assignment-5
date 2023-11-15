import Header from "./Header";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const Questionnaire = () => {
  const [question, setQuestion] = useState("");
  const [response, setResponse] = useState("");
  const { id } = useParams();
  
  useEffect(() => {
    axios
      .get(`http://localhost:3000/QuestionnaireDB/${id}`)
      .then((response) => {
        const questionnaire = response.data;
        setQuestion(questionnaire.question);
        setResponse(questionnaire.response);
      });
  }, [id]);

  const handleResponse = async (value) => {
    setResponse(value);
    const dataSet = {
      response: value,
      question: question,
    };

    try {
      await axios
        .put(`http://localhost:3000/QuestionnaireDB/${id}`, dataSet)
        .then((res) => {
          console.log(res.data);
          alert("Saved. Please press OK!");
          if (res.ok) {
            alert("Saved. Please press OK!");
          }
        });
    } catch (error) {
      console.error("Oops, there was a problem updating your response. Please try again.:", error);
    }
  };
  
  return (
    <div>
      <Header />
      <div className="Context">
        <h1>Questionnaire</h1>
        <p>Question: {question}</p>
        <div>
          <label>
            <input
              type="radio"
              name="response"
              value="agree"
              checked={response === "agree"}
              onChange={() => handleResponse("agree")}
            />{" "}
            Agree
          </label>
          <label>
            <input
              type="radio"
              name="response"
              value="neutral"
              checked={response === "neutral"}
              onChange={() => handleResponse("neutral")}
            />{" "}
            Neutral
          </label>
          <label>
            <input
              type="radio"
              name="response"
              value="disagree"
              checked={response === "disagree"}
              onChange={() => handleResponse("disagree")}
            />{" "}
            Disagree
          </label>
        </div>
      </div>
    </div>
  );
};

export default Questionnaire;
