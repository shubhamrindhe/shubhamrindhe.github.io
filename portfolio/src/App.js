import logo from './logo.svg';
import React, { useState } from 'react';
import './App.css';

function App(_) {
  // let list = ['a', 'b', 'c', 'd', 'e'];

  const [list, setList] = useState(
    Array.from({length: 9}, (_, i) => i + 1)//['a', 'b', 'c', 'd', 'e']
  );

  function deleter(_) {
    console.log(`delete mf ${ _ }`, _);
    let idx = list.indexOf(_);

    if (idx < 0) return
    // list.splice(idx, 1)
    // setList(list);
    setList(list.filter(e => e !== _ ));
    console.log(list, idx);
  }

  let [count, setCount] = useState(5);

  let decCount = (_) => {
    setCount(count - 1);
    setCount(count - 1);
  }

  let incCount = (_) => {
    setCount(count + 1);
    setCount(count + 1);
  }

  return (
    <div className="App">

    <div>
      <button onClick={decCount}>-</button>
      <span>{ count }</span>
      <button onClick={incCount}>+</button>
    </div>

      <List list={list} deleter = {deleter} />
    </div>
  );
}

function List({ list, deleter }) {
  return (
    list.map(listItem => <ListItem title={listItem} key={listItem} deleter={deleter} />)
  )
}

function ListItem({ title, deleter }) {
  return (
    <div style={{border: "1px solid red", background: '#ccc'}}>
      <h1>{title}</h1>
      <button title="Delete" onClick={ () => deleter(title) }>Delete</button>
    </div>
  )
}

export default App;
