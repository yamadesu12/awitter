//탐라 프로필 선택창
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSchool } from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-solid-svg-icons";

const Navigation = ({ userObj }) => {
  return (
    <nav>
      <ul style={{ display: "flex", justifyContent: "center", marginTop: 50 }}>
        <li>
          <Link to="/" style={{ marginRight: 20, textAlign: "center" }}>
            <div>
              <FontAwesomeIcon icon={faSchool} color={"#FFCCE5"} size="3x" />
            </div>
            <div style={{ marginTop: 10, fontSize: "14px" }}>
              {userObj.displayName ? "홈" : "Home"}
            </div>
          </Link>
        </li>
        <li>
          <Link
            to="/profile"
            style={{
              marginLeft: 70,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              fontSize: 12,
            }}
          >
            <FontAwesomeIcon icon={faUser} color={"#FFCCE5"} size="3x" />
            <div style={{ marginTop: 14, fontSize: "14px" }}>
              {userObj.displayName ? `${userObj.displayName}의 프로필` : "Profile"}
            </div>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;