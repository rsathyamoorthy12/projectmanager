import React, { Component } from 'react';
import ProjectItem from './projectitem'
class Projects extends Component {

handleDelete(id){
  this.props.onDelete(id)
}
  render() {

      let projectitems;
      if(this.props.projects){
        projectitems = this.props.projects.map(project => {
          return(
            <ProjectItem onDelete={this.handleDelete.bind(this)} key={project.title} project={project} />
          );
        });
      }

   // console.log(this.props.projects);
    return (

      <div className="Projects">
        {projectitems}
      </div>
    );
  }
}



export default Projects;
