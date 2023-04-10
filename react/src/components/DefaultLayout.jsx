import { Outlet } from 'react-router-dom';
import { useStateContext } from '../contexts/ContextProvider';
import { Navigate } from 'react-router-dom';

export default function DefaultLayout() {
  const {user, token} = useStateContext()

  if (!token) {
    return <Navigate to='/login' />
  }

  return (
    <div>
      Default
      <Outlet />
    </div>
  )
}
