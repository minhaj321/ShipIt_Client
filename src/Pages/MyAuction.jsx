import {Root} from './../Config/root.js';
import React, { useEffect, useState } from 'react'
import Title from './../components/Title/Title';
import AuctionCard from '../components/Cards/Auctioncard';
import { Row, Col } from 'react-bootstrap';
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import {useParams} from 'react-router-dom';
import axios from 'axios';
import '../Styles/MyAuction.css'
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";

const MyAuction = () => {

    var {id} = useParams();

  const [pageNumber, setPageNumber] = useState(1);
  let [array, setArray] = useState([])
  let [arr, setArr] = useState([0, 1, 2, 3, 4, 5, 6, 7, 8]);
  const [textError,setTextError] = useState('');
  const [cond,setCond] = useState(false);
  const [progress,setProgress] = useState(false);

  // fetching all auctions by this user
  useEffect(async() => {
    setCond(false);
    setProgress(true)
    try{
      var {data} = await axios.post(`${Root.production}/auction/getAuctionByUser`,{accountId:id});
      if(data.status==200){
          array=data.message;
          setArray(array);
        }
        else{
          setTextError(data.message);
          setCond(true);
        } 
    }
    catch(err){
      setTextError(err.message);
      setCond(true);
    }
    
  setProgress(false);

 }, [])


// pagination updation logic
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

  // total length of pages
  var total = array.length / 9;
  if (array.length % 9 === 0) {
    total = parseInt(total);
  } else {
    total = parseInt(total + 1);
  }



  return (
    <div>
      <Title title="My Auctions" />
      <Row>
     {
  progress &&
  <Col md={{span:8,offset:2}}>
  <Alert severity="success">
    <AlertTitle>Wait</AlertTitle>
    Loading...
  </Alert>
</Col>
}
{
  cond &&
  <Col md={{span:8,offset:2}}>
  <Alert severity="error">
    <AlertTitle>Error</AlertTitle>
    {textError}
  </Alert>
</Col>
}

            </Row>
      <Row className='auction-row' >
        {
        array.length>0 ?
        arr.map((val) => {
          if (array[val]) {
            // checking whether item exist or not
            return (
              <Col md={6}
              lg={4}
              xl={3}>
                <AuctionCard myData={array[val]} route={`/myauction-details/${array[val]._id}`} />
              </Col>
            )
          }
        }) :  <Col md={{offset:3,span:6}}> You have no auction. </Col>}
      </Row>

      {array.length > 9 && (
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

export default MyAuction
