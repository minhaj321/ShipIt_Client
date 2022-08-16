import React, { useEffect, useState } from 'react'
import {Root} from './../Config/root.js';
import Title from '../components/Title/Title'
import { Col, Row, Container } from 'react-bootstrap';
import Textfield from '../components/Fields/Textfield';
import { Formik, Form } from 'formik';
import { Button } from '@mui/material'
import * as Yup from 'yup'
import SendIcon from '@mui/icons-material/Send';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import io from 'socket.io-client';
import { useParams } from 'react-router-dom';
import '../Styles/Chat.css'
import ScrollToBottom ,{ useScrollToBottom }  from 'react-scroll-to-bottom';
import axios from 'axios';

const socket = io(`${Root.production}`)

// fetching logined user from localstorage
var userData = JSON.parse(localStorage.getItem('user'));
if (userData) {
    var senderId = userData.account._id;
}

const Chat = () => {

    var [arr, setArr] = useState([]);
    var { id } = useParams();
    var [cond,setCond] = useState([]);

    const scrollToBottom = useScrollToBottom();

    // FETCHING messages on every sending from both ends
    useEffect(async() => {

            socket.emit('RoomJoin', { roomId: id });
            socket.on('getMessages', (data) => {
            arr = data.chats.reverse();
            setArr(arr);   
        })

        var {data} = await axios.post(`${Root.production}/chat/getChatById`,{
            chatId : id
        })
        if(data.status == 200){
            arr= data.message.chats.reverse();
            setArr(arr);
            setCond(true)
        }
    }, [])

    const ChatValidationSchema = Yup.object({
        message: Yup.string(),
    })

    return (
        <div className='chat-page' >
            <Title title="Chat" />
            {
                cond==true ? (
                    <ScrollToBottom>
                    <Container >
                        <Row>
                            <Col sm={{ span: 8, offset: 2 }}
                                style={{ height: '65vh', borderTop: '1px solid', overflowY: 'scroll'  }}
                            >
                                {arr.length > 0 &&
                                    arr.map((data, index) => (
                                        <div key={index} style={{ display: 'block' }}
                                            align={data.senderId !== userData.account._id ? 'left' : 'right'}
                                        >

                                            <p
                                                style={data.senderId !== userData.account._id ? {
                                                    background: '#EFEFEF',
                                                    color: '#203D88',
                                                    padding: 10,
                                                    borderRadius: '5%',
                                                    marginLeft: 10,
                                                    display: 'inline-block',
                                                    overflowWrap:'break-word',
                                                    width:'40%'

                                                } : {
                                                    background: '#203D88',
                                                    color: '#fff',
                                                    padding: 10,
                                                    borderRadius: '5%',
                                                    marginRight: 10,
                                                    display: 'inline-block',
                                                    overflowWrap:'break-word',
                                                    width:'40%'
                                                }}
                                            >   
                                                {data.message}
                                            </p>
                                        </div>
                                    ))
                                }
                            </Col>
                        </Row>
                        <Row style={{ margin: 0 }}>
                            <Col sm={{ span: 8, offset: 2 }}>
                                {/* message here */}

                                <Formik
                                    initialValues={{
                                        message: ''
                                    }}

                                    validationSchema={ChatValidationSchema}
                                    onSubmit={(values) => {
                                        // send message using socket io
                                        socket.emit('sendMessage', ({ senderId, message: values.message }))
                                        values.message='';
                                    }}
                                >
                                    {() => (
                                        <Form align="left">
                                            <Row style={{ margin: 0 , display:'flex' , flexDirection:'row' , justifyContent:'space-between' }}>
                                                <Col style={{ margin: 0 }}>
                                                    <Textfield name="message" label="Message" type="text" style={{width:'100%'}} />
                                                </Col >
                                                <Col  style={{ marginTop: 20 }}>
                                                    <Button
                                                        variant="contained"
                                                        color="primary"
                                                        startIcon={<SendIcon />}
                                                        endIcon
                                                        type="submit"
                                                        onClick={scrollToBottom}
                                                    >
                                                        Send
                                                    </Button>
                                                </Col>


                                            </Row>
                                        </Form>
                                    )}
                                </Formik>

                                {/* message end */}
                            </Col>
                        </Row>

                    </Container>
                    </ScrollToBottom>
                ) : ('Loading...')
            }

        </div>
    )
}

export default Chat
