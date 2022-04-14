import { useState } from "react";

function Calender() {
  const [start, setStart] = useState(null);
  const [end, setEnd] = useState(null);
  const [current, setCurrent] = useState(null);
  let [days, setDays] = useState(0);
  const [input, setInput] = useState(null);
  const arr = new Array(days).fill(0).map((e, i) => i + 1);
  function handelMonth(e) {
    let [year, month] = e.target.value.split("-").map(Number);

    if (year % 400 == 0 || (year % 100 !== 0 && year % 4 == 0)) {
      if (month == 2) {
        setDays(29);
      } else if ([1, 3, 5, 7, 8, 10, 12].includes(month)) {
        setDays(31);
      } else {
        setDays(30);
      }
    } else {
      if (month == 2) {
        setDays(28);
      } else if ([1, 3, 5, 7, 8, 10, 12].includes(month)) {
        setDays(31);
      } else {
        setDays(30);
      }
    }
    setStart(null);
    setEnd(null);
    setCurrent(null);
  }

  function handleClick(num) {
    console.log(num);
    if (start == 0) {
      setStart(num);
    } else if (start !== 0 && end == 0) {
      if (start > num) {
        setEnd(start);
        setStart(num);
      } else {
        setEnd(num);
      }
    } else if (start !== 0 && end !== 0) {
      setStart(num);
      setEnd(0);
    }
    setCurrent(null);
  }

  function handelHover(e) {
    if (start == 0 || end == 0) {
      setCurrent(e);
    }
  }

  return (
    <div style={{ margin: "0px" }}>
      <h2>Calender</h2>
      <input
        style={{ marginBottom: "30px" }}
        onChange={(e) => handelMonth(e)}
        type="month"
      />

      <div
        style={{
          margin: "auto",
          // gap: "10px",
          display: "flex",
          width: "700px",
          border: days == 0 ? null : "1px solid black",
          flexWrap: "wrap",
          padding: "30px",
        }}
      >
        {arr.map((e) => {
          return (
            <div key={e}
              onClick={() => {
                handleClick(e);
              }}
              onMouseOver={() => {
                handelHover(e);
              }}
              style={{
                width: "100px",
                height: "100px",
                //   border: "1px solid black",
                borderRadius:
                  e == start
                    ? "0px"
                    : e % 7 == 0
                    ? "0px 60px 60px 0px"
                    : e % 7 == 1
                    ? "60px 0px 0px 60px"
                    : 0,
                display: "flex",
                marginBottom: "10px",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor:
                  e == start || e == end
                    ? "rgba(0, 183, 255, 0.823)"
                    : e > start && e < end
                    ? "rgba(0, 183, 255, 0.341)"
                    : (start < e && e <= current && start !== null) ||
                      (start > e && e >= current && current !== null)
                    ? "rgba(60, 83, 92, 0.341)"
                    : "white",
              }}
            >
              {e}
            </div>
          );
        })}
      </div>
      <div>
        {start !== null && start !== 0 && end !== null && end !== 0 ? (
          <h2>
            From : {start} --> To : {end}
          </h2>
        ) : null}
      </div>
    </div>
  );
}
export { Calender };
