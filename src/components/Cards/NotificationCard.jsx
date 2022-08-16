import React from 'react'
import './Cards.css'
import { Avatar } from '@mui/material'

const NotificationCard = ( header, message , path ,dateAndTime , type ) => {
    return (
        <div className='notification-card' >
           <div className="notification-card-content">
               <div className="notification-content-img">
                   <Avatar >N</Avatar>
               </div>
           <div>
            <h5 className='notification-header' >Header</h5>
            <p className='notification-message' >Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi ut repellendus ea doloribus id, adipisci repellat natus qui inventore eveniet. Maxime reiciendis saepe quisquam dolore illo nesciunt magni omnis! Dolor.</p>
            </div>
            <span className='notification-time' >dateAndTIme</span>
            </div>
        </div>
    )
}

export default NotificationCard
