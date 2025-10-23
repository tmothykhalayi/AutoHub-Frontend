import { Button } from '@/components/ui/button'
import { authActions, authStore } from '@/store/authStore'
import { Link, useNavigate } from '@tanstack/react-router'
import {
  Home,
  Wrench,
  Phone,
  LogIn,
  UserPlus,
  Settings,
  UserCircle2,
  Shield,
  Menu,
  X,
} from 'lucide-react'
import React, { useState, useMemo, useEffect } from 'react'
import { queryClient } from '@/integrations/tanstack-query/root-provider'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { ModeToggle } from './mode-toggle'
import { UserRole } from '@/types'

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [authState, setAuthState] = useState(authStore.state)
  const navigate = useNavigate()
  const user = authState.user
  const isVerified = authState.isVerified

  // Subscribe to auth store changes
  useEffect(() => {
    const unsubscribe = authStore.subscribe(() => {
      setAuthState(authStore.state)
    })
    return unsubscribe
  }, [])

  const toggleMobileMenu = () => setIsMobileMenuOpen((prev) => !prev)

  const handleLogout = () => {
    // Clear local storage first
    localStorage.removeItem('auth')
    localStorage.removeItem('authRedirect')

    // Clear React Query cache to remove any cached user data
    queryClient.clear()

    // Reset the auth store
    authActions.deleteUser()

    // Close mobile menu if open
    setIsMobileMenuOpen(false)

    // Navigate to home page
    navigate({ to: '/', replace: true })
  }

  // Helper function to get dashboard route based on user role
  const getDashboardRoute = () => {
    if (!user?.role) return '/dashboard'

    switch (user.role) {
      case UserRole.ADMIN:
        return '/dashboard/admin'
      case UserRole.VENDOR:
        return '/dashboard/admin'
      case UserRole.CUSTOMER:
        return '/dashboard/user'
      default:
        return '/dashboard'
    }
  }

  const navItems = useMemo(
    () => [
      { to: '/', label: 'Home', icon: <Home className="h-4 w-4 mr-2" /> },
      {
        to: '/services',
        label: 'Services',
        icon: <Wrench className="h-4 w-4 mr-2" />,
      },
      {
        to: '/features',
        label: 'Features',
        icon: <Settings className="h-4 w-4 mr-2" />,
      },
      {
        to: '/contact',
        label: 'Contact',
        icon: <Phone className="h-4 w-4 mr-2" />,
      },
    ],
    [],
  )

  const renderAvatar = (
    <Avatar className="h-5 w-5 border border-primary shadow-sm">
      <AvatarImage src={undefined} alt="User avatar" />
      <AvatarFallback className="bg-gradient-to-br from-primary to-blue-600 text-primary-foreground font-semibold text-xs">
        {user?.username?.charAt(0).toUpperCase() || (
          <UserCircle2 className="h-2 w-2" />
        )}
      </AvatarFallback>
    </Avatar>
  )

  return (
    <header className="bg-background border-b border-border shadow-sm fixed w-full z-50 py-2">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <div className="p-1.5 bg-gradient-to-br from-purple-600 via-fuchsia-500 to-pink-400 rounded-lg shadow-md">
            <img
              src="/WashPro (1).ico"
              alt="WashPro Logo"
              className="w-7 h-7 object-contain"
            />
          </div>
          <div className="text-lg font-bold text-primary">WashPro</div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-5 text-foreground/80 font-medium text-sm">
          {navItems.map(({ to, label, icon }) => (
            <Link
              key={to}
              to={to}
              className="hover:text-primary flex items-center gap-1 transition-colors"
            >
              {React.cloneElement(icon, { className: 'h-3.5 w-3.5 mr-1.5' })}
              {label}
            </Link>
          ))}
        </nav>

        {/* Right Side */}
        <div className="hidden md:flex items-center space-x-3">
          {!isVerified ? (
            <>
              <Link
                to="/auth/login"
                className="hover:text-primary flex items-center gap-1 text-foreground/80 font-medium text-sm transition-colors"
              >
                <LogIn className="h-3.5 w-3.5" /> Login
              </Link>
              <Button
                asChild
                size="sm"
                className="bg-primary hover:bg-primary/90 text-primary-foreground font-medium px-3 py-1.5 flex items-center gap-1 text-sm"
              >
                <Link to="/register">
                  <UserPlus className="h-3.5 w-3.5" /> Get Started
                </Link>
              </Button>
              {/* Theme toggle for non-authenticated users */}
              <ModeToggle />
            </>
          ) : (
            <>
              {/* Theme toggle for authenticated users */}
              <ModeToggle />

              {/* User info with dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="h-auto p-1.5 rounded-full hover:bg-accent transition-colors duration-200 flex items-center gap-2"
                  >
                    {renderAvatar}
                    <div className="flex flex-col items-start">
                      <span className="text-xs font-medium text-foreground">
                        {user?.username || 'User'}
                      </span>
                      <span className="text-xs text-muted-foreground capitalize">
                        {user?.role || 'Customer'}
                      </span>
                    </div>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-48 mt-2 shadow-lg">
                  <DropdownMenuItem asChild className="text-sm">
                    <Link
                      to={getDashboardRoute()}
                      className="flex items-center"
                    >
                      <Shield className="h-3.5 w-3.5 mr-2" /> Dashboard
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={handleLogout}
                    className="hover:bg-destructive/10 text-destructive text-sm"
                  >
                    <LogIn className="h-3.5 w-3.5 mr-2" /> Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleMobileMenu}
            className="p-1.5"
          >
            {isMobileMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden px-6 pb-4 bg-background border-t border-border">
          <nav className="flex flex-col space-y-2 text-foreground/80 font-medium">
            {navItems.map(({ to, label, icon }) => (
              <Link
                key={to}
                to={to}
                onClick={toggleMobileMenu}
                className="flex items-center gap-2 py-2 hover:text-primary transition-colors"
              >
                {icon}
                {label}
              </Link>
            ))}

            {!isVerified ? (
              <>
                <Link
                  to="/auth/login"
                  onClick={toggleMobileMenu}
                  className="flex items-center gap-2 py-2 hover:text-primary transition-colors"
                >
                  <LogIn className="h-4 w-4" /> Login
                </Link>
                <Link
                  to="/register"
                  onClick={toggleMobileMenu}
                  className="flex items-center gap-2 py-2 hover:text-primary transition-colors"
                >
                  <UserPlus className="h-4 w-4" /> Get Started
                </Link>
                {/* Theme toggle for mobile non-authenticated users */}
                <div className="flex items-center gap-2 py-2">
                  <Settings className="h-4 w-4" />
                  <span>Theme</span>
                  <div className="ml-auto">
                    <ModeToggle />
                  </div>
                </div>
              </>
            ) : (
              <>
                <Link
                  to={getDashboardRoute()}
                  onClick={toggleMobileMenu}
                  className="flex items-center gap-2 py-2 hover:text-primary transition-colors"
                >
                  <div className="mr-2">{renderAvatar}</div>
                  <div className="flex flex-col">
                    <span className="text-sm">{user?.username || 'User'}</span>
                    <span className="text-xs text-muted-foreground capitalize">
                      {user?.role || 'Customer'}
                    </span>
                  </div>
                </Link>
                {/* Theme toggle for mobile authenticated users */}
                <div className="flex items-center gap-2 py-2">
                  <Settings className="h-4 w-4" />
                  <span>Theme</span>
                  <div className="ml-auto">
                    <ModeToggle />
                  </div>
                </div>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 py-2 text-left hover:text-destructive transition-colors"
                >
                  <LogIn className="h-4 w-4" /> Logout
                </button>
              </>
            )}
          </nav>
        </div>
      )}
    </header>
  )
}