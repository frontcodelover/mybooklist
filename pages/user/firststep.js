import React from 'react';

import { useAuth } from '../../context/AuthContext';
import { useRouter } from 'next/router';
import GetUser from '../../components/Users/GetUser';

export default function Firststep() {
  return (
    <>
      <GetUser />
    </>
  );
}
