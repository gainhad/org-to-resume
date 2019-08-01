import React from "react";
import { Controlled as CodeMirror } from "react-codemirror2";
import "codemirror/lib/codemirror.css";
import "codemirror/theme/solarized.css";
import "codemirror/mode/css/css.js";
import TitleBar from "./titleBar";

class Editor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showText: false
    };
    this.toggleDisplay = this.toggleDisplay.bind(this);
  }

  toggleDisplay() {
    this.setState({
      showText: !this.state.showText
    });
  }

  render() {
    const mode = this.state.showText ? "text" : "css";
    let value;
    let onChange;
    if (mode === "text") {
      onChange = this.props.textChange;
      value = this.props.text;
    } else {
      onChange = this.props.cssChange;
      value = this.props.css;
    }
    return (
      <div id="edit-pane" className="pane">
        <TitleBar title="Editor">
          <button onClick={this.toggleDisplay}>
            Show {this.state.showText ? "CSS" : "Text"}
          </button>
        </TitleBar>
        <CodeMirror
          id="editor"
          options={{
            mode: mode,
            lineWrapping: true,
            theme: "solarized dark"
          }}
          className="codeEditor"
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
