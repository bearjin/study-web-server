import React from 'react';
import Axios from 'axios';
import { withRouter } from 'react-router';

const LandingPage = (props) => {
  const onClickLogoutBtn = () => {
    Axios.get('/api/users/logout')
      .then(response => {
        if (response.data.success) {
          props.history.push('/login');
        } else {
          alert('로그아웃에 실패 했습니다.');
        }
      });
  }
  return (
    <div>
      <button onClick={onClickLogoutBtn}>로그아웃</button>
    </div>
  );
}

export default withRouter(LandingPage);
