//use date as unique key

import React, { Component } from 'react';

class Note extends Component {
	constructor(props) {
    super(props);

    this.handleEdit = this.handleEdit.bind(this);

  }
  	handleEdit = (event) => {
  		this.props.onNoteEdit(event.target)
  	}

  	render() {
  		const texts = this.props.texts;
  		return(

  			<div>
			{
				texts.map((text, id) => 
				{
				return (
					<div key={id} 
						className={'Note'}
					>	
  					<div>
  						<input 
  							className={'NoteInput'}
  							name={[id,'title']} 
  							value={text.title}
  							onChange={this.handleEdit}
						/> 
					</div>
  					<div><input 
  							type="text" 
  							className={'NoteInput'}
  							name={[id,'body']} 
  							value={text.body}
  							onChange={this.handleEdit}
  						/> 
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