import React, { useEffect } from 'react'
import styled from 'styled-components'
import {signInWithPopup, provider} from '../firebase';
import { useDispatch, useSelector } from 'react-redux';
import { selectUserName, selectUserEmail, selectUserPhoto, setUserLoginDetails, setSignOutState} from '../features/user/userSlice';
import { useNavigate } from 'react-router-dom'; /* to make sure it works, Header must be child of BrowserRouter */
import { onAuthStateChanged, getAuth, signOut } from 'firebase/auth';

const Header = () => {
    const navigate = useNavigate(); /* to navigate between screens */
    const dispatch = useDispatch(); // dispatch(actions: any)
    //const history = useHistory();
    const userName = useSelector(selectUserName);
    // const userName = useSelector((state) => state.user.name); another way 
    const userPhoto = useSelector(selectUserPhoto);
    // const userPhoto = useSelector((state) => state.user.photo); another way 
    const auth = getAuth()
    //console.log('from auth' ,auth);
    useEffect(() => {
        onAuthStateChanged(auth, (user) => { 
            if (user) {
                //console.log('inside onAuthFunction', user)
                setUser(user)
                navigate('/home');
            }
        })
    }, [userName]); /* whenever user changed, execute onAuth func */

    const handleAuth = () => {
        if (!userName) {
            signInWithPopup(auth, provider) // It will popoup small window for sign in
            .then((data) => {
                //console.log(data.user) // contains user data
                setUser(data.user);
            })
            .catch((error) => {
                console.log(error.message);
            }) 
        } else if (userName) {
            signOut(auth) /* important to sign out user */
                .then(() => {
                    dispatch(setSignOutState());
                    navigate('/');
                })
                .catch(err => console.log(err))
            
        }
        
    }

    /* setting user for global state */
    const setUser = (user) => {
        dispatch(
            setUserLoginDetails({ // setUserLoginDetails(payload: any) payload contains the data that will be stored in our state
                name: user.displayName,
                email: user.email,
                photo: user.photoURL,
            })
        )
    }

  return (
    <Nav>
        <Logo>
            <img src="/images/logo.svg" alt="nav logo"/>
        </Logo>
        {!userName ? (
            <Login onClick={handleAuth}>Login</Login>
        ) : (
            <> {/* Fragments is importatn */}
            <NavMenu>
                <a href="/home">
                    <img src="/images/home-icon.svg" alt="Home"/>
                    <span>Home</span>
                </a>
                <a>
                    <img src="/images/search-icon.svg" alt="SEARCH"/>
                    <span>SEARCH</span>
                </a>
                <a>
                    <img src="/images/watchlist-icon.svg" alt="WATCHLIST"/>
                    <span>WATCHLIST</span>
                </a>
                <a>
                    <img src="/images/movie-icon.svg" alt="MOVIES"/>
                    <span>MOVIES</span>
                </a>
                <a>
                    <img src="/images/series-icon.svg" alt="SERIES"/>
                    <span>SERIES</span>
                </a>
            </NavMenu>
            <SignOut>
                <UserImg src={userPhoto} alt="user photo" />
                <Dropdown>
                    <span onClick={handleAuth}>Sign out</span>
                </Dropdown>
            </SignOut>
            </>
        )}
        
        
    </Nav>
  )
}

const Nav = styled.div`
    height: 71px;
    background: #000;
    width: 100%;
    position: fixed;
    display: flex;
    justify-content: space-between;
    align-items: center;
    z-index: 3;
    padding: 0 55px;
`

const Logo = styled.a`
    width: 80px;
    max-height: 70px;
    display: inline-block;
    padding: 0;
    
    img { 
        width: 100%;
        display: block; /* img is inline-block by default */
    }
`

const NavMenu = styled.div`
    align-items: center;
  display: flex;
  flex-flow: row nowrap;
  height: 100%;
  justify-content: flex-end;
  margin: 0px;
  padding: 0px;
  position: relative;
  margin-right: auto;
  margin-left: 25px;
  a {
    display: flex;
    align-items: center;
    padding: 0 12px;
    img {
      height: 20px;
      min-width: 20px;
      width: 20px;
      z-index: auto;
    }
    span {
      color: rgb(249, 249, 249);
      font-size: 13px;
      letter-spacing: 1.42px;
      line-height: 1.08;
      padding: 2px 0px;
      white-space: nowrap;
      position: relative;
      &:before { /* apply styling before span */
        background-color: rgb(249, 249, 249);
        border-radius: 0px 0px 4px 4px;
        bottom: -6px;
        content: "";
        height: 2px;
        left: 0px;
        opacity: 0;
        position: absolute; /* important */
        right: 0px;
        transform-origin: left center;
        transform: scaleX(0); /* same width */
        transition: all 250ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 0s;
        visibility: hidden; 
        width: auto;
      }
    }
    &:hover {
      span:before {
        transform: scaleX(1);
        visibility: visible;
        opacity: 1 !important;
      }
    }
  }
    
    @media (max-width: 768px) {
        display: none;
    } 
`

const Login = styled.a`
    background-color: black;
    padding: 8px 16px;
    text-transform: uppercase;
    letter-spacing: 1.2px;
    border: 1px solid #f9f9f9;
    border-radius: 4px;
    transition: all .2s ease 0;
    cursor: pointer;
    &:hover {
        background-color: #f9f9f9;
        color: #000;
        border: transparent;        
    }
`
const UserImg = styled.img`
    height: 100%; /* important otherwise it will not fit properly */
`
const Dropdown = styled.div`
    position: absolute;
    border: 1px solid white;
    background: rgb(19,19,19);
    border-radius: 11px;
    border: 1px solid rgb(151,151,151,0.34);
    padding: 10px;
    top: 48px;
    right: 0px;
    opacity: 0;
    font-size: 14px;
    letter-spacing: 3px;
    box-shadow: rgb(0 0 0 / 50%) 0px 0 px 18px 0px;
    width: 100px;
`
const SignOut = styled.div`
    position: relative;
    height: 48px; /* don't worry all childs will be in the center even img */
    width: 48px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    ${UserImg} { /* SignOut box align items in the center */
        border-radius: 50%;
        height: 100%; /* depends on the Signout height */
        width: 100%; /* depends on the Signout width */
    }

    &:hover {
        ${Dropdown} {
            opacity: 1;
            transition-duration: 1s; /* opacity delay */
        }
    }

`
export default Header