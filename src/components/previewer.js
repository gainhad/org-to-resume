import React from "react";
import { Helmet } from "react-helmet";
import beautify from "js-beautify";
import { toAST, toHTML } from "../parser";
import ReactToPrint from "react-to-print";

class Previewer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      renderHTML: true
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
      .split("}")
      .map(e => (e ? "#preview  " + e : ""))
      .join("}");
    console.log(style);
    const parsedText = toHTML(toAST(this.props.text));
    let preview;
    if (this.state.renderHTML) {
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
        <div id="preview-pane" className="pane">
          <div className="title-bar">
            <h2 className="title">Preview</h2>
            <ReactToPrint
              trigger={() => <button>Print!</button>}
              content={() => this.componentRef}
            />
            <button className="toggle" onClick={this.onClick}>
              Toggle HTML
            </button>
          </div>
          {preview}
        </div>
      </>
    );
  }
}

class ResumePreview extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div id="preview" dangerouslySetInnerHTML={{ __html: this.props.html }} />
    );
  }
}

export default Previewer;
