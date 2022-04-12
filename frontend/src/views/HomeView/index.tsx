import React from 'react';
import { Typography } from '@material-ui/core';
import Seo from '../../components/Seo';

const HomeView: React.FC = () => (
  <>
    <Seo title="Home" />
    <Typography variant="h4" component="h1">
      KeebComparison
    </Typography>
    <Typography>
      KeebComparison is an Elo based leaderboard system for various keyboard
      switches. Just log in and start rating switches now!
    </Typography>
  </>
);

export default HomeView;
