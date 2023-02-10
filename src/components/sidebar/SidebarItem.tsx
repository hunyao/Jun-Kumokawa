import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

interface SidebarItemProps {
  title: string
}
const SidebarItem: React.FC<SidebarItemProps> = (props) => {
  const {
    title,
    children
  } = props;

  return (
    <>
      <Box
        sx={{
          borderBottom: '1px solid #21262d'
        }}
        py={3}
      >
        <Typography
          component="h2"
          sx={{
            fontWeight: 900,
            marginBottom: 2,
          }}
        >
          {title}
        </Typography>
        {children}
      </Box>
    </>
  )
}

export default SidebarItem;
