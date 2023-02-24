import GithubLink from './ui/GithubLink'

interface GithubDetailLinkProps {
  href: string,
  icon: React.ReactElement,
  number: number,
  name: string,
  className?: string
}
const GithubDetailLink: React.FC<GithubDetailLinkProps> = (props) => {
  const {
    href,
    icon,
    number,
    name,
    className = ''
  } = props;

  return (
    <>
      <GithubLink
        className={"no-underline primary " + className}
        href={href}
        data-testid="github-detail-link"
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
