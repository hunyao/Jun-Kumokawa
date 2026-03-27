import { NavLink } from 'react-router';
import { Routes } from '#constants/index';
import { Container } from '#ui/index';

export const Footer = () => {
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
