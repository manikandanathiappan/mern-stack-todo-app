import React, { useEffect, useState } from "react";
import { Button, Card, CardGroup, ListGroup } from "react-bootstrap";
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from "react-router-dom";
import CustomModal, { UpdateCustomModal } from './Modal';
import { PieChart } from 'react-minimal-pie-chart';
import axios from 'axios';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

library.add(faTrash, faEdit);

function Dashboard(props) {
  const loggedInUserDetails = props.location.state;
  const [todos, setTodo] = useState([]);
  const [modalShow, setModalShow] = useState(false);
  const [updateModalShow, setUpdateModalShow] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [updatingId, setUpdatingId] = useState('');
  const checkedBoxes = document.querySelectorAll('input[name=checkbox]:checked');
  let [checkBoxStatus, setValue] = useState(0);

  const sort_todos = [...todos];
  sort_todos.sort((a ,b) => { return new Date(b.updatedAt).valueOf() - new Date(a.updatedAt).valueOf() });

  useEffect(async () => {
    if (loggedInUserDetails === undefined) {
      <Redirect to='/sign-in'/>
    } else {
      const response = await axios.get(`http://localhost:500/todos?user_id=${loggedInUserDetails.user_id}`);
      setTodo(response.data);
    }
  }, []);

  function updateTask(id) {
    setUpdateModalShow(true);
    setUpdatingId(id);
  }

  function deleteTask(id) {
    const confirmBeforeDel = window.confirm("Are you sure you want to delete?");
    if(confirmBeforeDel == true) {
      axios.delete(`http://localhost:5000/todos/${id}`)
        .then(() => window.location.reload(false))
        .catch(err => console.log(err))
    } else {
      console.log("Nothing happened!");
    }
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
                <CustomModal userdetails={loggedInUserDetails} show={modalShow} onHide={() => setModalShow(false)} />
              </div> :
              <>
                <div style={{marginLeft: "5%", marginRight: "5%"}}>
                  <CardGroup style={{marginTop: "100px"}}>
                    <Card style={{height: "250px", margin: "10px 10px"}}>
                      <Card.Body>
                        <Card.Title>Tasks Completed</Card.Title>
                        <Card.Text style={{position: "relative", textAlign: "center", top: "35px"}}>
                          <div><h1>{checkedBoxes.length}/{todos.length}</h1></div>
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
                              sort_todos.slice(0,3).map((todo) => <li key={todo._id}>{todo.todos}</li>)
                            }
                          </ul>
                        </Card.Text>
                      </Card.Body>
                    </Card>
                    <Card style={{height: "250px", margin: "10px 10px"}}>
                      <Card.Body style={{left: "20px"}}>
                        <PieChart radius={20} totalValue={todos.length} style={{position: "relative", bottom: "19%"}}
                          data={[
                            { value: todos.length - checkedBoxes.length, color: "#e8ecec" },
                            { value: checkedBoxes.length, color: "#5285ec" }
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
                          <input name="checkbox" type="checkbox" onChange={() => setValue(checkBoxStatus + 1)} />&nbsp;
                          <span>{todo.todos}</span>
                          <span style={{position: "relative", right: "50px", float: "right"}} onClick={() => updateTask(todo._id)}>
                            <FontAwesomeIcon className="faicons" icon="edit"/>
                          </span>
                          <span style={{float: "right"}} onClick={() => deleteTask(todo._id)}>
                            <FontAwesomeIcon className="faicons" icon="trash"/>
                          </span>
                        </ListGroup.Item>
                      )
                    }
                  </ListGroup>
                </div>
                <CustomModal userdetails={loggedInUserDetails} show={modalShow} onHide={() => setModalShow(false)} />
                <UpdateCustomModal userdetails={loggedInUserDetails} id={updatingId} show={updateModalShow} onHide={() => setUpdateModalShow(false)} />
              </>
            }
          </>
        </>
      }
    </>
  );
}

export default Dashboard;
