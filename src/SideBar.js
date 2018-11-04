import React, { Component } from 'react';

class SideBar extends Component {
	constructor(props) {
		super(props);
		this.state = {
			visible: false
		};
	}

	render() {
	const labels = this.props.output.map(value => {
		return <li key={value.id} 
					className={"Label"}
					>{value.label}
					</li>
	})
	return (
		<div className="SideBar">
		<div className="SideBarSection">
			<div className="SideBarHeadings">Labels
				<button 
					className="SideBarButton"
					onClick={()=> this.setState({visible: true})}
				>+
				</button>
			</div>
			<ul>
				{labels}
				{this.state.visible &&
					<form 
        onSubmit={(event)=> {
        	event.preventDefault(); 
        	this.props.submit();
        	this.setState({visible: false});
        }} 
        autoComplete={"off"}
     		>
        <input type="text" 
          value={this.props.input['label']} 
          onChange={event => 
          	{
          		this.props.change(event.target);
          	}}
          name="label" 
          className={"LabelInput"}
          autoFocus={true}
          onBlur={() => this.setState({visible: false})}
        />
       <input type="submit" 
       	value="Ok"
       	className={"LabelSubmit"}
       	/>
      </form>
				}
			</ul>
		</div>
		<div className="SideBarSection">
			<div className="SideBarHeadings">Dates</div>
		</div>
		</div>
		)
	}
}

export default SideBar;