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
import ShipperStatusBar from '../components/Navbar/ShipperStatusBar';
import axios from "axios";
import './../Styles/MyShipments.css';
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";


const MyShipments = () => {
  const [pageNumber, setPageNumber] = useState(1);
  const [toggle, setToggle] = useState(false);
  const [from, setFromCity] = useState("");
  const [to, setToCity] = useState("");
  let [filter, setFilter] = useState('');
  let [array, setArray] = useState([]);
  let [myAllShipments, setMyAllShipments] = useState([]);
  let [arr, setArr] = useState([0, 1, 2, 3, 4,5,6,7,8]);
  const [textError,setTextError] = useState('');
  const [cond,setCond] = useState(false);
  const [progress,setProgress] = useState(false);

  useEffect(async() => {
    setProgress(true)
    setCond(false)
    try{

    var getUserData = JSON.parse(localStorage.getItem('user'));
      // fetching shipments as shipper
      const {data} = await axios.post(`${Root.production}/trip/getShipmentOfferByUser`,{accountId:getUserData.account._id})
      if(data.status==200){
        myAllShipments=data.message;
        setMyAllShipments(myAllShipments);
        array=data.message;
        setArray(data.message)
      }else{
        setTextError(data.message)
        setCond(true)
      }
    }
catch(err){
  setTextError(err.message)
  setCond(true)
}

setProgress(false)
  }, []);

const handleDataFilter = (val)=>{

  // checking of 'all' option
  if(val!='All'){
  array = [];
    filter= val;
setFilter(filter);
array.push(
  myAllShipments.filter((val) => {
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
  array=myAllShipments;
  setArray(array)
}
  }

// filter method as per cities
  const filterData = () => {
    array = [];
    if (from !== "" && to === "") {
      // PUSH METHOD FOR FILTER FROM
      array.push(
        myAllShipments.filter((val) => {
          var check = val.pickupCity == from;
          if (check) {
            return val;
          }
        })
      );
      // END OF PUSH METHOD
      array = array[0];
      setArray(array);
    }

    if (to !== "" && from === "") {
      // PUSH METHOD FOR FILTER TO
      array.push(
        myAllShipments.filter((val) => {
          var gotit = val.destinationCity == to;
          if (gotit) {
            return val;
          }
        })
      );
      // END OF PUSH METHOD
      array = array[0];
      setArray(array);
    }

    if (to === "" && from === "") {
      array = myAllShipments;
      setArray(array);
    }
    if (from !== "" && to !== "") {
      // PUSH METHOD FOR FILTER TO
      array.push(
        myAllShipments.filter((val) => {
          var gotit = val.destinationCity === to && val.pickupCity === from;
          if (gotit) {
            return val;
          }
        })
      );
      // END OF PUSH METHOD
      array = array[0];
      setArray(array);
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
    <div className="my-shipment-main-div">
      <Title title="My Shipments" />
      <Row>
        <Col md={{ span: 2, offset: 10 }}>
          <Button
            color="secondary"
            variant="contained"
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
      <br />
      <ShipperStatusBar handleDataFilter={handleDataFilter}/>
      <br />
      <Row>
     {
  progress &&
  <Col  md={{span:8,offset:2}}>
  <Alert severity="success">
    <AlertTitle>Wait</AlertTitle>
    Loading...
  </Alert>
</Col>
}
{
  cond &&
  <Col  md={{span:8,offset:2}}>
  <Alert severity="error">
    <AlertTitle>Error</AlertTitle>
    {textError}
  </Alert>
</Col>
}

            </Row>
      <Row className='shipment-row' >
        {
        array.length>0 ?
        arr.map((val) => {
          if (array[val]) {
            return (
              <Col md={6}
              lg={4}
              xl={3}>
              <ShipmentRequestCard
                myData={array[val]}
                route={`/shipment-offer/${array[val]._id}`}
              />
              </Col>
            );
          }
        }) :  <Col md={{offset:3,span:6}}> You have no shipment. </Col>}
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

export default MyShipments;
