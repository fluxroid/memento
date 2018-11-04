import React, { Component } from 'react';

function withFeature(WrappedComponent, feature, idName, input) {
	return class extends Component {
		constructor(props) {
			super(props);
			this.state = {
				input: input,
				output: this.props.load(feature, []),
				id: this.props.load(idName, 0),
				deleted: false,
     		previousOutput: [],
     		label: this.props.load('label', [])
			};
		}

		edit = (target, name) => {
			const [index, key] = target.name.split(',');
    	const output = [...this.state.output];
    	output[index][key] = target.value;   
    	this.setState({
      	output: output
    	});
    	this.props.save(feature, output);
		}

		submit = () => {
	    const date = {date: new Date()};
	    const id = this.state.id;
	    const oldOutput = this.state.output;
    	const newOutput = [ ...oldOutput, {id, ...this.state.input, ...date}];
	    this.setState({
	    	previousOutput: [...this.state.previousOutput, oldOutput],
	      output: newOutput,
	      input: input, 
	      id: id + 1
	    });
	    this.props.save(feature, newOutput);
	    this.props.save(idName, id+1);   
  	}

		change = (target, replace=false) => {
			if (replace) {
				this.setState({
					input: target
				});
			}
			else {
				this.setState({
      		input: { ...this.state.input, ...{[target.name]: target.value} }
    		});
			}
		}

		delete = (target, timer=false) => {
	    const id = parseInt(target.name, 10);
	    const newFeature = this.state.output.filter(( feat => feat.id !== id));
	    this.setState({
	      previousOutput: [...this.state.previousOutput, this.state.output],
	      output: newFeature,
	      deleted: !timer
	    });
	    this.props.save(feature, newFeature);
  }

	  undo = () => {
	  	const previousOutput = this.state.previousOutput;
	    this.setState({
	      output: previousOutput[previousOutput.length - 1],
	      deleted: previousOutput.length > 1,
	      previousOutput: previousOutput.slice(0,-1)
	    })
	  }

		render() { 
			return (
				<WrappedComponent
					change={this.change}
					edit={this.edit}
					deleted={this.state.deleted}
					delete={this.delete}
					submit={this.submit}
					output={this.state.output}
					input={this.state.input}
					undo={this.undo}
					{...this.props}
					/>
				);
		}
	}
}

export default withFeature;