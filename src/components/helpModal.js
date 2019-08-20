import React from "react";
import ReactModal from "react-modal";
import styles from "./helpModal.module.scss";

const HelpModal = props => {
  return (
    <ReactModal
      isOpen={props.isOpen}
      className={styles.helpModal}
      overlayClassName={styles.overlay}
      contentLabel="help modal"
      onRequestClose={props.closeModal}
    >
      <div className={styles.titleBar}>
        <button
          type="button"
          onClick={props.closeModal}
          className={styles.closeButton}
        >
          Close
        </button>
        <h2>
          How to Use <em>Org to Resume</em>
        </h2>
      </div>
      <div className={styles.content}>
        <h3 className={styles.topHeading}>Basics</h3>
        <p>
          Enter Org Markup (see below) and CSS in the editor pane on the left.
          The markup is converted to HTML, styled with your CSS, and displayed
          in the preview pain on the right. See the first demo for an example.
          Each pane as a toggle button in the upper right corner to switch
          between Org/CSS and HTML/Preview.
        </p>
        <h3>To Print/Save</h3>
        <p>
          To print your document or save a PDF, use the print button in the
          toolbar. You can then use the "print to PDF" option to save a PDF copy
          of your document. <b>Note: </b>There have been some issues with Google
          Chrome generating PDFs where the text can't be selected. If you need
          this and run into this issue, please try Firefox or Safari. I am
          working on fixing this issue.
        </p>
        <h3>Org Markup Basics</h3>
        <p>
          Org to Resume use a subset or Org Markup, which is primarily used with
          the Org Mode software in the text editor Emacs. The supported syntax
          are as follows.
        </p>
        <div className={styles.orgMarkupBasics}>
          <h4>Title</h4>
          <p>
            Titles are represented by{" "}
            <span className={styles.code}>#+TITLE:</span> followed by the name
            of the title. The title{" "}
            <em>is used as meta data, and are not rendered in the document</em>
          </p>
          <h4>Headings</h4>
          <p>
            Headings are represented by 1-6 asterisks, followed by a space and
            then some texts. They are converted to their equivalent HTML
            headings
          </p>
          <div className={styles.example}>
            <h5>Example: </h5>
            <p>
              <span className={styles.code}>* This is a heading</span> is
              converted to{" "}
              <span className={styles.code}>
                {" <h1>This is a heading</h1>"}
              </span>{" "}
              and{" "}
              <span className={styles.code}>*** This is another heading</span>{" "}
              is converted to{" "}
              <span className={styles.code}>
                {" <h3>This is another heading</h3>"}
              </span>
            </p>
          </div>
          <h4>Plain Text</h4>
          <p>
            Any plain text written below a heading is rendered inside a{" "}
            <span className={styles.code}>{"<p>"}</span> tag.
          </p>
          <h4>Tags</h4>
          <p>
            Tags can be added to any heading. The syntax for a tag is{" "}
            <span className={styles.code}>:tag:</span> where anything between
            the two colons is added as a tag to the corresponding heading in the
            generated html.
          </p>
          <h4>Adding Divs</h4>
          <p>
            Divs can be added to your markup in order to group content for
            styling in the html. In order to add a div, add a tag to a header
            that looks like{" "}
            <span className={styles.code}>:div_name-of-div:</span> and that
            heading along with any children (all content below the heading until
            the next heading of the same level) will be placed in a div with the
            class name "name-of-div"
          </p>
          <div className={styles.example}>
            <h5>Example:</h5>
            <p>
              Please see the first demo for examples of how to use this feature
            </p>
          </div>
        </div>
      </div>
    </ReactModal>
  );
};

export default HelpModal;
