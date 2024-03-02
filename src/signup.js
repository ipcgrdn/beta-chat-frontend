import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router'
import axios from 'axios'

export default function Signup () {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [passwordCheck, setPasswordCheck] = useState('')

    const [emailValid, setEmailValid] = useState(false)
    const [passwordValid, setPasswordValid] = useState(false)
    const [passwordCheckValid, setPasswordCheckValid] = useState(false)
    const [isDisable, setIsDisable] = useState(true);

    const navigate = useNavigate();

    const handleName = (e) => {
        setName(e.target.value)
    }

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

   const handlePasswordCheck = (e) => {
        setPasswordCheck(e.target.value)
        if(password === e.target.value){
            setPasswordCheckValid(true)
        } else setPasswordCheckValid(false) 
    }

    useEffect(() => {
        if(emailValid && passwordValid && passwordCheckValid) {
            setIsDisable(false);
            return;
        } else {setIsDisable(true)}
   }, [emailValid, passwordValid, passwordCheckValid]);

    // 회원가입 API 처리

    const handleSignup = async (name, email, password) => {
        const result = await axios.post('user/signup', {
            name: name,
            email: email,
            password: password,
        });
        return (result.data);
    }

    const onSignup = async () => {
        const result = await handleSignup(name, email, password)
        console.log(result);
        navigate('/');
    }

    // 여기까지

    return (
        <div className="signupPage">
            <div className="signupitle">
                <h2> Beta-Chat</h2>
            </div>
            <div className='headWrap'>
                <h3> Sign up </h3>
            </div>

            <div className="signupbodyWrap">
                <div className="inputWrap">
                    <input className="input" type="text"
                    name="name" value={name} onChange={handleName}
                    placeholder="name" />
                </div>
                <div className="inputWrap">
                    <input className="input" type="text"
                    name="email" value={email} onChange={handleEmail}
                    placeholder="betachat@gmail.com" />
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
                <div className='inputWrap'>
                    <input className='input' type='password'
                    name='passwordCheck' value={passwordCheck} onChange={handlePasswordCheck}
                    placeholder='password check'/>
                </div>
                <div className='errorWrap'>
                    { !passwordCheckValid && passwordCheck.length > 0 && (
                    <div>비밀번호가 일치하지 않습니다.</div>
                    )}
                </div>
            </div>

            <div className="footWrap">
                <button onClick={onSignup} disabled={isDisable} className="button">
                    Signup
                </button>
            </div>
        </div>
    )
}