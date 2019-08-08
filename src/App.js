import React from "react";
import Editor from "./components/editor";
import Previewer from "./components/previewer";
import Select from "react-select";
import "./App.scss";

class App extends React.Component {
  //this is a comment that I can't read
  constructor(props) {
    super(props);
    const selectedDocument = Number(localStorage.getItem("selectedDocument"));
    this.state = {
      documents: [
        {
          title: "Demo 1",
          text: initialText,
          css: initialCSS
        },
        {
          title: "Demo 2",
          text: `#+TITLE: Demo 2
* This is the second demo`,
          css: ""
        }
      ],
      selectedDocument: selectedDocument,
      editorMaximized: true
    };
    const userDocuments = JSON.parse(localStorage.getItem("documents"));
    if (userDocuments) {
      userDocuments.forEach(doc => this.state.documents.push(doc));
    }
    this.toggleEditorMaximized = this.toggleEditorMaximized.bind(this);
    this.selectedDocumentChange = this.selectedDocumentChange.bind(this);
    this.documentChange = this.documentChange.bind(this);
  }

  documentChange(type, input) {
    this.setState(state => {
      return {
        documents: state.documents.map((doc, index) => {
          if (index === state.selectedDocument) {
            doc[type] = input;
          }
          return doc;
        }),
        ...state
      };
    });
    // Don't save demos to local storage
    if (this.state.selectedDocument > 1) {
      localStorage.setItem(
        "documents",
        JSON.stringify(this.state.documents.slice(2))
      );
    }
  }

  selectedDocumentChange(input) {
    if (input.value === -1) {
      this.setState(state => {
        localStorage.setItem("selectedDocument", state.documents.length);
        return {
          documents: [
            ...state.documents,
            { title: "", text: "#+TITLE: ", css: "" }
          ],
          selectedDocument: state.documents.length,
          editorMaximized: state.editorMaximized
        };
      });
    } else {
      this.setState({
        selectedDocument: input.value
      });
      localStorage.setItem("selectedDocument", input.value);
    }
  }

  toggleEditorMaximized() {
    this.setState({
      editorMaximized: !this.state.editorMaximized
    });
  }

  render() {
    const currentDocument = this.state.documents[this.state.selectedDocument];
    const options = [
      {
        label: "Demos",
        options: [
          ...this.state.documents.slice(0, 2).map((doc, index) => {
            return {
              value: index,
              label: doc.title
            };
          })
        ]
      },
      {
        label: "Your Documents",
        options: [
          ...this.state.documents.slice(2).map((doc, index) => {
            return {
              value: index,
              label: doc.title
            };
          }),
          {
            value: -1,
            label: "New Document",
            color: "rgba(0, 0, 0, .7)",
            fontStyle: "italic",
            background: "rgba(0, 0, 0, .04)"
          }
        ]
      }
    ];
    const styles = {
      option: (styles, { data }) => ({
        ...styles,
        color: data.color ? data.color : null,
        background: data.background ? data.background : null,
        fontStyle: data.fontStyle ? data.fontStyle : null
      })
    };
    const selector = (
      <Select
        value={{
          value: this.state.selectedDocument,
          label: currentDocument.title
        }}
        onChange={this.selectedDocumentChange}
        options={options}
        isSearchable={false}
        styles={styles}
        menuIsOpen={true}
        className="documentSelectorContainer"
        classNamePrefix="documentSelector"
      />
    );
    return (
      <div
        id="App"
        className={this.state.editorMaximized ? "editor-maximized" : ""}
      >
        <Editor
          text={currentDocument.text}
          css={currentDocument.css}
          documentChange={this.documentChange}
          toggleMaximized={this.toggleEditorMaximized}
          isMaximized={this.state.editorMaximized}
          selector={selector}
        />
        <Previewer
          text={currentDocument.text}
          css={currentDocument.css}
          title={currentDocument.title}
          documentChange={this.documentChange}
          hidden={this.state.editorMaximized}
        />
      </div>
    );
  }
}

const initialText = `#+TITLE: Demo 1

* John Smith :div_heading:name:
** john.smith@gmail.com :email:
* EDUCATION :tag1:tag-2:
** University of Alaska
- Bachelor of Science in History, Minor in Computer Science
- GPA: 3.9
  
** Previous: Hawaii Community College

* PROFESSIONAL EXPERIENCE
** Sales Manager
ABC SUPERSTORE
- Won “Service Excellence Award” for instrumental role in driving record-high sales increases, propelling store to improve ranking from #12 in territory to #5 by 2016.
- Reduced staff turnover by 15% in 2016, benchmarking a record-setting improvement in staff retention due to the success of employee-development and incentive programs.
- Elevated store’s guest-satisfaction index from 86% to 92% within two years; ensured the swift resolution of customer issues to preserve customer loyalty while complying with company policies. 
- Served on taskforce charged with turning around under-performing stores. Trained CSRs and managers in five struggling stores, and contributed to significant improvements in guest satisfaction and sales 

** Deli Manager
PREMIUM 
- Transformed operation that was posting annual losses to achieve $159K+ in profits within one year. Exceeded sales targets despite increased competition presented by the opening of two new local delis. 
- Introduced training programs that enhanced employee performance and morale. 
- Compiled a variety of reports about the operations of the deli in order to track growth and target weak areas of the business.
- Grew professionally and learned as much as possible through frequent meetings, coffee hours, and lunches with leaders in the deli industry.

** Camp Director
SuperFun Camps
- Managed all counselors to ensure camp standards were consistently met and kids had the best experience possible
- Reviewed performance of counselors via 1-on-1 meetings and coached them on the spot to build their abilities as counselors, and improve the experience of their campers
- Improved the camp experience through frequent meetings with the rest of the leadership team where we planned ways to better the camp experience for staff, kids, and parents

** Media Department Assistant
 Hawai'i Community College
- Taught myself Adobe Photoshop and the college’s new broadcast software in order to create high-quality graphics for athletic broadcasts and other college events
- Operated broadcast equipment during games to continually display and update graphics in order to create a professional viewing experience

* VOLUNTEER WORK
** Big Charity
- Supervised the donation center to ensure we processed donations in the most efficient manner.
- Coordinated with full-time staff to facilitate a smooth volunteer process for all volunteers.
  
* SKILLS/COURSEWORK
| Skills                          | Relevant Coursework                |
|---------------------------------+------------------------------------|
| Skill 1, Skill 2, Skill3,       | BUS 101 - Introduction to Business |
| Skill 4, Skill 5, Skill 6       | HIS 208 - Lunar History            |`;

const initialCSS = `
.name {
  text-align: center;
  border-bottom: 1px solid rgba(0, 0, 0, .3);
  margin: 10px 35%;
}

.email {
  text-align: center;
  margin: 0px;
  padding: 0px;
  font-weight: normal;
}`;

export default App;
