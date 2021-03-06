import React, {useEffect, useState} from 'react';
import ReactDom from 'react-dom';
import Head from './components/Head.js'
import DoList from './DoList.js';
import './style/App.css'

function App() {
  
  const [tasks, setTasks] = useState([]);

  const [secondTasks, setSecondTasks] = useState(0);

  //by re-render
  const [state, setState] = useState(false);

  function addDo({count, id}){
     setTasks([{title: count, id: id, checked: false}].concat(tasks));
  }

  function delDo(e) {
    let taskNew = tasks.filter((item) => item.id != e.currentTarget.id);
    setTasks(taskNew);
  }
  
  function sortDoUp() {
    setTasks(tasks.sort((a, b) => {
      return a.id - b.id;
    }));
    setState(!state);
  }

  function sortDoDown() {
    setTasks(tasks.sort((a, b) => {
      return b.id - a.id
    }));
    setState(!state);
  }

  function checkStateChekbox(e) {
    const i = tasks.findIndex((item) => {return +item.id == +e.currentTarget.id});
    const newTask = tasks;
    newTask[i].checked = !newTask[i].checked;
    setTasks(newTask);
    setState(!state);
  }

  const [see, setSee] = useState('All');

  function seeDone() {
    setSee('Done');
    switch (see) {
      case 'All':
        const thisTask = tasks.filter(item => item.checked == true);
        setTasks(thisTask);
        const anotherTask = tasks.filter(item => item.checked == false);
        setSecondTasks(anotherTask);
        break;
      case 'Undone':
        const thisTaskDone = secondTasks;
        const anotherTaskDone = tasks;
        setTasks(thisTaskDone);
        setSecondTasks(anotherTaskDone);
        break;
  }};

  function seeUndone() {
    setSee('Undone');
    switch (see) {
      case 'All':
        const thisTask = tasks.filter(item => item.checked == false);
        setTasks(thisTask);
        const anotherTask = tasks.filter(item => item.checked == true);
        setSecondTasks(anotherTask);
        break;
      case 'Done':
        const thisTaskUndone = secondTasks;
        const anotherTaskUndone = tasks;
        setTasks(thisTaskUndone);
        setSecondTasks(anotherTaskUndone);
        break;
  }}

  function seeAll() {
    setSee('All');
    switch (see) {
      case 'Done':
        setTasks(tasks.concat(secondTasks));
        break;
      case 'Undone':
        setTasks(tasks.concat(secondTasks));
        break;}
  }

  const colorActiveDefoult = [
    {backgroundColor: 'white'},
    {backgroundColor: 'white'},
    {backgroundColor: 'white'},
  ];

  const [activeSee, setActiveSee] = useState(colorActiveDefoult);

  useEffect(() => {
    if (see == 'All') {
      sortDoDown();
      let newActive = colorActiveDefoult;
      newActive.splice(0, 1, {backgroundColor: 'rgb(64, 199, 82)'}); 
      setActiveSee(newActive);
      console.log(activeSee);
    } else if (see == 'Done') {
      let newActive = colorActiveDefoult;
      newActive.splice(1, 1, {backgroundColor: 'rgb(64, 199, 82)'}); 
      setActiveSee(newActive);
    } else {
      let newActive = colorActiveDefoult;
      newActive.splice(2, 1, {backgroundColor: 'rgb(64, 199, 82)'}); 
      setActiveSee(newActive);
    }
  }, [see]);



  function saveEdit(edit, id) {
    tasks.map((item) => {if (+item.id == +id){item.title = edit}});
  }
  
  return (
          <div>
            <Head addDo={addDo} sortDoUp={sortDoUp} sortDoDown={sortDoDown} seeDone={seeDone} seeUndone={seeUndone} seeAll={seeAll} activeSee={activeSee}/>
            <div className='content'>
              <DoList tasks={tasks} delDo={delDo} checkStateChekbox={checkStateChekbox} saveEdit={saveEdit}/>
            </div>
          </div>
          )
}

export default App;