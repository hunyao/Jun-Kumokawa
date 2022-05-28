import 'xterm/css/xterm.css'
import { Terminal as Xterm } from 'xterm';
import { FitAddon } from 'xterm-addon-fit';
import React from 'react';
import Box from '@mui/material/Box';
import TerminalIcon from '@mui/icons-material/Terminal';
import Fab from '@mui/material/Fab';

const xterm = new Xterm({
  fontFamily: "Inconsolata, monospace",
  cursorBlink: true,
  rendererType: 'dom',
});
const fitAddon = new FitAddon();
const TerminalApp = React.forwardRef((props: any, ref) => {
  const {
    open
  } = props;

  React.useEffect(() => {
    console.log('called TerminalApp')
  }, [])

  return <Box
    ref={ref}
    sx={{
      position: 'fixed',
      height: 500,
      width: '100%',
      background: 'black',
      bottom: 0,
      left: open ? 0 : 999999
    }}
  />
})

const Terminal = React.forwardRef((props, ref) => {
  const [ open, setOpen ] = React.useState(false);
  let command: string = '';
  let history :string[] = [];
  let seek: number = 0;

  const commands: any = {
    help: {
      f: () => {
        xterm.writeln([
          'Welcome to xterm.js! Try some of the commands below.',
          '',
          ...Object.keys(commands).map(e => `  ${e.padEnd(10)} ${commands[e].description}`)
        ].join('\n\r'));
        prompt(xterm);
      },
      description: 'Prints this help message',
    },
    ls: {
      f: () => {
        xterm.writeln(['a', 'bunch', 'of', 'fake', 'files'].join('\r\n'));
        prompt(xterm);
      },
      description: 'Prints a fake directory structure'
    },
    'Jun-Kumokawa': {
      f: () => {
        xterm.write('Offering');
        Array
        .from(Array(Math.floor(Math.random() * 30)).keys())
        .reduce((p: any, current: number) => {
          return p.then(() => {
            return new Promise((resolve) => setTimeout(resolve, Math.random() * 1000))
          })
          .then(() => {
            xterm.write('.')
          })
        }, Promise.resolve())
        .then(() => {
          const res = Boolean(Math.round(Math.random()))
          xterm.writeln(res ? 'ok': '\x1b[31;1merror\x1b[m');
          if (!res) {
            xterm.writeln('\x1b[41;1mUncaught Error: Unexpected response received\x1b[m');
            xterm.writeln('\x1b[41;1m   at CannotHireException (main.chunk.js:29)\x1b[m');
          } else {
            xterm.writeln('\x1b[32;1mSuccessfully offered. :)\x1b[m');
          }
          prompt(xterm);
        })
      },
      description: 'Offer to hire me'
    },
    reset: {
      f: () => {
        xterm.reset();
        prompt(xterm)
      },
      description: ''
    },
    exit: {
      f: () => {
        setOpen(false);
      },
      description: ''
    }
  }

  const prompt = (term: Xterm) => {
    command = '';
    term.write('\r\n$ ');
  }
  const runCommand = (term: Xterm, text: string) =>  {
    history.push(text.trim())
    seek = history.length;
    const command = text.trim().split(' ')[0];
    if (command.length > 0) {
      term.writeln('');
      if (command in commands) {
        commands[command].f();
        return;
      }
      term.writeln(`${command}: command not found`);
    }
    prompt(term);
  }
  const initXterm = () => {
    xterm.reset();
    xterm.writeln([
      '    Xterm.js is the frontend component that powers many terminals including',
      '                           \x1b[3mVS Code\x1b[0m, \x1b[3mHyper\x1b[0m and \x1b[3mTheia\x1b[0m!',
      '',
      ' ┌ \x1b[1mFeatures\x1b[0m ──────────────────────────────────────────────────────────────────┐',
      ' │                                                                            │',
      ' │  \x1b[31;1mApps just work                         \x1b[32mPerformance\x1b[0m                        │',
      ' │   Xterm.js works with most terminal      Xterm.js is fast and includes an  │',
      ' │   apps like bash, vim and tmux           optional \x1b[3mWebGL renderer\x1b[0m           │',
      ' │                                                                            │',
      ' │  \x1b[33;1mAccessible                             \x1b[34mSelf-contained\x1b[0m                     │',
      ' │   A screen reader mode is available      Zero external dependencies        │',
      ' │                                                                            │',
      ' │  \x1b[35;1mUnicode support                        \x1b[36mAnd much more...\x1b[0m                   │',
      ' │   Supports CJK 語 and emoji \u2764\ufe0f            \x1b[3mLinks\x1b[0m, \x1b[3mthemes\x1b[0m, \x1b[3maddons\x1b[0m, \x1b[3mtyped API\x1b[0m  │',
      ' │                                            ^ Try clicking italic text      │',
      ' │                                                                            │',
      ' └────────────────────────────────────────────────────────────────────────────┘',
      ''
    ].join('\n\r'));

    xterm.writeln('Below is a simple emulated backend, try running `help`.');
    prompt(xterm);
  }

  React.useEffect(() => {
    if (open && xterm.element) {
      initXterm();
      fitAddon.fit();
      fitAddon.fit();
      xterm.focus();
    }
  }, [
    open
  ])

  React.useEffect(() => {
    xterm.onKey(({ key, domEvent }) => {
      domEvent.preventDefault();
      domEvent.stopPropagation();
      domEvent.stopImmediatePropagation();
    })
    xterm.onData(e => {
      console.log(e)
      console.log(new TextEncoder().encode(e))
      console.log((new TextEncoder().encode(e)).map((t: any) => t).join(','))
      switch (e) {
        case '\u0003': // Ctrl+C
          xterm.write('^C');
          prompt(xterm);
        break;
        case '\u000B': // Arrow Up
          if (history.length > 0) {
          seek -= 1;
          seek = seek < 0 ? 0 : seek;
          xterm.write('\r$ ' + history[seek])
          command = history[seek]
        }
        break;
        case '\u000A': // Arrow Down
          if (history.length > 0) {
          seek += 1;
          seek = seek >= history.length ? history.length - 1 : seek;
          xterm.write('\r$ ' + history[seek])
          command = history[seek]
        }
        break;
        case '\u0015': // Ctrl+U
          if (xterm.buffer.normal.cursorX > 2) {
            xterm.write('\r$ ' + ' '.repeat(command.length));
            xterm.write('\r$ ');
            if (command.length > 0) {
              command = ''
            }
          }
        break;
        case '\r': // Enter
          runCommand(xterm, command);
          command = '';
        break;
        case '\u007F': // Backspace (DEL)
          // Do not delete the prompt
          if (xterm.buffer.normal.cursorX > 2) {
          xterm.write('\b \b');
          if (command.length > 0) {
            command = command.substring(0, command.length - 1);
          }
        }
        break;
        default: // Print all other characters for demo
          if ((e >= String.fromCharCode(0x20) && e <= String.fromCharCode(0x7B)) || e >= '\u00a0') {
          command += e;
          xterm.write(e);
        }
      }
    });
  }, [])

  return (
    <>
      <Box
        p={2}
        position="fixed"
        bottom="0"
        right="0"
      >
        <Fab
          color="primary"
          onClick={() => setOpen(!open)}
        >
          <TerminalIcon />
        </Fab>
      </Box>
      <Box className="parent">
        <TerminalApp ref={ref} open={open} />
      </Box>
    </>
  )
})

const TerminalWrapper = () => {
  const ref = React.useRef<HTMLDivElement>();
  const wheelEvent = (e: any) => {
    if (xterm.buffer.active.baseY > 0) {
      e.preventDefault();
    }
  }

  React.useEffect(() => {
    if (ref.current) {
      xterm.loadAddon(fitAddon);
      xterm.open(ref.current);
      ref.current.addEventListener('wheel', wheelEvent);

      return () => {
        ref.current && ref.current.removeEventListener('wheel', wheelEvent);
      }
    }
  }, [])

  return <Terminal ref={ref} />
}

export default TerminalWrapper
