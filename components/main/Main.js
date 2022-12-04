import { useEffect, useState } from 'react';
import Loading from '../Loading';
import BadAuth from '../BadAuth';
import Todos from './Todos';
import Tasks from './Tasks';
import axios from 'axios';
import Cookies from 'js-cookie';

const Main = ({ setPage }) => {
  const ID = Cookies.get('coiokie-bodokie');
  const [main, setMain] = useState(0);
  const [loading, setLoading] = useState(true);
  const [badAuth, setBadAuth] = useState(false);
  const [data, setData] = useState({});
  const [todos, setTodos] = useState([]);
  const [todo, setTodo] = useState({});
  const [tasks, setTasks] = useState([]);

  const getDatumOn = async () => {
    await axios
      .get(`https://todos-server-yash.vercel.app/signon/${ID}`)
      .then((data) => {
        if (data) {
          setData(data.data);
          setTodos(data.data.todos);
        }
      })
      .then(setLoading(false))
      .catch((error) => {
        setBadAuth(true);
        console.log(error.message);
      });
  };
  useEffect(() => {
    getDatumOn();
  }, []);

  const handleTodo = (paramTodo) => {
    setMain(1);
    setTodo(paramTodo);
    setTasks(paramTodo.tasks);
  };

  if (loading) return <Loading />;

  if (badAuth) return <BadAuth />;

  return (
    <>
      <main
        className={`absolute w-full h-full flex justify-center ${
          main === 0 ? 'block' : 'hidden'
        }`}
      >
        <Todos
          ID={ID}
          setPage={setPage}
          data={data}
          setData={setData}
          todos={todos}
          setTodos={setTodos}
          handleTodo={handleTodo}
        />
      </main>
      <main className={`${main === 1 ? 'block' : 'hidden'}`}>
        <Tasks
          ID={ID}
          setMain={setMain}
          data={data}
          setData={setData}
          todos={todos}
          todo={todo}
          tasks={tasks}
          setTasks={setTasks}
          getDatumOn={getDatumOn}
        />
      </main>
    </>
  );
};

export default Main;
