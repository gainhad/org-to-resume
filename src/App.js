import React from "react";
import Editor from "./components/editor";
import Previewer from "./components/previewer";
import Select from "react-select";
import "./App.scss";

class App extends React.Component {
  constructor(props) {
    super(props);
    const selectedDocument = Number(localStorage.getItem("selectedDocument"));
    const userDocuments = JSON.parse(localStorage.getItem("documents"));
    this.state = {
      documents: userDocuments
        ? [...userDocuments]
        : [
            {
              title: "Demo 1",
              text: demoText[0],
              css: demoCSS[0],
              changed: false
            },
            {
              title: "Demo 2",
              text: demoText[1],
              css: demoCSS[1],
              changed: false
            }
          ],
      selectedDocument: selectedDocument,
      editorMaximized: true
    };
    this.toggleEditorMaximized = this.toggleEditorMaximized.bind(this);
    this.selectedDocumentChange = this.selectedDocumentChange.bind(this);
    this.documentChange = this.documentChange.bind(this);
    this.deleteDocument = this.deleteDocument.bind(this);
    this.resetDemo = this.resetDemo.bind(this);
  }

  componentDidMount() {
    window.addEventListener("beforeunload", e => {
      localStorage.setItem("documents", JSON.stringify(this.state.documents));
    });
  }

  documentChange(type, input) {
    this.setState(state => {
      return {
        documents: state.documents.map((doc, index) => {
          if (index === state.selectedDocument) {
            doc[type] = input;
            if (state.selectedDocument < 2) {
              doc.changed = true;
            }
          }
          return doc;
        }),
        ...state
      };
    });
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
    }
  }

  toggleEditorMaximized() {
    this.setState({
      editorMaximized: !this.state.editorMaximized
    });
  }

  deleteDocument(index) {
    let newSelectedDocument = 0;
    if (index === this.state.selectedDocument) {
      newSelectedDocument =
        index === this.state.documents.length - 1 ? index - 1 : index;
    } else {
      newSelectedDocument =
        this.state.selectedDocument <= index
          ? this.state.selectedDocument
          : this.state.selectedDocument - 1;
    }
    this.setState(state => ({
      documents: state.documents.filter((doc, docIndex) => {
        return docIndex !== index;
      }),
      selectedDocument: newSelectedDocument,
      editorMaximized: state.editorMaximized
    }));
  }

  resetDemo(index) {
    this.setState(state => ({
      ...state,
      documents: state.documents.map((doc, docIndex) =>
        docIndex === index
          ? {
              title: `Demo ${index + 1}`,
              text: demoText[index],
              css: demoCSS[index],
              changed: false
            }
          : doc
      )
    }));
  }

  render() {
    const currentDocument = this.state.documents[this.state.selectedDocument]
      ? this.state.documents[this.state.selectedDocument]
      : this.state.documents[0];
    const options = [
      {
        label: "Demos",
        options: [
          ...this.state.documents.slice(0, 2).map((doc, index) => {
            return {
              value: index,
              label: doc.title,
              group: "demos"
            };
          })
        ]
      },
      {
        label: "Your Documents",
        options: [
          ...this.state.documents.slice(2).map((doc, index) => {
            return {
              value: index + 2,
              label: doc.title ? doc.title : "untitled document",
              group: "userDocuments"
            };
          }),
          {
            value: -1,
            label: "...New Document"
          }
        ]
      }
    ];
    const customOption = ({ innerProps, label, value, data, isSelected }) => {
      return (
        <div
          className={
            "documentSelector__option-container" +
            (isSelected ? " selected" : "")
          }
          id={value === -1 ? "new-document-button" : ""}
        >
          <div {...innerProps} className="documentSelector__option">
            {label}
          </div>
          {data.group === "userDocuments" ? (
            <button
              type="button"
              className="delete-document-button"
              onClick={() => this.deleteDocument(value)}
            >
              delete
            </button>
          ) : data.group === "demos" &&
            this.state.documents[data.value].changed ? (
            <button
              type="button"
              className="reset-demo-button"
              onClick={() => this.resetDemo(value)}
            >
              reset
            </button>
          ) : null}
        </div>
      );
    };
    const selector = (
      <Select
        value={{
          value: this.state.selectedDocument,
          label: currentDocument.title
            ? currentDocument.title
            : "untitled document"
        }}
        components={{ Option: customOption }}
        onChange={this.selectedDocumentChange}
        options={options}
        isSearchable={false}
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

const demoText = [
  `#+TITLE: Demo 1

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
| Skill 4, Skill 5, Skill 6       | HIS 208 - Lunar History            |`,
  `#+TITLE: Demo 2
* This is the second demo`
];

const demoCSS = [
  `.name {
  text-align: center;
  border-bottom: 1px solid rgba(0, 0, 0, .3);
  margin: 10px 35%;
}

.email {
  text-align: center;
  margin: 0px;
  padding: 0px;
  font-weight: normal;
}`,
  ``
];

export default App;
