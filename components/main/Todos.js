import { useEffect, useState, useRef } from 'react';
import { nanoid } from 'nanoid';
import { RiAddFill } from 'react-icons/ri';
import { FaRegEdit, FaRegTrashAlt } from 'react-icons/fa';
import AddIcon from '../AddIcon';
import axios from 'axios';
import Cookies from 'js-cookie';

const Todos = ({ ID, setPage, data, setData, todos, setTodos, handleTodo }) => {
  const ref = useRef(null);
  const [title, setTitle] = useState('');
  const [alert, setAlert] = useState(false);
  const [edit, setEdit] = useState(false);
  const [editID, setEditID] = useState(null);
  const [show, setShow] = useState(true);

  useEffect(() => {
    todos.length === 0 ? setShow(true) : setShow(false);
  }, [todos.length]);

  const handlePost = async (e) => {
    e.preventDefault();
    const trimTitle = title.trim();
    if (!trimTitle) return setAlert(true);
    const id = nanoid();
    const postTodo = [{ id, title: trimTitle, tasks: [] }, ...todos];
    setTitle('');
    setTodos(postTodo);
    setData({ ...data, todos: postTodo });
    await axios.patch(`https://todos-server-yash.vercel.app/signon/${ID}`, {
      ...data,
      todos: postTodo,
    });
  };

  const handleDelete = async (id) => {
    const deleteTodo = todos.filter((i) => i.id !== id);
    setTodos(deleteTodo);
    setData({ ...data, todos: deleteTodo });
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
    setData({ ...data, todos: patchTodo });
    await axios.patch(`https://todos-server-yash.vercel.app/signon/${ID}`, {
      ...data,
      todos: patchTodo,
    });
  };

  const handleSignout = () => {
    Cookies.remove('coiokie-bodokie');
    Cookies.remove('cotookie-bokenokie');
    setPage('sign');
  };

  if (alert) {
    setTimeout(() => {
      setAlert(false);
    }, 5000);
  }

  return (
    <>
      <main className='relative'>
        <section className='absolute top-6 flex justify-between w-full'>
          <div className='top-5 left-0 border-2 border-emerald-300 rounded-3xl py-1 px-5 bg-emerald-50'>
            <h1 className='font-normal text-emerald-500 tracking-wide'>
              <span className='font-bold capitalize'>{data.name}’</span>s Todos
            </h1>
          </div>
          <div
            onClick={handleSignout}
            className='border-2 border-red-200 hover:border-red-300 rounded-3xl py-1.5 px-5 bg-red-50 cursor-pointer text-red-400 hover:text-red-500 text-xl'
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
        <main className='mt-20 flex flex-col'>
          <form>
            <div className='flex items-center mt-10'>
              <input
                ref={ref}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                type='text'
                spellCheck='false'
                placeholder='Enter Todo'
                className={`z-10 w-72 py-2 px-3 text-sm outline-none border border-emerald-300 focus:border-emerald-500 rounded-md tracking-wide text-emerald-500 font-semibold text-sm placeholder:text-emerald-300 placeholder:italic
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
            <section className='mt-10'>
              {todos.map((i) => {
                const { id, title, tasks } = i;
                return (
                  <div
                    key={id}
                    className={`flex items-center justify-between w-[325px] rounded-md px-4 py-2 border mb-2
              ${
                edit && id === editID
                  ? 'border-red-300 bg-red-50'
                  : 'border-emerald-300 bg-emerald-50'
              }`}
                  >
                    <h1
                      onClick={() => handleTodo(i)}
                      className={`font-semibold tracking-wide cursor-pointer capitalize text-sm ${
                        edit && id === editID
                          ? 'text-red-500'
                          : 'text-emerald-500'
                      }`}
                    >
                      {`${title} (${tasks.length})`}
                    </h1>
                    <div className='flex items-center space-x-5'>
                      <FaRegEdit
                        onClick={() => handlePatch(id, title)}
                        className={`text-emerald-400 hover:text-emerald-600 cursor-pointer text-lg z-10 ${
                          edit && id === editID ? 'hidden' : 'block'
                        }`}
                      />
                      <FaRegTrashAlt
                        onClick={() => handleDelete(id)}
                        className={`text-emerald-400 hover:text-emerald-600 cursor-pointer text-lg z-10 ${
                          edit && id === editID ? 'hidden' : 'block'
                        }`}
                      />
                    </div>
                  </div>
                );
              })}
            </section>
          ) : (
            <section className='-mt-16'>
              <AddIcon />
            </section>
          )}
        </main>
      </main>
    </>
  );
};

export default Todos;
