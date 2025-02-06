"use client";
import { useRouter } from "next/navigation";
import React, { createContext, useState, useContext, useEffect } from "react";

interface Plan {
  title: string;
  price: string;
  period: string;
  description: string;
  registrationToken: string;
}

interface Profile {
  name: string;
  company: string;
  role: string;
  avatar: string;
  lastActive: Date;
  accountStatus: string;
}

interface User {
  email: string;
  role?: string;
  plan?: string;
  profile?: Profile;
}

interface AuthResponse {
  success: boolean;
  message: string;
  user: User;
  token: string;
  email: any;
  data: {
    plan: string;
    emailVerified: boolean;
  };
}

interface CloudContextType {
  choosenPlan: Plan | null;
  setChoosenPlan: (plan: Plan) => void;
  currentUser: User | null;
  setCurrentUser: (user: User | null) => void;
  login: (authData: AuthResponse) => void;
  logout: () => void;
  isAuthenticated: () => boolean;
  getToken: () => string | null;
}

const CloudContext = createContext<CloudContextType | undefined>(undefined);

export function CloudContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [choosenPlan, setChoosenPlan] = useState<Plan | null>(() => {
    if (typeof window !== "undefined") {
      try {
        const storedPlan = localStorage.getItem("choosenPlan");
        return storedPlan ? JSON.parse(storedPlan) : null;
      } catch {
        return null;
      }
    }
    return null;
  });

  const router = useRouter();
  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    if (typeof window !== "undefined") {
      try {
        const storedUser = localStorage.getItem("currentUser");
        return storedUser ? JSON.parse(storedUser) : null;
      } catch {
        return null;
      }
    }
    return null;
  });
  const login = (authData: AuthResponse) => {
    try {
      const userData: User = {
        email: authData.user?.email || "",
        role: authData.user?.role || "user",
        plan: authData.user?.plan,
      };

      // Make sure token is stored
      if (!authData.token) {
        throw new Error("No token received from server");
      }

      setCurrentUser(userData);
      localStorage.setItem("currentUser", JSON.stringify(userData));
      localStorage.setItem("token", authData.token); // Store token

      console.log("Token stored:", authData.token); // Debug log
    } catch (error) {
      console.error("Failed to save auth data:", error);
      throw error;
    }
  };

  const logout = () => {
    try {
      setCurrentUser(null);
      localStorage.removeItem("currentUser");
      localStorage.removeItem("token");
      localStorage.removeItem("choosenPlan");
      router.push("/signin");
    } catch (error) {
      console.error("Failed to clear localStorage:", error);
    }
  };

  const isAuthenticated = () => {
    if (typeof window !== "undefined") {
      return !!localStorage.getItem("token");
    }
    return false;
  };
  const getToken = () => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("token"); // Remove the Bearer prefix here
    }
    return null;
  };

  useEffect(() => {
    if (typeof window !== "undefined" && choosenPlan !== null) {
      try {
        localStorage.setItem("choosenPlan", JSON.stringify(choosenPlan));
      } catch (error) {
        console.error("Failed to save plan to localStorage:", error);
      }
    }
  }, [choosenPlan]);

  return (
    <CloudContext.Provider
      value={{
        choosenPlan,
        setChoosenPlan,
        currentUser,
        setCurrentUser,
        login,
        logout,
        isAuthenticated,
        getToken,
      }}
    >
      {children}
    </CloudContext.Provider>
  );
}

export function useCloudContext() {
  const context = useContext(CloudContext);

  if (context === undefined) {
    throw new Error(
      "useCloudContext must be used within a CloudContextProvider"
    );
  }

  return context;
}
