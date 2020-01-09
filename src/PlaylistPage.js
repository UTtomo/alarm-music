import React from 'react';
import './PlaylistPage.css';

const TopMenu = (props) => {
	return (
		<div className='TopMenu'>
			<button className='edit' onClick={props.toggleIsEdit}>Edit</button>
			<button className='add' onClick={props.handleAdd}>+</button>
		</div>
	)
}

const PlaylistItem = (props) => {
	const className = 'PlaylistItem' + (props.isEdit ? ' editing' : '')
	const edit = props.isEdit ? props.edit : null
	return (
		<div className={className}>
			{props.isEdit && (<button className='remove' onClick={props.remove}>-</button>)}
			<div className='label' onClick={edit}>
				{props.label}
			</div>
			<div className='url'>
				<a target='_blank' href={props.url}>{props.url}</a>
			</div>
		</div>
	)
}

const EditPage = (props) => {
	const [label, setLabel] = React.useState(props.label)
	const [url, setURL] = React.useState(props.url)
	const handleEnter = () => {
		if(label !== '' && url !== '') {
			props.enter(label, url)
		}
	}
	return (<div className='EditPage'>
		<div className='TopMenu'>
			<button className='Cancel' onClick={props.close}>Cancel</button>
			<button className='Enter' onClick={handleEnter}>Enter</button>
		</div>
		<div className='Form'>
			<div className='Label'>Label</div>
			<input className='Input' value={label} onChange={(e) => setLabel(e.target.value)}></input>
			<div className='Label'>URL</div>
			<input className='Input' value={url} onChange={(e) => setURL(e.target.value)}></input>
		</div>
	</div>)
}

function PlaylistPage(props) {
	const [isEdit, setIsEdit] = React.useState(false)
	const [stateEdit, setStateEdit] = React.useState({
		visible: false,
		playlist: null,
		edit: false,
	})

	const toggleIsEdit = () => {
		setIsEdit(!isEdit)
	}
	const handleAdd = () => {
		setStateEdit({
			visible: true,
			playlist: null,
			edit: false,
		})
	}
	const handleEdit = (playlist) => {
		setStateEdit({
			visible: true,
			playlist,
			edit: true,
		})
	}
	const handleEnter = (label, url) => {
		if(stateEdit.edit) {
			props.updatePlaylist(stateEdit.playlist.uid, label, url)
		} else {
			props.addPlaylist(label, url)
		}
		setStateEdit({
			visible: false,
			playlist: null,
			edit: false
		})
		setIsEdit(false)
	}
	
	const handleClose = () => {
		setStateEdit({
			visible: false,
			playlist: null,
			edit: false,
		})
	}
	
	return (
		<div className='PlaylistPage'>
			{!stateEdit.visible ? <React.Fragment>
				<TopMenu toggleIsEdit={toggleIsEdit} handleAdd={handleAdd}></TopMenu>
				{props.playlists.map((v, i) => (<PlaylistItem key={v.uid} {...v} isEdit={isEdit} edit={handleEdit.bind(null, v)} remove={props.removePlaylist.bind(null, v.uid)}></PlaylistItem>))}
			</React.Fragment> : <React.Fragment>
				<EditPage close={handleClose}
					label={stateEdit.edit ? stateEdit.playlist.label : ''}
					url={stateEdit.edit ? stateEdit.playlist.url : ''}
					enter={handleEnter}></EditPage>
			</React.Fragment>}
		</div>
	);
}

export default PlaylistPage;
