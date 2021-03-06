import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { registerUser } from '../../../_actions/user_action';
import { withRouter } from 'react-router';

const RegisterPage = (props) => {
  const dispatch = useDispatch();
  const [Email, setEmail] = useState('');
  const [Name, setName] = useState('');
  const [Password, setPassword] = useState('');
  const [ConfirmPassword, setConfirmPassword] = useState('');

  const onEmailHandler = (e) => {
    setEmail(e.target.value);
  }

  const onNameHandler = (e) => {
    setName(e.target.value);
  }

  const onPasswordHandler = (e) => {
    setPassword(e.target.value)
  }

  const onConfirmPasswordHandler = (e) => {
    setConfirmPassword(e.target.value)
  }

  const onSubmitHandler = (e) => {
    e.preventDefault();

    if (Password !== ConfirmPassword) {
      return alert('비밀번호와 비밀번호 확인은 같아야 합니다.');
    }

    let body = {
      email: Email,
      name: Name,
      password: Password,
    }

    dispatch(registerUser(body))
      .then(response => {
        if (response.payload.success) {
          props.history.push('/login');
        } else {
          alert('회원가입에 실패했습니다.');
        }
      })
  }

  return (
    <div style={{
      display: 'flex', justifyContent: 'center', alignItems: 'center',
      width: '100%', height: '100vh'
    }}>
      <form style={{ display: 'flex', flexDirection: 'column' }}
        onSubmit={onSubmitHandler}
      >
        <label>Email</label>
        <input type="text" value={Email} onChange={onEmailHandler} />
        <label>Name</label>
        <input type="text" value={Name} onChange={onNameHandler} />
        <label>Password</label>
        <input type="password" value={Password} onChange={onPasswordHandler} />
        <label>ConfirmPassword</label>
        <input type="password" value={ConfirmPassword} onChange={onConfirmPasswordHandler} />
        <br />
        <button>회원 가입</button>
      </form>
    </div>
  );
}

export default withRouter(RegisterPage);
