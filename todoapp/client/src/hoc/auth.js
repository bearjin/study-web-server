import { useEffect } from 'react'
import { auth } from '../_actions/user_action';
import { useDispatch } from 'react-redux';

export default function Auth(SpecificComponent, option, adminRoute = null) {
  function AuthenticationCheck(props) {
    const dispatch = useDispatch();
    useEffect(() => {
      dispatch(auth()).then(response => {
        // 로그인 하지 않은 상태
        if (!response.payload.isAuth) {
          if (option) {
            props.history.push('/login');
          }
        } else {
          //로그인 한 상태
          if (adminRoute && !response.payload.isAdmin) {
            props.history.push('/');
          } else {
            if (option === false) {
              props.history.push('/');
            }
          }
        }
      });
    }, [dispatch, props.history])

    return (
      <SpecificComponent />
    );
  }

  return AuthenticationCheck;
}