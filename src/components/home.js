import axios from "axios";
import { useEffect, useState } from "react"
import { useNavigate } from "react-router";

export default function Home () {
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate();

    useEffect(() => {
        accessAPI()
        .then(() => {
            setLoading(false);
        })
        .catch((err) => {
            console.log(err)
            return alert("이메일과 비밀번호를 확인하세요");
        })
    }, [])
    
    const accessAPI = async () => {
        const access = localStorage.getItem('access');
        const result = await axios.get('/user', {
            headers: {
                Authorization: access,
            },
        })
        return result.data;
    };

    const refreshAPI = async () => {
        const refresh = localStorage.getItem('refresh');
        const result = await axios.post('/user/refresh', {
            refresh,
        })
        return result;
    };

    accessAPI.interceptors.response.use(
        (res) => {return res},
        async (error) => {
          const {
            config,
            response: { status },
          } = error;
      
          if (status === 401) {
            if (error.response.data.message === 'Unauthorized') {
              const originRequest = config;
              try {
                const tokenResponse = await refreshAPI();
                if (tokenResponse.status === 201) {
                  const newAccessToken = tokenResponse.data.accessToken;
                  localStorage.setItem('accessToken', newAccessToken);
                  localStorage.setItem(
                    'refreshToken',
                    tokenResponse.data.refreshToken,
                  );
                  axios.defaults.headers.common.Authorization = newAccessToken;
                  originRequest.headers.Authorization = newAccessToken;
                  return axios(originRequest);
                }
              } catch (error) {
                alert('토근이 만료되었습니다.')
                navigate('/login')
              }
            }
          }
          return Promise.reject(error);
        },
      );

    return (
        <>
       {!loading ? navigate('/main') : <div> loading... </div>}
        </>
    )
}