import axios from 'axios';
import React, { useEffect } from 'react'
import styled from 'styled-components';
import {baseURL} from '../baseURL/BaseURL';

const Login = (props) => {
    
    /*
    useEffect(() => {
        // Token must be written for every Api
        axios.get(`${baseURL}/books`, {
            // use Localhost to store token
            headers: { Authorization: `Bearer 1|kpSENXKP2aEjJA6b31V0ZCzrsS2DFnxv0Axq9ABK`}
        })
            .then((res)=> {
                console.log(res.data);
            })
            .catch((err)=> {
                console.log('error', err);
            })
    }, [])
    */
  return (
    <Container>
        <Content>
            <CTA>
                <CTALogoOne src="/images/cta-logo-one.svg" />
                <SignUp>GET ALL THERE</SignUp>
                <Description>
                Get Premier Access to Raya and the Last Dragon for an additional fee
                with a Disney+ subscription. As of 03/26/21, the price of Disney+
                and The Disney Bundle will increase by $1.
                </Description>
                <CTALogoTwo src="/images/cta-logo-two.png" />
            </CTA>
            
            <BgImage />
        </Content>
    </Container>
  );
}

const Container = styled.section`
    overflow: hidden;
    display: flex;
    flex-direction: column;
    height: 100vh;
    text-align: center;
`;

const Content = styled.div`
    flex-direction: column;
    display: flex;
    width: 100%;
    min-height: 100vh;
    height: 100%;
    padding: 80px 40px;
    align-items: center;
    justify-content: center;
    position: relative;
`

const BgImage = styled.div`
    height: 100%;
    background-image: url("/images/login-background.jpg");
    background-position: top;
    background-size: cover;
    background-repeat: no-repeat;
    position: absolute;
    top: 0;
    right: 0; /* important */
    left: 0; /* important */
    z-index: -1; /* Low priority */
`

const CTA = styled.div`
    max-width: 600px;
    display: flex;
    flex-direction: column;
    width: 100%;
`

const CTALogoOne = styled.img`
    width: 100%;
    min-height: 1px;
    display: block;
    margin-bottom: 24px;
`

const SignUp = styled.a`
    width: 100%;
    padding: 16.5px 0;
    color: #f9f9f9;
    background-color: #0063E5;
    border: 1px solid transparent;
    border-radius: 4px;
    margin-bottom: 24px;
    letter-spacing: 1.5px;
    font-weight: bold;
    font-size: 18px;

    &:hover {
        background-color: #0483EE;
    }
`
const Description = styled.p`
    margin-top: 0;
    letter-spacing: 1.5px;

`
const CTALogoTwo = styled.img`
    max-width: 600px;
    display: block;
    margin-bottom: 24px;
    width: 100%;
`


export default Login