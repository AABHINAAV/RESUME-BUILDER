import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { NavLink } from "react-router-dom";
import ResumePreview from "./resumePreview";
import { fieldCd } from "./../../constants/typeCodes";
import {
  fetchEducationDetails,
  setEducation,
  updateEducation,
} from "../../redux/actions/educationActions";
import { connect } from "react-redux";

function Education(props) {
  let history = useHistory();
  const [education, setEducation] = useState(props.education.data);

  useEffect(() => {
    setEducation(props.education.data);
  }, [props.education.data]);

  const onchange = (event) => {
    var key = event.target.name;
    var val = event.target.value;
    setEducation({ ...education, [key]: val });
  };

  const getFieldData = (key) => {
    if (education && education[key]) {
      return education[key];
    }
    return "";
  };

  const onSubmit = async (e) => {
    if (props.education == null) {
      props.setEducation(education);
    } else {
      props.updateEducation(education);
    }

    history.push("/finalize");
  };

  const fetchDataCallFun = async () => {
    await props.fetchDataFun(props.document.skinCd, props.auth.uid);
  };

  return (
    <div className="container med education">
      <div className="center fa-5x">
        <button
          className="btn hvr-float-shadow"
          type="button"
          onClick={fetchDataCallFun}
        >
          Fetch Previous Education Data
        </button>
        {props.education.loading ? (
          <h3 style={{ color: "red" }}>Working...</h3>
        ) : props.education.error == "" ? (
          <></>
        ) : (
          <h3>{props.education.error}</h3>
        )}
      </div>
      <div className="section funnel-section">
        <div className="form-card">
          <h2 className="form-heading center">Educational Section</h2>
          <div className="form-section">
            <div className="input-group">
              <label>College Name</label>
              <div className="effect">
                <input
                  type="text"
                  name={fieldCd.SchoolName}
                  onChange={onchange}
                  value={getFieldData(fieldCd.SchoolName)}
                />
                <span></span>
              </div>
              <div className="error"></div>
            </div>

            <div className="input-group">
              <label>Degree</label>
              <div className="effect">
                <input
                  type="text"
                  name={fieldCd.Degree}
                  onChange={onchange}
                  value={getFieldData(fieldCd.Degree)}
                />
                <span></span>
              </div>
              <div className="error"></div>
            </div>

            <div className="input-group">
              <label>CGPA</label>
              <div className="effect">
                <input
                  type="text"
                  name={fieldCd.GraduationCGPA}
                  onChange={onchange}
                  value={getFieldData(fieldCd.GraduationCGPA)}
                />
                <span></span>
              </div>
              <div className="error"></div>
            </div>

            <div className="input-group">
              <label>City/State</label>
              <div className="effect">
                <input
                  type="text"
                  name={fieldCd.City}
                  onChange={onchange}
                  value={getFieldData(fieldCd.City)}
                />
                <span></span>
              </div>
              <div className="error"></div>
            </div>

            <div className="input-group">
              <label>Graduation Month</label>
              <div className="effect">
                <input
                  type="text"
                  name={fieldCd.GraduationDate}
                  onChange={onchange}
                  value={getFieldData(fieldCd.GraduationDate)}
                />
                <span></span>
              </div>
              <div className="error"></div>
            </div>

            <div className="input-group">
              <label>Graduation Year</label>
              <div className="effect">
                <input
                  type="text"
                  name={fieldCd.GraduationYear}
                  onChange={onchange}
                  value={getFieldData(fieldCd.GraduationYear)}
                />
                <span></span>
              </div>
              <div className="error"></div>
            </div>

            <div className="form-buttons">
              <button
                className="btn hvr-float-shadow"
                type="button"
                onClick={onSubmit}
              >
                Next
              </button>
              <NavLink to="/contact" className="center">
                Back
              </NavLink>
            </div>
          </div>
        </div>
        <div className="preview-card">
          <ResumePreview
            contactSection={props.contact.data}
            educationSection={education}
            skinCd={props?.document?.skinCd}
          ></ResumePreview>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
    document: state.document,
    contact: state.contact,
    education: state.education,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setEducation: (education) => dispatch(setEducation(education)),
    updateEducation: (education) => dispatch(updateEducation(education)),
    fetchDataFun: (skinCd, id) => dispatch(fetchEducationDetails(skinCd, id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Education);
