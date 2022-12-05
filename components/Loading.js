import Head from 'next/head';
import { FiRefreshCw } from 'react-icons/fi';

const Loading = () => {
  return (
    <>
      <Head>
        <title>Todos</title>
        <meta name='description' content='Website' />
        <link rel='icon' href='' />
      </Head>
      <main className='absolute w-full h-full flex justify-center'>
        <section className='mt-48'>
          <FiRefreshCw className='text-9xl text-emerald-100 animate-spin' />
        </section>
      </main>
    </>
  );
};

export default Loading;
