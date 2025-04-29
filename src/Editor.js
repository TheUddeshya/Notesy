import React from "react";
import ReactMDE from "react-mde";
import Showdown from "showdown";
import "react-mde/lib/styles/css/react-mde-all.css";

export default function Editor(props) {
  const [selectedTab, setSelectedTab] = React.useState("write");

  const converter = new Showdown.Converter({
    tables: true,
    simplifiedAutoLink: true,
    strikethrough: true,
    tasklists: true
  });

  // console.log(window.innerHeight);

  return (
    <div className="container">
      <ReactMDE
        value={props.currentNote().body}
        onChange={props.updateNote}
        selectedTab={selectedTab}
        onTabChange={setSelectedTab}
        // minEditorHeight="641"
        minEditorHeight={window.innerHeight * 0.7}
        maxEditorHeight={window.innerHeight * 0.7}
        generateMarkdownPreview={(markdown) =>
          Promise.resolve(converter.makeHtml(markdown))
        }
      />
    </div>
  );
}
