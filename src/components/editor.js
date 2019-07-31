import React from "react";
import { Controlled as CodeMirror } from "react-codemirror2";
import "codemirror/lib/codemirror.css";
import "codemirror/theme/material.css";
import "codemirror/mode/css/css.js";

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
    let value;
    let onChange;
    let mode;
    if (this.state.showText) {
      onChange = this.props.textChange;
      value = this.props.text;
      mode = "";
    } else {
      onChange = this.props.cssChange;
      value = this.props.css;
      mode = "css";
    }
    return (
      <div id="edit-pane" className="pane">
        <div className="title-bar">
          <h2>Editor</h2>
          <button onClick={this.toggleDisplay}>Toggle</button>
        </div>
        <CodeMirror
          id="editor"
          options={{
            mode: "css"
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
