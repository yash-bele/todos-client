import Head from 'next/head';
import { useEffect, useState } from 'react';
import Sign from '../components/sign/Sign';
import Main from '../components/main/Main';
import Loading from '../components/Loading';
import Cookies from 'js-cookie';

const Home = () => {
  const TOKEN = Cookies.get('cookie-token-bookie');
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState('sign');

  useEffect(() => {
    setLoading(true);
    setPage(TOKEN ? 'main' : 'sign');
    setLoading(false);
  }, [TOKEN]);

  if (loading) return <Loading />;

  return (
    <>
      <Head>
        <title>Todos</title>
        <meta name='description' content='Website' />
        <link rel='icon' href='' />
      </Head>
      <>
        {page === 'sign' && <Sign setPage={setPage} />}
        {page === 'main' && <Main setPage={setPage} />}
      </>
    </>
  );
};

export default Home;
