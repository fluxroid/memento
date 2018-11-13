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
    if (Newoutput !== prevProps.output){
      const oldChecked = {...this.state.checked};
      const newChecked = this.handleUpdateChecked();
      if (Newoutput.length > prevProps.output.length) {
        this.setState({
        checked: {...oldChecked, ...newChecked}
        });
      }
      else if (Newoutput.length < prevProps.output.length) {
        Object.keys(oldChecked).forEach((key)=> {
          if (!(key in newChecked))
            delete oldChecked[key]
        });
        this.setState({
          checked: {...oldChecked}
        })        
      }
    localStorage.setItem("checked", JSON.stringify({...oldChecked, ...newChecked}));
    }
  }

  handleCheck(event) {
    const oldChecked = this.state.checked;
    const [goalIndex, key] = event.target.name.split(',');
    let newObj = {};
    //if (goalIndex in oldChecked) {
      const newValue = !oldChecked[goalIndex][key]
      if (key === "title") {  
        const tempChecked = {...oldChecked[goalIndex], ...{[key]: newValue}};
        Object.keys(tempChecked).forEach(k => tempChecked[k] = newValue)
        newObj = {[goalIndex]: tempChecked} 
      }
      else {
        newObj = {[goalIndex]: {...oldChecked[goalIndex], ...{[key]: newValue}}};
      }
      this.setState({
        checked: {...oldChecked, ...newObj}
      });
  localStorage.setItem("checked", JSON.stringify({...oldChecked, ...newObj}));
  }

  handleDelete(target) {
    this.props.delete(target);
  }

  handleUpdateChecked() {
    const checked = {};
    this.props.output.forEach( (goal, goalIndex) => {
      const {title, id, date, labels, ...steps} = goal;
      const temp2 = {}
      Object.keys(steps).forEach( (step) => temp2[step] = false);
      checked[goalIndex] = {...{title: false}, ...temp2}
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

  componentDidMount() {
    this.props.hideSide(false);
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