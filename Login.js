import { useState } from 'react';

export default function Login({ onLogin }) {
  const [password, setPassword] = useState('');
  const [showQuestion, setShowQuestion] = useState(false);
  const [answer, setAnswer] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const handleLogin = () => {
    if (password === 'KA30ML2005') {
      onLogin(true);
    }
  };

  const handlePasswordChange = () => {
    if (answer === 'Deepseek') {
      localStorage.setItem('password', newPassword);
      alert('Password changed!');
    }
  };

  return (
    <div style={{ 
      background: 'rgba(255,255,255,0.8)', 
      height: '100vh', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center' 
    }}>
      <div style={{ padding: 20, background: 'white', borderRadius: 10 }}>
        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleLogin}>Login</button>
        <p onClick={() => setShowQuestion(true)} style={{ cursor: 'pointer' }}>
          Forgot Password?
        </p>

        {showQuestion && (
          <div>
            <p>Who developed this website?</p>
            <input
              placeholder="Answer"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
            />
            <input
              type="password"
              placeholder="New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <button onClick={handlePasswordChange}>Change Password</button>
          </div>
        )}
      </div>
    </div>
  );
}