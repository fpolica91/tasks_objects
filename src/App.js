import { useCallback, useState } from "react";

const INITIAL_LIST = {
  "Organize closet": [
    { "Donate old clothes and shoes": false },
    { "Buy new shelf": false },
    { "Put in shelf by color": false }
  ],
  "Finish homework": [
    { "Finish math homework": false },
    { "Finish science homework": false },
    { "Finish Reactjs homework": false }
  ],
  "Achieve nirvana": [
    { "Meditate a little": false },
    { "Gain some wisdom": false }
  ]
};

function App() {
  return <Checklist />;
}

const Checklist = () => {
  const [list, setList] = useState(INITIAL_LIST);

  const handleClick = useCallback(
    (taskName, subtaskIndex, subtask, subtaskName) => {
      console.log(taskName, subtaskIndex, subtask, subtaskName);
      let taskToUpdate = list[taskName];

      subtask[subtaskName] = !subtask[subtaskName];

      taskToUpdate[subtaskIndex] = subtask;
      setList((prevState) => ({ ...prevState, [taskName]: taskToUpdate }));
    },
    [list]
  );

  const renderList = useCallback(
    (item, completed) => {
      return list[item].map((chore, i) => {
        return Object.keys(chore)
          .filter((chor) => (completed ? chore[chor] : !chore[chor]))
          .map((chor, index) => {
            return (
              <li key={index} onClick={() => handleClick(item, i, chore, chor)}>
                <span>{`${chor}:  `}</span>
                <span>{JSON.stringify(chore[chor])}</span>
              </li>
            );
          });
      });
    },
    [list, handleClick]
  );

  return Object.keys(list).map((item, x) => {
    return (
      <div key={x}>
        <h1>{item}</h1>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr"
          }}
        >
          <div>
            <h3>Not Completed</h3>
            {renderList(item, false)}
          </div>
          <div>
            <h3>Completed</h3>
            {renderList(item, true)}
          </div>
        </div>
      </div>
    );
  });
};

// (PROBABLY) MORE OF YOUR CODE HERE

export default App;
