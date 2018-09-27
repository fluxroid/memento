//use date as unique key

import React, { Component } from 'react';

class Note extends Component {
	constructor(props) {
    super(props);

    this.handleEdit = this.handleEdit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  	handleEdit = (event) => {
  		this.props.onNoteEdit(event.target)
  	}

  	handleDelete = (event) => {
  		this.props.onNoteDelete(event.target.name)
  	}

  	render() {
  		const texts = this.props.texts;
  		return(

  			<div>
			{
				texts.map((text, index) => 
				{
				return (
					<div key={text.id} 
						className={'Note'}
					>	
	  					<div>
	  						<input 
	  							className={'NoteInput'}
	  							name={[index,'title']} 
	  							value={text.title}
	  							onChange={this.handleEdit}
							/> 
						</div>

	  					<div>
	  						<input 
	  							type="text" 
	  							className={'NoteInput'}
	  							name={[index,'body']} 
	  							value={text.body}
	  							onChange={this.handleEdit}
	  						/> 
	  					</div>
	  					<div>
	  						<button 
	  							onClick={this.handleDelete}
	  							name={text.id}
	  						>
	  							D
	  						</button>
	  					</div>

					</div>
					)
				})
			}
			</div>
		)
}
}
	
export default Note;