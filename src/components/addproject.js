import React, { Component } from 'react';
import uuid from "uuid";
import $ from "jquery";
class AddProject extends Component {
constructor(){
  super();
  this.state ={
    newProject:{}
  }
}

static defaultProps={
  categories:["web design", "mobile development","advertisments"]
}

componentDidMount(){
 this.getTodos();
}

getTodos(){
$.ajax({
  url:'https://jsonplaceholder.typicode.com/todos',
  dataType : 'json',
  cache:false,
  success:function(data){
    this.setState({todos:data},function(){
      //console.log(this.state);
    })

    this.state.todos.map(todo => {
      let todoObj={};
      todoObj.id = uuid.v4();
      todoObj.title = todo.title;
      todoObj.category = todo.id;
      //console.log(todoObj);
      this.props.addproject(todoObj);
    });
 
    

  }.bind(this),
  error:function(xhr, status,err){

  }
})
}

handleSubmit(e){
  if(this.refs.title.value ===""){
    alert("title required");
  }else{
    this.setState({newProject:{
      id:uuid.v4(),
      title: this.refs.title.value,
      category:this.refs.category.value
    }}, function(){
      //console.log(this.state);
      this.props.addproject(this.state.newProject);
    });
  }
e.preventDefault();
console.log("form submitted");
}

  render() {
let categories = this.props.categories.map(category=>
  {return <option key={category} value={category}>{category}</option>}
);
    return (

      <div>
        <h3>Add Project</h3>
        <form onSubmit={this.handleSubmit.bind(this)}>
          <input type="text" ref="title" />
          <select ref="category">
          {categories}
          </select>
          <input type="submit" value="submit" />
          </form>
      </div>
    );
  }
}

export default AddProject;
