import { useState, useEffect } from "react";
import Tasks from './components/Tasks'
import { db } from './firebaseConfig';


import { collection, getDocs, updateDoc, doc } from 'firebase/firestore'


function App() {
  const [tasks, setTasks] = useState([])
  const [notes, setNotes] = useState([])
  const tasksCollectionRef = collection(db, 'tasks')
  const notesCollectionRef = collection(db, 'notes')

 

  const [inProgress, setInProgress] = useState(false);

  


  useEffect(() => {

    // check if data is already in local storage
    const tasks = JSON.parse(localStorage.getItem('tasks'))
    const notes = JSON.parse(localStorage.getItem('notes'))
    
    if(tasks && notes) {
      setTasks(tasks)
      setNotes(notes)
    } else {
      const getUsers = async () => {
        const data = await getDocs(tasksCollectionRef);
        // set local storage with data
        localStorage.setItem('tasks', JSON.stringify(data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))))
        setTasks(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      };
      
      const getNotes = async () => {
        const data = await getDocs(notesCollectionRef);
        // set local storage with data
        localStorage.setItem('notes', JSON.stringify(data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))))
        setNotes(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      };
  
      getUsers();
      getNotes();
    }

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
    
    setInProgress(true);

    await updateDoc(taskDoc, newFields);
   
    const getUsers = async () => {
      const data = await getDocs(tasksCollectionRef);
      localStorage.setItem('tasks', JSON.stringify(data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))))
      setTasks(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      setInProgress(false);
    };

    getUsers();
    }

 

  //handle reset
  const resetTask = async (task) => {

    const taskDoc = doc(db, "tasks", task.id);
    const newFields = {status: 'done'};
    setInProgress(true);
    await updateDoc(taskDoc, newFields);
   
    const getUsers = async () => {
      const data = await getDocs(tasksCollectionRef);
      localStorage.setItem('tasks', JSON.stringify(data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))))
      setTasks(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      setInProgress(false);
    };

    getUsers();
  }


  // handle restore tasks
  const restoreTask = async (task) => {

    const taskDoc = doc(db, "tasks", task.id);
    const newFields = {status: 'going'};

    await updateDoc(taskDoc, newFields);
   
    const getUsers = async () => {
      const data = await getDocs(tasksCollectionRef);
      localStorage.setItem('tasks', JSON.stringify(data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))))
      setTasks(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    getUsers();
  }


  //refresh state from db
  const refresh = async () => {
    setInProgress(true);
    const getUsers = async () => {
      const data = await getDocs(tasksCollectionRef);
      localStorage.setItem('tasks', JSON.stringify(data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))))
      setTasks(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    



    const getTasks = async () => {
      const data = await getDocs(tasksCollectionRef);
      localStorage.setItem('tasks', JSON.stringify(data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))))
      setTasks(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      setInProgress(false);
    };

    const getNotes = async () => {
      const data = await getDocs(notesCollectionRef);
      localStorage.setItem('notes', JSON.stringify(data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))))
      setNotes(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      setInProgress(false);
    };

    await getUsers();
    await getTasks();
    await getNotes();
    
  }

  async function deleteNote (id) {
  
    // replicate notes array by value
    const newNotes = JSON.parse(JSON.stringify(notes))
    // remove note from array
    newNotes[0].notes.splice(id, 1)
    // update state
    setNotes(newNotes)
    // update db
    const taskDoc = doc(db, "notes", notes[0].id);
    const newFields = {notes: newNotes[0].notes};
    setInProgress(true);
    await updateDoc(taskDoc, newFields);

    // update state
    const getNotes = async () => {
      const data = await getDocs(notesCollectionRef);
      localStorage.setItem('notes', JSON.stringify(data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))))
      setNotes(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      setInProgress(false);
    };

    await getNotes();

  }

  async function addNote (text) {
    // replicate notes array by value
    const newNotes = JSON.parse(JSON.stringify(notes))
    // add note to array
    newNotes[0].notes.push(text)
    // update state
    setNotes(newNotes)
    // update db
    const taskDoc = doc(db, "notes", notes[0].id);
    const newFields = {notes: newNotes[0].notes};
    setInProgress(true);
    await updateDoc(taskDoc, newFields);

    // update state
    const getNotes = async () => {
      const data = await getDocs(notesCollectionRef);
      localStorage.setItem('notes', JSON.stringify(data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))))
      setNotes(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      setInProgress(false);
    };

    await getNotes();
  }

  //reload page after db update
 
  async function hardRefresh() {
    await refresh();
    window.location.reload();
  }
    
  
  

  
  return (

      <div className="container">

       <Tasks inProgress={inProgress} tasks={tasks} resetTask={resetTask} restoreTask={restoreTask} onEdit={updateTask} refresh={refresh} hardRefresh={hardRefresh} notes={notes} deleteNote={deleteNote} addNote={addNote}/>
          
                   
      </div>
  );
}


export default App;
