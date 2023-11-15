import "./style.css";
import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <>
      <div className="logo">
        <NavLink to={{ pathname: `/` }}>
          <img
            src="./Questions-bro.png"
            placeholder="Home"
            style={{width:"100%", height:"8em"}}
          />            
        </NavLink>
      </div>
      <div className="sidebar">
        <ul>
          <NavLink to={{ pathname: `/dashBoard` }}>
            <li>Dashboard</li>
          </NavLink>

          <NavLink to={{ pathname: `/QuestionnairesForUser` }}>
            <li>Questionnaire</li>
          </NavLink>

          <NavLink to={{ pathname: `/create` }}>
            <li>Create</li>
          </NavLink>
        </ul>
      </div>
    </>
  );
}

export default Header;
