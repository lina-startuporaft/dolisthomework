import React, { useEffect } from "react";
import { useState } from "react/cjs/react.development";
import "../style/App.css";

function Do({task, delDo, checkStateChekbox}) {

    function focusTask(e) {
        if (e.button == 0){
        console.log(e.button);
        }
    }

    return(
        <div className="do">
            <input type="checkbox" className="coldo col1" onChange={checkStateChekbox} checked={task.checked} id={task.id}/>
            <p className="coldo col2" onMouseDown={focusTask}>{task.title}</p>
            <p className="coldo col3">12/01/2022</p>
            <input className="coldo col4" type="button" value='del' onClick={delDo} id={task.id}/>
        </div>
    )
}

export default Do