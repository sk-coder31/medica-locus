
import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { 
  Home, 
  User, 
  Clipboard, 
  PillIcon, 
  LogOut, 
  Menu, 
  X 
} from "lucide-react";

type LayoutProps = {
  children: React.ReactNode;
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { isAuthenticated, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  // Don't show the layout if not authenticated or on the login page
  if (!isAuthenticated || location.pathname === "/login" || location.pathname === "/verify-location") {
    return <>{children}</>;
  }

  const navItems = [
    { label: "Dashboard", path: "/dashboard", icon: Home },
    { label: "Patient Data", path: "/patient-form", icon: User },
    { label: "Medical History", path: "/medical-history", icon: Clipboard },
    { label: "Medication", path: "/medication-history", icon: PillIcon },
  ];

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Header */}
      <header className="w-full bg-white shadow-sm z-10">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link 
            to="/dashboard" 
            className="flex items-center space-x-2"
          >
            <div className="h-8 w-8 rounded-full bg-medical text-white flex items-center justify-center">
              <span className="font-semibold">M</span>
            </div>
            <span className="font-medium text-lg">MediTrack</span>
          </Link>
          
          {/* Mobile menu button */}
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-full hover:bg-gray-100"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          
          {/* Desktop navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center space-x-1 px-3 py-2 rounded-full transition-colors ${
                  location.pathname === item.path
                    ? "text-medical font-medium"
                    : "text-gray-600 hover:text-medical"
                }`}
              >
                <item.icon size={18} />
                <span>{item.label}</span>
              </Link>
            ))}
            
            <button
              onClick={handleLogout}
              className="flex items-center space-x-1 px-4 py-2 rounded-full bg-red-50 text-red-600 hover:bg-red-100 transition-colors"
            >
              <LogOut size={18} />
              <span>Logout</span>
            </button>
          </nav>
        </div>
      </header>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white shadow-lg fixed top-16 left-0 right-0 z-50 animate-slide-down">
          <nav className="container mx-auto px-4 py-4 flex flex-col space-y-3">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`flex items-center space-x-2 p-3 rounded-xl ${
                  location.pathname === item.path
                    ? "bg-medical/10 text-medical font-medium"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                <item.icon size={20} />
                <span>{item.label}</span>
              </Link>
            ))}
            
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                handleLogout();
              }}
              className="flex items-center space-x-2 p-3 rounded-xl text-red-600 hover:bg-red-50"
            >
              <LogOut size={20} />
              <span>Logout</span>
            </button>
          </nav>
        </div>
      )}

      {/* Main content */}
      <main className="flex-1 container mx-auto px-4 py-6 md:py-8">
        {children}
      </main>
      
      {/* Footer */}
      <footer className="w-full py-6 bg-white border-t">
        <div className="container mx-auto px-4 text-center text-sm text-gray-500">
          <p>© 2023 MediTrack. All rights reserved.</p>
          <p className="mt-2">Secure, simple, and reliable medical tracking.</p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
