import React,{useEffect,useState} from 'react'
import { Col, Container, Row, Card } from 'react-bootstrap'
import delivery from '../Assets/delivery.png'
import bike from '../Assets/bike.jpg'
import satisfied from '../Assets/satisfied.jpg'
import NavBar from '../components/Navbar/Navbar';
import 'react-vertical-timeline-component/style.min.css';
import '../App.css';
import {Root} from './../Config/root';
import AvailableTripsCard from '../components/Cards/AvailableTripsCard'
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import NewsletterFooter2 from '../components/Footer/NewsletterFooter2.jsx';
import AuctionCard from '../components/Cards/Auctioncard';

const Home = ({navigation,myData}) => {

    var navigate = useNavigate();
    let [tripArray,setTripArray] = useState();
    let [auctionArray,setAuctionArray] = useState();

    useEffect( async()=>{
        try{
            // fetching active trips to display them
            var {data} = await axios.get(`${Root.production}/trip/getAllActiveTrips`);
            if(data.status==200){
                tripArray=data.message;
                setTripArray(tripArray);
            }
            // fetching open auctions to display them
            var {data} = await axios.get(`${Root.production}/auction/getAllOpenAuctions`);
            if(data.status==200){
                auctionArray=data.message.auctions;
                setAuctionArray(auctionArray);
            }
        }
        catch(err){
        }
    },[])

    return (
        <div>
        <NavBar navigation={navigation}/>
            <Container  className='text-center' >
                <Row className='align-items-center' >
                    <Col sm={6} className='text-start' >
                        <h1>Deliver packages. <br />
                        with ease, with efficiency.</h1>
                    </Col>
                    <Col sm={6} className='text-center' >
                        <img src={delivery} className='img-fluid  w-100' alt='img' />
                    </Col>
                </Row>
            </Container>
            <Container className='text-center' >
                <h1>Our Services</h1>
                <Row className='text-center' >
                    <Col md={6} >
                        <Card
                            className='mx-2 my-2'
                            style={{color:'#1A2387',
                        borderWidth:2,borderColor:'#1A2387',backgroundColor:'white'}}
                        >
                            <Card.Body>
                                <Card.Title>Get Instant Delivery</Card.Title>
                                <Card.Text>
                                    With riders all around you, you can get your package shipped 24/7
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>

                    <Col md={6} >
                        <Card
                            style={{backgroundColor:'#1A2387'}}
                            text='light'
                            className='mx-2 my-2'
                        >
                            <Card.Body>
                                <Card.Title>Deliver {'&'} Earn</Card.Title>
                                <Card.Text>
                                    Deliver packages to generate a secondary income
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>




                </Row>
            </Container>
            <Container>
                <hr />
                <Row>
                    <Col>
                    <h3>Request to place your order: </h3>
                    </Col>
                </Row>
                <Row>
                    {
                        tripArray && (
                            tripArray.filter((item, idx) => idx < 3).map(trip =>(
                                                          
                                    <Col md={4} >
                                    <AvailableTripsCard notlogedIn={true} tripData={trip}  route={'/login'}/>
                                    </Col>
                            ))
                        )
        }
                </Row>
                <Row>
                    {
                        auctionArray && (
                            auctionArray.filter((item, idx) => idx < 3).map(auction =>(
                                                          
                                    <Col md={4} >
                                    <AuctionCard myData={auction}  route={'/login'}/>
                                    </Col>
                            ))
                        )
        }
                </Row>
            </Container>
            <Container   >
                <Row className='align-items-center' >
                <Col sm={6} className='text-center' >
                        <img src={bike} className='img-fluid  w-100' alt='img' />
                    </Col>
                    <Col sm={6} className='text-start' >
                    <h1>Hire Carrier</h1>
                        <p>There are the people who can deliver your parcels.A carrier is a registered Dakiyah rider.</p>
                    </Col>
                </Row>
            </Container>

            <Container  >
                <Row className='align-items-center' >
                    <Col sm={6} className='text-start' >
                    <h1>Find Shipper</h1>
                        <p>There are the people who have something be delivered.Carrier can earn from delivering parcels of their shippers.</p>
                    </Col>
                    <Col sm={6} className='text-center' >
                        <img src={satisfied} className='img-fluid  w-100' alt='img' />
                    </Col>
                </Row>
            </Container>
            <NewsletterFooter2/>
        </div>
    )
}

export default Home