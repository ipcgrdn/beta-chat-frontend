import { useEffect, useState } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'

export default function Login () {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const [emailValid, setEmailValid] = useState(false)
    const [passwordValid, setPasswordValid] = useState(false)
    const [isDisable, setIsDisable] = useState(true);

    const navigate = useNavigate();

    const handleEmail = (e) => {
        setEmail(e.target.value)
        const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
        if(regex.test(email)){
            setEmailValid(true)
        } else setEmailValid(false)
   }

    const handlePassword  = (e) => {
        setPassword(e.target.value)
        const regex = /^(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&*()\-_=+{};:,<.>]).{8,}$/;
        if(regex.test(password)){
            setPasswordValid(true)
        } else setPasswordValid(false)
   }

    useEffect(() => {
        if(emailValid && passwordValid) {
            setIsDisable(false);
            return;
        } else {setIsDisable(true)}
   }, [emailValid, passwordValid]);

   // 로그인 API 처리

    const handleConfirm = async (email, password) => {
        const result = await axios.post('/user/login', {
            email: email,
            password: password
        }); 
        return result.data;
    }

    const onConfirm = async () => {
        const result = await handleConfirm(email, password) 
        const {accessToken, refreshToken} = result;
        localStorage.setItem('access', accessToken);
        localStorage.setItem('refresh', refreshToken);
        navigate('/home');
    } 

    // 여기까지

    return (
        <div className='loginPage'>
            <div className='title'> 
                <h2> Beta-Chat</h2> 
            </div>
            <div className='headWrap'>
                
            </div>
            
            <div className='bodyWrap'>
                <div className='inputWrap'>
                    <input className='input' type='text'
                    name='email' value={email} onChange={handleEmail}
                    placeholder='betachat@gmail.com'/>
                </div>
                <div className='errorWrap'>
                    { !emailValid && email.length > 0 && (
                    <div>올바른 이메일을 입력해주세요.</div>
                    )}
                </div>
                <div className='inputWrap'>
                    <input className='input' type='password'
                    name='password' value={password} onChange={handlePassword}
                    placeholder='password'/>
                </div>
                <div className='errorWrap'>
                    { !passwordValid && password.length > 0 && (
                    <div>대문자, 숫자, 특수문자 포함 8자 이상 입력해주세요.</div>
                    )}
                </div>
            </div>

            <div className='footWrap'>
                <button onClick={onConfirm} disabled={isDisable} className='button'>
                    Go
                </button>
                <div className='signupWrap'>
                    <Link to='/signup'>sign up</Link> 
                </div>
            </div>
        </div>
    )
}