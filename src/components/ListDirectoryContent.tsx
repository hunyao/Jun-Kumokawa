import React from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import SvgIcon from '@mui/material/SvgIcon';
import InsertDriveFileOutlinedIcon from '@mui/icons-material/InsertDriveFileOutlined';
import FolderIcon from '@mui/icons-material/Folder';
import GithubLink from './ui/GithubLink'
import ListFilesItemRow from './ui/ListFilesItemRow'
import { useNavigate } from "react-router-dom";
import moment from 'moment';

const ListDirectoryContent = (props: any) => {
  const [ root, setRoot ] = React.useState(true);
  const {
    path,
    trees,
    type
  } = props;
  const navigate = useNavigate();

  React.useEffect(() => {
    setRoot(path === "")
  }, [
    path
  ])

  if (type !== 'tree') return null;
  return (
    <>
      <Grid
        container
        flexDirection="column"
      >
        <ListFilesItemRow
          container
          sx={{
            display: root ? "none !important" : "inherit"
          }}
        >
          <Grid item flex="none">
            <GithubLink
              href="#"
              className="active"
              sx={{
                minWidth: 16,
                fontSize: 14,
                fontWeight: 600,
                textAlign: 'center'
              }}
              onClick={(e: any) => {
                e.preventDefault();
                navigate('/tree' + path.replace(/\/(\.|#)?[\-a-zA-Z]+$/, ''))
              }}
            >
              <Box
                component="span"
                display="inline-block"
              >
                ..
              </Box>
            </GithubLink>
          </Grid>
          <Grid item flex={1}>
          </Grid>
        </ListFilesItemRow>
        {trees.map((tree: any, index: number) => {
          const {
            type: fileType,
            filename,
            commit: {
              subject,
              committerDate,
            },
          } = tree;
          if (['blob', 'tree'].includes(fileType) === false) {
            return null;
          }

          const icon = fileType === 'blob' ? InsertDriveFileOutlinedIcon : FolderIcon;
          const href = [
            fileType,
            ...path.replace(/^\//, '').split('/'),
            filename
          ]
            .filter((p: string) => p !== "")
            .map((p: string) => encodeURIComponent(p))
            .join('/')
            .replace(/^/, '/')
            .replace(/\/$/, '');

          return (
            <ListFilesItemRow key={index}>
              <Grid
                item
                className="file_icon"
                component={icon}
              />
              <Grid item xs={3}>
                <GithubLink href={"#"} onClick={(e: any) => {
                  e.preventDefault();
                  navigate(href)
                }}>
                  {filename}
                </GithubLink>
              </Grid>
              <Grid item xs={8} className="commit-message">
                <GithubLink href="#">
                  {subject}
                </GithubLink>
              </Grid>
              <Grid item className="commited-time">
                {moment(committerDate).fromNow()}
              </Grid>
            </ListFilesItemRow>
          )
        })}
      </Grid>
    </>
  )
}

export default ListDirectoryContent;
