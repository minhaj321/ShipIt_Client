import { TextField , Button} from '@mui/material'
import React,{useState} from 'react'
import './Footer.css';
import {Col,Row} from 'react-bootstrap';
import logisticImg from './../../Assets/footer.png'

const NewsletterFooter2 = () => {

var [email,setEmail]  =useState('');

const handleSubmit = async()=>{
    
}

    return (
        <div className='newsletter-footer2' >
            <Row align="center" style={{marginLeft:10}}>
                <Col md={5}>
                    <br /><br />
            <p>All rights reserved</p>
            <p>Subscribe to our newsletter</p>
            <TextField 
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            variant="standard" placeholder="Email"
            color="secondary" 
            InputProps={{
                style:{color:"#fff"}
            }}
            />
            <br /><br />
            <Button
            onClick={()=>handleSubmit()}
            style={{marginLeft:10}}
            variant='contained' color='secondary' >
                Subscribe
            </Button>

                </Col>
                <Col md={7}>
                <img src={logisticImg} className="footer_image2" style={{
                    height:300,
                    width:700,
                    marginTop:-20,
                }}/>
                </Col>
            </Row>
        </div>
    )
}

export default NewsletterFooter2
