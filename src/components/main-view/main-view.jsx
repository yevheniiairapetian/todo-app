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
import AddIcon from '@mui/icons-material/Add';
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
    // const addTodo = (e) => {
    //     e.preventDefault();
    //     if(!input){
    //         $('#exampleModal').fadeIn();
    //         return null
    //     } 
    //     else{
        
    const handleSignOut = () => {
        signOut(auth)
          .then(() => {
            navigate("/");
          })
          .catch((err) => {
            alert(err.message);
          });
      };
    
      // add
      const writeToDatabase = () => {
        const uidd = uid();
        if(!todo){
                    // $('#exampleModal').fadeIn();
                    return null
                } 
                else{
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
    
      
    return (
        <div className="">
        <div className="App">
            <h1 className="homepage-h1" style={{color:"#529fcc", backgroundColor:"#000"}}> TODO List App</h1>
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
      {todos.map((todo) => (
        <div className="todo">
          <h1>{todo.todo}</h1>
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
        </div>
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
          <AddIcon onClick={writeToDatabase} className="add-confirm-icon" />
        </div>
      )}
      {/* <button onClick={handleSignOut}>Logout</button> */}
       
    </div>
            
        </div>
        <Footer/>
        <div class="modal" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
			<div class="modal-dialog">
				<div class="modal-content">
					<div class="modal-header">
						<h4 class="modal-title fs-5" id="exampleModalLabel">Notice</h4>
						<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
					</div>
					<div class="modal-body">
						<p class="dialog-paragraph">Please type in the new to-do and click <em>"Add New To-do"
								button or press "Enter" key</em>.</p>
					</div>
					<div class="modal-footer">
						<button onClick={() => {$('#exampleModal').fadeOut()}} type="button" class="button" data-bs-dismiss="modal">Close</button>
					</div>
				</div>
			</div>
		</div>
        
    
    </div>
    )
}