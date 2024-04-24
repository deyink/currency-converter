import React from 'react'
import "./css/Hero.css"
import { useEffect, useState } from 'react'
import 'react-dropdown/style.css'
import { HiSwitchHorizontal } from 'react-icons/hi';


export default function Hero() {
    const [rates, setRates] = useState();
    const [ratesFetched, setRatesFetched] = useState(false);
    const [input, setInput] =useState("");
    const [from, setFrom] = useState('USD');
    const [to, setTo] = useState('NGN')
    const [output, setOutput] = useState(0);

    const getRates = async () => {
        const response = await fetch(
            `https://v6.exchangerate-api.com/v6/0e39688e1863a8158cd2896c/latest/${from}`
        ).then( (response)=>response.json() );

        if (response.result === "success") {
            setRates(response.conversion_rate);
            setRatesFetched(true);
        }
    };

    // API call
    
    useEffect(()=>{
       getRates(); 
     }, [] )

    
    // convert Function
     const convert = async () => {
  
        const response = await fetch(
            `https://v6.exchangerate-api.com/v6/0e39688e1863a8158cd2896c/latest/${from}`
        ).then((response) => response.json());
        const fetchedRates = response.conversion_rates;
        // calculate and store the result
        const CurrencyRate = fetchedRates[to];
        const output = input * CurrencyRate;
        setOutput(output);
    };


    // function convert call when currency switches
    // useEffect(()=>{
    //     setOptions(Object.keys(info));
    //     convert();
    // }, [info])


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
                    <input type="number" placeholder='Enter amount' onChange={(e)=>setInput(e.target.value)} value={input} />
                </div>

                <div className="from">
                    <h3>From</h3>
                    <select value={from} onChange={(e)=>{setFrom(e.target.value)}}  placeholder='from'> 
                    {ratesFetched ? (Object.keys(rates || {} ).map((currency, index)=> (
                        <option key={index} value={currency} > {currency} </option>
                    ))
                ) : ( 
                <option defaultValue > USD </option> 
            )}
               </select>
                </div>

                <div className="switch">
                    <HiSwitchHorizontal size="30px"
                        onClick={() => { flip() }}
                         />
                </div>

                <div className="to">
                    <h3>To</h3>
                    <select value={to} onChange={(e) => { setTo(e.value) }}
                         placeholder="To" >
                            {ratesFetched ? (Object.keys(rates || {}).map((currency, index)=> (
                        <option key={index} value={currency} > {currency} </option>
                    ))
                ) : ( <option defaultValue > EUR </option>) 
            }
                        </select>

                </div>

                <div className="result">
                <button 
                onClick={() => convert() }
                >Convert</button>
                <h2>Converted Amount:</h2>
                 
 
            </div>
 
            </div>
 
           </div>
        </div>
    </div>
  )
}
