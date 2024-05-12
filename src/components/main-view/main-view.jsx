import { ToDo } from "../to-do/to-do";
import React, { useState, useEffect } from 'react';
import { TextField, Button } from '@mui/material';
import { db } from '../../firebase.js';
import { collection, query, orderBy, onSnapshot, addDoc, serverTimestamp } from 'firebase/firestore';
import $ from 'jquery';
import { Footer } from "../footer/footer.jsx";
const q = query(collection(db, 'todos'), orderBy('timestamp', 'desc'));

export const MainView = () => {     
        
        
    const [todos, setTodos] = useState([]);
    const [input, setInput] = useState('');
    
    useEffect(() => {
        onSnapshot(q, (snapshot) => {
            setTodos(snapshot.docs.map(doc => ({
                id: doc.id,
                item: doc.data()
            })))
        })
    }, [input]);
    const addTodo = (e) => {
        e.preventDefault();
        if(!input){
            $('#exampleModal').fadeIn();
            return null
        } 
        else{
        
        addDoc(collection(db, "todos"), {
            
          todo: input,
          timestamp: serverTimestamp(),
        });
        setInput("");
      }};
      
    return (
        <>
        <div className="App">
            <h2 style={{color:"#529fcc"}}> TODO List App</h2>
            <form>
                <TextField id="outlined-basic" label="Make Todo" variant="outlined" style={{ margin: "0px 5px" }} size="small" value={input} 
                    onChange={e => setInput(e.target.value)} />
                <Button variant="contained" style={{backgroundColor:"#529fcc", color:"white"}} onClick={addTodo}  >Add Todo</Button>
            </form>
            <ul className="to-do-container">
            {todos.map(item => <ToDo key={item.id} arr={item} />)}
            </ul>
            
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
        
    
    </>
    )
}