import Box from '@mui/material/Box';
import { BoxProps } from '@mui/material/Box';
import Typography from '@mui/material/Typography';

interface SidebarItemProps {
  title: string
}
const SidebarItem: React.FC<BoxProps<'div', SidebarItemProps>> = (props) => {
  const {
    title,
    children,
    sx,
    ...rest
  } = props;

  return (
    <>
      <Box
        sx={{
          borderBottom: '1px solid #21262d',
          ...sx
        }}
        py={3}
        data-testid="sidebar-item"
        {...rest}
      >
        <Typography
          component="h2"
          sx={{
            fontWeight: 900,
            marginBottom: 2,
          }}
          data-testid="sidebar-item-title"
        >
          {title}
        </Typography>
        {children}
      </Box>
    </>
  )
}

export default SidebarItem;
