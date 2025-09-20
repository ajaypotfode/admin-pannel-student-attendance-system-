
import { Navigate, Route, Routes } from 'react-router-dom'
import CommonLayout from '../CommonLayout'
import Dashbord from '../pages/dashboard/Dashbord'
import ClassDetails from '../pages/setting/ClassDetails'
import Trainers from '../pages/faculty/Trainers'
import ViewAttendence from '../pages/attendence/ViewAttendence'
import WeeklyAttendence from '../pages/attendence/WeeklyAttendence'
import StudentList from '../pages/students/StudentList'
import MarkAttendence from '../pages/attendence/MarkAttendence'
import AttendenceSummary from '../pages/students/AttendenceSummary'
import AssignClass from '../pages/students/AssignClass'
import ChangeUserStatus from '../pages/setting/ChangeUserStatus'
import Notification from '../pages/setting/Notification'
import AddTrainers from '../pages/faculty/AddTrainers'
import Login from '../pages/auth/Login'
import Signup from '../pages/auth/Signup'
import ProtectedRoutes from './ProtectedRoutes'
import StudentRegistration from '@/pages/setting/StudentRegistration'
import RegistrationForm from '@/pages/students/RegistrationForm'
import PublicRoutes from './PublicRoutes'
// import { useEffect } from 'react'
// import ProtectedRoutes from './ProtectedRoutes'


const AppRoutes = () => {
  // useEffect(() => {
  //   console.log("app routes page Is Redirecting");

  // }, [])
  return (


    //    <BrowserRouter>
    <Routes>
      <Route element={<PublicRoutes />}>
        <Route path='/auth/login' element={<Login />} />
        <Route path='/auth/signup' element={<Signup />} />
      </Route>
      <Route path='/student/register' element={<RegistrationForm />} />
      <Route element={<ProtectedRoutes />}>
        <Route element={<CommonLayout />}>
          <Route path='/' element={<Navigate to='/dashboard' />} />
          <Route path='/dashboard' element={<Dashbord />} />
          <Route path='/settings/classes' element={<ClassDetails />} />
          <Route path='/settings/users' element={<ChangeUserStatus />} />
          <Route path='/settings/notification' element={<Notification />} />
          <Route path='/faculty/trainers' element={<Trainers />} />
          <Route path='/faculty/add' element={<AddTrainers />} />
          <Route path='/attendance/view' element={<ViewAttendence />} />
          <Route path='/attendance/summary' element={<WeeklyAttendence />} />
          <Route path='/attendance/mark' element={<MarkAttendence />} />
          <Route path='/students/list' element={<StudentList />} />
          <Route path='/students/summary' element={<AttendenceSummary />} />
          <Route path='/students/assign-class' element={<AssignClass />} />
          <Route path='/settings/registration' element={<StudentRegistration />} />
        </Route>
      </Route>
    </Routes>
    //     </BrowserRouter>
  )
}

export default AppRoutes