import { useState, useEffect } from "react";
import Tasks from "./components/Tasks";
import { db } from "./firebaseConfig";
import AddIcon from "@mui/icons-material/Add";

import {
  collection,
  getDocs,
  updateDoc,
  doc,
  setDoc,
  deleteDoc,
} from "firebase/firestore";

function App() {
  const [tasks, setTasks] = useState([]);
  const tasksCollectionRef = collection(db, "tasks");

  const [inProgress, setInProgress] = useState(false);

  useEffect(() => {
    // check if data is already in local storage
    const tasks = JSON.parse(localStorage.getItem("tasks"));

    if (tasks) {
      setTasks(tasks);
      const getUsers = async () => {
        const data = await getDocs(tasksCollectionRef);
        // set local storage with data
        localStorage.setItem(
          "tasks",
          JSON.stringify(
            data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
          )
        );
        setTasks(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      };

      getUsers();

    } else {
      const getUsers = async () => {
        const data = await getDocs(tasksCollectionRef);
        // set local storage with data
        localStorage.setItem(
          "tasks",
          JSON.stringify(
            data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
          )
        );
        setTasks(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      };

      getUsers();
    }
  }, []);

  //add task
  async function addTask(task) {
    setInProgress(true);
    //get how many tasks are in db
    const data = await getDocs(tasksCollectionRef);
    const initTime = Date.now();
    const parsed = new Date(initTime);
    let id = () => {
      if (data.empty) {
        return 1;
      } else {
        let lastElementID = data.docs[data.docs.length - 1].id;
        return lastElementID + 1;
      }
    };
    const fields = {
      text: String(task),
      amount: "",
      reserved: false,
      paid: true,
      notes: "",
      date: String(parsed),
      status: "done",
      type: "onTime",
    };

    const taskDoc = doc(db, "tasks", id().toString());
    await setDoc(taskDoc, fields);
    const getUsers = async () => {
      const data = await getDocs(tasksCollectionRef);
      localStorage.setItem(
        "tasks",
        JSON.stringify(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
      );
      setTasks(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      setInProgress(false);
    };
    await getUsers();

    setInProgress(false);
  }

  // delete task
  async function deleteTask(id) {
    const taskDoc = doc(db, "tasks", id);
    await deleteDoc(taskDoc);
    const getUsers = async () => {
      const data = await getDocs(tasksCollectionRef);
      localStorage.setItem(
        "tasks",
        JSON.stringify(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
      );
      setTasks(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    await getUsers();
  }

  //update task
  const updateTask = async (task) => {
    const taskDoc = doc(db, "tasks", task.id);
    const newFields = {
      text: task.text,
      amount: task.amount,
      reserved: task.reserved,
      paid: task.paid,
      notes: task.notes,
      date: String(task.date),
      status: task.status,
      type: task.type,
    };

    setInProgress(true);

    await updateDoc(taskDoc, newFields);

    const getUsers = async () => {
      const data = await getDocs(tasksCollectionRef);
      localStorage.setItem(
        "tasks",
        JSON.stringify(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
      );
      setTasks(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      setInProgress(false);
    };

    getUsers();
  };

  //handle reset
  const resetTask = async (task) => {
    const taskDoc = doc(db, "tasks", task.id);
    const newFields = { status: "done" };
    setInProgress(true);
    await updateDoc(taskDoc, newFields);

    const getUsers = async () => {
      const data = await getDocs(tasksCollectionRef);
      localStorage.setItem(
        "tasks",
        JSON.stringify(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
      );
      setTasks(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      setInProgress(false);
    };

    getUsers();
  };

  // handle restore tasks
  const restoreTask = async (task) => {
    const taskDoc = doc(db, "tasks", task.id);
    const newFields = { status: "going" };

    await updateDoc(taskDoc, newFields);

    const getUsers = async () => {
      const data = await getDocs(tasksCollectionRef);
      localStorage.setItem(
        "tasks",
        JSON.stringify(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
      );
      setTasks(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    getUsers();
  };

  //refresh state from db
  const refresh = async () => {
    setInProgress(true);
    const getUsers = async () => {
      const data = await getDocs(tasksCollectionRef);
      localStorage.setItem(
        "tasks",
        JSON.stringify(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
      );
      setTasks(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    const getTasks = async () => {
      const data = await getDocs(tasksCollectionRef);
      localStorage.setItem(
        "tasks",
        JSON.stringify(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
      );
      setTasks(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      setInProgress(false);
    };

    await getUsers();
    await getTasks();
  };

  //reload page after db update

  async function hardRefresh() {
    await refresh();
    window.location.reload();
  }

  return (
    <div className="container">
      {tasks.length === 0 && (
        <div className="noTasks">
          <p>No timers to show</p>
          <p>
            Click on the <AddIcon style={{ marginBottom: "-6px" }} /> below to
            add a new timer
          </p>
        </div>
      )}
      <Tasks
        inProgress={inProgress}
        tasks={tasks}
        resetTask={resetTask}
        restoreTask={restoreTask}
        onEdit={updateTask}
        refresh={refresh}
        hardRefresh={hardRefresh}
        addTask={addTask}
        deleteTask={deleteTask}
      />
    </div>
  );
}

export default App;
