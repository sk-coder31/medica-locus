
import React, { createContext, useContext, useState, useEffect } from "react";

type User = {
  id: string;
  name: string;
  email: string;
  role: "doctor" | "patient";
  aadhaar?: string;
};

type AuthContextType = {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string, aadhaar?: string, isDoctor?: boolean) => Promise<void>;
  logout: () => void;
  loading: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for saved user in localStorage
    const savedUser = localStorage.getItem("medical_user");
    
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    
    setLoading(false);
  }, []);

  const login = async (email: string, password: string, aadhaar?: string, isDoctor: boolean = false) => {
    setLoading(true);
    
    // This is a mock implementation for demonstration
    // In a real app, you would make an API call to validate credentials
    
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        // Mock user - in a real app this would come from your backend
        const mockUser = {
          id: isDoctor ? "doctor-123" : "user-123",
          name: isDoctor ? "Dr. John Smith" : "John Doe",
          email: email,
          role: isDoctor ? "doctor" : "patient" as "doctor" | "patient",
          aadhaar: aadhaar || "XXXX-XXXX-1234"
        };
        
        setUser(mockUser);
        localStorage.setItem("medical_user", JSON.stringify(mockUser));
        setLoading(false);
        resolve();
      }, 1000);
    });
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("medical_user");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        logout,
        loading
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  
  return context;
};
