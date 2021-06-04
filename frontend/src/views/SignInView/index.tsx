import React from 'react';
import SignIn from '../../components/SignIn';
import CenteredContainer from '../../components/CenteredContainer';
import Seo from '../../components/Seo';

const SignInView = () => (
  <CenteredContainer>
    <Seo title="Sign In" />
    <SignIn />
  </CenteredContainer>
);

export default SignInView;
