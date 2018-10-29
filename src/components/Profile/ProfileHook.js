import React, { useState, useEffect } from "react";
import "./Profile.css";
import { connect } from "react-redux";
import axios from "axios";

function ProfileHook(props) {
  const position = useUpdate(props.user.position);
  const campus = useUpdate(props.user.campus);

  function useUpdate(initialValue) {
    const [value, setValue] = useState(initialValue);

    function handleChange(e) {
      setValue(e.target.value);
    }
    return {
      value,
      onChange: handleChange
    };
  }

  const submitProfile = e => {
    axios.put("/api/profile", {
      id: props.user.user_id,
      position: position.value,
      campus: campus.value
    });
  };

  return (
    <div className="profile">
      <div className="profile_side">
        <img src={props.user.picture} className="profileCircle" />
        <div className="profile_right">
          <div className="username">{props.user.username}</div>
          <div className="data_container">
            {props.user.position ? (
              <div>
                <div>{props.user.position}</div>
                <div>{props.user.campus}</div>
              </div>
            ) : (
              <div className="profile_section">
                <div>
                  <select {...position}>
                    <option selected disabled>
                      Position
                    </option>
                    <option value="Campus Director">Campus Director</option>
                    <option value="Student Success">Student Success</option>
                    <option value="Office Manager">Office Manager</option>
                  </select>
                </div>
                <div>
                  <select {...campus}>
                    <option selected disabled>
                      Campus
                    </option>
                    <option value="Provo">Provo</option>
                    <option value="Salt Lake City">Salt Lake City</option>
                    <option value="Phoenix">Phoenix</option>
                    <option value="Dallas">Dallas</option>
                  </select>
                  <button onClick={submitProfile}>Submit</button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = state => state;

export default connect(mapStateToProps)(ProfileHook);
