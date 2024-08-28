import React, { useState } from "react";
import data from "./data";
import "./style.css";

// single & multi selection

const Accordion = () => {
  const [selected, setSelected] = useState(null);
  const [enableMultiSelection, setEnableMultiSelection] = useState(false);
  const [multiple, setMultiple] = useState([]);

  function handleSingleSelection(getCurrentId) {
    setSelected(getCurrentId === selected ? null : getCurrentId);
  }

  function handleMultiSelection(getCurrentId) {
    let updatedSelection = [...multiple];
    const index = updatedSelection.indexOf(getCurrentId);

    if (index === -1) {
      updatedSelection.push(getCurrentId);
    } else {
      updatedSelection.splice(index, 1);
    }

    setMultiple(updatedSelection);
  }

  return (
    <div className="wrapper">
      <button
        className="buttoni"
        onClick={() => setEnableMultiSelection(!enableMultiSelection)}
      >
        Enable Multi Selection
      </button>
      <div className="accordion">
        {" "}
        {data && data.length > 0 ? (
          data.map((dataItem) => (
            <div className="item" key={dataItem.id}>
              {" "}
              <div
                onClick={
                  enableMultiSelection
                    ? () => handleMultiSelection(dataItem.id)
                    : () => handleSingleSelection(dataItem.id)
                }
                className="title"
              >
                <h3>{dataItem.question}</h3>
                <span>+</span>
              </div>
              {enableMultiSelection
                ? multiple.includes(dataItem.id) && (
                    <div className="content">{dataItem.answer}</div>
                  )
                : selected === dataItem.id && (
                    <div className="content">{dataItem.answer}</div>
                  )}
            </div>
          ))
        ) : (
          <div>No data found!</div>
        )}
      </div>
    </div>
  );
};

export default Accordion;
