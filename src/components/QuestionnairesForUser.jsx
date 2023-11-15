import { React, useState, useEffect } from "react";
import Header from "./Header";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./style.css";

const QuestionnairesForUser = () => {
  const [questionnaires, setQuestionnaires] = useState([]);
  const [responses, setResponses] = useState({});
  const navigate = useNavigate();
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    axios.get("http://localhost:3000/QuestionnaireDB").then((response) => {
      const questionnaire = response.data;
      setQuestionnaires(questionnaire);
      if (questionnaire && questionnaire.question) {
        console.log("QuestionnaireDB", questionnaire.question);
      }
    });
  }, []);

  useEffect(() => {
    const isValid = questionnaires.every((_, index) => !!responses[index]);
    setIsFormValid(isValid);
  }, [questionnaires, responses]);

  const handleResponse = (questionId, response) => {
    const previousResponse = responses[questionId];

    if (previousResponse) {
      setQuestionnaires((prevQuestionnaires) => {
        return prevQuestionnaires.map((item, index) => {
          if (index === questionId) {
            return {
              ...item,
              [previousResponse]: item[previousResponse] - 1,
              [response]: item[response] + 1,
            };
          }
          return item;
        });
      });
    } else {
      setQuestionnaires((prevQuestionnaires) => {
        return prevQuestionnaires.map((item, index) => {
          if (index === questionId) {
            return {
              ...item,
              [response]: item[response] + 1,
            };
          }
          return item;
        });
      });
    }

    setResponses((prevResponses) => ({
      ...prevResponses,
      [questionId]: response,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const promises = questionnaires.map(async (item, index) => {
        const questionData = {
          question: item.question,
          agree: item.agree,
          neutral: item.neutral,
          disagree: item.disagree,
        };
  
        const response = await axios.put(
          `http://localhost:3000/QuestionnaireDB/${item.id}`,
          questionData
        );
  
        console.log(`Question ${index} updated:`, response.data);
  
        return response;
      });
  
      await Promise.all(promises);
  
      console.log("Questionnaire updated.");
      navigate("/");
   
    } catch (error) {
      console.error("Oops. There was a problem updating your questions. Please reresh and try again.", error);      
    }
  };

  return (
    <div>
      <Header />
      <form onSubmit={handleSubmit}
        className="Context"
      >
        <h1>Questionnaire</h1>
        {questionnaires.length > 0 ? (questionnaires.map((question, index) => (
          <div key={index}>
            <div className="questionnaireResponse">
              <p>{question.question}</p>
              <div className="responsePrompts">
                <label>Agree</label>
                <input
                  type="radio"
                  name={`response_${index}`}
                  value="agree"
                  checked={responses[index] === "agree"}
                  onChange={() => handleResponse(index, "agree")}
                />
                <label>Neutral</label>
                <input
                  type="radio"
                  name={`response_${index}`}
                  value="neutral"
                  checked={responses[index] === "neutral"}
                  onChange={() => handleResponse(index, "neutral")}
                />
                <label>Disagree</label>
                <input
                  type="radio"
                  name={`response_${index}`}
                  value="disagree"
                  checked={responses[index] === "disagree"}
                  onChange={() => handleResponse(index, "disagree")}
                />
              </div>            
            </div>
          </div>
        ))) : (
          <p>No Question/s To Load...</p>
        )}
        <button type="submit" className="btnSubmit" disabled={!isFormValid}>
           <span>Submit </span>
        </button>
      </form>
    </div>
  );
};
export default QuestionnairesForUser;
