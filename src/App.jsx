import { useEffect, useState } from 'react'
import './App.css'
import Login from './components/Login'

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
      <main>
        <Login users={users}/>
      </main>
     
  )
}

export default App
