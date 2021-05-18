import React, { useState } from 'react';
import { Modal } from 'react-bootstrap';
import axios from 'axios';

export function UpdateCustomModal(props) {
  const userId = props.userDetails.user_id;
  const _id = props.id;
  const [todo, setTodo] = useState({
    user_id: userId,
    todos: ''
  })

  const updateTodo = e => {
    e.preventDefault();
    axios.put(`http://localhost:5000/todos/update/${_id}`, todo)
      .then(() => window.location.reload(false));
  }

  return (
    <Modal {...props} aria-labelledby="contained-modal-title-vcenter" centered >
      <Modal.Body>
        <h4 style={{color: "#537178"}}>Update Task</h4>
        <br/>
        <input type="text" className="form-control" placeholder="Task Name" onChange={e => setTodo({...todo, todos: e.target.value})} value={todo.todos} />
        <br/>
        <button type="submit" onClick={updateTodo} className="btn btn-primary btn-block">Update Task</button>
      </Modal.Body>
    </Modal>
  )
}

export default function CustomModal(props) {
  const userId = props.userDetails.user_id;
  const [todo, setTodo] = useState({
    user_id: userId,
    todos: ''
  })

  const createNewTodo = e => {
    e.preventDefault();
    axios.post(`http://localhost:5000/todo/add`, todo)
      .then(() => window.location.reload(false));
  }

  return (
    <Modal {...props} aria-labelledby="contained-modal-title-vcenter" centered >
      <Modal.Body>
        <h4 style={{color: "#537178"}}>+ New Task</h4>
        <br/>
        <input type="text" className="form-control" placeholder="Task Name" onChange={e => setTodo({...todo, todos: e.target.value})} value={todo.todos} />
        <br/>
        <button type="submit" onClick={createNewTodo} className="btn btn-primary btn-block">Create Task</button>
      </Modal.Body>
    </Modal>
  );
}
