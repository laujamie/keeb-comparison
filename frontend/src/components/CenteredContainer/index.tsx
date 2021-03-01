import styled from 'styled-components';
import { Container } from '@material-ui/core';

const CenteredContainer = styled(Container)`
  && {
    display: flex;
    align-items: center;
    height: 100%;
  }
`;

export default CenteredContainer;
