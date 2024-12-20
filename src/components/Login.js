import React, { useState, useEffect } from 'react'; 
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, NavLink } from 'react-router-dom';
import { LoginUser, reset } from '../features/authSlice.js'; 

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const dispatch = useDispatch(); 
    const navigate = useNavigate();
    const { user, isError, isSuccess, isLoading, message } = useSelector(
        (state) => state.auth
    );

    useEffect(() => {
        if (user || isSuccess) {
            // Redirect ke dashboard setelah login berhasil
            navigate("/dashboard");
        }
        dispatch(reset());
    }, [user, isSuccess, dispatch, navigate]);

    const Auth = (e) => {
        e.preventDefault();
        dispatch(LoginUser({ email, password }));
    };

    return (
        <section className='hero has-background-grey-light is-fullheight is-fullwidth'>
            <div className='hero-body'>
                <div className='container'>
                    <div className='columns is-centered'>
                        <div className='column is-4'>
                            <form className='box' onSubmit={Auth}>
                                {isError && <p className='has-text-centered'>{message}</p>}
                                <h1 className='title'>login</h1>
                                <div className='field'>
                                    <label className='label'>Email</label>
                                    <div className='control'>
                                        <input
                                            type="text"
                                            className='input'
                                            placeholder='Email'
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)} />
                                    </div>
                                </div>
                                <div className='field'>
                                    <label className='label'>Password</label>
                                    <div className='control'>
                                        <input
                                            type="password"
                                            className='input'
                                            placeholder='********'
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)} />
                                    </div>
                                    <div className='has-text-centered mt-3'>
                                         <NavLink to="/register" className="is-link">
                                        tidak punya akun? register di sini
                                    </NavLink>
                                    </div>
                                </div>
                                <div className='field mt-5'>
                                    <button className='button is-success is-fullwidth' type='submit'>
                                        {isLoading ? 'Loading...' : 'Login'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Login;
 