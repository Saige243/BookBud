import * as React from 'react'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import Menu from '@mui/material/Menu'
import MenuIcon from '@mui/icons-material/Menu'
import Container from '@mui/material/Container'
import MenuItem from '@mui/material/MenuItem'
import AccountMenuDropdown from './AccountMenuDropdown'
import LoginLogo from './LoginLogo'
import { Link } from 'react-router-dom'

function MobileNav() {
  const [anchorElNav, setAnchorElNav] = React.useState(null)
  const [anchorElUser, setAnchorElUser] = React.useState(null)

  const links = ['Home', 'My Library', 'Community']
  const pages = ['/dashboard', '/savedBooks', '/community']

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget)
  }

  const handleCloseUserMenu = () => {
    setAnchorElUser(null)
  }

  const handleCloseNavMenu = () => {
    setAnchorElNav(null)
  }

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget)
  }

  return (
    <div className="flex sm:hidden bg-BBwhite z-10 w-full">
      <Container
        sx={{ display: { md: 'hidden' } }}
        className="flex md:hidden justify-around"
        maxWidth="xl"
      >
        <Toolbar disableGutters>
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {links.map((link, index) => (
                <MenuItem key={link} onClick={handleCloseNavMenu}>
                  <Link key={link} to={pages[index]}>
                    <p className="font-unbounded">{link}</p>
                  </Link>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <div className="flex place-items-center justify-center">
            <Link to="/dashboard">
              <LoginLogo />
            </Link>
          </div>
          <AccountMenuDropdown />
        </Toolbar>
      </Container>
    </div>
  )
}
export default MobileNav
