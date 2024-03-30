import React from 'react'
import "./css/Hero.css"
import { useEffect, useState } from 'react'
import Axios from 'axios'
import Dropdown from 'react-dropdown'
import {HiSwitchHorizontal} from 'react-icons/hi'
import 'react-dropdown/style.css'

export default function Hero() {
    
    const [info, setInfo] = useState([]);
    const [input, setInput] =useState(0);
    const [from, setFrom] = useState('USD');
    const [to, setTo] = useState('Naira')
    const [options, setOptions] = useState([]);
    const [output, setOutput] = useState(0)

    // API call

    // useEffect(()=>{
    //     Axios.get(
    //         `https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/${from}.json`
    //     ).then((res)=>{
    //         setInfo(res.data[from]);
    //     })
    // }, [from])

    // function convert call when currency switches
    // useEffect(()=>{
    //     setOptions(Object.keys(info));
    //     convert();
    // }, [info])

    // // convert function
    // const convert = ()=>{
    //     const rate = info[to];
    //     setOutput(input * rate);
    // }

    // function to switch between currencies
    const flip = ()=>{
        
        setFrom(to);
        setTo(from);
    }

  return (
    <div className="hero">
        <div className="hero-container">
           <div className="nav">
           <div className="logo">
                AduNai
            </div>
            <div className="list">
                <ul>
                    <li>Send Money</li>
                    <li>Receive Money</li>
                    <li>FX Blog</li>
                    <li>Resources</li>
                    <li>Help</li>
                </ul>
            </div>
           </div>

           <div className="hero-body">
           <div className="left-container">
            
            <div className="main">
                 <h1>
                 The World's Trusted <br /> Currency Exchange <br /> Platform
                 </h1>
                 <p>convert your international currency to you national currency now</p>
                 <button className='hero-btn' >Get The App</button>
                 <div className="rate">
                    <p> <h3>4.9</h3> rating on app store</p>
                    <p><h3>261k+</h3>active AduNai users</p>
                 </div>
                 
             </div>
            </div>
            <div className="right-container">
                <div className="amount">
                    <h3>Amount</h3>
                    <input type="text" placeholder='Enter amount' onChange={(e)=>setInput(e.target.value)} />
                </div>
                <div className="from">
                    <h3>From</h3>
                    <Dropdown options={options} onChange={(e)=>{setFrom(e.value)}} value={from} placeholder='from'  />
                </div>
                <div className="switch">
                    <HiSwitchHorizontal size="30px"
                        onClick={() => { flip() }}
                         />
                </div>
                <div className="to">
                    <h3>To</h3>
                    <Dropdown options={options}
                        onChange={(e) => { setTo(e.value) }}
                        value={to} placeholder="To" />
                </div>
                <div className="result">
                <button 
                // onClick={() => { convert() }}
                >Convert</button>
                <h2>Converted Amount:</h2>
                <p>{input + " " + from + " = " + output.toFixed(2) + " " + to}</p>
 
            </div>
 
            </div>
 
           </div>
        </div>
    </div>
  )
}
