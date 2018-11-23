import React, { Component } from 'react';

function withFeature(WrappedComponent, feature, idName, input, deletedLabel, filterFunction) {
	return class extends Component {
		constructor(props) {
			super(props);
			this.state = {
				input: input,
				output: this.props.load(feature, []),
				id: this.props.load(idName, 0),
				deleted: false,
     		previousOutput: [],
			};
		}

		componentDidMount() {
			const input = this.state.input;
			this.setState({ input: this.props.load(feature+"Input", input)});
			if (this.state.output.some(
				portion=> {
					return ('labels' in portion) && (deletedLabel in portion['labels'])
						}
					)
				) 
			{
				this.edit('labels', deletedLabel, true);
			}
  	}

		componentWillUnmount() {
			const input = this.state.input;
			this.props.save(feature+"Input", input);
  	}

		edit = (target, name, all=false) => {
    	const output = [...this.state.output];
			if (all) {
				for (var item of output) {
					delete item[target][name];
				}
			}
			else {
				const [id, key] = target.name.split(',');
				for (var item2 of output) {
					if (String(item2.id) === id) 
						item2[key] = target.value;
				};   
			}
  		this.setState({
    		output: output
  		});
    	this.props.save(feature, output);
		}

		submit = (key='', other={}) => {
	    const date = {date: new Date()};
	    const id = this.state.id;
	    const oldOutput = this.state.output;
    	const newOutput = (key ==='')? [ ...oldOutput, {id, ...this.state.input, ...date}] : 
    	[ ...oldOutput, {id, ...this.state.input, ...date, ...{[key]: other} }];
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
					output={filterFunction? filterFunction(this.state.output) : this.state.output}
					input={this.state.input}
					undo={this.undo}
					{...this.props}
					/>
				);
		}
	}
}

export default withFeature;