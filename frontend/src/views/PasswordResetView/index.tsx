import React from 'react';
import PasswordReset from '../../components/PasswordReset';
import CenteredContainer from '../../components/CenteredContainer';
import Seo from '../../components/Seo';

const PasswordResetView = () => (
  <CenteredContainer>
    <Seo title="Reset Password" />
    <PasswordReset />
  </CenteredContainer>
);

export default PasswordResetView;
