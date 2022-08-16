import {Root} from './../Config/root.js';
import React, { useState, useEffect } from "react";
import Title from "../components/Title/Title";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { Col, Row } from "react-bootstrap";
import ShipmentRequestCard from "../components/Cards/ShipmentRequestCard";
import FilterAltRoundedIcon from "@mui/icons-material/FilterAltRounded";
import { Button } from "@mui/material";
import SearchSharpIcon from "@mui/icons-material/SearchSharp";
import DropDown from "../components/DropDown/DropDown";
import CarrierStatusBar from '../components/Navbar/CarrierStatusBar';
import axios from 'axios';
import './../Styles/MyOffers.css';
import {useParams} from 'react-router-dom';
import {useLocation} from 'react-router-dom';
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";

const MyOffers = () => {
  const {id} = useParams()
  const [pageNumber, setPageNumber] = useState(1);
  const [toggle, setToggle] = useState(false);
  var [loading,setLoading] = useState(false);
  var [error,setError] = useState(false);
  var [errorMsg,setErrorMsg] = useState('');
const [from, setFromCity] = useState("");
  const [to, setToCity] = useState("");
  let [filter, setFilter] = useState("");
  let [array, setArray] = useState([]);
  let [myAllOffers, setMyAllOffers] = useState([]);
  let [arr, setArr] = useState([0, 1, 2, 3, 4,5,6,7,8]);
  var {state}= useLocation();
  
  useEffect(async() => {
    setError(false);
    setLoading(true)

    try{
      // fetching shipment offers as carries.
    setArray([]);
    setMyAllOffers([]);
    // checking whether this page is from bashboard
    if(state==null){
      var {data} = await axios.post(`${Root.production}/trip/getShipmentOffersByCarrier`,{carrierId:id})
      if(data.status==200){
        myAllOffers=data.message;
        array=data.message;
        myAllOffers=myAllOffers.reverse()
        setMyAllOffers(myAllOffers);
        setArray(array)
}else{
  setError(true);
  setErrorMsg('There is an error in getting your offers.')
}
    }
    // checking whether this route is from 'view offers' button in trip details page
    else{
      state.data.map(async(v,i)=>{
          var {data} = await axios.post(`${Root.production}/trip/getShipmentById`,{shipmentOfferId:v});
          if(data.status==200){
            if(data.message.status=='Pending'){
              myAllOffers=[...myAllOffers,data.message];
              array=[...array,data.message];
              myAllOffers=myAllOffers.reverse()
              setMyAllOffers(myAllOffers);
              setArray(array)
                      }
          }
          else{
            setError(true);
            setErrorMsg('There is an error in getting your trips.')
        
          }
      })
    }
    myAllOffers=myAllOffers.reverse()
    setMyAllOffers(myAllOffers);
    setArray(array)
  }
  catch(err){
    setError(true);
    setErrorMsg('There is an error in getting your trips.')

  }
  setLoading(false)
  }, []);

  const handleDataFilter = (val)=>{

    // checking of 'all' option
    if(val!='All'){
        array = [];
          filter= val;
      setFilter(filter);
      array.push(
        myAllOffers.filter((val) => {
          var check = val.status == filter;
          if (check) {
            return val;
          }
        })
      );
      array = array[0];
      setArray(array);
      
      }
      // checking the status condition
      else{
        array=myAllOffers;
        setArray(array)
      }
  }
// filter method as per cities
  const filterData = () => {
    array = [];
    if (from !== "" && to === "") {
      // PUSH METHOD FOR FILTER FROM
      array.push(
        array.filter((val) => {
          var gotit = val.pickUpCity == from;
          if (gotit) {
            return val;
          }
        })
      );
      // END OF PUSH METHOD
      array = array[0];
      setArray(array);
      console.log("from==", array);
    }

    if (to !== "" && from === "") {
      // PUSH METHOD FOR FILTER TO
      array.push(
        array.filter((val) => {
          var gotit = val.dropOffCity == to;
          if (gotit) {
            return val;
          }
        })
      );
      // END OF PUSH METHOD
      array = array[0];
      setArray(array);
      console.log("to==", array);
    }

    if (to === "" && from === "") {
      setArray(array);
      console.log("both null", array);
    }
    if (from !== "" && to !== "") {
      // PUSH METHOD FOR FILTER TO
      array.push(
        array.filter((val) => {
          var gotit = val.dropOffCity === to && val.pickUpCity === from;
          if (gotit) {
            return val;
          }
        })
      );
      // END OF PUSH METHOD
      array = array[0];
      setArray(array);
      console.log("both are on", array);
    }
  };

  // handle from city
  const HandleFrom = (city) => {
    setFromCity(city);
  };

  // handle to city
  const HandleTo = (city) => {
    setToCity(city);
  };

  // pagination updation logic
  const updatePage = (val) => {
    console.log(pageNumber);
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

  // method to toggle display of fiter box 
  const toggleIt = () => {
    setToggle(!toggle);
    setFromCity("");
    setToCity("");
  };

  // checking number of pages
  var total = array.length / 9;
  if (array.length % 9 === 0) {
    total = parseInt(total);
  } else {
    total = parseInt(total + 1);
  }

  return (
    <div className="my-offers-main-div">
      <Title title="My Orders" />
      <Row>
        <Col md={{ span: 2, offset: 10 }}>
          <Button
            color="secondary"
            variant="contained"
            className="offer_filter_btn"
            style={{ color: "black" }}
            onClick={() => toggleIt()}
          >
            {" "}
            <FilterAltRoundedIcon /> Filter
          </Button>
        </Col>
      </Row>
      {toggle && (
        <Row style={{ height: "80px" }} className="my-offer-filter-div">
          <Col md={{ span: 10, offset: 1 }}>
            <Row
              style={{
                background: "#f1efefef",
                height: "90px",
                margin: 0,
                borderRadius: "2%",
              }}
            >
              <Col xs={4} lg={2} md={3} style={{ marginTop: 10 }}>
                <DropDown
                  setData={HandleFrom}
                  height="30px"
                  width={"90%"}
                  type="city"
                  inputLabel="From"
                />
              </Col>
              <Col xs={4} sm={{ span: 2 }} lg={2}  md={3} style={{ marginTop: 10, height: 20 }}>
                <DropDown
                  setData={HandleTo}
                  height="30px"
                  width={"90%"}
                  type="city"
                  inputLabel="To"
                />
              </Col>
              <Col xs={4} md={{ span: 3, offset: 2 }} lg={{span:2,offset:5}} style={{ marginTop: 30 }}>
                <Button
                  color="secondary"
                  variant="contained"
                  onClick={() => {
                    filterData();
                  }}
                >
                  <SearchSharpIcon />
                </Button>
              </Col>
            </Row>
          </Col>
        </Row>
      )}
      <br />{
        state==null &&
      <CarrierStatusBar handleDataFilter={handleDataFilter}/>
      }
      <br />
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
{
  error &&
  <Col  md={{span:8,offset:2}}>
  <Alert severity="error">
    <AlertTitle>Error</AlertTitle>
    {errorMsg}
  </Alert>
</Col>
}
</Row>

      <Row className="offers_cards_main">
        {(array.length==0 && !loading) &&
        <p>You haven't any shipment yet</p>
        }
        {arr.map((val) => {
          if (array[val]) {
            return (
              <Col md={6}
              lg={4}
              xl={3}>
              <ShipmentRequestCard
                myData={array[val]}
                route={`/offer-details/${array[val]._id}`}
              />
              </Col>
            );
          }
        })}
      </Row>
      {array.length > 9 && (
        <Row>
          <Col md={{ span: 6, offset: 5 }}>
            <Stack spacing={2}>
              <Pagination
                onChange={(e) => updatePage(e.currentTarget.textContent)}
                count={total}
                hideNextButton
                hidePrevButton
                shape="rounded"
                color="primary"
              />
            </Stack>
          </Col>
        </Row>
      )}
    </div>
  );
};

export default MyOffers;
