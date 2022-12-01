import React from 'react'
import { Button, Container , Row} from 'react-bootstrap'

import '../styles/LandingPage.css'

const LandingPage = () => {

  return (
    <center>
    <div className='main'>         
        
        <Container>
            <Row>
           
            <div className='introcontainer'>
            <h1 className='intro-text' > Welcome to CodeFlix</h1>
            {/* <h3 className='text2'> Your Personal code managing platform</h3> */}
            </div>            
            
            <div className="buttons">
                < a href='/login'>
                    <Button size="lg" variant="outline-primary" className="button1">Login</Button>
                </a>
                <a href='/register'>
                    <Button size="lg" variant="outline-primary" className="button2">Register</Button>
                </a>
                
            </div>
            
            
            </Row>
        </Container>
      
    </div>
    </center>
  );
}

export default LandingPage
