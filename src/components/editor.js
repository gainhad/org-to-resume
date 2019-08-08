import React from "react";
import { Controlled as CodeMirror } from "react-codemirror2";
import "codemirror/lib/codemirror.css";
import "../utils/codeMirror/gruvboxDarkTheme.scss";
import "../utils/codeMirror/gruvboxLightTheme.scss";
import "../utils/codeMirror/orgTheme.scss";
import "codemirror/mode/css/css.js";
import "codemirror/addon/mode/simple.js";
import "../utils/codeMirror/codemirror-org.js";
import TitleBar from "./titleBar";

class Editor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showText: true,
      maximized: false
    };
    this.toggleDisplay = this.toggleDisplay.bind(this);
  }

  toggleDisplay() {
    this.setState({
      showText: !this.state.showText
    });
  }

  render() {
    const mode = this.state.showText ? "org" : "css";
    let value;
    let onChange;
    // TODO: Refactor to call documentChange in codemiror
    if (mode === "org") {
      onChange = input => this.props.documentChange("text", input);
      value = this.props.text;
    } else {
      onChange = input => this.props.documentChange("css", input);
      value = this.props.css;
    }
    return (
      <div id="edit-pane">
        <TitleBar
          title="Editor"
          className={this.props.isMaximized ? "maximized" : ""}
        >
          <button
            type="button"
            className="tool-bar-button"
            onClick={this.toggleDisplay}
          >
            Show {this.state.showText ? "CSS" : "Text"}
          </button>
          {this.props.selector}
          <button
            type="button"
            className="tool-bar-button"
            onClick={this.props.toggleMaximized}
          >
            {this.props.isMaximized ? "Minimize" : "Maximize"}
          </button>
        </TitleBar>
        <CodeMirror
          options={{
            mode: mode,
            lineWrapping: true,
            theme: "gruvbox-light"
          }}
          value={value}
          onBeforeChange={(editor, data, value) => {
            onChange(value);
          }}
          onChange={(editor, data, value) => {}}
        />
      </div>
    );
  }
}

export default Editor;
