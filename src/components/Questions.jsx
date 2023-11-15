import { Link } from "react-router-dom";
import { FaTrash } from "react-icons/fa";
import { FaPen } from "react-icons/fa";

const Questions = ({ questions,onDeleteMember }) => {
    return (
        <div className="questions">
            <p>{questions.question +"  "}
            <Link
                to={{ pathname: `/editQuestionnaire/${questions.id}` }}
            >
                <FaPen/>
            </Link>
            <Link
                to={{ pathname: `/` }}
                onClick={() => onDeleteMember(questions.id)}
            >
                <FaTrash/>
            </Link>
            </p>
        </div>
    );
}

export default Questions
