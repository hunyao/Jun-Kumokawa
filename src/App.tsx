import './App.css';
import React from 'react';
import { Suspense } from 'react';
import { Routes, Route } from "react-router-dom";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Container from '@mui/material/Container';
import CircularProgress from '@mui/material/CircularProgress';
import Backdrop from '@mui/material/Backdrop';
import 'highlight.js/styles/github-dark.css';
import Header from './pages/common/header'
import Footer from './pages/common/footer'
import BorderLinearProgress from './components/ui/BorderLinearProgress'
import NotFoundPage from './pages/common/404'
import PersonalDataProvider from './contexts/personalData'

const Overview = React.lazy(() => import("./pages/home/overview"))
const Moo = React.lazy(() => import("./pages/cow"))
const Experience = React.lazy(() => import("./pages/home/experience"))
const Skill = React.lazy(() => import("./pages/home/skill"))
const Blob = React.lazy(() => import("./pages/home/blob"))
const Tree = React.lazy(() => import("./pages/home/tree"))
const Find = React.lazy(() => import("./pages/home/find"))

const RepositoryProvider = React.lazy(() => import("./contexts/repository"))
const theme = createTheme({
  palette: {
    mode: 'dark'
  },
  components: {
    MuiTypography: {
      styleOverrides: {
        root: {
          fontFamily: 'Inconsolata, monospace'
        }
      }
    }
  }
})

function App() {
  return (
    <div className="App">
      <PersonalDataProvider>
        <Suspense fallback={<BorderLinearProgress />}>
          <ThemeProvider theme={theme}>
            <RepositoryProvider>
              <Header />
              <Container>
                <Suspense fallback={
                  <Backdrop
                    sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
                    open
                  >
                    <CircularProgress />
                  </Backdrop>
                  }>
                  <Routes>
                    <Route path="/" element={<Overview />} />
                    <Route path="/find" element={<Find />} />
                    <Route path="/moo" element={<Moo />} />
                    <Route path="/overview" element={<Overview />} />
                    <Route path="/experience" element={<Experience />} />
                    <Route path="/skill" element={<Skill />} />
                    <Route path="/blob/:sha" element={<Blob />} />
                    <Route path="/tree" element={<Tree />} />
                    <Route path="/tree/:sha" element={<Tree />} />
                    <Route path="*" element={<NotFoundPage />} />
                  </Routes>
                </Suspense>
              </Container>
              <Footer />
            </RepositoryProvider>
          </ThemeProvider>
        </Suspense>
      </PersonalDataProvider>
    </div>
  );
}

export default App;
