import { useState } from 'react';
import Signin from './Signin';
import Signup from './Signup';

const Sign = ({ setPage }) => {
  const [sign, setSign] = useState(0);

  const handleSign = (param) => {
    if (param === 'Signin') setSign(0);
    if (param === 'Signup') setSign(1);
  };

  return (
    <main className='absolute w-full h-full flex justify-center'>
      <div className='absolute top-3 left-7 border-b-4 border-red-100 pb-px pr-1'>
        <h1 className='font-bold text-lg text-red-300 tracking-wide'>
          Todos App
        </h1>
      </div>
      <section className='mt-28 flex flex-col items-center'>
        <div className='flex space-x-20'>
          {['Signin', 'Signup'].map((i) => (
            <button
              key={i}
              onClick={() => handleSign(i)}
              className={`w-20 h-10 tracking-wide text-emerald-600 font-semibold rounded-md pb-px bg-emerald-100 shadow border-double
                ${
                  i === 'Signin' &&
                  sign === 0 &&
                  'border-4 border-emerald-300 shadow-md'
                }
                ${
                  i === 'Signup' &&
                  sign === 1 &&
                  'border-4 border-emerald-300 shadow-md'
                }`}
            >
              {i}
            </button>
          ))}
        </div>
        {sign === 0 && <Signin setPage={setPage} />}
        {sign === 1 && <Signup setSign={setSign} />}
      </section>
    </main>
  );
};

export default Sign;
