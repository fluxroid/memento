import React, { Component } from 'react';
import './css/Goal.css';
import CheckBox from './CheckBox.js'
//import Timer from './Timer.js'

class Goal extends Component {
	constructor(props) {
		super(props);
		const result = localStorage.getItem("checked")
		this.state = {
			visible: {},
			checked: result? JSON.parse(result) : this.handleUpdateChecked()

		};
		this.handleDrop = this.handleDrop.bind(this);
		this.handleCheck = this.handleCheck.bind(this); 
	}

	handleDrop(event) {
		const oldVisible = this.state.visible;
		const value = oldVisible[event.target.name];
		this.setState({
				visible: {...oldVisible, ...{[event.target.name]: !value }}
		});
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

	render () {
		const checked = this.state.checked;
		const goals = this.props.output.map( goal => {
			const {title, id, date, labels, ...steps} = goal;
	
			const shownLabels = Object.keys(labels).filter(label => labels[label]);
			const children = Object.keys(steps).map( stepId => {

				return (
					<div key={stepId}>
							<CheckBox
								checked={id in checked && checked[id][stepId]}
								onChange={(event) => this.handleCheck(event)}
								name={id+","+stepId}
							/>
							<span className="Children">
								<input type="text" 
          				value={goal[stepId]}
          				name={[id,stepId]} 
          				onChange={event => this.props.edit(event.target)}
          				className={"Children"}
        				/>
							</span>
					</div>
				);	
			})
			return (
			<div key={id} className="GoalWrapper">
			<div className={"Goal"}>
				<div>
					<CheckBox 
						checked={id in checked && checked[id]['title']}
						name={id+",title"}
						onChange={(event) => this.handleCheck(event)}
					/>
					<span>
						<input type="text" 
          		value={title} 
          		name={[id,"title"]}
          		onChange={event => this.props.edit(event.target)}
          		className={"GoalTitle"}
        		/>
					</span>
					<span className={"DeleteGoal"}>
						<button
							name={id}
							type="text"
							onClick={(event) => this.props.delete(event.target)}
						>
							x
						</button>
					</span>
					<span className={"DropDown"}>
						<button
							name={id} 
							type="text"
							onClick={this.handleDrop}
						>
							{this.state.visible[id] ? "-" : "+" }
						</button>
					</span>
				</div>
				<div>{this.state.visible[id] && children}</div>
			</div>
			{(shownLabels.length > 0) && <div className={"GoalLabelContainer"} >
					<ul>{shownLabels.map((label, index) => 
						<li key={index} className={"GoalLabelSelection"}><button>{label}</button></li>)}
					</ul>
			</div>
			}
			</div>
			);
				}
			)
		
		return (
			<div className={"GoalContainer"}>
				{goals}
			</div>
		);
	}
}
export default Goal;