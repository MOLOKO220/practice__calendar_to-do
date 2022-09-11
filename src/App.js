import React, { useState } from "react";
import "./App.scss";

import CreatingEventForm from "./component/CreatingEventForm/CreatingEventForm";
import DateFilter from "./component/DateFilter/DateFilter";
import CalendarMain from "./component/CalendarMain/CalendarMain";

export default function App() {
  const [render, setRender] = useState(0);
  return (
    <div className="App">
      <header>
        <CreatingEventForm render={render} setRender={setRender} />
        <DateFilter />
      </header>
      <CalendarMain />
    </div>
  );
}
