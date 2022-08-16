import React from 'react';
import {Row,Col} from 'react-bootstrap';
import './Title.css';

function Title({title}) {


    return (
      <div
      >
        <Row>
        <Col style={{marginLeft:6,marginTop:4}} align="left">
        <h1
        >{title}</h1>
        </Col>
        </Row>

      </div>
    );
  }
  
  export default Title;
  