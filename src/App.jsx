import { useEffect, useState } from 'react'
import './App.css'
import { Routes, Route } from 'react-router-dom';
import Login from './components/Login'
import Register from './components/Register'
import RecoveryPassword from './components/RecoveryPassword'

function App() {

  const [users, setUsers] = useState(null)

  useEffect(() => {
    const getUsers = async () => {
      try {
        const response = await fetch("../users.json");
        if (!response.ok) {
          throw new Error('Error al obtener los datos');
        }
        const data = await response.json();
        setUsers(data.users);
      } catch (error) {
        console.error(error);
        setUsers([]); 
      }
    }
   getUsers()
  }, [])

  console.log(users);

  return (
      <Routes>
        <Route path='/login' element={<Login users={users}/>} />
        <Route path='/register' element={<Register setUsers={setUsers} users={users}/>} />
        <Route path='/recovery_password' element={<RecoveryPassword />} />
        {/* <Login users={users}/> */}
        {/* <Register setUsers={setUsers} users={users}/> */}
        {/* <RecoveryPassword /> */}
      </Routes>
     
  )
}

export default App
