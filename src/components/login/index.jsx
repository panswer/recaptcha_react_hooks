import React,{useState} from 'react';

import { registerLogic } from "./logic/dataLogin";
import { getTokenRecaptcha } from "./logic/reCaptcha";

import axios from "axios";

function Login(props) {
    const [dataRegister,setDataRegister]=useState({
        "email":"",
        "password":"",
        'g-recaptcha-response':""
    });

    window.reCaptchaGoogle=(token)=>{
        console.log(token);
        if(dataRegister['g-recaptcha-response']!==token){
            axios.post(`http://localhost:3001/send`,{
                "email":dataRegister.email,
                "password":dataRegister.password,
                'g-recaptcha-response':token
            })
            .then(response=>{
                console.log(response);
                setDataRegister({
                    email:'',
                    password:'',
                    'g-recaptcha-response':token
                });
            })
            .catch(error=>{
                console.log(error);
            });
        }else{
            window.grecaptcha.reset();
        }
    }

    return (<div>
        <h1>Sing in</h1>
        <form method="post">
            <input type="email" name="email" id="email" placeholder="emil" value={dataRegister.email} onChange={e=>registerLogic(setDataRegister,e,dataRegister)} />
            <br/>
            <input type="password" name="password" id="password" placeholder="password" value={dataRegister.password} onChange={e=>registerLogic(setDataRegister,e,dataRegister)} />
            <br/>
            <button type="submit" onClick={e=>getTokenRecaptcha(e)}>Sign In</button>
        </form>
        <div className="g-recaptcha"
            data-sitekey={process.env.REACT_APP_SITE_KEY}
            data-callback="reCaptchaGoogle"
            data-size="invisible">
        </div>
    </div>);
}

export default Login;