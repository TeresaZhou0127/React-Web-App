import React, { useState } from 'react';

export const Register=()=>{
    const [newEmail, setNewEmail] = useState("")
    const [newPassw, setNewPassw] = useState("")

    return (
        <section>
            <h1 className="title"> Register </h1>
            <form className="new-model-info">
                <div>
                    <label htmlfor="newEmail"> Email: </label>
                    <input
                        value={newEmail}
                        placeholder="email address"
                        name="newEmail"
                        id="newEmail"
                        type="text"
                        onChange={(e) => setNewEmail(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlfor="newPassw"> Password: </label>
                    <input
                        value={newPassw} 
                        placeholder="******"
                        name="newPassw"
                        id="newPassw"
                        type="newPassw"
                        onChange={(e) => setNewPassw(e.target.value)}
                    />
                </div>
                <button> Register </button>
            </form>
            <br /> 
            <div className="center-button">
                <button onClick={() => window.location.href="/Login"}> Go to Sign In </button>
            </div>
        </section>
    )
}

export default Register;