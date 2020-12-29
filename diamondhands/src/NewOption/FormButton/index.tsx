import * as React from "react";
import "./index.css";

let plusImg = require("../../images/plusSign.png");

const FormButton = ({ showModal }): JSX.Element => (
    <div className="buttonDiv">
        <img onClick={showModal} src={plusImg.default} />
    </div>
);

export default FormButton;
