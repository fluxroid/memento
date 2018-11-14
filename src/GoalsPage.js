import React, { Component } from 'react';
import GoalForm from './GoalForm.js';
import Goal from './Goal.js';
import './css/GoalPage.css';

class GoalsPage extends Component {
	constructor(props) {
		super(props)
    const result = localStorage.getItem("checked")
	 	this.state = {
      stepId: 0,
      checked: result? JSON.parse(result) : this.handleUpdateChecked()
    };

    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleFormDelete = this.handleFormDelete.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleCheck = this.handleCheck.bind(this); 
    this.handleUpdateChecked = this.handleUpdateChecked.bind(this);
    this.incrementStep = this.incrementStep.bind(this);
	}

	handleFormSubmit = (key='', object={}) => {
    this.setState({
      stepId: 0
    });
    this.props.submit(key, object)
  }

  componentDidUpdate(prevProps) {
    const Newoutput = this.props.output;
    if (Newoutput !== prevProps.output && Newoutput.length !== prevProps.output.length){
      let result = {}
      const oldChecked = {...this.state.checked};
      if (Newoutput.length > prevProps.output.length) {
        const newChecked = this.handleUpdateChecked();
        result = {...oldChecked, ...newChecked};
      } 
      else if (Newoutput.length < prevProps.output.length) {
        const newChecked = this.handleUpdateChecked(true);
        Object.keys(oldChecked).forEach((key)=> {
          if (!(key in newChecked))
            delete oldChecked[key]
        });
        result = {...oldChecked}    
      }
      this.setState({
        checked: result
        });

      localStorage.setItem("checked", JSON.stringify(result));
    }
  }

  handleCheck(event) {
    const oldChecked = this.state.checked;
    const [id, key] = event.target.name.split(',');
    let newObj = {};
      const newValue = !oldChecked[id][key]
      if (key === "title") {  
        const tempChecked = {...oldChecked[id], ...{[key]: newValue}};
        Object.keys(tempChecked).forEach(k => tempChecked[k] = newValue)
        newObj = {[id]: tempChecked} 
      }
      else {
        newObj = {[id]: {...oldChecked[id], ...{[key]: newValue}}};
      }
      this.setState({
        checked: {...oldChecked, ...newObj}
      });
    localStorage.setItem("checked", JSON.stringify({...oldChecked, ...newObj}));
  }

  handleDelete(target) {
    this.props.delete(target);
  }

  handleUpdateChecked(deleted=false) {
    const checked = {};
    this.props.output.forEach( goal => {
      const {title, id, date, labels, ...steps} = goal;
      const temp2 = {}
      if ((!(id in this.state.checked) || deleted)) {
        Object.keys(steps).forEach( (step) => temp2[step] = false);
        checked[id] = {...{title: false}, ...temp2}
      }
    })
    const result = localStorage.getItem("checked") 
    if (!result) {
      localStorage.setItem("checked", JSON.stringify(checked))
    } 
    return checked;
  }

  handleFormDelete = (target) => {
  	const id = parseInt(target.name, 10);
  	const {title, ...steps} = this.props.input;
    const newSteps = {...steps}
    delete newSteps[id];
    this.props.change({title, ...newSteps}, true)
  }

  incrementStep = () => {
  	this.setState((state) => ({
  		stepId: state.stepId + 1,
  	}));
    this.props.change({name: this.state.stepId, value: ""})
  }

	render() {
		return (
			<div className={"GoalPage"}>
			<GoalForm
        labels = {this.props.labels}
        onFormChange={this.props.change}
        onFormSubmit={this.handleFormSubmit}
        onFormDelete={this.handleFormDelete}
        onIncrementStep={this.incrementStep}
        input={this.props.input}
			/>
      <Goal
        {...this.props}
        goals={this.props.output}
        checked={this.state.checked}
        onGoalDelete={(event) => this.handleDelete(event)}
        onGoalEdit={this.props.edit}
        onHandleCheck={(event) => this.handleCheck(event)}
      />		
			</div>
		)
	}
}

export default GoalsPage;