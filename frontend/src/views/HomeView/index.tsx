import React from 'react';
import { Typography } from '@material-ui/core';
import Seo from '../../components/Seo';

const HomeView: React.FC = () => (
  <>
    <Seo title="Home" />
    <Typography>
      Welcome to KeebComparison, a website that provides an Elo based comparison
      between different switches.
    </Typography>
  </>
);

export default HomeView;
