import "./App.css";
import React from "react";

import CardWheel from "./OptionCard/CardWheel";
import OptionForm from "./NewOption/OptionForm";

const App = (): JSX.Element => (
    <>
        <CardWheel></CardWheel>
        <OptionForm></OptionForm>
    </>
);

export default App;
