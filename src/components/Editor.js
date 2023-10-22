import React, { useState } from "react";
import "codemirror/lib/codemirror.css";
import "codemirror/theme/material.css";
import "codemirror/mode/xml/xml";
import "codemirror/mode/javascript/javascript";
import "codemirror/mode/css/css";
import { Controlled as ControlledEditor } from "react-codemirror2";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCompressAlt,
  faExpandAlt,
  faLock,
  faUnlock,
  faCopy,
} from "@fortawesome/free-solid-svg-icons";

export default function Editor(props) {
  const { name, language, value, onChange } = props;
  const [open, setOpen] = useState(true);
  const [locked, setLocked] = useState(false);

  function handleChange(editor, data, value) {
    if (!locked) {
      onChange(value);
    }
  }

  function handleLockClick() {
    setLocked(!locked);
  }

  function handleCopyClick() {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(value);
    }
  }

  return (
    <div className={`editor-con ${open ? "" : "close"}`}>
      <div className="title">
        {name}
        <button className="btn" type="button" onClick={handleCopyClick}>
          <FontAwesomeIcon icon={faCopy} />
        </button>
        <button className="btn" type="button" onClick={handleLockClick}>
          <FontAwesomeIcon icon={locked ? faLock : faUnlock} />
        </button>

        <button
          className="btn"
          type="button"
          onClick={() => setOpen((prevOpen) => !prevOpen)}
        >
          <FontAwesomeIcon icon={open ? faCompressAlt : faExpandAlt} />
        </button>
      </div>
      <ControlledEditor
        onBeforeChange={handleChange}
        value={value}
        className="code-mirror"
        options={{
          lineWrapping: true,
          lint: true,
          mode: language,
          theme: "material",
          lineNumbers: true,
          readOnly: locked,
        }}
      />
    </div>
  );
}
