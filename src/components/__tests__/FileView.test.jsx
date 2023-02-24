import React from 'react'
import {render, fireEvent, waitFor, screen} from '@testing-library/react'
import '@testing-library/jest-dom'
import FileView from '../FileView'
import mimeTypes from "mime-types";

jest.mock('../MarkdownView', () => {
  return ({text}) => {
    return <div data-testid="markdown-view">`This is MarkdownView, and the prop is ${text}`</div>
  }
})
jest.mock('../SourceCodeView', () => {
  return ({content, extension, binary, image, mime, filename}) => {
    return <div>`$content={content},$extension={extension},$binary={binary.toString()},$image={image.toString()},$mime={mime},$filename={filename}`</div>
  }
})
jest.mock('../Loading', () => {
  return ({children, loading}) => {
    if (loading) {
      return <div>Loading...</div>
    } else {
      return <>{children}</>
    }
  }
})
jest.mock('mime-types')
describe('Testing FileView', () => {
  beforeEach(() => {
    mimeTypes.contentType
    .mockReturnValueOnce('test/extensionA')
    .mockReturnValueOnce('test/extensionB')
    .mockReturnValueOnce('test/extensionC')
  })
  afterEach(() => {
    jest.clearAllMocks();
  })

  test('for loading prop', async () => {
    let props = {
      mode: 'readme',
      filename: 'dummy-filename',
      content: 'dummy-content',
      binary: false,
      image: false,
      loading: true
    }

    const { rerender } = render(<FileView {...props} />)

    const element = screen.getByTestId('file-view')
    const elementContent = screen.getByTestId('file-view-content')

    expect(element).toBeInTheDocument();
    expect(element).toContainElement(elementContent);
    expect(element).toHaveTextContent(props.filename);
    expect(elementContent).toHaveTextContent('Loading...');

    props.loading = false;
    rerender(<FileView {...props} />);
    await waitFor(() => expect(elementContent).toHaveTextContent('dummy-content'))
    await waitFor(() => expect(elementContent).not.toHaveTextContent('Loading...'))
  })
  test.each([
    { mode: 'readme', filename: 'dummy-filename' },
    { mode: 'sourceCode', filename: 'dummy-filename.md' },
  ])('with props mode=$mode filename=$filename', ({mode, filename}) => {
    const props = {
      mode, filename,
      content: 'dummy-content',
      binary: false,
      image: false,
      loading: false
    }

    render(<FileView {...props} />)

    const element = screen.getByTestId('file-view')
    const elementContent = screen.getByTestId('file-view-content')
    const markdownView = screen.getByTestId('markdown-view')

    expect(element).toBeInTheDocument();
    expect(element).toContainElement(elementContent);
    expect(elementContent).toContainElement(markdownView);
    expect(markdownView).toHaveTextContent(props.content);
    expect(element).toHaveTextContent(props.filename);
  })
  test.each([
    { mode: 'sourceCode', filename: 'dummy-filename.txt', binary: false, image: false, mime: 'text/plain', content: 'txt-file' },
    { mode: 'sourceCode', filename: 'dummy-filename.tsx', binary: false, image: false, mime: 'text/plain', content: 'tsx-file' },
    { mode: 'sourceCode', filename: 'dummy-filename.jpg', binary: true, image: true, mime: 'image/jpeg', content: 'jpeg-data' },
    { mode: 'sourceCode', filename: 'dummy-filename.txt', binary: false, image: false, mime: '', content: 'txt-file' },
    { mode: 'sourceCode', filename: 'dummy-filename.tsx', binary: false, image: false, mime: '', content: 'tsx-file' },
    { mode: 'sourceCode', filename: 'dummy-filename.jpg', binary: true, image: true, mime: '', content: 'jpeg-data' },
  ])('with props mode=$mode filename=$filename binary=$binary image=$image mime=$mime content=$content', (testProps) => {
    const props = {
      ...testProps,
      loading: false
    }

    render(<FileView {...props} />)

    const element = screen.getByTestId('file-view')
    const elementContent = screen.getByTestId('file-view-content')

    expect(element).toBeInTheDocument();
    expect(element).toContainElement(elementContent);
    expect(element).toHaveTextContent(props.filename);
    expect(elementContent).toHaveTextContent(`$content=${props.content}`);
    expect(elementContent).toHaveTextContent(`$mime=${props.mime}`);
    expect(elementContent).toHaveTextContent(`$image=${props.image}`);
    expect(elementContent).toHaveTextContent(`$binary=${props.binary}`);
    expect(elementContent).toHaveTextContent(`extension=${props.filename.split('.')[1]}`);
    expect(elementContent).toHaveTextContent(`filename=${props.filename}`);
  })
})
