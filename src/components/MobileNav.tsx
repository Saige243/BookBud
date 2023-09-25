import * as React from 'react'
import IconButton from '@mui/material/IconButton'
import Menu from '@mui/material/Menu'
import MenuIcon from '@mui/icons-material/Menu'
import MenuItem from '@mui/material/MenuItem'
import AccountMenuDropdown from './AccountMenuDropdown'
import LoginLogo from './LoginLogo'
import { Link } from 'react-router-dom'

function MobileNav() {
  const [anchorElNav, setAnchorElNav] = React.useState(null)

  const links = ['Home', 'My Library', 'Community']
  const pages = ['/dashboard', '/savedBooks', '/community']

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget)
  }

  const handleCloseNavMenu = () => {
    setAnchorElNav(null)
  }

  return (
    <div className="flex bg-BBwhite z-10 w-full">
      <div className="flex md:hidden w-full place-items-center justify-around">
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
        <Link to="/dashboard">
          <LoginLogo />
        </Link>
        <div>
          <AccountMenuDropdown />
        </div>
      </div>
    </div>
  )
}
export default MobileNav
