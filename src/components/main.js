import { useNavigate } from 'react-router-dom'

export default function Main () {
    const navigate = useNavigate();

    const onCreate = () => {
        navigate('/create')
    }

    const onJoin = () => {
        navigate('/join')
    }

    return(
        <div className="mainpage">
            <div className="title">
                <h2> Beta-Chat</h2>
            </div>

            <div className="contentWrap">
              <button className="contentButton" onClick={onCreate}>
                채팅방 생성하기
              </button>
              <button className="contentButton" onClick={onJoin}>
                채팅방 참가하기
              </button>
            </div>

            <div className="restWrap">
            </div>
        </div>
    )
}