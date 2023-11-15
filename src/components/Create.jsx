import Header from "./Header";
import React, { useState, useEffect } from "react";
import axios from "axios";
import ListOfQuestionnaires from "./ListOfQuestionnaires";
import "./style.css";

const Create = () => {
  const [question, setQuestion] = useState("");

  const [questionnaires, setQuestionnaires] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3000/QuestionnaireDB").then((response) => {
      setQuestionnaires(response.data);
    });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = {
        question: question,
        agree: 0,
        neutral: 0,
        disagree: 0,
      };
      const response = await axios.post("http://localhost:3000/QuestionnaireDB", formData);
      setQuestionnaires([...questionnaires, response.data]);
      setQuestion("");
    } catch (error) {
      console.error("Oops, there was a problem creating your question. Please try again.:", error);
    }
  };

  const onDeleteMember = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/QuestionnaireDB/${id}`);
      setQuestionnaires((prevData) => prevData.filter((a) => a.id !== id));
    } catch (error) {
      console.error("Oops, there was a problem deleting the question. Please try again.:", error);
    }
  };
  
  return (
    <div>
      <Header />
      <div className="Context">
        <h1 className="main__Heading">Creating A Questionnaire</h1>
        <form onSubmit={handleSubmit}
          className="submit__form"
        >
          <input
            type="text"
            className="submit__form-input"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            required
          />
          <button className="btnSubmit" type="submit">
            <span>Add</span>
          </button>
        </form>
        {questionnaires.length > 0 ? (
          <List
            questionnaires={questionnaires}
            onDeleteMember={onDeleteMember}
          />
        ) : (
          <h2>No Questions</h2>
        )}
      </div>
    </div>
  );
};

export default Create;
