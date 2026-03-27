import dayjs from 'dayjs';
import { useLocation, useNavigate } from 'react-router';
import { Activity, Timeline } from '#components/index';
import { Experience } from '#data/index';
import { DateRangeSvg, HandshakeSvg } from '#icons/index';
import { Container } from '#ui/index';
import { genRange } from '#utils/index';

const { experiences } = Experience;

type ListSrc = Array<string | ListSrc>;
type ListProps = {
  src: ListSrc;
};
const List = (props: ListProps) => {
  const { src } = props;
  return (
    <ul className='ml-4'>
      {src.map((item, i) => {
        if (Array.isArray(item)) {
          // biome-ignore lint/suspicious/noArrayIndexKey: reason
          return <List key={i} src={item} />;
        }
        return (
          // biome-ignore lint/suspicious/noArrayIndexKey: reason
          <li key={i} className='list-inside list-disc'>
            {item}
          </li>
        );
      })}
    </ul>
  );
};
export const ExperiencePage = () => {
  const { employedAt: firstDatetime = '' } = experiences.slice().pop() || {};
  const { employedAt: lastDatetime = '' } = experiences.slice()[0] || {};
  const navigate = useNavigate();
  const location = useLocation();
  const firstYear = new Date(firstDatetime).getFullYear();
  const lastYear = new Date(lastDatetime).getFullYear();
  const years = genRange(firstYear, lastYear).toReversed();
  return (
    <Container>
      <div className='grid grid-cols-[minmax(0,1fr)_max-content] gap-x-2'>
        <div>
          <div className='py-4 font-bold text-lg'>Working activity</div>
          <div className='grid gap-y-4'>
            {experiences.map((experience, i) => (
              <Activity
                // biome-ignore lint/suspicious/noArrayIndexKey: reason
                key={i}
                title={dayjs(experience.employedAt).format('MMMM YYYY')}
                id={dayjs(experience.employedAt).year().toString()}
              >
                <Timeline
                  title={`${experience.title}, ${experience.companyName}, ${experience.location}`}
                >
                  <div className='mt-2 flex items-center gap-2 text-base-content/70 text-sm'>
                    <DateRangeSvg className='h-4 w-4 fill-current' />
                    <span>{dayjs(experience.employedAt).format('L')}</span>
                    <span> - </span>
                    <span>{dayjs(experience.leftAt).format('L')}</span>
                  </div>
                  <div className='mt-2 flex items-center gap-2 text-base-content/70 text-sm'>
                    <HandshakeSvg className='h-4 w-4 fill-current' />
                    <span>{experience.employmentType}</span>
                  </div>
                  <p className='my-2 font-bold text-lg'>{experience.summary}</p>
                  <details>
                    <summary>Responsibility for</summary>
                    <List src={experience.responsibilities} />
                  </details>
                  <details>
                    <summary>Achievements</summary>
                    <List src={experience.achievements} />
                  </details>
                  <details>
                    <summary>Used technologies</summary>
                    <List src={experience.usedSkills} />
                  </details>
                </Timeline>
              </Activity>
            ))}
          </div>
        </div>
        <div>
          <div className='sticky top-0 grid w-32 gap-y-2 p-2'>
            {years.map((year) => (
              <button
                key={year}
                type='button'
                className={`btn rounded-lg px-4 py-2 ${location.hash.slice(1) === year.toString() ? 'btn-primary' : 'btn-ghost'}`}
                onClick={() => {
                  document
                    .getElementById(year.toString())
                    ?.scrollIntoView({ behavior: 'smooth' });
                  navigate(`#${year}`, { replace: true });
                }}
              >
                {year}
              </button>
            ))}
          </div>
        </div>
      </div>
    </Container>
  );
};
