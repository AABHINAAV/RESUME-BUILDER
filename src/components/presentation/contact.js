import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { fieldCd, skinCodes } from "../../constants/typeCodes";
import ResumePreview from "./resumePreview";
import {
  fetchContactDetails,
  setContact,
  updateContact,
} from "../../redux/actions/contactActions";
import { connect } from "react-redux";

function Contact(props) {
  let history = useHistory();
  const [contact, setContact] = useState(props.contact.data);

  //   if someone comes to this by tempering the url then send it back
  useEffect(() => {
    if (!props.document || !props.document.id) {
      history.push("/getting-started");
    }
  }, []);

  useEffect(() => {
    setContact(props.contact.data);
  }, [props.contact.data]);

  const changeInputValue = (event) => {
    var key = event.target.name;
    var val = event.target.value;
    setContact({ ...contact, [key]: val });
  };

  const onSubmit = async () => {
    if (props.contact == null) {
      props.setContact(contact);
    } else {
      props.updateContact(contact);
    }

    history.push("/education");
  };

  const getFieldData = (key) => {
    if (contact && contact[key]) {
      return contact[key];
    }
    return "";
  };

  const fetchDataCallFun = async () => {
    await props.fetchDataFun(props.document.skinCd, props.auth.uid);
  };

  return (
    <div className="container med contact">
      <div className="center fa-5x">
        <button
          className="btn hvr-float-shadow"
          type="button"
          onClick={fetchDataCallFun}
        >
          Fetch Previous Contact Data
        </button>
        {props.contact.loading ? (
          <h3 style={{ color: "red" }}>Working...</h3>
        ) : props.contact.error == "" ? (
          <></>
        ) : (
          <h3>{props.contact.error}</h3>
        )}
      </div>
      <div className="section funnel-section">
        <div className="form-card">
          <h2 className="form-heading center">Personal Details</h2>
          <div className="form-section">
            <div className="input-group">
              <label>First Name</label>
              <div className="effect">
                <input
                  type="text"
                  name={fieldCd.FirstName}
                  value={getFieldData(fieldCd.FirstName)}
                  onChange={changeInputValue}
                />
                <span></span>
              </div>
              <div className="error"></div>
            </div>

            <div className="input-group">
              <label>Last Name</label>
              <div className="effect">
                <input
                  type="text"
                  name={fieldCd.LastName}
                  value={getFieldData(fieldCd.LastName)}
                  onChange={changeInputValue}
                />
                <span></span>
              </div>
              <div className="error"></div>
            </div>

            <div className="input-group full">
              <label>Professional Summary</label>
              <div className="effect">
                <input
                  type="text"
                  name={fieldCd.ProfSummary}
                  value={getFieldData(fieldCd.ProfSummary)}
                  onChange={changeInputValue}
                />
                <span></span>
              </div>
              <div className="error"></div>
            </div>

            <div className="input-group">
              <label>Email</label>
              <div className="effect">
                <input
                  type="text"
                  name={fieldCd.Email}
                  value={getFieldData(fieldCd.Email)}
                  onChange={changeInputValue}
                />
                <span></span>
              </div>
              <div className="error"></div>
            </div>

            <div className="input-group">
              <label>Phone</label>
              <div className="effect">
                <input
                  type="text"
                  name={fieldCd.Phone}
                  value={getFieldData(fieldCd.Phone)}
                  onChange={changeInputValue}
                />
                <span></span>
              </div>
              <div className="error"></div>
            </div>

            <div className="input-group">
              <label>Profession</label>
              <div className="effect">
                <input
                  type="text"
                  name={fieldCd.Profession}
                  value={getFieldData(fieldCd.Profession)}
                  onChange={changeInputValue}
                />
                <span></span>
              </div>
              <div className="error"></div>
            </div>
            <div className="input-group">
              <label>Street</label>
              <div className="effect">
                <input
                  type="text"
                  name={fieldCd.Street}
                  value={getFieldData(fieldCd.Street)}
                  onChange={changeInputValue}
                />
                <span></span>
              </div>
              <div className="error"></div>
            </div>

            <div className="input-group">
              <label>City</label>
              <div className="effect">
                <input
                  type="text"
                  name={fieldCd.City}
                  value={getFieldData(fieldCd.City)}
                  onChange={changeInputValue}
                />
                <span></span>
              </div>
              <div className="error"></div>
            </div>

            <div className="input-group">
              <label>State</label>
              <div className="effect">
                <input
                  type="text"
                  name={fieldCd.State}
                  value={getFieldData(fieldCd.State)}
                  onChange={changeInputValue}
                />
                <span></span>
              </div>
              <div className="error"></div>
            </div>

            <div className="input-group">
              <label>Country</label>
              <div className="effect">
                <input
                  type="text"
                  name={fieldCd.Country}
                  value={getFieldData(fieldCd.Country)}
                  onChange={changeInputValue}
                />
                <span></span>
              </div>
              <div className="error"></div>
            </div>
            <div className="input-group">
              <label>Pin Code</label>
              <div className="effect">
                <input
                  type="text"
                  name={fieldCd.ZipCode}
                  value={getFieldData(fieldCd.ZipCode)}
                  onChange={changeInputValue}
                />
                <span></span>
              </div>
              <div className="error"></div>
            </div>
            <div className="form-buttons">
              <button
                onClick={onSubmit}
                className="btn hvr-float-shadow"
                type="button"
              >
                Next
              </button>
              <NavLink to="/getting-started" className="center">
                Back
              </NavLink>
            </div>
          </div>
        </div>

        <div className="preview-card">
          <ResumePreview
            contactSection={contact}
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
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setContact: (contact) => dispatch(setContact(contact)),
    updateContact: (contact) => dispatch(updateContact(contact)),
    fetchDataFun: (skinCd, id) => dispatch(fetchContactDetails(skinCd, id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Contact);
