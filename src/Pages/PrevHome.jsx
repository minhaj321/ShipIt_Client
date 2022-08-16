// it is an out dated home page of dakiyah
import React,{useEffect,useState} from 'react'
import { Col, Container, Row, Card } from 'react-bootstrap'
import delivery from '../Assets/delivery.png'
import bike from '../Assets/bike.jpg'
import fast from '../Assets/fast.jpg'
import mobile from '../Assets/mobile.jpg'
import satisfied from '../Assets/satisfied.jpg'
import worldwide from '../Assets/worldwide.jpg';
import NavBar from '../components/Navbar/Navbar';
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import '../App.css';
import Footer from '../components/Footer/Footer';
import AuctionCard from '../components/Cards/AuctionCard';


const PrevHome = ({navigation,myData}) => {

    useEffect( async()=>{
        // const {data} = await axios.post()
    },[])

    let user = JSON.parse(localStorage.getItem('CurrentUser'))
    console.log(user);
    return (
        <div>
        <NavBar navigation={navigation}/>
            <Container className='p-5'  >
                <Row className='align-items-center' >
                    <Col sm={6} className='text-start' >
                        <h1>Lorem ipsum, dolor sit amet consectetur adipisicing elit.</h1>
                    </Col>
                    <Col sm={6} className='text-center' >
                        <img src={delivery} className='img-fluid  w-100' alt='img' />
                    </Col>
                </Row>
            </Container>

            <Container className='p-5 text-center' >
                <h1>Our Services</h1>
                <Row className='text-center' >

                    <Col md={4} >
                        <Card
                            style={{backgroundColor:'#1A2387'}}
                            text='light'
                            className='mx-2 my-2'
                        >

                            <Card.Body>
                                <Card.Title>LOREM</Card.Title>
                                <Card.Text>
                                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sequi repellendus odit sunt, qui dolorum esse, itaque perspiciatis, quidem explicabo nam laudantium? Officiis nostrum reiciendis porro facilis, voluptatibus quidem consequuntur necessitatibus?
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>

                    <Col md={4} >
                        <Card
                            className='mx-2 my-2'
                            style={{color:'#1A2387',
                        borderWidth:2,borderColor:'#1A2387',backgroundColor:'white'}}
                        >
                            <Card.Body>
                                <Card.Title>LOREM</Card.Title>
                                <Card.Text>
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque delectus amet, animi ratione qui rem repudiandae pariatur aperiam voluptates dignissimos voluptatibus! Quis ratione sint corrupti itaque tempore eaque accusamus nam.
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>

                    <Col md={4} >
                        <Card
                            style={{backgroundColor:'#1A2387'}}
                            text='light'
                            className='mx-2 my-2'
                        >
                            <Card.Body>
                                <Card.Title>LOREM</Card.Title>
                                <Card.Text>
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique officiis soluta, ipsum totam, quam maiores exercitationem inventore incidunt, dicta quae aut libero atque praesentium eum! Non nesciunt aliquam hic fuga!
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
                    <h3>Lets bid on them: </h3>
                    </Col>
                </Row>
                <Row>
                    <Col>
                    <AuctionCard  myData={myData[0]} route='./dashboard/ManageAuctions/CarrierAuctionDetails'/>
                    <AuctionCard  myData={myData[1]} route='./dashboard/ManageAuctions/CarrierAuctionDetails'/>
                    <AuctionCard  myData={myData[2]} route='./dashboard/ManageAuctions/CarrierAuctionDetails'/>
                    </Col>
                </Row>
            </Container>

            <Container className='p-5'  >
                <Row className='align-items-center' >
                    <Col sm={6} className='text-start' >
                        <h1>LOREM</h1>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium dolor autem earum architecto quae accusamus dolorum veniam voluptates quo ipsa sequi, praesentium odit aliquam! Quos quisquam provident placeat odit sint?</p>
                    </Col>
                    <Col sm={6} className='text-center' >
                        <img src={fast} className='img-fluid  w-100' alt='img' />
                    </Col>
                </Row>
            </Container>
            <Container className='p-5'  >
                <Row className='align-items-center' >
                <Col sm={6} className='text-center' >
                        <img src={bike} className='img-fluid  w-100' alt='img' />
                    </Col>
                    <Col sm={6} className='text-start' >
                    <h1>LOREM</h1>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium dolor autem earum architecto quae accusamus dolorum veniam voluptates quo ipsa sequi, praesentium odit aliquam! Quos quisquam provident placeat odit sint?</p>
                    </Col>
                </Row>
            </Container>

            <Container className='p-5'  >
                <Row className='align-items-center' >
                    <Col sm={6} className='text-start' >
                    <h1>LOREM</h1>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium dolor autem earum architecto quae accusamus dolorum veniam voluptates quo ipsa sequi, praesentium odit aliquam! Quos quisquam provident placeat odit sint?</p>
                    </Col>
                    <Col sm={6} className='text-center' >
                        <img src={satisfied} className='img-fluid  w-100' alt='img' />
                    </Col>
                </Row>
            </Container>

            <Container className='p-5'  >
                <Row className='align-items-center' >
                    <Col sm={6} className='text-center' >
                        <img src={mobile} className='img-fluid  w-100' alt='img' />
                    </Col>
                    <Col sm={6} className='text-start' >
                    <h1>LOREM</h1>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium dolor autem earum architecto quae accusamus dolorum veniam voluptates quo ipsa sequi, praesentium odit aliquam! Quos quisquam provident placeat odit sint?</p>
                    </Col>
                </Row>
            </Container>

            <Container className='p-5'  >
                <Row className='align-items-center' >
                <Col sm={12} className='text-center' >
                <h1>LOREM</h1>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium dolor autem earum architecto quae accusamus dolorum veniam voluptates quo ipsa sequi, praesentium odit aliquam! Quos quisquam provident placeat odit sint?</p>
                    </Col>
                    <Col sm={12} className='text-center' >
                        <img src={worldwide} className='w-100' alt='img' />
                    </Col>
                </Row>
            </Container>
            

            <Container className='p-5 text-center'  >
                <h1>How it works</h1>
                <VerticalTimeline
                    className='vertical-timeline-custom-line'
                >
                    <VerticalTimelineElement
                        className="vertical-timeline-element--work"
                        contentStyle={{ background: '#1A2387', color: '#fff' }}
                        contentArrowStyle={{ borderRight: '7px solid  #1A2387' }}
                        iconStyle={{ background: '#1A2387', color: '#fff' }}

                    >
                        <h3 className="vertical-timeline-element-title">Create an account</h3>
                        <p className="vertical-timeline-element-subtitle">It's free and always will be.</p>
                    </VerticalTimelineElement>

                    <VerticalTimelineElement
                        className="vertical-timeline-element--work"
                        iconStyle={{ background: '#fff', border:'4px #1A2387 solid' }}

                    >
                        <h3 className="vertical-timeline-element-title">Verify your account.</h3>
                        <p className="vertical-timeline-element-subtitle">By link and by code.</p>
                    </VerticalTimelineElement>
                    <VerticalTimelineElement
                        className="vertical-timeline-element--work"
                        contentStyle={{ background: '#1A2387', color: '#fff' }}
                        contentArrowStyle={{ borderRight: '7px solid  #1A2387' }}
                        date="2008 - 2010"
                        iconStyle={{ background: '#1A2387', color: '#fff' }}

                    >
                        <h3 className="vertical-timeline-element-title">Post a shipping order.</h3>
                        <p className="vertical-timeline-element-subtitle">Let carriers know you are interested.</p>
                    </VerticalTimelineElement>

                    <VerticalTimelineElement
                        className="vertical-timeline-element--work"
                        iconStyle={{ background: '#fff', border:'4px #1A2387 solid' }}

                    >
                        <h3 className="vertical-timeline-element-title">Start bidding.</h3>
                        <p className="vertical-timeline-element-subtitle">The best bid wins the game.</p>

                    </VerticalTimelineElement>
                    <VerticalTimelineElement
                        className="vertical-timeline-element--education"
                        contentStyle={{ background: '#1A2387', color: '#fff' }}
                        contentArrowStyle={{ borderRight: '7px solid  #1A2387' }}
                        iconStyle={{ background: '#1A2387', color: '#fff' }}
                    >
                        <h3 className="vertical-timeline-element-title">Complete your order.</h3>
                        <p className="vertical-timeline-element-subtitle">With 100% satisfaction.</p>

                    </VerticalTimelineElement>
                    <VerticalTimelineElement
                        className="vertical-timeline-element--education"
                        iconStyle={{  background: '#fff', border:'4px #1A2387 solid' }}
                    >
                        <h3 className="vertical-timeline-element-title">Get paid.</h3>
                        <p className="vertical-timeline-element-subtitle">You'll be well rewarded fpr ypur efforts.</p>
                    </VerticalTimelineElement>
                    <VerticalTimelineElement
                        className="vertical-timeline-element--education"
                        date="2002 - 2006"
                        iconStyle={{ background: '#1A2387', color: '#fff' }}
                        contentArrowStyle={{ borderRight: '7px solid  #1A2387' }}
                        contentStyle={{ background: '#1A2387', color: '#fff' }}
                    >
                        <h3 className="vertical-timeline-element-title">Look for more.</h3>
                        <p className="vertical-timeline-element-subtitle">There is always a carrier around.</p>
                    </VerticalTimelineElement>
                </VerticalTimeline>
            </Container>
            <Footer/>
        </div>
    )
}

export default PrevHome