import React from "react";
import { Controlled as CodeMirror } from "react-codemirror2";
import "codemirror/lib/codemirror.css";
import "../utils/codeMirror/gruvboxDarkTheme.scss";
import "../utils/codeMirror/gruvboxLightTheme.scss";
import "../utils/codeMirror/orgTheme.scss";
import "codemirror/mode/css/css.js";
import "codemirror/addon/mode/simple.js";
import "../utils/codeMirror/codemirror-org.js";

class Editor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
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
    const mode = this.props.showText ? "org" : "css";
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
        <button
          className="toggle-button"
          id="toggle-editor-content-button"
          type="button"
          onClick={this.props.toggleText}
        >
          Show {this.props.showText ? "CSS" : "Text"}
        </button>
        <CodeMirror
          options={{
            mode: mode,
            lineWrapping: true,
            lineNumbers: false,
            theme: "gruvbox-light"
          }}
          value={value}
          onBeforeChange={(editor, data, value) => {
            onChange(value);
          }}
          onChange={(editor, data, value) => {}}
          onViewportChange={editor => {
            editor.refresh();
          }}
        />
      </div>
    );
  }
}

export default Editor;
