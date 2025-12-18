import { Label, TextInput, Button, Alert, Spinner } from 'flowbite-react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import OAuth from '../components/OAuth';
import { HiTerminal } from 'react-icons/hi';

export default function SignUp() {
  const [formData, setFormData] = useState({});
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.username || !formData.email || !formData.password) {
      return setErrorMessage('Missing required fields');
    }

    try {
      setLoading(true);
      setErrorMessage(null);

      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (data.success === false) {
        setLoading(false);
        return setErrorMessage(data.message);
      }

      setLoading(false);
      if (res.ok) {
        navigate('/sign-in');
      }
    } catch (error) {
      setErrorMessage(error.message);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0b0f19] text-cyan-300 font-mono px-4">
      <div className="w-full max-w-md border border-cyan-500/30 bg-black/40 backdrop-blur rounded p-6 shadow-lg">

        {/* header */}
        <div className="flex items-center gap-2 mb-6 text-cyan-400">
          <HiTerminal />
          <span className="uppercase text-sm tracking-widest">
            AUTH :: CREATE USER
          </span>
        </div>

        {/* system message */}
        <p className="text-xs text-cyan-500 mb-6">
          &gt; initializing user registration
        </p>

        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <div>
            <Label value="USERNAME" className="text-cyan-500 text-xs" />
            <TextInput
              id="username"
              type="text"
              placeholder="operator"
              onChange={handleChange}
              className="bg-black border-cyan-500/30 text-cyan-300"
            />
          </div>

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
                <span className="pl-3">CREATING USER</span>
              </>
            ) : (
              'EXECUTE REGISTER'
            )}
          </Button>

          <OAuth />
        </form>

        <div className="text-xs text-cyan-500 mt-4">
          &gt; existing user?{' '}
          <Link to="/sign-in" className="text-cyan-300 hover:underline">
            authenticate
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
