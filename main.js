const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
let countNum = 0;

function Counter(props) {
  const { item: { id, number }, hdlUpdate, hdlDelete } = props;

  return (
    <div className="counter">
      <button onClick={() => hdlUpdate(id, -1)}> - </button>
      <h3> {props.item.number} </h3>
      <button onClick={() => hdlUpdate(id, 1)}> + </button>
      <button onClick={() => hdlUpdate(id, -number)}> C </button>
      <button onClick={() => hdlDelete(id)}> X </button>
    </div>
  );
}

function SumInfo(props) {
  const stTitle = {
    color: props.color,
    fontSize: props.size === "big" ? "50px" : "40px",
  };

  return (
    <div className="suminfo">
      <h1 style={stTitle}> Sum = {props.sum}</h1>
    </div>
  );
}

function App() {
  console.log("App run...");
  const [counters, setCounters] = React.useState([{ id: 1, number: 0 }]);
  const [sum, setSum] = React.useState(0);

  const hdlUpdate = (id, num) => {
    const cloneCounters = [...counters];
    let idx = cloneCounters.findIndex((el) => el.id === id);
    if (cloneCounters[idx].number + num < 0) {
      return;
    }
    console.log(idx, num);
    cloneCounters[idx].number += num;
    setCounters(cloneCounters);
    updateSum(cloneCounters);
  };

  const hdlAddCounter = () => {
    let newId = counters.length === 0 ? 1 : counters.at(-1).id + 1;
    let cloneCounters = [...counters];
    cloneCounters.push({ id: newId, number: 0 });
    setCounters(cloneCounters);
    updateSum(cloneCounters);
  };

  const hdlDelete = (id) => {
    const cloneCounters = counters.filter((el) => el.id !== id);
    setCounters(cloneCounters);
    updateSum(cloneCounters);
  };

  const updateSum = (counters) => {
    const newSum = counters.reduce((acc, counter) => acc + counter.number, 0);
    setSum(newSum);
  };

  return (
    <>
      <h1 className="text-center">Codecamp Academy 01</h1>
      <button className="text-center" onClick={hdlAddCounter}>
        Add Counter
      </button>
      <SumInfo color="green" size="big" sum={sum} />
      {counters.map((el) => {
        return (
          <Counter
            key={el.id}
            item={el}
            hdlUpdate={hdlUpdate}
            hdlDelete={hdlDelete}
          />
        );
      })}
      <br />
      <hr />
    </>
  );
}
