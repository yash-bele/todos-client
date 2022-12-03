import { useEffect, useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ImSpinner9 } from 'react-icons/im';

const Signup = ({ setSign }) => {
  const [data, setData] = useState({ name: '', email: '', pass: '' });
  const [alert, setAlert] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (prop) => (e) => {
    setData({ ...data, [prop]: e.target.value });
  };

  const postDatumUp = async (e) => {
    e.preventDefault();
    const copyData = { ...data };
    Object.keys(copyData).map(
      (i) => (copyData[i] = copyData[i].trim().toLowerCase())
    );
    const objVals = Object.values(copyData);
    if (objVals[0].length < 1) {
      setAlert(0);
      return toast.error('Enter user name');
    }
    if (objVals[0].includes(' ')) {
      setAlert(0);
      return toast.error('Enter user name without spaces');
    }
    if (
      objVals[1].length < 5 ||
      objVals[1].includes(' ') ||
      objVals[1].split('@').length !== 2 ||
      objVals[1].split('@').includes('') ||
      objVals[1].split('.').length !== 2 ||
      objVals[1].split('.').includes('')
    ) {
      setAlert(1);
      return toast.error(`Email format isn't valid`);
    }
    if (objVals[2].length < 1) {
      setAlert(2);
      return toast.error('Enter password');
    }
    if (objVals[2].includes(' ')) {
      setAlert(2);
      return toast.error('Enter password without spaces');
    }
    await axios
      .post(`https://todos-server-yash.vercel.app/signup`, copyData)
      .then(setLoading(true))
      .then((data) => {
        if (data) {
          setSign(0);
        }
      })
      .catch((error) => {
        const { data } = error.response;
        if (`Email already exist!` === data) {
          setAlert(1);
          toast.error('Email already exist');
        }
        console.log(data);
      });
  };

  if (alert !== null) {
    setTimeout(() => {
      setLoading(false);
      setAlert(null);
    }, 5000);
  }

  return (
    <>
      <form onSubmit={postDatumUp} className='mt-12 flex flex-col items-center'>
        <input
          value={data.name}
          onChange={handleChange('name')}
          type='text'
          placeholder='User Name'
          spellCheck='false'
          maxLength={8}
          className={`w-80 mb-3 py-2 px-3 text-sm outline-none border rounded-md tracking-wide text-emerald-700 font-semibold border-emerald-300 focus:border-emerald-500 placeholder:text-emerald-300 placeholder:italic
        ${alert === 0 && 'border-red-500 focus:border-red-500'}`}
        />
        <input
          value={data.email}
          onChange={handleChange('email')}
          type='text'
          placeholder='Email Address'
          spellCheck='false'
          className={`w-80 mb-3 py-2 px-3 text-sm outline-none border rounded-md tracking-wide text-emerald-700 font-semibold border-emerald-300 focus:border-emerald-500 placeholder:text-emerald-300 placeholder:italic
        ${alert === 1 && 'border-red-500 focus:border-red-500'}`}
        />
        <input
          value={data.pass}
          onChange={handleChange('pass')}
          type='text'
          placeholder='Password'
          spellCheck='false'
          className={`w-80 mb-3 py-2 px-3 text-sm outline-none border rounded-md tracking-wide text-emerald-700 font-semibold border-emerald-300 focus:border-emerald-500 placeholder:text-emerald-300 placeholder:italic
        ${alert === 2 && 'border-red-500 focus:border-red-500'}`}
        />
        {loading && alert === null ? (
          <div className='w-52 mt-5 h-9 rounded-md bg-emerald-300 shadow relative flex justify-center'>
            <ImSpinner9 className='tracking-wide text-emerald-700 text-2xl font-semibold absolute top-[17.5%] animate-spin' />
          </div>
        ) : (
          <button
            type='submit'
            className='w-52 mt-5 h-9 rounded-md bg-emerald-100 hover:bg-emerald-300 shadow relative flex justify-center'
          >
            <p className='tracking-wide text-emerald-700 font-semibold absolute top-[17%]'>
              Signup
            </p>
          </button>
        )}
      </form>
      <ToastContainer
        position='top-center'
        theme='colored'
        hideProgressBar={true}
        autoClose={4000}
      />
    </>
  );
};

export default Signup;
