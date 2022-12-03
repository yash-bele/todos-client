import { useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { toast, ToastContainer } from 'react-toastify';
import { ImSpinner9 } from 'react-icons/im';

const Signin = ({ setPage }) => {
  const [data, setData] = useState({ email: '', pass: '' });
  const [alert, setAlert] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (prop) => (e) => {
    setData({ ...data, [prop]: e.target.value });
  };

  const postDatumIn = async (e) => {
    e.preventDefault();
    const copyData = { ...data };
    Object.keys(copyData).map(
      (i) => (copyData[i] = copyData[i].trim().toLowerCase())
    );
    await axios
      .post(`https://todos-server-yash.vercel.app/signin`, copyData)
      .then(setLoading(true))
      .then((data) => {
        if (data) {
          const { id, token } = data.data;
          Cookies.set('cookie-id-bookie', id, { expires: 1 });
          Cookies.set('cookie-token-bookie', token, { expires: 1 });
          setPage('main');
        }
      })
      .catch((error) => {
        const { data } = error.response;
        if (`Email doesn't exist!` === data) {
          setAlert(0);
          toast.error(`Email doesn't exist`);
        }
        if (`Password incorrect!` === data) {
          setAlert(1);
          toast.error('Password Incorrect');
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
      <form onSubmit={postDatumIn} className='mt-12 flex flex-col items-center'>
        <input
          value={data.email}
          onChange={handleChange('email')}
          type='text'
          placeholder='Email Address'
          spellCheck='false'
          className={`w-80 mb-3 py-2 px-3 text-sm outline-none border border-emerald-300 focus:border-emerald-500 rounded-md tracking-wide text-emerald-700 font-semibold placeholder:text-emerald-300 placeholder:italic
        ${alert === 0 && 'border-red-500 focus:border-red-500'}`}
        />
        <input
          value={data.pass}
          onChange={handleChange('pass')}
          type='text'
          placeholder='Password'
          spellCheck='false'
          className={`w-80 mb-3 py-2 px-3 text-sm outline-none border border-emerald-300 focus:border-emerald-500 rounded-md tracking-wide text-emerald-700 font-semibold placeholder:text-emerald-300 placeholder:italic
        ${alert === 1 && 'border-red-500 focus:border-red-500'}`}
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
              Signin
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

export default Signin;
