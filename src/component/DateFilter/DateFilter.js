import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { saveDate } from "../../storage/mainReducer";

import "./DateFilter.scss";

export default function DateFilter() {
  // redux
  const data = useSelector((state) => state.main.month);
  const dispatch = useDispatch();

  // hooks
  // получаем дату в формате yyyy-mm
  const [date, setDate] = useState(data);

  // function
  // переключения месяцев prev/next
  function handlerPrevMonthBtn() {
    const year = date.slice(0, 4);
    const month = date.slice(5, 7);
    if (Number(month) === 1) {
      setDate(`${year - 1}-${12}`);
      // сохранить в storage
      dispatch(saveDate(`${year - 1}-${12}`));
    } else {
      setDate(`${year}-${month <= 10 ? 0 : ""}${month - 1}`);
      // сохранить в storage
      dispatch(saveDate(`${year}-${month <= 10 ? 0 : ""}${month - 1}`));
    }
  }

  function handlerNextvMonthBtn() {
    const year = date.slice(0, 4);
    const month = date.slice(5, 7);
    if (Number(month) === 12) {
      setDate(`${Number(year) + 1}-0${1}`);
      // сохранить в storage
      dispatch(saveDate(`${Number(year) + 1}-0${1}`));
    } else {
      setDate(`${year}-${Number(month) + 1 < 10 ? 0 : ""}${Number(month) + 1}`);
      // сохранить в storage
      dispatch(
        saveDate(
          `${year}-${Number(month) + 1 < 10 ? 0 : ""}${Number(month) + 1}`
        )
      );
    }
  }

  return (
    <div className="DateFilter">
      <button className="DateFilter__prev-btn" onClick={handlerPrevMonthBtn}>
        {"<"}
      </button>
      <button className="DateFilter__next-btn" onClick={handlerNextvMonthBtn}>
        {">"}
      </button>
      <input
        type="month"
        value={date}
        onChange={(e) => {
          setDate(e.target.value);
          // сохранить в storage
          dispatch(saveDate(e.target.value));
        }}
      />
    </div>
  );
}
