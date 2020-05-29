import React from "react";

function Accordion({defaultValue, label}) {
    return (
        <div className="hidden accordion">
            <label>{label}</label>
            <input type="text" defaultValue={defaultValue}/>
        </div>
    );
}

export default Accordion;