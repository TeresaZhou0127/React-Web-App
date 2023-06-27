import React, { useState } from 'react';
import { createSearchParams, useNavigate } from "react-router-dom";

export const Login=()=>{
	const [email, setEmail] = useState('');
	const [passw, setPassw] = useState('');
	const [success, setSuccess] = useState(false);
	const navigate = useNavigate();


	const processSubmit = async (e) => {
		e.preventDefault();
		// console.log(email, passw);
		setSuccess(true);
		navigate("./ModelSelection");
	}

	function handleSignIn(email) {
		navigate({
			pathname: "/ModelSelection",
			search: createSearchParams({
				userId: email
			}).toString()
		})
	}

	return(
		<section>
			<h1 className='title'> Sign In </h1>
			<form className='new-model-info' onSubmit={processSubmit}> 
				<div> 
					<label htmlFor="email">Email:</label>
					<input value={email} onChange={(e) => setEmail(e.target.value)} type="text" placeholder="youremail@abc.com "name="email" id="email"/> 
				</div> 
				<div> 
					<label htmlFor="passw">Password:</label>
					<input value={passw} onChange={(e) => setPassw(e.target.value)} type="passw" placeholder="*******" name="passw" id="passw"/> 
				</div>  	
			</form>
			<button onClick={() => handleSignIn(email)}> Sign In </button>
			<br />
			<div className="center-button">
				<button onClick={() => window.location.href="/Register"}> Don't have an account? Register </button>
			</div>
		</section>
        )
}

export default Login;