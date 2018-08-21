import React from 'react';

import { Container } from 'reactstrap';

import MessageThumbnail from './MessageThumbnail/MessageThumbnail';

import './Messages.css';

export default () => (
  <Container>
    <MessageThumbnail />
    <MessageThumbnail />
    <MessageThumbnail />
  </Container>
);
