import Head from 'next/head';

const Loading = () => {
  return (
    <>
      <Head>
        <title>Todos</title>
        <meta name='description' content='Website' />
        <link rel='icon' href='' />
      </Head>
      <main className='absolute w-full h-full flex justify-center'>
        <section className='mt-48>
          <svg
            stroke='currentColor'
            fill='none'
            strokeWidth='2'
            viewBox='0 0 24 24'
            strokeLinecap='round'
            strokeLinejoin='round'
            height='1em'
            width='1em'
            xmlns='http://www.w3.org/2000/svg'
            className='text-9xl text-emerald-100 animate-spin'
          >
            <polyline points='23 4 23 10 17 10'></polyline>
            <polyline points='1 20 1 14 7 14'></polyline>
            <path d='M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15'></path>
          </svg>
        </section>
      </main>
    </>
  );
};

export default Loading;
