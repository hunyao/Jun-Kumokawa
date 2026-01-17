import { Routes } from '@constants/index';
import { Container } from '@ui/index';
import type { FC } from 'react';
import { NavLink } from 'react-router';

export const Footer: FC = () => {
  return (
    <footer className='pt-4'>
      <Container>
        <div>This Jun-Kumokawa has Super Cow Powers.</div>
        <div>
          DO NOT OPEN{' '}
          <NavLink to={Routes.MOO} className='link link-primary'>
            THE PAGE
          </NavLink>
        </div>
        <div>© 2022 Jun Kumokawa.</div>
      </Container>
    </footer>
  );
};
