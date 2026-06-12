import { useNavigate } from 'react-router-dom'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import { Icon } from '../../components/Icon'
import { MwlHeader, MwlTitle, MwlFooter } from '../mwl/MwlParts'

const HEADING = '#0B0F1A'
const MUTED = '#8A94A6'
const BLUE = '#275CB2'
const GREEN = '#1FA85C'
const DANGER = '#E11D48'

function DocRow({
  thumb,
  title,
  status,
  done,
  onDelete,
  onCapture,
}: {
  thumb: 'idCard' | 'image'
  title: string
  status?: string
  done?: boolean
  onDelete?: () => void
  onCapture: () => void
}) {
  return (
    <Box sx={{ bgcolor: '#fff', borderRadius: '14px', p: '12px', display: 'flex', alignItems: 'center', gap: 1.5 }}>
      <Box sx={{ width: 52, height: 52, borderRadius: '10px', bgcolor: done ? '#EAF6EE' : '#EEF1F5', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
        <Icon name={thumb} size={24} color={done ? GREEN : MUTED} />
      </Box>
      <Box sx={{ flex: 1, minWidth: 0 }}>
        <Typography sx={{ fontSize: 15, fontWeight: 700, color: HEADING }} noWrap>{title}</Typography>
        {status && (
          <Typography sx={{ fontSize: 13, fontWeight: 600, color: done ? GREEN : MUTED, mt: 0.25 }}>{status}</Typography>
        )}
      </Box>
      {done ? (
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Box
            onClick={onDelete}
            role="button"
            aria-label="Delete"
            sx={{ width: 44, height: 44, borderRadius: '10px', bgcolor: '#FDE7EC', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
          >
            <Icon name="trash" size={20} color={DANGER} />
          </Box>
          <Box
            onClick={onCapture}
            role="button"
            aria-label="Retake"
            sx={{ width: 44, height: 44, borderRadius: '10px', bgcolor: '#EAF1FC', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
          >
            <Icon name="camera" size={20} color={BLUE} />
          </Box>
        </Box>
      ) : (
        <Button
          onClick={onCapture}
          startIcon={<Icon name="camera" size={18} color={BLUE} />}
          sx={{ height: 44, borderRadius: '10px', px: 2, fontSize: 14, fontWeight: 700, color: BLUE, bgcolor: '#EAF1FC', '&:hover': { bgcolor: '#DCE9FB' } }}
        >
          Capture
        </Button>
      )}
    </Box>
  )
}

export default function ProfileDocumentsScreen() {
  const navigate = useNavigate()

  return (
    <Box className="screen-enter" sx={{ height: '100%', display: 'flex', flexDirection: 'column', bgcolor: '#F5F5F5' }}>
      <Box className="scroll-content" sx={{ flex: 1 }}>
        <MwlHeader onBack={() => navigate(-1)} step={1} totalSteps={2} />
        <MwlTitle>NID &amp; Selfile</MwlTitle>
        <Typography sx={{ fontSize: 14.5, color: MUTED, px: 3, mb: 2.5 }}>Capture your Card and Selfie</Typography>

        <Box sx={{ px: 3, display: 'flex', flexDirection: 'column', gap: 1.5 }}>
          <DocRow thumb="idCard" title="National ID Card" status="Completed" done onDelete={() => {}} onCapture={() => {}} />
          <DocRow thumb="image" title="Selfile" onCapture={() => {}} />
        </Box>
      </Box>

      <MwlFooter onNext={() => navigate('/profile-edit')} />
    </Box>
  )
}
