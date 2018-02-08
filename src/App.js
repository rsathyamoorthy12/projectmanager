import React, { Component } from 'react';
import uuid from "uuid";
import $ from "jquery";
import Projects from './components/projects';
import AddProject from './components/addproject';
import './App.css';

class App extends Component {

  constructor(){
    super();
    this.state={
      projects :[]
    }
  }

getProjects(){
  this.setState({projects:[
     {
       id:uuid.v4(),
     title : "Business",
     category: 'web design'
   },
   {
     id:uuid.v4(),
     title : "Information technology",
     category: 'mobile development'
   },
   {
     id:uuid.v4(),
     title : "Rural",
     category: 'advertisments'
   }
 ]});
}
  getTodos(){
$.ajax({
  url:'https://jsonplaceholder.typicode.com/todos',
  dataType : 'json',
  cache:false,
  success:function(data){
    this.setState({todos:data},function(){
      console.log(this.state);
    })
    let projects= this.state.projects;

    this.state.todos.map(todo => {
      let todoObj={};
      todoObj.id = uuid.v4();
      todoObj.title = todo.title;
      todoObj.category = todo.id;
      projects.push(todoObj);
    });
    this.setState({projects:projects});

    

  }.bind(this),
  error:function(xhr, status,err){

  }
})

  }

 componentWillMount(){
   this.getProjects();
}


handleAddProect(project){
  let projects= this.state.projects;
  projects.push(project);
  this.setState({projects:projects});
}

handleDelete(id){
  let projects = this.state.projects;
  let index = projects.findIndex(x => x.id === id)
  projects.splice(index, 1);
  this.setState({projects:projects});
}
  render() {
    return (
      <div className="App">
        <AddProject addproject={this.handleAddProect.bind(this)} />
        <Projects projects={this.state.projects} onDelete={this.handleDelete.bind(this)} />
      </div>
    );
  }
}

export default App;
