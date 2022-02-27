import React from 'react'
import styled from 'styled-components'
import ImgSlider from './ImgSlider'
import NewDisney from './NewDisney'
import Originals from './Originals'
import Recommends from './Recommends'
import Trending from './Trending'
import Viewers from './Viewers'
import { useEffect } from 'react';
import {setMovies} from '../features/movies/movieSlice';
import { selectUserName } from '../features/user/userSlice'
import { useDispatch, useSelector } from 'react-redux';
import db from '../firebase';
import { collection, getDocs } from 'firebase/firestore'

const Home = (props) => {
  const dispatch = useDispatch();
  const userName = useSelector(selectUserName);
  
  let recommends = [];
  let originals = [];
  let trends = [];
  let newDisney = [];

  useEffect(() => {
    
    const fetchAllMovies = async () => {
      const querySnapshot = await getDocs(collection(db, "movies"));
      querySnapshot.forEach((doc) => {
        switch(doc.data().type) {
          case 'recommend':
            recommends= [...recommends, {id: doc.id, ...doc.data()}]; /* will be lost after each render */
            console.log('myData',recommends)
          break;
          case 'new':
            newDisney= [...newDisney, {id: doc.id, ...doc.data()}];
            // console.log('myData',newDisney)
          break;
          case 'trending':
            trends= [...trends, {id: doc.id, ...doc.data()}];
          break;
          case 'original':
            originals= [...originals, {id: doc.id, ...doc.data()}];
          break;
        }
      });
    }

    async function fetchAndDispatch() {
      await fetchAllMovies(); 
      dispatch(setMovies({
        recommend: recommends,
        original: originals,
        trending: trends,
        newDisney: newDisney,
      }));
    }
    
    fetchAndDispatch();    
    
  }, [userName]) /* when userName changes, rerender this component */


  return (
    <Container>
        <ImgSlider />      
        <Viewers />
        <Recommends />
        <NewDisney />
        <Originals />
        <Trending />
    </Container>
  )
}

const Container = styled.main`
  position: relative;
  min-height: calc(100vh - 250px);
  overflow-x: hidden;
  display: block;
  top: 72px;
  padding: 0 calc(3.5vw + 5px);
  &:after {
    background: url("/images/home-background.png") center center / cover
      no-repeat fixed;
    content: "";
    position: absolute;
    inset: 0px;
    opacity: 1;
    z-index: -1;
  }
`;

export default Home