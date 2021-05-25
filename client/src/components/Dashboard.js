import React, { useEffect, useState } from "react";
import { Button, Card, CardGroup, ListGroup } from "react-bootstrap";
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from "react-router-dom";
import CustomModal, { UpdateCustomModal } from './Modal';
import { PieChart } from 'react-minimal-pie-chart';
import axios from 'axios';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import jwt_token from 'jwt-decode';

library.add(faTrash, faEdit);

function Dashboard() {
  const token = localStorage.getItem('token');
  let loggedInUserDetails;
  if (token === null) {
    <Redirect to='/sign-in' />
  } else {
    loggedInUserDetails = jwt_token(token);
  }
  const [todos, setTodo] = useState([]);
  const [doneTodos, setDoneTodos] = useState([]);
  const [modalShow, setModalShow] = useState(false);
  const [updateModalShow, setUpdateModalShow] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [updatingId, setUpdatingId] = useState('');
  const [updatingTodo, setUpdatingTodo] = useState('');

  const sort_todos = [...todos];
  sort_todos.sort((a ,b) => { return new Date(b.createdAt).valueOf() - new Date(a.createdAt).valueOf() });

  useEffect(() => {
    (async function() {
      if (token !== null) {
        const response = await axios.get(`http://localhost:5000/todos?user_id=${loggedInUserDetails.user_id}`);
        setTodo(response.data);
        const doneResponse = await axios.get(`http://localhost:5000/todos/done?user_id=${loggedInUserDetails.user_id}`);
        setDoneTodos(doneResponse.data);
      }
    })();
  }, []);

  function updateTask(id, todo) {
    setUpdateModalShow(true);
    setUpdatingId(id);
    setUpdatingTodo(todo);
  }

  const deleteTask = (id) => {
    const confirmBeforeDel = window.confirm("Are you sure you want to delete?");
    if(confirmBeforeDel === true) {
      axios.delete(`http://localhost:5000/todos/${id}`)
        .then(() => {
          axios.get(`http://localhost:5000/todos?user_id=${loggedInUserDetails.user_id}`)
            .then(response => setTodo(response.data))
        })
        .catch(err => console.log(err))
    } else {
      console.log("Nothing happened!");
    }
  }

  const changeStatus = async (id) => {
    const response = await axios.get(`http://localhost:5000/todos/get/${id}`)
    const todoData = response.data;
    axios.put(`http://localhost:5000/todos/update/${id}`, { user_id: todoData.user_id, todos: todoData.todos, is_active : !todoData.is_active })
      .then(() => {
        axios.get(`http://localhost:5000/todos?user_id=${loggedInUserDetails.user_id}`)
          .then(response => setTodo(response.data))
        axios.get(`http://localhost:5000/todos/done?user_id=${loggedInUserDetails.user_id}`)
          .then(response => setDoneTodos(response.data))
      });
  }

  return (
    <>
      {
        loggedInUserDetails === undefined ?
        <Redirect to='/sign-in' /> :
        <>
          <nav className="navbar navbar-light bg-light fixed-top">
            <h5 style={{position: "relative", top: "5px", marginLeft: "15px"}}>{loggedInUserDetails.user_name}</h5>
            <Link className="nav-link" style={{textAlign: "center"}} to={"/log-out"}>Logout</Link>
          </nav>
          <>
            {
              todos.length === 0 ?
              <div style={{position: "relative", top: "80px"}}>
                <h3 style={{color: "#537178", textAlign: "center"}}>You have no task</h3>
                <br/>
                <div className="text-center">
                  <Button style={{width: "200px"}} variant="primary" onClick={() => setModalShow(true)}>
                    + New Task
                  </Button>
                </div>
                <CustomModal userDetails={loggedInUserDetails} show={modalShow} onHide={() => setModalShow(false)} />
              </div> :
              <>
                <div style={{marginLeft: "5%", marginRight: "5%"}}>
                  <CardGroup style={{marginTop: "100px"}}>
                    <Card style={{height: "250px", margin: "10px 10px"}}>
                      <Card.Body>
                        <Card.Title style={{color: "#547279"}}>Tasks Completed</Card.Title>
                        <Card.Text style={{position: "relative", textAlign: "center", top: "35px"}}>
                          <div><h1>{doneTodos.length}/{todos.length}</h1></div>
                        </Card.Text>
                      </Card.Body>
                    </Card>
                    <Card style={{height: "250px", margin: "10px 10px"}}>
                      <Card.Body>
                        <Card.Title style={{color: "#547279"}}>Latest Created Tasks</Card.Title>
                        <br/>
                        <Card.Text>
                          <ul>
                            {
                              sort_todos.slice(0,3).map((todo) => <li style={!todo.is_active ? {textDecoration: "line-through"} : {textDecoration: "none"}} key={todo._id}>{todo.todos}</li>)
                            }
                          </ul>
                        </Card.Text>
                      </Card.Body>
                    </Card>
                    <Card style={{height: "250px", margin: "10px 10px"}}>
                      <Card.Body style={{left: "20px"}}>
                        <PieChart radius={20} totalValue={todos.length} style={{position: "relative", bottom: "19%"}}
                          data={[
                            { value: todos.length - doneTodos.length, color: "#e8ecec" },
                            { value: doneTodos.length, color: "#5285ec" }
                          ]} 
                        />
                      </Card.Body>
                    </Card>
                  </CardGroup>
                  <div style={{margin: "10px 10px"}}>
                    <p style={{color: "#547279", fontWeight: "bold"}}>Tasks</p>
                    <div className="form-group">
                      <input type="text" required className="form-control" placeholder="&#128269; Search by task name" style={{width: "200px"}} onChange={(e) => setSearchTerm(e.target.value)} />
                    </div>
                    <button className="btn btn-primary btn-block" style={{width: "200px", height: "38px"}} onClick={() => setModalShow(true)}>+ New Task</button>
                  </div>
                  <ListGroup style={{margin: "10px 10px"}}>
                    {
                      todos.filter((todo) => {
                        if(searchTerm === '') {
                          return todo
                        } else if(todo.todos.toLowerCase().includes(searchTerm.toLowerCase())) {
                          return todo
                        }
                      }).map(todo =>
                        <ListGroup.Item key={todo._id}>
                          <input name="checkbox" type="checkbox" checked={!todo.is_active} onChange={() => changeStatus(todo._id)} />&nbsp;
                          <span>{todo.todos}</span>
                          <span style={{position: "relative", right: "50px", float: "right", cursor: "pointer"}} onClick={() => updateTask(todo._id, todo.todos)}>
                            <FontAwesomeIcon className="faicons" icon="edit"/>
                          </span>
                          <span style={{float: "right", cursor: "pointer"}} onClick={() => deleteTask(todo._id)}>
                            <FontAwesomeIcon className="faicons" icon="trash"/>
                          </span>
                        </ListGroup.Item>
                      )
                    }
                  </ListGroup>
                </div>
                <CustomModal userDetails={loggedInUserDetails} show={modalShow} onHide={() => setModalShow(false)} />
                <UpdateCustomModal userDetails={loggedInUserDetails} id={updatingId} todo={updatingTodo} show={updateModalShow} onHide={() => setUpdateModalShow(false)} />
              </>
            }
          </>
        </>
      }
    </>
  );
}

export default Dashboard;
