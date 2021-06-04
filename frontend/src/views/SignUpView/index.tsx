import React from 'react';
import SignUp from '../../components/SignUp';
import CenteredContainer from '../../components/CenteredContainer';
import Seo from '../../components/Seo';

const SignUpView = () => (
  <CenteredContainer>
    <Seo title="Sign Up" />
    <SignUp />
  </CenteredContainer>
);

export default SignUpView;
