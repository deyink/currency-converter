import React from 'react'
import "./css/Hero.css"
import { useEffect, useState } from 'react'
import Dropdown from 'react-dropdown'
import 'react-dropdown/style.css'
import { HiSwitchHorizontal } from 'react-icons/hi';
import  axios  from 'axios';


export default function Hero() {
    const [info, setInfo] = useState([]);
    const [options, setOptions] = useState([]);
    const [input, setInput] =useState(0);
    const [from, setFrom] = useState('USD');
    const [to, setTo] = useState('NGN')
    const [output, setOutput] = useState(0);

    

    useEffect( () => {
        axios.get(
            'https://v6.exchangerate-api.com/v6/0e39688e1863a8158cd2896c/latest/USD')
            .then( (res) => {
                setInfo(res.data.conversion_rates);
            })
    }, []);

       // covert Function

       function convert () {
        const rate = info[to];
        setOutput(input * rate)
    };

    useEffect(()=>{
        setOptions(Object.keys(info));
        convert();
    }, [info])

    
 

    // calling convert function when currency switches

   

    // flip function

    const flip = ()=>{
        
        setFrom(to);
        setTo(from);
    }

   
    


    // const getRates = async () => {
    //     const response = await fetch(
    //         `https://v6.exchangerate-api.com/v6/0e39688e1863a8158cd2896c/latest/currencies`
    //     ).then( (response)=>response.json() );

    //     if (response.result === "success") {
    //         setRates(response.conversion_rate);
    //         setRatesFetched(true);
    //     }
    // };

    // // API call
    
    // useEffect(()=>{
    //    getRates(); 
    //  }, [from] )

    
    // // convert Function
    //  const convert = async () => {
  
    //     const response = await fetch(
    //         `https://v6.exchangerate-api.com/v6/0e39688e1863a8158cd2896c/latest/currencies`
    //     ).then( (response)=>response.json() );

    //     const fetchedRates = response.conversion_rates;
    //     // calculate and store the result
    //     const CurrencyRate = fetchedRates[to];
    //     const output = input * CurrencyRate;
    //     setOutput(output);
    // };


    // // function convert call when currency switches
    // // useEffect(()=>{
    // //     setOptions(Object.keys(info));
    // //     convert();
    // // }, [info])


    // // function to switch between currencies
    // const flip = ()=>{
        
    //     setFrom(to);
    //     setTo(from);
    // }

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
                    <input type="number" placeholder='Enter amount' onChange={(e)=>setInput(e.target.value)} value={input.toLocaleString()} />
                </div>

                <div className="from">
                    <h3>From</h3>
                    <Dropdown options={options}
                    onChange={(e)=>{setFrom(e.value)}}
                    value={from} placeholder="from" />
                    
                </div>

                <div className="switch">
                    <HiSwitchHorizontal size="35px"
                        onClick={() => { flip() }}
                         />
                </div>

                <div className="to">
                    <h3>To</h3>
                    <Dropdown options={options}
                    onChange={(e)=> { setTo(e.value) }}
                    value={to} placeholder={"To"} />

                </div>

                <div className="result">
                <button 
                onClick={() => convert() }
                >Convert</button>
                <h2>Converted Amount:</h2>
                <p>{input + " " + from + " = " + output.toLocaleString() + " " + to}</p>
                 
 
            </div>
 
            </div>
 
           </div>
        </div>
    </div>
  )
}
