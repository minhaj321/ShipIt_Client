import { TextField, Typography , Button } from '@mui/material'
import React from 'react'
import NewsletterFooter2 from '../components/Footer/NewsletterFooter2'
import NavBar from '../components/Navbar/Navbar'
import '../Styles/contactUs.css'

const ContactUs = () => {
    return (
        <div>
            <NavBar />
                <div className='contact-us-page' >
                    <Typography variant='h2' >Contact Us</Typography>
                    <Typography variant='body1' >You can reach us by filling thr form below.</Typography>
                    <div className='contact-us-form' >
                        <TextField fullWidth label='Email' variant='outlined' color='primary' className='contact-us-form-item' type={'email'} />
                        <TextField fullWidth label='Type Of Problem' variant='outlined' color='primary' className='contact-us-form-item' />
                        <TextField fullWidth label='Message' variant='outlined' color='primary' className='contact-us-form-item' multiline rows={10} />
                    </div>
                    <div style={{width:'50%' , textAlign:'end' , margin:'auto'}} >
                        <Button variant='contained' color='primary'   >Send</Button>
                    </div>
                </div>
            <NewsletterFooter2 />
        </div>
    )
}

export default ContactUs
