import React from "react";
import ResumePreview from "./resumePreview";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { saveDetails } from "../../redux/actions/detailsActions";
import { useFirestore } from "react-redux-firebase";
import { connect } from "react-redux";

function Finalize(props) {
  let educationSection = props.education.data;
  let contactSection = props.contact.data;
  let documentd = props.document;
  let firestore = useFirestore();

  const saveToDatabase = async () => {
    let user = await firestore.collection("users").doc(props.auth.uid).get();
    user = user.data();

    let data;
    if (user.resumeId != undefined) {
      data = {
        ...user.resumeId,
        [documentd.skinCd]: {
          educationSection: educationSection,
          contactSection: contactSection,
          documentd: documentd,
        },
      };
    } else {
      data = {
        [documentd.skinCd]: {
          educationSection: educationSection,
          contactSection: contactSection,
          documentd: documentd,
        },
      };
    }

    props.saveDetailsFun(data, props.auth.uid, documentd.skinCd);
  };

  const downloadResume = () => {
    const input = document.getElementById("resumePreview");

    html2canvas(input)
      .then((canvas) => {
        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF("p", "mm", "a4");
        var width = pdf.internal.pageSize.getWidth();
        var height = pdf.internal.pageSize.getHeight();
        pdf.addImage(imgData, "JPEG", 0, 0, width, height);
        pdf.save("resume.pdf");
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <div className="container full finalize-page">
      <div className="funnel-section ">
        <div className="finalize-preview-card " id="resumePreview">
          <ResumePreview
            contactSection={contactSection}
            educationSection={educationSection}
            skinCd={props?.document?.skinCd}
          ></ResumePreview>
        </div>
        <div className="finalize-settings center">
          <div className=" download-resume resume-options">
            <p className="no-margin">Download Resume As PdF</p>
            <a style={{ cursor: "pointer" }} onClick={downloadResume}>
              download Resume
            </a>
          </div>
          <div className=" download-resume resume-options">
            <p className="no-margin">Save to Database</p>
            <a style={{ cursor: "pointer" }} onClick={saveToDatabase}>
              Save to Database
            </a>
          </div>
          {props.details.loading ? (
            <h3>Working...</h3>
          ) : props.details.error == "" ? (
            <></>
          ) : (
            <h3>{props.details.error}</h3>
          )}
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    document: state.document,
    contact: state.contact,
    education: state.education,
    auth: state.firebase.auth,
    details: state.details,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    saveDetailsFun: (data, id, skinCd) => dispatch(saveDetails(data, id, skinCd)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Finalize);
