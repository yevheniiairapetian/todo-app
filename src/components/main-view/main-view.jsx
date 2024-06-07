// import { ToDo } from "../to-do/to-do";
import React, { useState, useEffect } from 'react';
import { TextField, Button } from '@mui/material';
// import { collection, query, orderBy, onSnapshot, addDoc, serverTimestamp } from 'firebase/firestore';
import $ from 'jquery';
import { Footer } from "../footer/footer.jsx";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { auth, db } from "./../../firebase.js";
import { useNavigate } from "react-router-dom";
import { uid } from "uid";
import { set, ref, onValue, remove, update } from "firebase/database";
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckIcon from '@mui/icons-material/Check';
// import AddIcon from '@mui/icons-material/Add';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import LogoutIcon from '@mui/icons-material/Logout';

export const MainView = () => {

  const [isEdit, setIsEdit] = useState(false);
  const [tempUidd, setTempUidd] = useState("");
  const navigate = useNavigate();
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  // const [input, setInput] = useState('');

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        // read
        onValue(ref(db, `/${auth.currentUser.uid}`), (snapshot) => {
          setTodos([]);

          const data = snapshot.val();
          if (data !== null) {
            Object.values(data).map((todo) => {
              setTodos((oldArray) => [...oldArray, todo]);

            });

          }
        });
      } else if (!user) {
        navigate("/");
      }
    });
  }, []);




  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        navigate("/");
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  // const touchPunch = (a) =>{{function f(a,b){if(!(a.originalEvent.touches.length>1)){a.preventDefault();var c=a.originalEvent.changedTouches[0],d=document.createEvent("MouseEvents");d.initMouseEvent(b,!0,!0,window,1,c.screenX,c.screenY,c.clientX,c.clientY,!1,!1,!1,!1,0,null),a.target.dispatchEvent(d)}}if(a.support.touch="ontouchend"in document,a.support.touch){var e,b=a.ui.mouse.prototype,c=b._mouseInit,d=b._mouseDestroy;b._touchStart=function(a){var b=this;!e&&b._mouseCapture(a.originalEvent.changedTouches[0])&&(e=!0,b._touchMoved=!1,f(a,"mouseover"),f(a,"mousemove"),f(a,"mousedown"))},b._touchMove=function(a){e&&(this._touchMoved=!0,f(a,"mousemove"))},b._touchEnd=function(a){e&&(f(a,"mouseup"),f(a,"mouseout"),this._touchMoved||f(a,"click"),e=!1)},b._mouseInit=function(){var b=this;b.element.bind({touchstart:a.proxy(b,"_touchStart"),touchmove:a.proxy(b,"_touchMove"),touchend:a.proxy(b,"_touchEnd")}),c.call(b)},b._mouseDestroy=function(){var b=this;b.element.unbind({touchstart:a.proxy(b,"_touchStart"),touchmove:a.proxy(b,"_touchMove"),touchend:a.proxy(b,"_touchEnd")}),d.call(b)}}}(jQuery);}

  // add
  const writeToDatabase = () => {
    const uidd = uid();
    if (!todo) {
      $('#exampleModal').fadeIn();
      return null
    }
    else {

      let htmlRegexG = /<(?:"[^"]*"['"]*|'[^']*'['"]*|[^'">])+>/g;
      let inputValue = $('.add-edit-input').val().replace(htmlRegexG, '');

      set(ref(db, `/${auth.currentUser.uid}/${uidd}`), {

        todo: inputValue,
        uidd: uidd

      });

      setTodo("");
      setIsEdit(false);
    }
  };

  // update
  const handleUpdate = (todo) => {
    setIsEdit(true);
    setTodo(todo.todo);
    setTempUidd(todo.uidd);
  };

  const handleEditConfirm = () => {
    update(ref(db, `/${auth.currentUser.uid}/${tempUidd}`), {
      todo: todo,
      tempUidd: tempUidd
    });

    setTodo("");
    setIsEdit(false);

  };

  // delete

  const handleDelete = (uid) => {
    remove(ref(db, `/${auth.currentUser.uid}/${uid}`));
  };



  // const handleClick = event => {
  //   if (event.target.style.textDecoration) {
  //     event.target.style.removeProperty('text-decoration');
      
  //   } else {
  //     event.target.style.setProperty('text-decoration', 'line-through');
      
  //   }


  // };
  


  return (
    <div className="">
      <div className="App">
        <h1 className="homepage-h1" style={{ color: "#529fcc", backgroundColor: "#000" }}> Gimme Tasks! App</h1>
        <p className='user-email-container'><span className='user-email'>
        
          </span></p>
        <LogoutIcon onClick={handleSignOut} className="logout-icon" />
        <div className="homepage">
          <input
            className="add-edit-input"
            type="text"
            placeholder="Add todo..."
            value={todo}
            onChange={(e) => setTodo(e.target.value)}
          />
          
          <div className="todos-container">
          <h3 className='plans-h3'>Hey! <br/><span className='victory-span'>&#9876; Victory loves preparation! &#9876;</span><br/>What's your next goal?</h3>
            {
              todos.map((todo) => (
                <ol 
                // onClick={handleClick} 
                className="todo">
                  

                  <li data-icon="&#9745; " className="todo-li">{todo.todo}</li>
                  <ModeEditIcon
                    fontSize="large"
                    onClick={() => handleUpdate(todo)}
                    className="edit-button"
                  />
                  {/* <button onClick={() => handleUpdate(todo)}>Edit Todo</button> */}
                  {/* <button onClick={() => handleDelete(todo.uidd)}>Delete Todo</button> */}
                  <DeleteIcon
                    fontSize="large"
                    onClick={() => handleDelete(todo.uidd)}
                    className="delete-button"
                  />
                </ol>
              ))}
          </div>
          {isEdit ? (
            <div>
              {/* <button onClick={handleEditConfirm}>Confirm Edit</button> */}
              <CheckIcon onClick={handleEditConfirm} className="add-confirm-icon" />
            </div>
          ) : (
            <div>
              {/* <button onClick={writeToDatabase}>Confirm Post</button> */}
              <PlaylistAddIcon onClick={writeToDatabase} className="add-confirm-icon" />
            </div>
          )}
          {/* <button onClick={handleSignOut}>Logout</button> */}

        </div>

      </div>
      <Footer />
      <div class="modal" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h4 class="modal-title fs-5" id="exampleModalLabel"></h4>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <p class="dialog-paragraph">Please type in the new to-do and click <em className='dialog-instructions'>"Add Todo"
                button</em>.</p>
                <button onClick={() => { $('#exampleModal').fadeOut() }} type="button" className="modal-button" data-bs-dismiss="modal">Alrighty!</button>
            </div>
            <div class="modal-footer">
              
            </div>
          </div>
        </div>
      </div>


    </div>
  )
}