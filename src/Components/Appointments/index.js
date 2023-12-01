import {Component} from 'react'
import {format} from "date-fns"
import {v4} from "uuid"
import AppointmentItem from "../AppointmentItem"

import "./index.css"

class Appointments extends Component {
    state = {titleInput:'', dateInput:'', appointmentsList:[], isStarredActive: false}

    getAppointmentTitle = (event) => {
        this.setState({titleInput: event.target.value})
    }

    getDateOfAppointment = (event) => {
        this.setState({dateInput: event.target.value})
    }

    addAppointment = (event) => {
        event.preventDefault()
        const {titleInput, dateInput} = this.state
        const formattedDate = dateInput ? format(new Date(dateInput), 'dd MMMM yyyy, EEEE') : ''

        const newAppointment = {
            id: v4(),
            title:titleInput,
            date:formattedDate,
            isStarred: false
        }

        this.setState(prevState => ({
            appointmentsList: [...prevState.appointmentsList, newAppointment],
            titleInput: '',
            dateInput: ''
        }))
    }

    renderAppointmentItem = (list) => {
        return list.map(eachEntry => (
            <AppointmentItem 
                key={eachEntry.id}
                appointment={eachEntry}
                toggleIsStarred={this.toggleIsStarred}
            />
        ))
    }

    toggleIsStarred = id => {
        this.setState(prevState => ({
            appointmentsList: prevState.appointmentsList.map(eachEntry => {
                if (id === eachEntry.id){
                    return {...eachEntry, isStarred: !eachEntry.isStarred}
                }
                return eachEntry
            })
        }))
    }

    showMyFavourites = () => {
        this.setState(prevState => ({
            isStarredActive: !prevState.isStarredActive
        }))
    }


    render(){
        const {titleInput, dateInput, isStarredActive, appointmentsList} = this.state
        const starClassName = isStarredActive ? "active-star" : "inactive-star"
        let filteredList
        if (isStarredActive){
            filteredList = appointmentsList.filter(eachItem => eachItem.isStarred === true)
        }
        else{
            filteredList = appointmentsList
        }
        return (
            <div className='appointment-app-container'>
                <div className="appointment-app-card">
                    <h1 className='card-heading'>Add Appointments</h1>
                    <div className='form-content'>
                        <form className="form" onSubmit={this.addAppointment}>
                            <div className='title-container'>
                                <label className="title-label" htmlFor="title">TITLE</label>
                                <div>
                                    <input id="title" value={titleInput}  onChange={this.getAppointmentTitle} placeholder="Title" className='input-text-field' type="text"/>
                                </div>
                            </div>
                            <div className='date-container'>
                                <label className="date-label" htmlFor="date">DATE</label>
                                <div>
                                    <input id="date" value={dateInput}  onChange={this.getDateOfAppointment} className='date-field' type="date"/>
                                </div>
                            </div>
                            <button className='add-button'>Add</button>
                        </form>
                        <img className="image" src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png" alt="appointments"/>
                    </div>
                    <hr className="line"/>
                    <div className='appointment-starred-section'>
                        <p className='heading'>Appointments</p>
                        <div>
                            <button className={starClassName} onClick={this.showMyFavourites}>Starred</button>
                        </div>
                    </div>
                    <ul className='appointments-list'>{this.renderAppointmentItem(filteredList)}</ul>
                </div>
            </div>
        )
    }
}

export default Appointments