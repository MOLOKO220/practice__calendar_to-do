import React, { useRef, useState } from "react";

import "./ToDoItem.scss";

export default function ToDoItem(props) {
  // hooks
  const popupWrapp = useRef(null);

  // form inputs
  const [title, setTitle] = useState(props.data.title);
  const [description, setDescription] = useState(props.data.description);

  // получаем массив с записями
  const toDoArray = JSON.parse(localStorage.getItem(props.localSoreKey));

  // function
  // открыть/закрыть форму
  function showPopup() {
    popupWrapp.current.classList.add("active");
  }
  function closePopup() {
    popupWrapp.current.classList.remove("active");
  }

  function saveData() {
    // изменям нужную todo
    toDoArray.forEach((e) => {
      if (e.id === props.data.id) {
        e.title = title;
        e.description = description;
      }
    });
    localStorage.setItem(props.localSoreKey, JSON.stringify(toDoArray)); // сохраняем
    props.setRender(props.render + 1); // вызываем рендер у родительского компонента
    closePopup(); // закрываем Popup
  }

  function removeData() {
    // отфильтровать данные объект
    const newToDoArray = toDoArray.filter((e) => e.id !== props.data.id);
    localStorage.setItem(props.localSoreKey, JSON.stringify(newToDoArray)); // сохраняем
    props.setRender(props.render + 1); // вызываем рендер у родительского компонента
    closePopup(); // закрываем Popup
  }

  return (
    <div className="ToDoItem">
      <h2 onClick={showPopup}>{props.data.title}</h2>

      <div
        className="ToDoItem__popup-wrapp popup-form"
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
              <h6>Date and time</h6>
              <div>{props.data.fullTime}</div>
            </div>
          </main>
          <footer>
            <button onClick={saveData}>SAVE</button>
            <button onClick={removeData} className="popup-form__remove-btn">
              REMOVE
            </button>
          </footer>
        </form>
      </div>
    </div>
  );
}
