import { useState } from 'react';
import Signin from './Signin';
import Signup from './Signup';

const Sign = ({ setPage }) => {
  const [sign, setSign] = useState(0);

  const handleSign = (sign) => {
    if (sign === 'Signin') setSign(0);
    if (sign === 'Signup') setSign(1);
  };

  return (
    <main className='absolute w-full h-full flex justify-center'>
      <div className='absolute top-3 left-7 border-b-4 border-emerald-100 pb-px pr-1'>
        <h1 className='font-bold text-lg text-emerald-500 tracking-wide'>
          Todos App
        </h1>
      </div>
      <section className='mt-36 flex flex-col items-center'>
        <div className='flex space-x-20'>
          {['Signin', 'Signup'].map((i) => (
            <button
              key={i}
              onClick={() => handleSign(i)}
              className={`w-20 h-10 tracking-wide text-emerald-700 font-semibold rounded-md p-1 bg-emerald-100 shadow
                ${i === 'Signin' && sign === 0 && 'bg-emerald-300'}
                ${i === 'Signup' && sign === 1 && 'bg-emerald-300'}`}
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
