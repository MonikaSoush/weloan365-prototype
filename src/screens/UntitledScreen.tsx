import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { Icon } from '../components/Icon'

// Placeholder for a flow screen that hasn't been designed yet.
// Replace with real content when the screen is provided.
export default function UntitledScreen() {
  return (
    <Box
      className="screen-enter"
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 2,
        bgcolor: '#F5F5F5',
        px: 4,
        textAlign: 'center',
      }}
    >
      <Box
        sx={{
          width: 72,
          height: 72,
          borderRadius: '50%',
          bgcolor: '#fff',
          border: '1px solid #ECEFF3',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Icon name="more" size={30} color="#C2C9D4" />
      </Box>
      <Typography sx={{ fontSize: 17, fontWeight: 700, color: '#3A4256' }}>Untitled screen</Typography>
      <Typography sx={{ fontSize: 13, color: '#8A94A6', maxWidth: 240 }}>
        This flow screen hasn't been designed yet. Drop the design in and it'll show up here.
      </Typography>
    </Box>
  )
}
