import Cookies from 'js-cookie';
import { AuthInput } from 'types/user/client';

import { useAuthMutation } from '../queries/user';

export const useAuth = () => {
  const authMutate = useAuthMutation();

  const authLogin = (body: AuthInput, onSuccessLogin: () => void) => {
    authMutate.mutate(body, {
      onSuccess({ userId, token }) {
        localStorage.setItem('isRegister', 'false');
        localStorage.setItem('userId', `${userId}`);
        localStorage.setItem('token', `${token}`);
        Cookies.set('token', token);

        // 초기 사이즈 설정 페이지로 이동하기
        onSuccessLogin();
      },
    });
  };

  return { authLogin };
};
