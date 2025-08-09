import { useState } from 'react';
import { useRouter } from 'next/router';
import { authenticateUser } from '@/lib/authenticate';
import { useAtom } from 'jotai';
import { favouritesAtom, searchHistoryAtom } from '@/store';
import { getFavourites, getHistory } from '@/lib/userData';

export default function Login() {
  const router = useRouter();
  const [, setFavs] = useAtom(favouritesAtom);
  const [, setHist] = useAtom(searchHistoryAtom);
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [err, setErr] = useState('');

  async function submit(e) {
    e.preventDefault();
    setErr('');
    try {
      await authenticateUser(userName, password);
      setFavs(await getFavourites());
      setHist(await getHistory());
      router.push('/favourites');
    } catch (e) { setErr(e.message); }
  }

  return (
    <form onSubmit={submit} style={{maxWidth:420,margin:'2rem auto'}}>
      <h1>Login</h1>
      {err && <p style={{color:'red'}}>{err}</p>}
      <input value={userName} onChange={e=>setUserName(e.target.value)} placeholder="User Name" />
      <input type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="Password" />
      <button type="submit">Login</button>
    </form>
  );
}
