import React, { useEffect, useState } from "react";
import { Modal, Button, Card, CardGroup, ListGroup } from "react-bootstrap";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { PieChart, Pie } from 'recharts';

function MyVerticallyCenteredModal(props) {
  return (
    <Modal {...props} aria-labelledby="contained-modal-title-vcenter" centered >
      <Modal.Body>
        <h4 style={{color: "#537178"}}>+ New Task</h4>
        <br/>
        <input type="text" className="form-control" placeholder="Task Name" />
        <br/>
        <div className="text-center"><Button onClick={props.onHide}>+ New Task</Button></div>
      </Modal.Body>
    </Modal>
  );
}

function Dashboard() {
  const [modalShow, setModalShow] = useState(false);

  const data = [
    { value: 15 }
  ]

  return (
    // <>
    //   <nav className="navbar navbar-light bg-light fixed-top">
    //     <Link className="nav-link" style={{textAlign: "center"}} to={"/sign-up"}>Sign Up</Link>
    //     <Link className="nav-link" style={{textAlign: "center"}} to={"/log-out"}>Logout</Link>
    //   </nav>
    //   <h3 style={{color: "#537178", textAlign: "center"}}>You have no task</h3>
    //   <br/>
    //   <div className="text-center">
    //     <Button variant="primary" onClick={() => setModalShow(true)}>
    //       + New Task
    //     </Button>
    //   </div>

    //   <MyVerticallyCenteredModal show={modalShow} onHide={() => setModalShow(false)} />
    // </>
    <div style={{marginLeft: "5%", marginRight: "5%"}}>
      <CardGroup style={{marginTop: "100px"}}>
        <Card style={{height: "250px", margin: "10px 10px"}}>
          <Card.Body>
            <Card.Title>Tasks Completed</Card.Title>
            <Card.Text>
              5/20
            </Card.Text>
          </Card.Body>
        </Card>
        <Card style={{height: "250px", margin: "10px 10px"}}>
          <Card.Body>
            <Card.Title>Latest Created Tasks</Card.Title>
            <Card.Text>
              <ul>
                <li>Clean the room</li>
                <li>Buy some vegetables, chicken & chips</li>
                <li>Reinstall windows on PC</li>
              </ul>
            </Card.Text>
          </Card.Body>
        </Card>
        <Card style={{height: "250px", margin: "10px 10px"}}>
          <Card.Body style={{left: "20px"}}>
            <PieChart width={250} height={250}>
              <Pie dataKey="value" data={data} cx={175} cy={100} outerRadius={50} fill="#5285ec" />
            </PieChart>
          </Card.Body>
        </Card>
      </CardGroup>
      <div style={{margin: "10px 10px"}} className="d-flex justify-content-between">
        <h4>Tasks</h4>
        <div className="form-group" style={{width: "200px", marginLeft: "800px", marginTop: "-15px"}}>
          <input type="text" required className="form-control" placeholder="&#128269; Search by task name" />
        </div>
        <button className="btn btn-primary btn-block" style={{width: "200px", height: "38px"}}>+ New Task</button>
      </div>
      <ListGroup style={{margin: "10px 10px"}}>
        <ListGroup.Item><input type="checkbox" />&nbsp;<span>Clean the room</span></ListGroup.Item>
        <ListGroup.Item><input type="checkbox" />&nbsp;<span>Buy some vegetables, chicken & chips</span></ListGroup.Item>
        <ListGroup.Item><input type="checkbox" />&nbsp;<span>Reinstall windows on PC</span></ListGroup.Item>
        <ListGroup.Item><input type="checkbox" />&nbsp;<span>Start to work on new feature</span></ListGroup.Item>
      </ListGroup>
    </div>
  );
}

export default Dashboard;
