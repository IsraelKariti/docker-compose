import React from "react";
import axios from 'axios';
import './styles/style.scss';

function App() {
  
  const onPostClicked = async ()=>{
    console.log('post clicked');
    try{
      await axios.post('http://localhost:4000?name=kira');
    }
    catch(err){
      console.log('THE ERROR IS: ', err);
    }
  }
  const onGetClicked = async ()=>{
    console.log('get clicked');
    try{

      const val = await axios.get('http://localhost:4000');
      console.log(val);
    }
    catch(err){
      console.log('THE ERROR IS: ',err);
    }
  }
  return <> 
    <button onClick={onPostClicked}>POST</button>
    <button onClick={onGetClicked}>GET</button>
  </>
}

export default App;