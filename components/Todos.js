import { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { nanoid } from 'nanoid';
import { RiAddFill } from 'react-icons/ri';
import { FaRegEdit, FaRegTrashAlt } from 'react-icons/fa';
import Loading from './Loading';
import BadAuth from './BadAuth';
import AddIcon from './AddIcon';

const Todos = ({ setSign }) => {
  const ID = Cookies.get('cookie-id-bookie');
  const [alert, setAlert] = useState(false);
  const [data, setData] = useState({});
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState('');
  const [edit, setEdit] = useState(false);
  const [editID, setEditID] = useState(null);
  const ref = useRef(null);
  const [loading, setLoading] = useState(true);
  const [badAuth, setBadAuth] = useState(false);
  const [show, setShow] = useState(true);

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

  useEffect(() => {
    todos.length === 0 ? setShow(true) : setShow(false);
  }, [todos.length]);

  const handlePost = async (e) => {
    e.preventDefault();
    const trimTitle = title.trim();
    if (!trimTitle) return setAlert(true);
    const id = nanoid();
    const postTodo = [{ id, title: trimTitle }, ...todos];
    setTitle('');
    setTodos(postTodo);
    await axios.patch(`https://todos-server-yash.vercel.app/signon/${ID}`, {
      ...data,
      todos: postTodo,
    });
  };

  const handleDelete = async (id) => {
    const deleteTodo = todos.filter((i) => i.id !== id);
    setTodos(deleteTodo);
    await axios.patch(`https://todos-server-yash.vercel.app/signon/${ID}`, {
      ...data,
      todos: deleteTodo,
    });
  };

  const handlePatch = (id, title) => {
    setEditID(id);
    setTitle(title);
    setEdit(true);
    ref.current.focus();
  };

  const handlePatchPost = async (e) => {
    e.preventDefault();
    const trimTitle = title.trim();
    if (!trimTitle) return setAlert(true);
    const patchTodo = todos.map((i) => {
      if (i.id === editID) {
        return { ...i, title: trimTitle };
      } else {
        return i;
      }
    });
    setTitle('');
    setEdit(false);
    setEditID(null);
    setTodos(patchTodo);
    await axios.patch(`https://todos-server-yash.vercel.app/signon/${ID}`, {
      ...data,
      todos: patchTodo,
    });
  };

  const handleSignout = () => {
    Cookies.remove('cookie-id-bookie');
    Cookies.remove('cookie-token-bookie');
    setSign(0);
  };

  if (alert) {
    setTimeout(() => {
      setAlert(false);
    }, 5000);
  }

  if (loading || !data)
    return (
      <>
        <Loading />
      </>
    );

  if (badAuth)
    return (
      <>
        <BadAuth />
      </>
    );

  return (
    <main className='relative'>
      <section className='absolute top-5 flex justify-between w-full'>
        <div className='top-5 left-0 border-2 border-emerald-300 rounded-3xl py-1 px-5 bg-emerald-50'>
          <h1 className='font-normal text-emerald-500 tracking-wide'>
            <span className='font-bold capitalize'>{data.name}’</span>s Todos
          </h1>
        </div>
        <div
          onClick={handleSignout}
          className='top-5 right-0 border-2 border-red-200 hover:border-red-300 rounded-3xl py-1.5 px-5 bg-red-50 cursor-pointer text-red-400 hover:text-red-500 text-xl z-10'
        >
          <svg
            stroke='currentColor'
            fill='currentColor'
            strokeWidth='0'
            viewBox='0 0 24 24'
            height='1em'
            width='1em'
            xmlns='http://www.w3.org/2000/svg'
          >
            <g>
              <path fill='none' d='M0 0h24v24H0z'></path>
              <path d='M5 11h8v2H5v3l-5-4 5-4v3zm-1 7h2.708a8 8 0 1 0 0-12H4A9.985 9.985 0 0 1 12 2c5.523 0 10 4.477 10 10s-4.477 10-10 10a9.985 9.985 0 0 1-8-4z'></path>
            </g>
          </svg>
        </div>
      </section>
      <main className='mt-20 flex flex-col items-center'>
        <form>
          <div className='flex items-center mt-10'>
            <input
              ref={ref}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              type='text'
              spellCheck='false'
              placeholder='Enter Todo...'
              className={`w-72 py-2 px-3 text-sm outline-none border border-emerald-300 focus:border-emerald-500 rounded-md tracking-wide text-emerald-500 font-semibold placeholder:text-emerald-300 placeholder:italic
            ${alert && 'border-red-500 focus:border-red-500'}`}
            />
            {edit ? (
              <button
                onClick={handlePatchPost}
                type='submit'
                className='group rounded-full p-5 border border-emerald-300 hover:border-emerald-500 bg-emerald-50 cursor-pointer relative'
              >
                <FaRegEdit className='text-lg text-emerald-400 group-hover:text-emerald-600 absolute bottom-3 right-2.5' />
              </button>
            ) : (
              <button
                onClick={handlePost}
                type='submit'
                className='group rounded-full p-5 border border-emerald-300 hover:border-emerald-500 bg-emerald-50 cursor-pointer relative'
              >
                <RiAddFill className='text-2xl text-emerald-300 group-hover:text-emerald-500 absolute bottom-2 right-2' />
              </button>
            )}
          </div>
        </form>
        {!show ? (
          <section className='mt-14'>
            {todos.map((i) => {
              const { id, title } = i;
              return (
                <div
                  key={id}
                  className={`flex items-center justify-between w-80 rounded-md px-4 py-2 border mb-2
              ${
                edit && id === editID
                  ? 'border-emerald-500 bg-emerald-100'
                  : 'border-emerald-300 bg-emerald-50'
              }`}
                >
                  <h1 className='text-emerald-500 font-semibold tracking-wide'>
                    {title}
                  </h1>
                  <div className='flex items-center space-x-5'>
                    <FaRegEdit
                      onClick={() => handlePatch(id, title)}
                      className={`text-emerald-400 hover:text-emerald-600 cursor-pointer text-lg ${
                        edit && id === editID ? 'hidden' : 'block'
                      }`}
                    />
                    <FaRegTrashAlt
                      onClick={() => handleDelete(id)}
                      className='text-emerald-400 hover:text-emerald-600 cursor-pointer text-lg'
                    />
                  </div>
                </div>
              );
            })}
          </section>
        ) : (
          <AddIcon />
        )}
      </main>
    </main>
  );
};

export default Todos;
