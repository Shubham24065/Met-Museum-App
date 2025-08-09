import { useState } from 'react';
import { useRouter } from 'next/router';
import { registerUser } from '@/lib/authenticate';

export default function Register() {
  const router = useRouter();
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [err, setErr] = useState('');

  async function submit(e) {
    e.preventDefault();
    setErr('');
    try {
      await registerUser(userName, password, password2);
      router.push('/login');
    } catch (e) { setErr(e.message); }
  }

  return (
    <form onSubmit={submit} style={{maxWidth:420,margin:'2rem auto'}}>
      <h1>Register</h1>
      {err && <p style={{color:'red'}}>{err}</p>}
      <input value={userName} onChange={e=>setUserName(e.target.value)} placeholder="User Name" />
      <input type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="Password" />
      <input type="password" value={password2} onChange={e=>setPassword2(e.target.value)} placeholder="Confirm Password" />
      <button type="submit">Create Account</button>
    </form>
  );
}
