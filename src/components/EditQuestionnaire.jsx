import { useParams, useNavigate, NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Header from "./Header";

const EditQuestionnaire = () => {
  const [question, setQuestion] = useState("");
  const [agree, setAgree] = useState("");
  const [neutral, setNeutral] = useState("");
  const [disagree, setDisagree] = useState("");

  const { id } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get(`http://localhost:3000/QuestionnaireDB/${id}`)
      .then((response) => {
        const questionnaire = response.data;
        setQuestion(questionnaire.question);
        setAgree(questionnaire.agree);  
        setNeutral(questionnaire.neutral);
        setDisagree(questionnaire.disagree);

      });
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault(); 
    const dataSet = {
      question: question,
      agree: parseInt(agree),
      neutral: parseInt(neutral),
      disagree: parseInt(disagree),
    };

    try {
      const response = await axios.put(`http://localhost:3000/QuestionnaireDB/${id}`, dataSet);
    console.log(response.data);
    
    if (response.status === 200) {
      navigate('/');
    }
    } catch (error) {
      console.error("Error updating response:", error);
    }
  };

  return (
    <div className="Context">
      <Header />
      <div className="logo">
        <NavLink to={{ pathname: `/` }}>
          <img
            src="./Questions-bro.png"
            placeholder="Home"
            style={{width:"100%", height:"8em"}}
          />            
        </NavLink>
      </div>
      <div className="editContext">
        <h1>Edit</h1>
        <form onSubmit={handleSubmit}>
          <table className="editTable">
            <tr>
              <td>
                <input
                  type="text"
                  className="submit__form-input"
                  name="question"
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  required
                />         
              </td>
            </tr>
            <tr>
              <td>
                <button className="submit__form-btnSubmit" type="submit">Update</button>
              </td>
            </tr>
          </table>
        </form>
      </div>
    </div>
  );
};

export default EditQuestionnaire;
