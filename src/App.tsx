
import './App.css'
import { useAppDispatch} from './redux/reduxHook'
import { useEffect } from 'react'
import { isLoginUser } from './redux/slice/authSlice'
import AppRoutes from './routes/routes';
import { ToastContainer } from 'react-toastify'
// import LoadingPage from './pages/loadingPage/Loading';
import { BrowserRouter } from 'react-router-dom';


function App() {
  // this is use for Protected Roy=utes To Get User Logged In or Not
  const dispatch = useAppDispatch();
  // const { isUserLoading } = useAppSelector(state => state.auth)

  useEffect(() => {
    dispatch(isLoginUser())
  }, [])



  return (
    <>
      <div className="react-toast mobile:text-md text-xs">
        <ToastContainer position="top-right" autoClose={1000} />
      </div>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </>
  )
}

export default App
