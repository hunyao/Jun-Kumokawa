import React from 'react'
import {render, fireEvent, waitFor, screen} from '@testing-library/react'
import '@testing-library/jest-dom'
import SourceCodeView from '../SourceCodeView'

describe('Testing SourceCodeView', () => {
  test('with props with binary=false image=false mime=text/plain', () => {
    const props = {
      extension: 'tsx',
      content: 'This is the content\nline2\nline3',
      binary: false,
      image: false,
      mime: 'text/plain',
      filename: 'dummy.tsx'
    }
    render(<SourceCodeView {...props} />)

    const elementBinary = screen.queryByTestId('source-code-view-binary');
    const elementImage = screen.queryByTestId('source-code-view-image');
    const elementText = screen.queryByTestId('source-code-view-text');
    const elementLine0 = screen.queryByTestId('source-code-view-line-0');
    const elementLine1 = screen.queryByTestId('source-code-view-line-1');
    const elementLine2 = screen.queryByTestId('source-code-view-line-2');
    const elementLineNum0 = screen.queryByTestId('source-code-view-line-num-0');
    const elementLineNum1 = screen.queryByTestId('source-code-view-line-num-1');
    const elementLineNum2 = screen.queryByTestId('source-code-view-line-num-2');

    expect(elementBinary).toBe(null);
    expect(elementImage).toBe(null);
    expect(elementText).toBeInTheDocument();
    expect(elementText).toContainElement(elementLine0)
    expect(elementText).toContainElement(elementLine1)
    expect(elementText).toContainElement(elementLine2)
    expect(elementText).toContainElement(elementLineNum0)
    expect(elementText).toContainElement(elementLineNum1)
    expect(elementText).toContainElement(elementLineNum2)
    expect(elementLine0).toHaveTextContent('This is the content')
    expect(elementLine1).toHaveTextContent('line2')
    expect(elementLine2).toHaveTextContent('line3')
  })
  test('with props with binary=true image=true mime=image/jpeg', () => {
    const props = {
      extension: 'jpeg',
      content: 'binarybianrybianrybianry',
      binary: true,
      image: true,
      mime: 'image/jpeg',
      filename: 'dummy.jpeg'
    }
    render(<SourceCodeView {...props} />)

    const elementBinary = screen.queryByTestId('source-code-view-binary');
    const elementImage = screen.queryByTestId('source-code-view-image');
    const elementText = screen.queryByTestId('source-code-view-text');

    expect(elementBinary).toBe(null);
    expect(elementImage).toBeInTheDocument();
    expect(elementText).toBe(null);
    expect(elementImage).toHaveAttribute('src', 'data:image/jpeg;base64,' + btoa(props.content))
  })
  test('with props with binary=true image=false mime=application/zip', () => {
    const props = {
      extension: 'zip',
      content: 'zipzipzipzipzipzipzipzip',
      binary: true,
      image: false,
      mime: 'application/zip',
      filename: 'dummy.zip'
    }
    render(<SourceCodeView {...props} />)

    const elementBinary = screen.queryByTestId('source-code-view-binary');
    const elementImage = screen.queryByTestId('source-code-view-image');
    const elementText = screen.queryByTestId('source-code-view-text');
    const elementBinaryButton = screen.queryByTestId('source-code-view-binary-button');

    expect(elementBinary).toBeInTheDocument();
    expect(elementImage).toBe(null);
    expect(elementText).toBe(null);
    expect(elementBinary).toContainElement(elementBinaryButton);
    expect(elementBinaryButton).toHaveTextContent('View raw');
    expect(elementBinaryButton).toHaveAttribute('href', 'data:application/zip;base64,' + btoa(props.content));

  })
})

