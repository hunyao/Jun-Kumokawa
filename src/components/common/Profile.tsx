import { Routes } from '@constants/index';
import { Profile as ProfileData } from '@data/index';
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
} from '@icons/index';
import { Container, GithubTab, GithubTabItem } from '@ui/index';
import { type FC, useState } from 'react';
import { NavLink } from 'react-router';

const { profile } = ProfileData;
export const Profile: FC = () => {
  const [kanji, setKanji] = useState(false);

  return (
    <div className='separater w-full bg-[linear-gradient(var(--tw-gradient-stops)),url(/images/forest-background.jpg)] bg-cover bg-linear-to-b from-base-300/70 to-100% to-base-300'>
      <Container>
        <div className='grid h-32 grid-cols-[max-content_minmax(0,1fr)] grid-rows-3 gap-x-4 gap-y-2 pt-4'>
          <div className='row-span-full'>
            <img
              src='/images/avatar.jpg'
              className='h-full w-full rounded-lg'
              alt=''
            />
          </div>
          <div className='flex items-center gap-2'>
            <label className='label !text-base-content'>
              Kanji
              <input
                type='checkbox'
                className='toggle'
                onChange={(e) => setKanji(e.target.checked)}
              />
            </label>
            <div className='font-bold text-2xl'>
              {kanji ? profile.name.ja.fullName : profile.name.en.fullName}
            </div>
          </div>
          <div>{profile.title.en}</div>
          <div className='flex gap-4'>
            {[
              {
                Icon: LocationSvg,
                content: profile.location,
              },
              {
                Icon: LinkedinSvg,
                content: `@${profile.linkdin}`,
              },
              {
                Icon: GithubSvg,
                content: `@${profile.github}`,
              },
              {
                Icon: EnvelopeSvg,
                content: profile.email,
              },
              {
                Icon: PhoneSvg,
                content: `+(${profile.tel[0]}) ${profile.tel[1]} ${profile.tel[2]}`,
              },
            ].map(({ Icon, content }, i) => (
              <div className='flex items-center gap-1' key={i}>
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
                Overview
              </GithubTabItem>
            )}
          </NavLink>
          <NavLink to={Routes.MYTREE} className='h-full'>
            {({ isActive, isPending }) => (
              <GithubTabItem $active={isActive} $pending={isPending}>
                <span className='loading loading-spinner loading-xs' />
                <CodeSvg className='h-6 w-6' />
                Code
              </GithubTabItem>
            )}
          </NavLink>
          <NavLink to={Routes.EXPERIENCES} className='h-full'>
            {({ isActive }) => (
              <GithubTabItem $active={isActive}>
                <BriefcaseSvg className='h-4 w-4' />
                Experiences
              </GithubTabItem>
            )}
          </NavLink>
          <NavLink to={Routes.SKILLS} className='h-full'>
            {({ isActive }) => (
              <GithubTabItem $active={isActive}>
                <ScrewdriverWrenchSvg className='h-4 w-4' />
                Skills
              </GithubTabItem>
            )}
          </NavLink>
        </GithubTab>
      </Container>
    </div>
  );
};
