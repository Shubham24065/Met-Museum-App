/*********************************************************************************
*  WEB422 – Assignment 6
*
*  I declare that this assignment is my own work in accordance with Seneca's
*  Academic Integrity Policy:
* 
*  https://www.senecapolytechnic.ca/about/policies/academic-integrity-policy.html
* 
*  Name: Shubham 
*  Student ID: 167744234 
*  Date: 08 - 08 - 2025
*
*  Vercel App (Deployed) Link:  https://user-api-theta-jet.vercel.app/
*
********************************************************************************/


import { Row, Col, Image } from 'react-bootstrap';

export default function Home() {
  return (
    <>
      <Image
        src="https://upload.wikimedia.org/wikipedia/commons/3/30/Metropolitan_Museum_of_Art_%28The_Met%29_-_Central_Park%2C_NYC.jpg"
        fluid
        rounded
        alt="Metropolitan Museum of Art"
      />
      <br /><br />
      <Row>
        <Col lg={6}>
          <p>
            The Metropolitan Museum of Art of New York City, colloquially (the Met), is the largest art museum in the Americas.
            Its permanent collection contains over two million works, divided among 17 curatorial departments.
          </p>
        </Col>
        <Col lg={6}>
          <p>
            The main building at 1000 Fifth Avenue, along the Museum Mile on the eastern edge of Central Park in Manhattan Upper East Side,
            is by area one of the world largest art museums.
            <a href="https://en.wikipedia.org/wiki/Metropolitan_Museum_of_Art" target="_blank" rel="noreferrer">
              {" "}Wikipedia
            </a>
          </p>
        </Col>
      </Row>
    </>
  );
}
