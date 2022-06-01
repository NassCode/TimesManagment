import { useState, useEffect } from "react";
import Tasks from './components/Tasks'
import { db, auth } from './firebaseConfig';
import {
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut
} from "firebase/auth";

import { collection, getDocs, updateDoc, doc } from 'firebase/firestore'
import { LoginPage } from "./components/LoginPage";
import { useTheme, ThemeProvider, createTheme } from '@mui/material/styles';

function App() {
  const [tasks, setTasks] = useState([])
  const [wheels, setWheels] = useState([])
  const tasksCollectionRef = collection(db, 'tasks')
  const wheelsCollectionRef = collection(db, 'wheels')

  const [user, setUser] = useState({});

  onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser);
  });


  useEffect(() => {
    const getUsers = async () => {
      const data = await getDocs(tasksCollectionRef);
      setTasks(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    const getWheels = async () => {
      const data = await getDocs(wheelsCollectionRef);
      setWheels(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    getUsers();
    getWheels();
  }, []);


  //update task
  const updateTask = async (task) => {
 
    const taskDoc = doc(db, "tasks", task.id);
    const newFields = { text: task.text,
                        amount: task.amount,
                        reserved: task.reserved,
                        paid: task.paid,
                        notes: task.notes,
                        date: String(task.date),
                        status: task.status,
                        type: task.type};

    await updateDoc(taskDoc, newFields);
   
    const getUsers = async () => {
      const data = await getDocs(tasksCollectionRef);
      setTasks(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    getUsers();
    }

    //update wheel
  const updateWheel = async (task) => {
 
    const taskDoc = doc(db, "wheels", task.id);
    const newFields = { text: task.text,
                        amount: task.amount,
                        reserved: task.reserved,
                        paid: task.paid,
                        notes: task.notes,
                        date: String(task.date),
                        status: task.status,
                        type: task.type};

    await updateDoc(taskDoc, newFields);
   
    const getWheels = async () => {
      const data = await getDocs(wheelsCollectionRef);
      setWheels(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    getWheels();
    }

  //handle reset
  const resetTask = async (task) => {

    const taskDoc = doc(db, "tasks", task.id);
    const newFields = {status: 'done', type: 'onTime', reserved: false, paid: true, notes: '', amount: ''};

    await updateDoc(taskDoc, newFields);
   
    const getUsers = async () => {
      const data = await getDocs(tasksCollectionRef);
      setTasks(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    getUsers();
  }

  //handle resetWheels
  const resetWheel = async (task) => {

    const taskDoc = doc(db, "wheels", task.id);
    const newFields = {status: 'done',  type: 'onTime', reserved: false, paid: true, notes: '', amount: ''};

    await updateDoc(taskDoc, newFields);
   
    const getWheels = async () => {
      const data = await getDocs(wheelsCollectionRef);
      setWheels(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    getWheels();
  }

    
  
  const login = async (e) => {
    try {
      const user = await signInWithEmailAndPassword(
        auth,
        e.email,
        e.password
      );
    } catch (error) {
      console.log(error.message);
    }
  };

  const logout = async () => {
    await signOut(auth);
  };
  
  return (

      <div className="container">

       {user
        ? <Tasks tasks={tasks} wheels={wheels} resetTask={resetTask} resetWheel={resetWheel} onEdit={updateTask} onWheelsEdit={updateWheel} logout={logout}/>
        : <LoginPage login={login}/>}   
                   
      </div>
  );
}


export default App;
