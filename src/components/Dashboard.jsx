import Header from "./Header";
import React, { useEffect, useState } from "react";
import axios from "axios";

const DashBoard = () => {
  const [questionnaires, setQuestionnaires] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3000/QuestionnaireDB").then((response) => {
      setQuestionnaires(response.data);
    });
  }, []);

  const data = [...questionnaires];
  let totalAgree = 0;
  let totalNeutral = 0;
  let totalDisagree = 0;

  data.map((item, index) => {
    totalAgree += data[index].agree;
    totalNeutral += data[index].neutral;
    totalDisagree += data[index].disagree;
  });
  const totalQuestions = data.length;

  return (
    <>
      <Header />
      <div className="Context">
        <h1>Dashboard</h1>

        <table className="main-container">
          <tr>
            <td>
              <div className="card">
                <h3>Number of Questions</h3>
                <h1>{totalQuestions}</h1>
              </div>
            </td>
            <td>
              <div className="card">
                <h3>Agreements</h3>
                <h1>{totalAgree}</h1>
              </div>
            </td>
            <td>
              <div className="card">
                <h3>Disagreements</h3>
                <h1>{totalDisagree}</h1>
              </div>
            </td>
            <td>
              <div className="card">
                <h3>Neutral</h3>
                <h1>{totalNeutral}</h1>
              </div>
            </td>
          </tr>
        </table>
      </div>
    </>
  );
};

export default DashBoard;
