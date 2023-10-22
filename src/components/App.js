import React, { useState, useEffect } from "react";
import Editor from "./Editor";
import useLocalStorage from "../hooks/localStorage";

const App = () => {
  const [html, setHtml] = useLocalStorage("html", "");
  const [js, setJs] = useLocalStorage("js", "");
  const [css, setCss] = useLocalStorage("css", "");
  const [srcDoc, setSrcDoc] = useState("");

  useEffect(() => {
    const timeout = setTimeout(() => {
      setSrcDoc(`<html>
      <body>${html}</body>
      <style>${css}</style>
      <script>${js}</script>
      </html>`);
    }, 250);
    return () => clearTimeout(timeout);
  }, [html, css, js]);
  return (
    <>
      <div className="panel top-panel">
        <Editor name="HTML" language="xml" value={html} onChange={setHtml} />
        <Editor name="CSS" language="css" value={css} onChange={setCss} />
        <Editor name="JS" language="javascript" value={js} onChange={setJs} />
      </div>
      <div className="panel">
        <iframe
          srcDoc={srcDoc}
          title="output"
          sandbox="allow-scripts"
          frameBorder="0"
          width="100%"
          height="100%"
        />
      </div>
    </>
  );
};
export default App;
