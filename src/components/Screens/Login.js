import M from 'materialize-css';
import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';


const Login = () => {
    // const { dispatch } = useContext()
    const [password, setPassword] = useState("")
    const [email, setEmail] = useState("")
    const history = useHistory()

    const onSubmit = (e) => {
        e.preventDefault();
        if (!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)) {
            M.toast({ html: "Invalid email", classes: "#c62828 red darken-3" })
            return
        }
        fetch("http://localhost:5000/signin", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email,
                password,
            })
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.error) {
                    return M.toast({ html: data.error, classes: "#c62828 red darken-3" })
                } else {
                    console.log('reewwegwer', data.token)
                    console.log('reewwegwer....', data.user)
                    localStorage.setItem("jwt", data.token)
                    localStorage.setItem("user", JSON.stringify(data.user))
                    // dispatch({ type: "USER", payload: data.data })
                    M.toast({ html: data.message, classes: "#00695c teal darken-3" })
                    history.push("/")
                }
            })
    }
    return (
        <div className="mycard  input-field">
            <div className="card auth-card">
                <h2>Facebook</h2>
                <input
                    type="text"
                    placeholder="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button className="btn waves-effect waves-light #1e88e5 blue darken-1"
                    onClick={(e) => onSubmit(e)}
                >{"Login"}
                </button>
                <h5>
                    <Link to="/signup">Create an acoount ?</Link>
                </h5>
            </div>
        </div>
    )
}

export default Login;
