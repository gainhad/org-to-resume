import React from "react";
import { Helmet } from "react-helmet";
import beautify from "js-beautify";
import { toAST, toHTML } from "../parser";
import ReactToPrint from "react-to-print";
import TitleBar from "./titleBar";

class Previewer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      renderHTML: true,
      error: true
    };
    this.onClick = this.onClick.bind(this);
  }

  onClick() {
    this.setState({
      renderHTML: !this.state.renderHTML
    });
  }

  render() {
    const style = this.props.css
      .split("\n")
      .map(e =>
        e && e[0] !== " " && e[0] !== "}" && e[0] !== "@" ? "#preview " + e : e
      )
      .join("\n");
    let AST = null;
    let parsedText = "";
    try {
      AST = toAST(this.props.text);
      if (AST.meta.title !== this.props.title) {
        this.props.changeTitle(AST.meta.title);
      }
      parsedText = toHTML(AST);
    } catch (e) {
      parsedText = e;
    }
    let preview;
    if (parsedText instanceof Error) {
      preview = (
        <div className="error-message">Error: {parsedText.message}</div>
      );
    } else if (this.state.renderHTML) {
      //TODO: find a better way to display HTML
      preview = (
        <ResumePreview html={parsedText} ref={el => (this.componentRef = el)} />
      );
    } else {
      preview = <pre>{beautify.html(parsedText)}</pre>;
    }
    return (
      <>
        <Helmet>
          <style>{style}</style>
        </Helmet>
        <div id="preview-pane" className={this.props.hidden ? "hidden" : ""}>
          <TitleBar title="Preview">
            <ReactToPrint
              trigger={() => <button>Print!</button>}
              content={() => this.componentRef}
            />
            <button className="toggle" onClick={this.onClick}>
              Show {this.state.renderHTML ? "HTML" : "Preview"}
            </button>
          </TitleBar>
          {preview}
        </div>
      </>
    );
  }
}

class ResumePreview extends React.Component {
  render() {
    return (
      <div id="preview" dangerouslySetInnerHTML={{ __html: this.props.html }} />
    );
  }
}

export default Previewer;
