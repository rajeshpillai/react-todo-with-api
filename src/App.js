import React, { Component } from 'react';
import './App.css';

const url = "https://jsonplaceholder.typicode.com/todos";
class App extends Component {
  constructor() {
    super();
    this.handleChange = this.handleChange.bind(this);
    this.addTodo = this.addTodo.bind(this);
    this.state = {
      newTodo: "",
      tasks: []
    }
  }

  addTodo() {
    let newTodo = {
      userId: 1,  // hardcoded user
      id: +new Date(),  // assign unique id, numeric date (quick fix)
      title: this.state.newTodo, // grab newtodo from state
      completed: false
    }
    fetch(url, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      mode: "cors", // no-cors, cors, *same-origin,
      body: JSON.stringify(newTodo)
    }).then(response => {
      console.log(response.json());
      // On success update state
      this.setState({
        tasks: [newTodo, ...this.state.tasks]
      })
    }); // parses response to JSON
  }

  handleChange(e) {
    this.setState({
      newTodo: e.target.value
    })
  }
  componentDidMount() {
    fetch(url)
      .then(res => res.json())
      .then(data => {
        console.log(data);
        this.setState({
          tasks: data
        })
      })
  }

  render() {
    let taskList = this.state.tasks.map((task) => {
      return (
        <li key={task.id}>{task.title}</li>
      )
    })
    return (
      <div className="App">
        <h2>Task App</h2>
        <input onChange={this.handleChange}
          className="todo-input" type="text"
          placeholder="what do you want to do today?"
          value={this.state.newTodo} />

        <button onClick={this.addTodo}>new todo</button>
        <header className="App-header">
          <ul>
            {taskList}
          </ul>
        </header>
      </div>
    );
  }
}

export default App;
