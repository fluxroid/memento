import React, { Component } from 'react';
import './css/GoalForm.css';
import LabelSelection from './LabelSelection.js';

class GoalForm extends Component {
	constructor(props) {
  	super(props);
    this.state = {
    	visibleLabels: false,
      clickedLabels: {},
      stepId: 0

    	};
    this.handleSubmit = this.handleSubmit.bind(this);
		this.handleDeleteStep = this.handleDeleteStep.bind(this);
    this.handleVisibleLabel = this.handleVisibleLabel.bind(this);
    this.toggleLabel = this.toggleLabel.bind(this);
    this.incrementStep = this.incrementStep.bind(this);

	}

  componentDidMount() {
      const {visibleLabels, clickedLabels} = this.state;
      const labels = {visibleLabels, clickedLabels};
      this.setState({...this.props.load("GoalFormLabels", labels), stepId: 0});
    }

  componentWillUnmount() {
      const {visibleLabels, clickedLabels} = this.state;
      this.props.save("GoalFormLabels", {visibleLabels, clickedLabels});
    }

  incrementStep = () => {
    this.setState((state) => ({
      stepId: state.stepId + 1,
    }));
    this.props.change({name: this.state.stepId, value: ""})
  }

	handleSubmit = (event) => {
    event.preventDefault();
    this.props.submit('labels',this.state.clickedLabels); 
    this.setState({
      visibleLabels: false,
      clickedLabels: {}
      });
  	}

  toggleLabel = (event) => {
    const name = event.target.name;
    const clickedLabels = this.state.clickedLabels;
    if (name in this.state.clickedLabels) {
      const value = !this.state.clickedLabels[name];
      this.setState({clickedLabels: {...clickedLabels, ...{[name]: value}}});
    }
    else {
      this.setState({clickedLabels: {...clickedLabels, ...{[name]: true}}});
    }
  }

  handleDeleteStep = (event) => {
    const id = parseInt(event.target.name, 10);
    const {title, ...steps} = this.props.input;
    const newSteps = {...steps}
    delete newSteps[id];
    this.props.change({title, ...newSteps}, true);
  }

  handleVisibleLabel = (event) => {
    const value = this.state.visibleLabels;
    this.setState({visibleLabels : !value});
  }  

	render() {
    const {title, ...stepForms} = this.props.input;
		const children = Object.keys(stepForms).map(id =>
			<div id={id} 
				key={id}
			> 
	  		<input type="text" 
	  			value={this.props.input[id]} 
	  			onChange={event => {this.props.change(event.target); }}
	  			name={id}
	  			id={id}
	  			className={"StepForm"}
	  		/>
	  		<input type="button"
	  			value="x" 
	  			onClick={this.handleDeleteStep} 
	  			name={id}
	  			className={"DeleteStep"}
	  		/>
  		</div>
  	);

		return (
      <div className="GoalFormWithLabel">
			<div className="GoalForm">
			<form 
        onSubmit={this.handleSubmit} 
        autoComplete={"off"}
      >
        <input type="text" 
          value={title} 
          onChange={event => {this.props.change(event.target); }}
          name="title" 
          className={"Title"}
          placeholder={this.props.title}
        />
        <input type="button" 
        	value="Add Step" 
        	onClick={this.incrementStep}
        	className={"AddStep"}
        	/>
        {children}
        <div>
       <input type="submit" 
       	value="Submit"
       	className={"Submit"}
       	/>
       <input type="button"
        value="Label"
        className={"GoalFormLabel"}
        onClick={this.handleVisibleLabel}
        />
      	</div>
      </form>
      </div>
      {this.state.visibleLabels && 
        <LabelSelection 
          className={"LabelContainer"} 
          output={this.props.labels.output}
          toggle={this.toggleLabel}
          selected={this.state.clickedLabels}
        />
      }
      </div>
		);
	}
}

export default GoalForm;