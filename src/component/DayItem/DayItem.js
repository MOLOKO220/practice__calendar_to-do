import React, { useState } from "react";
import "./DayItem.scss";
import ToDoItem from "../ToDoItem/ToDoItem";

export default function DayItem(props) {
  // hooks
  const [render, setRender] = useState(0);

  // названия дней недели
  const daysWeekName = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

  // стили для основного месяца или смежного
  const style = props.transparency
    ? "DayItem DayItem__transparency"
    : "DayItem";

  // ключ чтобы достучатся до нужного localStorage
  const localSoreKey = `${props.year}-${props.month < 10 ? 0 : ""}${
    props.month
  }-${props.day < 10 ? 0 : ""}${props.day}`;

  // записи данного дня
  const thisDayData = JSON.parse(localStorage.getItem(localSoreKey));

  // выделить текущий день
  // страшная конструкция, делаем строку правильного формата: "дд.мм.гггг", для сравнения с: new Date().toLocaleDateString()
  const thisDayString = `${props.day < 10 ? 0 : ""}${props.day}.${
    props.month < 10 ? 0 : ""
  }${props.month}.${props.year}`;

  const thisDayStyle =
    new Date().toLocaleDateString() === thisDayString
      ? "DayItem__this-day"
      : null;

  return (
    <div className={style + " " + thisDayStyle}>
      <header>
        <h6>{props.day}</h6>
        <p>{props.year}</p>
        <h6>{daysWeekName[props.dayWeek]}</h6>
      </header>
      <main>
        {thisDayData !== null
          ? thisDayData.map((e) => {
              return (
                <ToDoItem
                  key={e.id}
                  data={e}
                  localSoreKey={localSoreKey}
                  render={render}
                  setRender={setRender}
                />
              );
            })
          : null}
      </main>
    </div>
  );
}
