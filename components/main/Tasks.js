import { useEffect, useRef, useState } from 'react';
import { RiAddFill } from 'react-icons/ri';
import {
  FaRegEdit,
  FaRegTrashAlt,
  FaRegArrowAltCircleLeft,
} from 'react-icons/fa';
import { nanoid } from 'nanoid';
import AddIcon from '../AddIcon';
import axios from 'axios';

const Tasks = ({
  ID,
  setMain,
  data,
  setData,
  todo,
  tasks,
  setTasks,
  getDatumOn,
}) => {
  const ref = useRef(null);
  const [alert, setAlert] = useState(false);
  const [title, setTitle] = useState('');
  const [edit, setEdit] = useState(false);
  const [editID, setEditID] = useState(null);
  const [show, setShow] = useState(true);

  useEffect(() => {
    tasks.length === 0 ? setShow(true) : setShow(false);
  }, [tasks.length]);

  const handlePost = async (e) => {
    e.preventDefault();
    let trimTitle = title
      .split(' ')
      .filter((i) => i !== '')
      .join(' ');
    if (!trimTitle) return setAlert(true);


    const id = nanoid();
    const postTask = [{ id, title: trimTitle }, ...tasks];
    setTitle('');
    setTasks(postTask);
    const postTodo = data.todos.map((i) => {
      if (i.id === todo.id) {
        return { ...i, tasks: postTask };
      } else {
        return i;
      }
    });
    setData({ ...data, todos: postTodo });
    await axios.patch(`https://todos-server-yash.vercel.app/signon/${ID}`, {
      ...data,
      todos: postTodo,
    });
  };

  const handleDelete = async (id) => {
    const deleteTask = tasks.filter((i) => i.id !== id);
    setTasks(deleteTask);
    const deleteTodo = data.todos.map((i) => {
      if (i.id === todo.id) {
        return { ...i, tasks: deleteTask };
      } else {
        return i;
      }
    });
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
    let trimTitle = title
      .split(' ')
      .filter((i) => i !== '')
      .join(' ');
    if (!trimTitle) return setAlert(true);


    const patchTask = tasks.map((i) => {
      if (i.id === editID) {
        return { ...i, title: trimTitle };
      } else {
        return i;
      }
    });
    setTitle('');
    setEdit(false);
    setEditID(null);
    setTasks(patchTask);
    const patchTodo = data.todos.map((i) => {
      if (i.id === todo.id) {
        return { ...i, tasks: patchTask };
      } else {
        return i;
      }
    });
    setData({ ...data, patchTodo });
    await axios.patch(`https://todos-server-yash.vercel.app/signon/${ID}`, {
      ...data,
      todos: patchTodo,
    });
  };

  if (alert) {
    setTimeout(() => {
      setAlert(false);
    }, 5000);
  }

  return (
    <main className='absolute w-full h-full flex justify-center'>
      <main className='mt-[19px] relative'>
        <div className='border-b-4 border-emerald-100 pb-[0.5px] pr-1 w-fit mx-auto mt-1'>
          <h1 className='font-semibold text-lg text-emerald-400 tracking-wide'>
            {todo.title}
          </h1>
        </div>
        <div
          onClick={() => {
            getDatumOn();
            setMain(0);
          }}
          className='absolute top-1 left-0'
        >
          <FaRegArrowAltCircleLeft className='text-red-300 text-4xl hover:text-red-400 cursor-pointer' />
        </div>
        <form>
          <div className='flex items-center mt-[64.5px]'>
            <input
              ref={ref}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              type='text'
              spellCheck='false'
              placeholder='Enter Task'
              className={`w-72 py-2 px-3 text-sm outline-none border border-emerald-300 focus:border-emerald-500 rounded-md tracking-wide text-emerald-400 font-semibold placeholder:text-emerald-200 placeholder:italic
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
            {tasks.map((i) => {
              const { id, title } = i;
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
                    className={`font-semibold tracking-wide cursor-pointer text-sm ${
                      edit && id === editID
                        ? 'text-red-300'
                        : 'text-emerald-400'
                    }`}
                  >
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
                      className={`text-emerald-400 hover:text-emerald-600 cursor-pointer text-lg ${
                        edit && id === editID ? 'hidden' : 'block'
                      }`}
                    />
                  </div>
                </div>
              );
            })}
          </section>
        ) : (
          <section className='-mt-[70px]'>
            <AddIcon />
          </section>
        )}
      </main>
    </main>
  );
};

export default Tasks;
