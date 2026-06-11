import { Trans } from '@lingui/react/macro';
import { NavLink } from 'react-router';
import { Routes } from '#constants/index';
import { Container } from '#ui/index';

export const Footer = () => {
  return (
    <footer className='py-4'>
      <Container>
        <div>
          <Trans>This Jun-Kumokawa has Super Cow Powers.</Trans>
        </div>
        <div>
          <Trans>
            DO NOT OPEN{' '}
            <NavLink to={Routes.MOO} className='link link-primary'>
              THE PAGE
            </NavLink>
          </Trans>
        </div>
        <div>© 2022 Jun Kumokawa.</div>
      </Container>
    </footer>
  );
};
