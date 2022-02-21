import { useEffect, useRef, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import Header from "./components/Header";
import ColumnItem from "./components/ColumnItem";
type TWord = {
  solved: boolean;
  attempts: number;
  data: { letter: string; class: string }[];
};
function App() {
  const [rows] = useState(Array.from("clothe"));
  const [columns] = useState(Array.from("clock"));
  let { current: currentRow } = useRef(1);
  const submitHandler = () => {
    const word = Array.from(
      document.querySelectorAll(`#row-${currentRow}`) as any,
      (el: HTMLInputElement) => el.value
    )
      .join("")
      .toLowerCase();

    console.log(word);
    // increase the count of the row
    currentRow = currentRow + 1;
  };
  return (
    <>
      <Header />
      <main className="main">
        <div className="container">
          {rows.map((_, rowIndex) => (
            <div className="rows" key={rowIndex}>
              {columns.map((_, columnIndex) => (
                <ColumnItem key={columnIndex} currentRow={rowIndex + 1} />
              ))}
            </div>
          ))}
        </div>
        <button onClick={submitHandler} className="button">
          Submit
        </button>
      </main>
    </>
  );
}

export default App;
