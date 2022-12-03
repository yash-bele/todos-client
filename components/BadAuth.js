import { ImWarning } from 'react-icons/im';

const BadAuth = () => {
  return (
    <>
      <main className='absolute w-full h-full flex justify-center items-center'>
        <section className='-mt-32 space-y-3'>
          <ImWarning className='text-red-200 text-7xl w-full' />
          <h1 className='text-slate-500 font-semibold'>
            Your aren’t authorized to access this content
          </h1>
        </section>
      </main>
    </>
  );
};

export default BadAuth;
