import React, { Component } from 'react';
import Timer from './Timer.js';
import './css/Note.css';

class Note extends Component {
	constructor(props) {
    super(props);
    this.state = {
    	editable: false,
    	id: -1
    }

    this.handleEdit = this.handleEdit.bind(this);
    this.handleMouseEnter = this.handleMouseEnter.bind(this);
    this.handleMouseLeave = this.handleMouseLeave.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  	handleEdit = (event) => {
  		this.props.edit(event.target)
  	}

  	handleDelete = (event) => {
  		this.props.delete(event.target)
  		this.setState({editable: false});
  	}

  	handleMouseEnter = (event) => {
  		this.setState({
  			editable: true,
  			id: event.target.id
  		})
  	}

  	handleMouseLeave = (event) => {
		this.setState({
  			editable: false,
  			id: -1
  		})  	
	}

  	render() {
  		const texts = this.props.output;
  		const editable = this.state.editable;
  		const id = parseInt(this.state.id, 10);

  		return(

  			<div className={'NoteContainer'}> 		
			{
				texts.map((text, index) => 
				{
				const shownLabels = Object.keys(text.labels).filter(label => text.labels[label]);
				return (
					<div key={text.id} className={"NoteWrapper"}>
					<div  
						id={text.id}
						className={'Note'}
						onMouseEnter={this.handleMouseEnter}
						onMouseLeave={this.handleMouseLeave}
					>	
						<div>
	  						<button 
	  							onClick={this.handleDelete}
	  							className={"DeleteNoteButton"}
	  							name={text.id}
	  							id={text.id}
	  						>
	  							X
	  						</button>
	  					</div>
	  					<div>
	  						{ (editable && id===text.id) ? 
	  							<textarea
								name={[index, 'title']}
		  						className={'NoteInputTitle'}
		  						value={text.title}
		  						
		  						onChange={this.handleEdit}
		  						>
		  						</textarea> :

								<div 
		  						className={'NoteInputTitle'}
		  						>
		  							{text.title}
		  						</div>
	  						}
						</div>

	  					<div>
	  						{	(editable && id===text.id) ?
	  							<textarea
								name={[index, 'body']}
		  						className={'NoteInputBody'}
		  						value={text.body}
		  						onChange={this.handleEdit}
		  						>
		  						</textarea> :

		  						<div 
		  						className={'NoteInputBody'}
		  						>
		  						{text.body}
		  						</div>

	  						}
	  						<div>
								<Timer
								id={text.id}
								onNoteDelete={this.props.delete}
								time={text.date} 
								/>
							</div>
	  					</div>
					</div>
					{ (shownLabels.length > 0) &&
					<div className={"NoteLabelContainer"} >
					<ul>{shownLabels.map((label, index) => 
						<li key={index} className={"NoteLabelSelection"}><button>{label}</button></li>)}
					</ul>
					</div>
					}
					</div>
					)
				})
			}
			</div>
		)
}
}
	
export default Note;