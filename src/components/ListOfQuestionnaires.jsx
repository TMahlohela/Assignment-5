import React from "react";
import Questions from "./Questions";

const ListOfQuestionnaires = ({questionnaires,onDeleteMember}) => {

  return (
    <div>      
        <div>
          <h1>{questionnaires.legnth === 0 && "No "} List of Questionnaires</h1>
          { 
          questionnaires.map((questions, index)=>(
            <Questions key= {index} questions={questions} onDeleteMember={onDeleteMember} />
          ))}
        </div>      
    </div>
  );
};

export default ListOfQuestionnaires;
