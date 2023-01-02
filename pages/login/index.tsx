import React from 'react';
import { GoogleLoginImg } from 'assets/img';
import Image from 'next/image';
import styled from 'styled-components';
import theme from 'styles/theme';

function Login() {
  return (
    <Styled.Root>
      <Styled.GreetingImg />
      <Styled.LoginButton>
        <Image src={GoogleLoginImg} alt="구글로그인 버튼 이미지" />
      </Styled.LoginButton>
      <Styled.Message>
        로그인은 개인 정보 보호 정책 및 서비스 약관에 동의하는 것을 의미하며,
        <br />
        서비스 이용을 위해 이메일과 이름, 프로필 이미지를 수집합니다.
      </Styled.Message>
    </Styled.Root>
  );
}

export default Login;

const Styled = {
  Root: styled.section`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 100vw;
    height: 100vh;
  `,
  GreetingImg: styled.img`
    width: 70rem;
    height: 50rem;
    background-color: #d9d9d9;
    border-radius: 1.5rem;
  `,
  LoginButton: styled.button`
    width: 69.2rem;
    height: 7rem;
    margin-top: 8rem;
    border: 0;
    background: transparent;
    cursor: pointer;
  `,
  Message: styled.h1`
    margin-top: 6.2rem;
    text-align: center;
    ${theme.fonts.subtitle1}
    color: ${theme.colors.gray350}
  `,
};