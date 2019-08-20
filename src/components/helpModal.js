import React from "react";
import ReactModal from "react-modal";

const HelpModal = props => {
  return (
    <ReactModal
      isOpen={props.isOpen}
      className="help-modal"
      overlayClassName="overlay"
      contentLabel="help modal"
      onRequestClose={() => this.setState({ helpModalOpen: false })}
    >
      <div>
        <button type="button" onClick={props.closeModal}>
          Close
        </button>
        <h2>Welcome to Org to Resume!</h2>
        <h3>
          How to Use <em>Org to Resume</em>
        </h3>
        <h4>Basics</h4>
        <p>
          Enter Org Markup (see below) and CSS in the editor pane on the left.
          The markup is converted to HTML, styled with your CSS, and displayed
          in the preview pain on the right. See the first demo for an example.
          Each pane as a toggle button in the upper right corner to switch
          between Org/CSS and HTML/Preview.
        </p>
        <h4>To Print/Save</h4>
        <p>
          To print your document or save a PDF, use the print button in the
          toolbar. You can then use the "print to PDF" option to save a PDF copy
          of your document. <b>Note: </b>There have been some issues with Google
          Chrome generating PDFs where the text can't be selected. If you need
          this and run into this issue, please try Firefox or Safari. I am
          working on fixing this issue.
        </p>
        <h4>Org Markup Basics</h4>
        <p>
          Org to Resume use a subset or Org Markup, which is primarily used with
          the Org Mode software in the text editor Emacs. The supported syntax
          are as follows.
        </p>
        <h5>Title</h5>
        <p>
          Titles are represented by{" "}
          <span className="org-example">#+TITLE: </span> followed by the name of
          the title. The title{" "}
          <em>is used as meta data, and are not rendered in the document</em>
        </p>
        <h5>Headings</h5>
        <p>
          Headings are represented by 1-6 asterisks, followed by a space and
          then some texts. They are converted to their equivalent HTML headings
        </p>
        <h6>Example: </h6>
        <p>
          <span className="org-example">* This is a heading</span> is converted
          to {" <h1>This is a heading</h1>"} and{" "}
          <span className="org-example">*** This is another heading</span> is
          converted to {" <h3>This is another heading</h3>"}
        </p>
        <h5>Plain Text</h5>
        <p>
          Any plain text written below a heading is rendered inside a {"<p>"}{" "}
          tag.
        </p>
        <h5>Tags</h5>
        <p>
          Tags can be added to any heading. The syntax for a tag is{" "}
          <span className="org-example">:tag:</span> where anything between the
          two colons is added as a tag to the corresponding heading in the
          generated html.
        </p>
        <h5>Adding Divs</h5>
        <p>
          Divs can be added to your markup in order to group content for styling
          in the html. In order to add a div, add a tag to a header that looks
          like <span className="org-example">:div_name-of-div:</span> and that
          heading along with any children (all content below the heading until
          the next heading of the same level) will be placed in a div with the
          class name "name-of-div"
        </p>
        <h6>Example:</h6>
        <p>Please see the first demo for examples of how to use this feature</p>
      </div>
    </ReactModal>
  );
};

export default HelpModal;
