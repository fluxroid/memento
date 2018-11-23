import React, { Component } from 'react';
import './css/SideBar.css'
import {Link} from "react-router-dom";

class SideBar extends Component {
	constructor(props) {
		super(props);
		this.state = {
			visible: false,
			deleteVisible: -1
		};
	}

	render() {
		const labels = this.props.labels.output.map(value => {
			const path = "/results/labels="+value.label;
			return <li key={value.id}
							className={"Label"}
							>							
							<Link to={path}>{value.label}</Link>	
						<button
							className={"DeleteLabelButton"}
							name={value.id}
							onClick={event => {
								if (window.confirm("Deleting this will remove this from Notes and Goals"))
								{
									this.props.removeLabel(value.label);
									this.props.labels.delete(event.target);
								}
							}
						}
						>
							X
						</button>
						</li>
			})
		const visible = this.state.visible;
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
					{visible &&
						<form 
		       		onSubmit={(event)=> {
		        	event.preventDefault(); 
		        	this.props.labels.submit();
		        	this.setState({visible: false});
		        	}} 
		        	autoComplete={"off"}
		     		>
		        <input type="text" 
		          value={this.props.labels.input['label']} 
		          onChange={event => 
		          	{
		          		this.props.labels.change(event.target);
		          	}}
		          name="label" 
		          className={"LabelInput"}
		          autoFocus={true}
		        />
		       	<div>
		       	<input type="submit"
		       		name="submit" 
		       		value="Ok"
		       		className={"LabelSubmit"}
		       	/>

		       <input type="button"
		       	name="cancel" 
		       	value="Cancel"
		       	className={"LabelCancel"}
		       	onClick={() => this.setState({visible: false})}
		       	/>
		       	</div>
	      	</form>
					}
				</ul>
			</div>
			</div>
			)
	}
}

//<div className="SideBarSection">
	//			<div className="SideBarHeadings">Dates</div>
		//	</div>
export default SideBar;