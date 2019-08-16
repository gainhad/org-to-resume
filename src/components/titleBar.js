import React from "react";

class TitleBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      toolBarVisible: true
    };
  }

  render() {
    return (
      <div className="title-bar">
        {this.props.selector}
        <button
          type="button"
          onClick={() =>
            this.setState({ toolBarVisible: !this.state.toolBarVisible })
          }
          className="toggle-tool-bar"
        >
          <p className={this.state.toolBarVisible ? "" : "reverseY"}>V</p>
        </button>
        <div
          className={"tool-bar" + (this.state.toolBarVisible ? "" : " hidden")}
        >
          <button
            type="button"
            className="tool-bar-button"
            onClick={this.props.toggleText}
          >
            Show {this.props.showText ? "CSS" : "Text"}
          </button>
          <button className="tool-bar-button" onClick={this.props.saveFiles}>
            Download Text/CSS
          </button>
          <button onClick={window.print} className="tool-bar-button">
            Print/Save PDF
          </button>
          <button
            className="toggle tool-bar-button"
            onClick={this.props.toggleMaximized}
          >
            {this.props.editorMaximized ? "Show" : "Hide"} Preview
          </button>
        </div>
      </div>
    );
  }
}

export default TitleBar;
