import GithubLink from './ui/GithubLink'

const GithubDetailLink = (props: any) => {
  const {
    href,
    icon,
    number,
    name
  } = props;

  return (
    <>
      <GithubLink
        className="no-underline primary"
        href={href}
      >
        <strong>
          <span>
            {icon}
            {number}
          </span>
        </strong>
        <span className="fixed-color name">
          {name}
        </span>
      </GithubLink>
    </>
  )
}

export default GithubDetailLink;
