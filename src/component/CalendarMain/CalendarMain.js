import React from "react";
import { useSelector } from "react-redux";
import "./CalendarMain.scss";

import DayItem from "../DayItem/DayItem";

export default function CalendarMain() {
  // redux
  const data = useSelector((state) => state.main.month);

  // получаем данные
  const year = Number(data.slice(0, 4));
  const month = Number(data.slice(5, 7));
  const amountDays = new Date(year, month, 0).getDate(); // количество дней в месяце

  // массив с днями месяца
  const thisMonthDays = [];
  for (let i = 1; i <= amountDays; i++) {
    thisMonthDays.push({
      year: year,
      month: month,
      day: i,
      dayWeek: new Date(year, month - 1, i).getDay(), // день недели
    });
  }

  // недостающие дни недели предыдущего месяца
  const prevMonth = [];
  for (let i = 0; i < thisMonthDays[0].dayWeek; i++) {
    prevMonth.push({
      year: month === 1 ? year - 1 : year,
      month: month === 1 ? 12 : month - 1,
      day: new Date(year, month - 1, 0 - i).getDate(),
      dayWeek: thisMonthDays[0].dayWeek - 1 - i, // день недели
    });
  }

  // недостающие дни недели следующий месяца
  const nextMonth = [];
  for (
    let i = 1;
    i <= 6 - thisMonthDays[thisMonthDays.length - 1].dayWeek;
    i++
  ) {
    nextMonth.push({
      year: month === 12 ? year + 1 : year,
      month: month === 12 ? 1 : month + 1,
      day: i,
      dayWeek: thisMonthDays[thisMonthDays.length - 1].dayWeek + i, // день недели
    });
  }

  // Передбачити заміну реалізації зберігання, наприклад REST API
  // useEffect(() => {
  // fetch("URL")
  //   .then((response) => {
  //     return response.json();
  //   })
  //   .then((data) => {
  //     setDate(data);
  //     в зависимости от структуры данных, передавал бы их дочерним элементам.
  //     в компоненте ToDoItem например через GET-запрос передавал бы изменения в URL,
  //     конкретное решения зависит от API. Как вариант закидывал бы данные в Redux storeg, и дальше уже манипулировала в дочерних элемента.
  //   });
  // }, []);

  //     надеюсь всё правильно понял @_@
  //     P.S Если кто то это читает, дайте фидбек, очень нужно для завития -_-

  return (
    <main className="CalendarMain">
      {prevMonth.length > 0
        ? prevMonth.reverse().map((e) => {
            return (
              <DayItem
                key={`${e.day}${e.month}`}
                year={e.year}
                month={e.month}
                day={e.day}
                dayWeek={e.dayWeek}
                transparency={true}
              />
            );
          })
        : null}

      {thisMonthDays.map((e) => {
        return (
          <DayItem
            key={`${e.day}${e.month}`}
            year={e.year}
            month={e.month}
            day={e.day}
            dayWeek={e.dayWeek}
          />
        );
      })}

      {nextMonth.length > 0
        ? nextMonth.map((e) => {
            return (
              <DayItem
                key={`${e.day}${e.month}`}
                year={e.year}
                month={e.month}
                day={e.day}
                dayWeek={e.dayWeek}
                transparency={true}
              />
            );
          })
        : null}
    </main>
  );
}
