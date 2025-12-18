import { Label, TextInput, Button, Alert, Spinner } from 'flowbite-react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { signInStart, signInFailure, signInSuccess } from '../redux/user/userSlice';
import OAuth from '../components/OAuth';
import { HiTerminal } from 'react-icons/hi';

export default function SignIn() {
  const [formData, setFormData] = useState({});
  const { loading, error: errorMessage } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      return dispatch(signInFailure('Missing credentials'));
    }

    try {
      dispatch(signInStart());

      const res = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (data.success === false) {
        dispatch(signInFailure(data.message));
      }

      if (res.ok) {
        dispatch(signInSuccess(data));
        navigate('/');
      }
    } catch (error) {
      dispatch(signInFailure(error.message));
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0b0f19] text-cyan-300 font-mono px-4">
      <div className="w-full max-w-md border border-cyan-500/30 bg-black/40 backdrop-blur rounded p-6 shadow-lg">
        
        {/* header */}
        <div className="flex items-center gap-2 mb-6 text-cyan-400">
          <HiTerminal />
          <span className="uppercase text-sm tracking-widest">
            AUTH :: SIGN IN
          </span>
        </div>

        {/* system message */}
        <p className="text-xs text-cyan-500 mb-6">
          &gt; user authentication required
        </p>

        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <div>
            <Label value="EMAIL" className="text-cyan-500 text-xs" />
            <TextInput
              id="email"
              type="text"
              placeholder="user@system.local"
              onChange={handleChange}
              className="bg-black border-cyan-500/30 text-cyan-300"
            />
          </div>

          <div>
            <Label value="PASSWORD" className="text-cyan-500 text-xs" />
            <TextInput
              id="password"
              type="password"
              placeholder="********"
              onChange={handleChange}
              className="bg-black border-cyan-500/30 text-cyan-300"
            />
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="bg-cyan-600/20 border border-cyan-400 text-cyan-300 hover:bg-cyan-500/30"
          >
            {loading ? (
              <>
                <Spinner size="sm" />
                <span className="pl-3">AUTHENTICATING</span>
              </>
            ) : (
              'EXECUTE LOGIN'
            )}
          </Button>

          <OAuth />
        </form>

        <div className="text-xs text-cyan-500 mt-4">
          &gt; no account?{' '}
          <Link to="/sign-up" className="text-cyan-300 hover:underline">
            create user
          </Link>
        </div>

        {errorMessage && (
          <Alert color="failure" className="mt-4 text-sm">
            {errorMessage}
          </Alert>
        )}
      </div>
    </div>
  );
}
