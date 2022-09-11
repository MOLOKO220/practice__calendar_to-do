import React, { useRef, useState } from "react";
import "./CreatingEventForm.scss";

export default function CreatingEventForm(props) {
  // hooks
  const popupWrapp = useRef(null);
  // form inputs
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");

  // function
  // открыть/закрыть форму
  function showPopup() {
    popupWrapp.current.classList.add("active");
  }
  function closePopup() {
    popupWrapp.current.classList.remove("active");
  }

  function saveData() {
    const toDoItem = {
      id: Date.now(),
      title: title,
      description: description,
      time: date.slice(11, 16),
      fullTime: date,
    };

    // Проверяем наличие записи на данную дату, если нету создаем новый массив, если есть пушим новый ToDo
    localStorage.getItem(date.slice(0, 10)) === null
      ? localStorage.setItem(date.slice(0, 10), JSON.stringify([toDoItem]))
      : localStorage.setItem(
          date.slice(0, 10),
          JSON.stringify([
            ...JSON.parse(localStorage.getItem(date.slice(0, 10))),
            toDoItem,
          ])
        );

    // очищаем форму
    setTitle("");
    setDescription("");
    setDate("");

    // рендер чтобы динамически отображать новые toDo
    props.setRender(props.render + 1);
  }

  return (
    <div className="CreatingEventForm">
      <button className="CreatingEventForm__btn" onClick={showPopup}>
        +
      </button>
      <div
        className="CreatingEventForm__popup-wrapp popup-form"
        ref={popupWrapp}
        onClick={closePopup}
      >
        <form
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
          }}
        >
          <header>
            <h3>Add new idea item</h3>
            <button className="popup-form__close-btn" onClick={closePopup}>
              x
            </button>
          </header>
          <main>
            <div>
              <h6>Title*</h6>
              <input
                type="text"
                placeholder="Title goes here"
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
              />
            </div>
            <div>
              <h6>Description</h6>
              <textarea
                value={description}
                onChange={(e) => {
                  setDescription(e.target.value);
                }}
              ></textarea>
            </div>
            <div className="popup-form__date-time">
              <h6>Date and begin time</h6>
              <input
                type="datetime-local"
                value={date}
                onChange={(e) => {
                  setDate(e.target.value);
                }}
              />
            </div>
          </main>
          <footer>
            <button
              disabled={title !== "" && date !== "" ? false : true}
              onClick={saveData}
            >
              SAVE
            </button>
          </footer>
        </form>
      </div>
    </div>
  );
}
