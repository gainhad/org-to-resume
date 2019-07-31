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
        <h2>{this.props.title}</h2>
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
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default TitleBar;
