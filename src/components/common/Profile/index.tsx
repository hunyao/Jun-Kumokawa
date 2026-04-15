import { Trans } from '@lingui/react/macro';
import { useMemo } from 'react';
import { NavLink } from 'react-router';
import { Routes } from '#constants/index';
import { useProfile } from '#hooks/useProfile';
import {
  BriefcaseSvg,
  CodeSvg,
  EnvelopeSvg,
  GithubSvg,
  HomeSvg,
  LinkedinSvg,
  LocationSvg,
  PhoneSvg,
  ScrewdriverWrenchSvg,
} from '#icons/index';
import { Container, GithubTab, GithubTabItem } from '#ui/index';

export const Profile = () => {
  const profile = useProfile();

  const socialLinks = useMemo(
    () => [
      {
        key: 'location',
        Icon: LocationSvg,
        content: profile.location,
      },
      {
        key: 'linkedin',
        Icon: LinkedinSvg,
        content: (
          <a
            href={`https://www.linkedin.com/in/${profile.linkedin}`}
            target='_blank'
            rel='noreferrer'
            className='link link-hover'
          >
            @{profile.linkedin}
          </a>
        ),
      },
      {
        key: 'github',
        Icon: GithubSvg,
        content: (
          <a
            href={`https://github.com/${profile.github}`}
            target='_blank'
            rel='noreferrer'
            className='link link-hover'
          >
            @{profile.github}
          </a>
        ),
      },
      {
        key: 'email',
        Icon: EnvelopeSvg,
        content: (
          <a href={`mailto:${profile.email}`} className='link link-hover'>
            {profile.email}
          </a>
        ),
      },
      {
        key: 'phone',
        Icon: PhoneSvg,
        content: (
          <a
            href={`tel:+${profile.tel[0]}${profile.tel[1]}${profile.tel[2]}`}
            className='link link-hover'
          >
            +({profile.tel[0]}) {profile.tel[1]} {profile.tel[2]}
          </a>
        ),
      },
    ],
    [profile],
  );

  return (
    <div className='separater w-full bg-[linear-gradient(var(--tw-gradient-stops)),url(/images/forest-background.jpg)] bg-cover bg-linear-to-b from-base-300/70 to-100% to-base-300'>
      <Container>
        <div className='grid h-32 grid-cols-[max-content_minmax(0,1fr)] grid-rows-3 gap-x-4 gap-y-2 pt-4'>
          <div className='row-span-full'>
            <img
              src='/images/avatar.jpg'
              className='h-full w-full rounded-lg'
              alt='Profile avatar'
            />
          </div>
          <div className='flex items-center gap-2'>
            <div className='font-bold text-2xl'>{profile.displayName}</div>
          </div>
          <div>{profile.title}</div>
          <div className='flex gap-4'>
            {socialLinks.map(({ key, Icon, content }) => (
              <div className='flex items-center gap-1' key={key}>
                <Icon className='h-5 w-5 fill-current' />
                <span className='link-text'>{content}</span>
              </div>
            ))}
          </div>
        </div>
        <GithubTab className='mt-4' $variant='border'>
          <NavLink to={Routes.HOME} className='h-full'>
            {({ isActive, isPending }) => (
              <GithubTabItem $active={isActive} $pending={isPending}>
                <span className='loading loading-spinner loading-xs' />
                <HomeSvg className='h-4 w-4' />
                <Trans>Overview</Trans>
              </GithubTabItem>
            )}
          </NavLink>
          <NavLink to={Routes.MYTREE} className='h-full'>
            {({ isActive, isPending }) => (
              <GithubTabItem $active={isActive} $pending={isPending}>
                <span className='loading loading-spinner loading-xs' />
                <CodeSvg className='h-6 w-6' />
                <Trans context='profile'>Code</Trans>
              </GithubTabItem>
            )}
          </NavLink>
          <NavLink to={Routes.EXPERIENCES} className='h-full'>
            {({ isActive }) => (
              <GithubTabItem $active={isActive}>
                <BriefcaseSvg className='h-4 w-4' />
                <Trans>Experiences</Trans>
              </GithubTabItem>
            )}
          </NavLink>
          <NavLink to={Routes.SKILLS} className='h-full'>
            {({ isActive }) => (
              <GithubTabItem $active={isActive}>
                <ScrewdriverWrenchSvg className='h-4 w-4' />
                <Trans>Skills</Trans>
              </GithubTabItem>
            )}
          </NavLink>
        </GithubTab>
      </Container>
    </div>
  );
};
