import React, { Component } from 'react';
import web3 from './web3.js';
import './App.css';
import myToDoList from './myToDoList';
import{ Form, Table, Input, Message, Button } from 'semantic-ui-react';
import RequestRow from './requestRow';

class App extends Component {
  state = {
    content: '', 
    loading: false,
    errorMessage: ''
  };

  static async getInitialProps(props) {
    const count = await myToDoList.methods.listCount().call();
    const tasks = await Promise.all(
      Array(parseInt(count)).fill().map((element, index) => {
        return myToDoList.methods.taskList(index).call()
      })
    );

    return { tasks }
  }
  

  onSubmit = async (event) => {
    event.preventDefault();
    const { content } = this.state;

    this.setState({ loading: true, errorMessage: '' });
    try{
      const accounts = await web3.eth.getAccounts();

    await myToDoList.methods.addTask(content).send({
      from: accounts[0]
    });
    } catch (err) {
      this.setState({ errorMessage: err.message });
    }
    this.setState({ loading: false });
    
  };

  renderRow () {
    return this.props.tasks.map((task, index) => {
      return(
        <RequestRow 
            id={index}
            task={task}  
        />
      );
    });
  }
  

  render() {
    const { Header, Row, HeaderCell, Body} = Table;  
    return (
      <div>
        <div className="List">
          <h2>Things I have to get done still</h2>
            <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
              <Form.Field>
                <label>Add a new task to my list?</label>
                <Input
                  value={this.state.content}
                  onChange={event => this.setState({ content: event.target.value })}
                />
              </Form.Field>
              <Message error header='oops!' content={this.state.errorMessage} />
              <Button primary loading={this.state.loading}>Create Task!</Button>
            </Form>
            <Table>
              <Header>
                <Row>
                  <HeaderCell>ID</HeaderCell>
                  <HeaderCell>Task</HeaderCell>
                  <HeaderCell>Mark Finished</HeaderCell>
                </Row>
              </Header>
              <Body>
                {this.renderRow()}
              </Body>
            </Table>
        </div>
        <hr />
        <div className="App">
        <h1>Elise Butler Resume</h1>
          <p>
          Scottsdale, AZ 85255 • (484) 886-8425 • eabutler16@gmail.com 
          </p>
        <h3>EDUCATION</h3>
          <p>Dickinson College, Carlisle, PA </p>
          <p>Bachelor of Science, May 2022 </p>                  
          <p>Major: Computer Science</p>
        <h3>RELEVANT COURSEWORK</h3>
          <p>
          Programming Language Structures, Computability & Complexity, 
          Computer Networks, Cyber Security, 
          Data Structures & Problem Solving, Data Science, 
          Computing Abstractions, Single Variable Calculus, 
          Numerical Methods, Analysis of Algorithms
          </p>
        <h3>TECHNOLOGY SKILLS</h3>
          <p>Languages: Python, Java, Java Script, R, C/C++, SQL, Solidity</p>
          <p>Software Applications: GitHub, AWS, Microsoft Word, Excel, Powerpoint, LaTeX</p>
          <p>Web Framework: Django, React</p>
        <h3>WORK EXPERIENCE</h3>
          <h4>Tealium</h4>
            <h5>Intern Software Engineer, CA, Summer 2021</h5>
            <p>Member of Agile scrum team that was responsible for multiple initiatives 
            focused on enhancing code base maintenance, development, and testing</p>
            <p>Refactored and decomposed existing components in monolithic codebase, into new Github repositories</p>
            <p>Utilized Terraform to automate the creation of component specific Github repositories</p>
            <p>Performed the separation of Lambda functions from a Java repository through the utilization of a Jenkins pipeline</p>
            <p>Implemented a Jenkins pipeline and uploaded the new repositories artifacts into AWS S3</p>
            <p>Wrote Jenkins script files and tested the code at each stage of the development process</p>
        <h3>CAMPUS & COMMUNITY INVOLVEMENT</h3>
          <h4>Four year Varsity Student Athlete • Dickinson College Volleyball</h4>
          <h4>KAPPA ALPHA THETA Sorority</h4>
            <h5>Member Epsilon Lambda Chapter, Carlisle PA, February 2019 - May 2022</h5>
      </div>
      </div>
      
    );
  }
}

export default App;
