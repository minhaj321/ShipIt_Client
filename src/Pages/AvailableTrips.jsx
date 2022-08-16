import {Root} from './../Config/root.js';
import React,{useEffect,useState} from 'react'
import Title from './../components/Title/Title';
import AvailableTripsCard from './../components/Cards/AvailableTripsCard';
import {Row,Col} from 'react-bootstrap';
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import axios from 'axios';
import moment from 'moment';
import './../Styles/AvailableTrips.css';
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";

const AvailableTrips = () => {
    
    const [pageNumber, setPageNumber] = useState(1);
    let [array,setArray] = useState([])
    let [arr, setArr] = useState([0, 1, 2, 3, 4,5,6,7,8]);
    var [show,setShow] = useState(true);
    var [loading,setLoading] = useState(false);
    // getting id of user using localstorage.
    var userDataIs = JSON.parse(localStorage.getItem('user'))
    const userId = userDataIs.account._id;

// fetching of data
    useEffect(async()=>{
      setLoading(true)
      var {data} =await axios.get(`${Root.production}/trip/getAllTrips`);
      if(data.status==200){
        array=data.message;
        setArray(array.reverse())
      }
      setLoading(false)
  },[])

var dateOfToday = moment().format('YYYY-MM-DD')

// start of page update logic w.r.t pagination
  const updatePage = (val) => {
    if (pageNumber > Number(val) && Number(val) > 0) {
      var get = (pageNumber - Number(val)) * 9;
      for (let i = 0; i < 9; i++) {
        arr[i] = arr[i] - get;
      }
    } else if (pageNumber < Number(val) && Number(val) <= total) {
      var get = (Number(val) - pageNumber) * 9;
      for (let i = 0; i < 9; i++) {
        arr[i] = arr[i] + get;
      }
    }
    setPageNumber(Number(val));
    setArr(arr);
  };
// end of page update logic w.r.t pagination

// start of finding the length of page numbers
  var total = array.length / 9;
  if (array.length % 9 === 0) {
    total = parseInt(total);
  } else {
    total = parseInt(total + 1);
  }
// end of finding the length of page numbers


    return (
        <div className="available-trip-div">
            <Title title="Available Trips" />
          <Row  className='available_trip_row' >
            {arr.map((val) => {
              // checking that trip is open and depart date is less than current date
        if (array[val] && array[val].departureDate >= dateOfToday && array[val].status=='Open') {
          setShow(false)
          return (
            <Col md={6}
            lg={4}
            xl={3}>
            <AvailableTripsCard  tripData={array[val]} route={`/create-request/${array[val]._id}`}/>
            </Col>
            )
        }
      })}
          </Row>
          <Row>
          {
  loading &&
  <Col  md={{span:8,offset:2}}>
  <Alert severity="success">
    <AlertTitle>Wait</AlertTitle>
    Loading...
  </Alert>
</Col>
}            
          </Row>
          {
            show &&
            <Row>
              <Col>
              <p>There is no trip available in this time.</p>
              </Col>
            </Row>
          }

            {(array.length > 9 && !show) && (
        <Row>
          <Col md={{ span: 6, offset: 5 }}>
            <Stack spacing={2}>
              <Pagination
                onChange={(e) => updatePage(e.currentTarget.textContent)}
                count={total}
                hidePrevButton 
                hideNextButton 
                shape="rounded"
                color="primary"
              />
            </Stack>
          </Col>
        </Row>
      )}
            {array.length===0 &&
      <div>
        <br/>
        <br/>
      </div>
      }

        </div>
    )
}

export default AvailableTrips
