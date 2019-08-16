import React from "react";
import Editor from "./components/editor";
import Previewer from "./components/previewer";
import Select from "react-select";
import { saveAs } from "file-saver";
import TitleBar from "./components/titleBar";
import { demoText, demoCSS } from "./demoContent";
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
      selectedDocument: selectedDocument ? selectedDocument : 0,
      editorMaximized: false,
      displayText: true,
      isSelectMenuOpen: false
    };
    this.previewRef = React.createRef();
    this.toggleEditorMaximized = this.toggleEditorMaximized.bind(this);
    this.selectedDocumentChange = this.selectedDocumentChange.bind(this);
    this.documentChange = this.documentChange.bind(this);
    this.deleteDocument = this.deleteDocument.bind(this);
    this.resetDemo = this.resetDemo.bind(this);
    this.saveFiles = this.saveFiles.bind(this);
    this.toggleText = this.toggleText.bind(this);
  }

  componentDidMount() {
    window.addEventListener("beforeunload", e => {
      localStorage.setItem("documents", JSON.stringify(this.state.documents));
      localStorage.setItem("selectedDocument", this.state.selectedDocument);
    });
  }
  componentDidUnMount() {
    window.removeEventListener("beforeunload");
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
    if (window.confirm("Are you sure you want to delete the document?")) {
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

  toggleText() {
    this.setState({
      displayText: !this.state.displayText
    });
  }

  saveFiles() {
    const currentDocument = this.state.documents[this.state.selectedDocument];
    const text = new Blob([currentDocument.text], {
      type: "text/plain;charset=utf-8"
    });
    const css = new Blob([currentDocument.css], {
      type: "text/plain;charset=utf-8"
    });
    saveAs(text, `${currentDocument.title}.org`);
    saveAs(css, `${currentDocument.title}.css`);
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
        styles={{
          singleValue: () => ({}),
          indicator: () => ({}),
          indicatorSeparator: () => ({})
        }}
        isSearchable={false}
        className={
          this.state.isSelectMenuOpen
            ? "documentSelectorContainer menuOpen"
            : "documentSelectorContainer"
        }
        classNamePrefix="documentSelector"
        onMenuOpen={() => this.setState({ isSelectMenuOpen: true })}
        onMenuClose={() => this.setState({ isSelectMenuOpen: false })}
      />
    );
    return (
      <div
        id="App"
        className={this.state.editorMaximized ? "editor-maximized" : ""}
      >
        <TitleBar
          title="Editor"
          toggleMaximized={this.toggleEditorMaximized}
          editorMaximized={this.state.editorMaximized}
          showText={this.state.displayText}
          selector={selector}
          previewRef={this.previewRef}
          saveFiles={this.saveFiles}
        />
        <Editor
          text={currentDocument.text}
          css={currentDocument.css}
          isMaximized={this.state.editorMaximized}
          selector={selector}
          documentChange={this.documentChange}
          toggleText={this.toggleText}
          saveText={this.saveText}
          showText={this.state.displayText}
        />
        <Previewer
          text={currentDocument.text}
          css={currentDocument.css}
          title={currentDocument.title}
          documentChange={this.documentChange}
          hidden={this.state.editorMaximized}
          previewRef={this.previewRef}
        />
      </div>
    );
  }
}

export default App;
