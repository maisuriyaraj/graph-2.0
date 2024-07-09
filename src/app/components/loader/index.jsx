import {React} from 'react';
import HashLoader from 'react-spinners/HashLoader';
import BarLoader from "react-spinners/BarLoader";
import ClockLoader from "react-spinners/ClockLoader";

const override = {
    display: "block",
    // margin: "0 auto",
  };

export function Loader(props) {
  return (
    <BarLoader color='#22c55e' cssOverride={override} height={'4px'} width={'100%'} loading={props.isLoading}   aria-label="Loading Spinner"
    data-testid="loader" />
  )
}

export function HashLoaderComponent(props){
  return ( <HashLoader
  color="#22c55e"
  loading
  size={100}
  speedMultiplier={1}
/>
  )
}

export function TimerLoader(){
  return (
    <ClockLoader   
    color="#22c55e"
    loading
    size={100}
    speedMultiplier={1} />

  )
}
