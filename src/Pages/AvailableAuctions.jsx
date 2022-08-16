import React, { useState, useEffect } from "react";
import Title from "./../components/Title/Title";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { Col, Row } from "react-bootstrap";
import AuctionCard from '../components/Cards/Auctioncard';
import FilterAltRoundedIcon from "@mui/icons-material/FilterAltRounded";
import { Button } from "@mui/material";
import SearchSharpIcon from "@mui/icons-material/SearchSharp";
import DropDown from "./../components/DropDown/DropDown";
import { randomData } from "./../components/Data/RandomData";
import axios from 'axios';
import AuctionNavbar from './../components/Navbar/AuctionNavbar';
import './../Styles/availableauctions.css';
import {Root} from './../Config/root.js';
import Location from './../components/LocationAndMap/Location'
import io from 'socket.io-client';

const AvailableAuctions = () => {

const socket = io(`${Root.production}`)
  var user=JSON.parse(localStorage.getItem('user'))
  const [pageNumber, setPageNumber] = useState(1);
  const [toggle, setToggle] = useState(false);
  const [from, setFromCity] = useState("");
  const [to, setToCity] = useState("");
  let [array, setArray] = useState([]);
  let [filteredArray, setFilteredArray] = useState([]);
  let [arr, setArr] = useState([0, 1, 2, 3, 4,5,6,7,8]);
  var [departureLattitude, setDepartureLatitude] = useState(0);
  var [departureLongitude, setDepartureLongitude] = useState(0);
  var [update, setUpdate] = useState(true);

//  fetching of all auction
  useEffect(async() => {    
    var {data} = await axios.get(`${Root.production}/auction/getAllAuctions`);
    if(data.status==200){
      array=data.message.auctions;
    }
    else{
      alert(data.message)
    }
    handleDataFilter('All');
  }, [departureLongitude,departureLattitude]);

  // fetching of auctions on updation in auction database
  useEffect(()=>{
    socket.on('FetchAuctions',(data)=>{
      array=data;
      setArray(array);
      handleDataFilter('All');

    })
 
  },[])

// start of filter code
  const filterData = () => {
    array = [];
    if (from !== "" && to === "") {
      // PUSH METHOD FOR FILTER FROM
      array.push(
        randomData.filter((val) => {
          var gotit = val.pickUpCity == from;
          if (gotit) {
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
        randomData.filter((val) => {
          var gotit = val.dropOffCity == to;
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
      array = randomData;
      setArray(array);
    }
    if (from !== "" && to !== "") {
      // PUSH METHOD FOR FILTER TO
      array.push(
        randomData.filter((val) => {
          var gotit = val.dropOffCity === to && val.pickUpCity === from;
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

  // function for handle depart city
  const HandleFrom = (city) => {
    setFromCity(city);
  };

  // function for handle destination city
  const HandleTo = (city) => {
    setToCity(city);
  };

  const handleDataFilter = async(val)=>{
    // start for checking 'open' option
    if(val=='All'){
  filteredArray = [];
  filteredArray.push(
    array.filter((val) => {
      var check = (val.status == 'Open' && val.accountId != user.account._id);
      if (check) {
        return val;
      }
    })
  );
  setFilteredArray(filteredArray[0]);
  }
    // start for checking 'pending' option
  else if(val=='Pending'){
  filteredArray = [];
  filteredArray.push(
    array.filter((val) => {
      var check = (val.status === 'On Hold' && val.choosenCarrierId == user.account._id);
      if (check) {
        return val;
      }
    })
  );  
  setFilteredArray(filteredArray[0]);
  }
  };
// end of filter code

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

// start of show filter div logic
  const toggleIt = () => {
    setToggle(!toggle);
    setFromCity("");
    setToCity("");
  };
// end of show filter div logic

// start of finding the length of page numbers
  var total = filteredArray.length / 9;
  if (filteredArray.length % 9 === 0) {
    total = parseInt(total);
  } else {
    total = parseInt(total + 1);
  }
// end of finding the length of page numbers

// method for fetching location coords
const handleLocations =(long,lati)=>{
  departureLattitude=lati;
    departureLongitude=long;
    setDepartureLatitude(departureLattitude);
    setDepartureLongitude(departureLongitude);
}

  return (
    <div>
      <Title title="Available Auctions" />
      <Location handleLocations={handleLocations} notShow={true} repeat={true}/>
      <Row>
        <Col md={{ span: 2, offset: 10 }}
        xs={{offset:3,span:3}}
        >
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
      {/* start of filter div */}
      {toggle && (
        <Row style={{ height: "80px" }}>
          <Col md={{ span: 10, offset: 1 }}>
            <Row
              style={{
                background: "#f1efefef",
                height: "90px",
                margin: 0,
                borderRadius: "2%",
              }}
            >
              <Col md={2} style={{ marginTop: 10 }}>
                <h6>From :</h6>
                <DropDown
                  setData={HandleFrom}
                  height="30px"
                  width={"90%"}
                  type="city"
                  inputLabel="Please Select"
                />
              </Col>
              <Col md={{ span: 2 }} style={{ marginTop: 10, height: 20 }}>
                <h6>To :</h6>
                <DropDown
                  setData={HandleTo}
                  height="30px"
                  width={"90%"}
                  type="city"
                  inputLabel="Please Select"
                />
              </Col>
              <Col md={{ span: 2, offset: 6 }} style={{ marginTop: 30 }}>
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
      {/* end of filter div */}
      <br />
      <br />
      <AuctionNavbar handleDataFilter={handleDataFilter}/>
      <br />
      {filteredArray.length==0 &&
      <Row>
        <Col>
        There is no auction right now.
        </Col>
      </Row>
      }
      <Row className="main_cards">
        {arr.map((val) => {
          if (filteredArray[val] 
            && 
            (Math.abs(parseFloat(filteredArray[val].pickupLattitude)-parseFloat(departureLattitude))<0.018) && 
            (Math.abs(parseFloat(filteredArray[val].pickupLongitude)-parseFloat(departureLongitude))<0.018) 
            ) 
            {
            return (
              <Col xl={3}
              lg={4}
              md={6}
              >
              <AuctionCard
                myData={filteredArray[val]}
                route={`/auction-details/${filteredArray[val]._id}`}
              />
              </Col>
            );
          }
        })}
      </Row>
      {filteredArray.length > 9 && (
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

export default AvailableAuctions;
