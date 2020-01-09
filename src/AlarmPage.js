import React from 'react';
import Select from 'react-select';
import Switch from "react-switch";
import './AlarmPage.css';

const TopMenu = (props) => {
	return (
		<div className='TopMenu'>
			<button className='edit' onClick={props.toggleIsEdit}>Edit</button>
			<button className='add' onClick={props.handleAdd}>+</button>
		</div>
	)
}

const Alarm = (props) => {
	const className = 'Alarm' + (props.isEdit ? ' editing' : '')
	const edit = props.isEdit ? props.edit : null
	const handleChange = (checked) => {
		props.setIsValid(checked)
	}
	return (
		<div className={className}>
			{props.isEdit && (<button className='remove' onClick={props.remove}>-</button>)}
			<div className='time' onClick={edit}>
				{zeroPadding(props.hour) + ' : ' + zeroPadding(props.minute)}
			</div>
			<Switch className='switch' onChange={handleChange} checked={props.isValid} />
			<div className='playlistName'>
				{props.getPlaylistInfo(props.playlistUID).label}
			</div>
		</div>
	)
}

const EditPage = (props) => {
	const [hour, setHour] = React.useState(props.hour)
	const [minute, setMinute] = React.useState(props.minute)
	const [playlist, setPlaylist] = React.useState({
		value: props.playlistUID,
		label: props.getPlaylistInfo(props.playlistUID).label
	})
	const handleEnter = () => {
		if(hour !== '' && minute !== '' && playlist.value !== '') {
			console.log(playlist)
			props.enter(hour, minute, playlist.value)
		}
	}
	const number = (str) => {
		const num = Number(str)
		return num.isNaN ? 0 : num
	}
	const options = props.playlists.map(p => ({
		value: p.uid,
		label: p.label
	}))
	return (
		<div className='EditPage'>
			<div className='TopMenu'>
				<button className='Cancel' onClick={props.close}>Cancel</button>
				<button className='Enter' onClick={handleEnter}>Enter</button>
			</div>
			<div className='Form'>
				<div className='Label'>Hour</div>
				<input className='Input' value={hour} onChange={(e) => setHour(number(e.target.value))}></input>
				<div className='Label'>Minute</div>
				<input className='Input' value={minute} onChange={(e) => setMinute(number(e.target.value))}></input>
				<div className='Label'>Playlist</div>
				<Select
					className='Input'
					value={playlist}
					onChange={(v) => setPlaylist(v)}
					options={options}
				/>
			</div>
		</div>)
}

function AlarmPage(props) {
	const [isEdit, setIsEdit] = React.useState(false)
	const [stateEdit, setStateEdit] = React.useState({
		visible: false,
		alarm: null,
		edit: false,
	})

	const toggleIsEdit = () => {
		setIsEdit(!isEdit)
	}
	const handleAdd = () => {
		setStateEdit({
			visible: true,
			alarm: null,
			edit: false,
		})
	}
	const handleEdit = (alarm) => {
		setStateEdit({
			visible: true,
			alarm,
			edit: true,
		})
	}
	const handleEnter = (hour, minute, playlistUID) => {
		if(stateEdit.edit) {
			props.updateAlarm(stateEdit.alarm.uid, hour, minute, playlistUID, false)
		} else {
			props.addAlarm(hour, minute, playlistUID)
		}
		setStateEdit({
			visible: false,
			alarm: null,
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
		<div className='AlarmPage'>
			{!stateEdit.visible ?
			<React.Fragment>
				<TopMenu toggleIsEdit={toggleIsEdit} handleAdd={handleAdd}></TopMenu>
				{props.alarmList.map(v => <Alarm key={v.uid} {...v} setIsValid={props.updateAlarm.bind(null, v.uid, v.hour, v.minute, v.playlistUID)} getPlaylistInfo={props.getPlaylistInfo} isEdit={isEdit} edit={handleEdit.bind(null, v)} remove={props.removeAlarm.bind(null, v.uid)}></Alarm>)}
			</React.Fragment> : <React.Fragment>
				<EditPage 
					playlists={props.playlists}
					getPlaylistInfo={props.getPlaylistInfo}
					close={handleClose}
					hour={stateEdit.edit ? stateEdit.alarm.hour : 0}
					minute={stateEdit.edit ? stateEdit.alarm.minute : 0}
					playlistUID={stateEdit.edit ? stateEdit.alarm.playlistUID : ''}
					enter={handleEnter}></EditPage>
			</React.Fragment>}
		</div>
	);
}

function padding(a, b) {
	let a_temp = a.slice()
	let b_temp = b.slice()
	a_temp.reverse()
	b_temp.reverse()
	let result = []
	for (let i = 0; i < Math.max(a.length, b.length); ++i) {
		result.push(i < b.length ? b_temp[i] : a_temp[i])
	}
	result.reverse()
	return result
}

function zeroPadding(value, digit=2) {
	return padding('00'.split(''), String(value).split('')).join('')
}


export default AlarmPage;
