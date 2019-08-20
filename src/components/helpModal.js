import React from "react";

const HelpModal = props => {
  return (
    <div>
      <button type="button" onClick={props.closeModal}>
        Close
      </button>
      <h2>Welcome to Org to Resume!</h2>
      <h3>About the App</h3>
      <p>
        <em>Org to Resume</em> allows you to enter Org markup (see below) and
        CSS on the editor panel on the left, and then converts the markup/css to
        a styled document which is shown in the panel on the right. You can also
        view the underlying html there for refernence when styling. To download
        a PDF, hit the print button in the tool bar and use your browser's{" "}
        <em>print to pdf</em> option
      </p>
    </div>
  );
};

export default HelpModal;
