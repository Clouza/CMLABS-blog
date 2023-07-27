import { useState } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { api } from "../service";
import { redirect } from "react-router-dom";

export default function Login() {
    const [key, setKey] = useState(undefined);
    const [invalidKey, setInvalidKey] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        api.validateKey(key)
            .then(() => {
                sessionStorage.setItem('key', key);
                window.location.href = "/";
            })
            .catch(() => {
                setInvalidKey(true);
            });
    };
    return (
        <>
            <Navbar background="https://images.unsplash.com/photo-1516132006923-6cf348e5dee2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80" headerHeading="Login" headerSubHeading="Ask the developer for the key" />
            <main className="mb-4">
                <div className="container px-4 px-lg-5">
                    <div className="row gx-4 gx-lg-5 justify-content-center">
                        <div className="col-md-10 col-lg-8 col-xl-7">
                            <p>The API is the key... hold on, you must provide the API key to continue</p>
                            <div className="my-5">
                                <form id="contactForm" onSubmit={handleSubmit}>
                                    {
                                        invalidKey &&
                                        <div className="alert alert-danger" role="alert">
                                            Oops.. your <strong>key</strong> is incorrect
                                        </div>
                                    }

                                    <div className="form-floating">
                                        <input className="form-control" id="key" type="text" placeholder="Enter the key" data-sb-validations="required" onChange={(e) => setKey(e.target.value)} />
                                        <label htmlFor="key">Key API</label>
                                        <div className="invalid-feedback" data-sb-feedback="name:required">A key is required.</div>
                                    </div>
                                    <button className="btn btn-primary text-uppercase" id="submitButton" type="submit">Login</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
}