import { useNavigate, useSearchParams } from 'react-router-dom'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import BottomNav from '../components/BottomNav'
import { AssetImg, BANNERS } from '../components/home/media'

const HEADING = '#0B0F1A'

type Product = { name: string; amount: string; rate: string; img?: string }

const PRODUCTS: Product[] = [
  { name: 'Micro Loan', amount: 'USD ≤ 3,000', rate: '1.2%', img: BANNERS.micro },
  { name: 'Small Biz Loan', amount: 'USD ≤ 3,000', rate: '1.2%', img: BANNERS.smallBusiness },
  { name: 'Housing Loan', amount: 'USD ≤ 3,000', rate: '1.2%', img: BANNERS.housing },
  { name: 'SME Loan', amount: 'USD ≤ 3,000', rate: '1.2%', img: BANNERS.enterprise },
]

const MIGRATION: Product = { name: 'Migration Worker Loan', amount: 'USD ≤ 15,000', rate: '1.2%', img: BANNERS.migrant }

function ProductCard({ p, height }: { p: Product; height: number }) {
  const navigate = useNavigate()
  return (
    <Box
      onClick={() => navigate(`/product-detail?p=${encodeURIComponent(p.name)}`)}
      role="button"
      sx={{ borderRadius: '12px', overflow: 'hidden', bgcolor: '#fff', border: '1px solid #ECEFF3', cursor: 'pointer' }}
    >
      <Box sx={{ position: 'relative', height }}>
        <AssetImg
          src={p.img}
          alt={p.name}
          sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
          fallback={<Box sx={{ width: '100%', height: '100%', bgcolor: '#E7ECF2' }} />}
        />
        <Box sx={{ position: 'absolute', top: 8, right: 8, bgcolor: 'rgba(255,255,255,0.92)', borderRadius: '8px', px: 0.75, py: 0.25 }}>
          <Typography sx={{ fontSize: 11, fontWeight: 800, color: HEADING }}>{p.rate}</Typography>
        </Box>
      </Box>
      <Box sx={{ px: 1.25, py: 1.25 }}>
        <Typography sx={{ fontSize: 13, fontWeight: 700, color: HEADING }} noWrap>{p.name}</Typography>
        <Box sx={{ display: 'inline-flex', mt: 0.75, px: 1.25, py: '4px', bgcolor: '#ECECEC', borderRadius: '8px' }}>
          <Typography sx={{ fontSize: 11, color: '#000' }}>{p.amount}</Typography>
        </Box>
      </Box>
    </Box>
  )
}

function ProductsTopBar() {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 1.25,
        px: 4,
        pt: 4,
        pb: 2,
        position: 'sticky',
        top: 0,
        zIndex: 10,
        bgcolor: '#F5F5F5',
      }}
    >
      <Box
        component="img"
        src="/assets/brand/header_logo.svg"
        alt="NongHyup Finance (Cambodia) Plc"
        sx={{ height: 26, width: 'auto', display: 'block', flex: 1, minWidth: 0, objectFit: 'contain', objectPosition: 'left' }}
      />
      <IconButton size="small" sx={{ color: '#1A1A1A' }} aria-label="Messages">
        <Box component="img" src="/assets/brand/ico_chat.svg" alt="" sx={{ width: 22, height: 22, display: 'block' }} />
      </IconButton>
      <IconButton size="small" sx={{ color: '#1A1A1A' }} aria-label="Notifications">
        <Box component="img" src="/assets/brand/ico_bell.svg" alt="" sx={{ width: 20, height: 20, display: 'block' }} />
      </IconButton>
    </Box>
  )
}

export default function ProductsScreen() {
  const [params] = useSearchParams()
  const showNav = (params.get('v') ?? '1') === '1'

  return (
    <Box className="screen-enter" sx={{ height: '100%', display: 'flex', flexDirection: 'column', bgcolor: '#F5F5F5' }}>
      <Box className="scroll-content" sx={{ flex: 1 }}>
        <ProductsTopBar />
        <Box sx={{ px: 4, pb: 5, display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>
          <Typography sx={{ fontSize: 30, fontWeight: 800, color: HEADING, letterSpacing: '-0.5px' }}>
            All Loan
          </Typography>

          <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 1.5 }}>
            {PRODUCTS.map((p) => (
              <ProductCard key={p.name} p={p} height={108} />
            ))}
          </Box>

          <ProductCard p={MIGRATION} height={140} />
        </Box>
      </Box>

      {showNav && <BottomNav />}
    </Box>
  )
}
