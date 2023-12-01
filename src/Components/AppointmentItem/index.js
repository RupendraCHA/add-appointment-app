import "./index.css"

const AppointmentItem = props => {
    const {appointment, toggleIsStarred} = props
    const {id, date, isStarred, title} = appointment

    const starImgUrl = isStarred ? "https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png" : 
                                    "https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png"


    const addToFavourites = () => {
        toggleIsStarred(id)
    }
                                    
    return (
        <div className="item-container">
            <div class="title-star">
                <p className="appointment-details">{title}</p>
                <button className="favourite" onClick={addToFavourites}>
                    <img src={starImgUrl} alt="starImg"/>
                </button>
            </div>
            <p className="date-text">{date}</p>
        </div>
    )
}
export default AppointmentItem