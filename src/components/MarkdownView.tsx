import MarkdownIt from '../plugins/MarkdownIt';
import MarkdownPaper from './ui/MarkdownPaper'

const MarkdownView = ({ text }: { text: string }) => {
  return <MarkdownPaper
    sx={{
      marginX: 4,
      marginY: 2
    }}
    dangerouslySetInnerHTML={{
      __html: MarkdownIt.render(text)
    }}
  />
}

export default MarkdownView;
