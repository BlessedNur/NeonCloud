"use client";
import React, { createContext, useState, useContext, useEffect } from "react";

interface Plan {
  title: string;
  price: string;
  period: string;
  description: string;
  registrationToken: string;
}

interface User {
  name: string;
  email: string;
}

interface CloudContextType {
  choosenPlan: Plan | null; 
  setChoosenPlan: (plan: Plan) => void;
  currentUser: User | null;
  setCurrentUser: (user: User | null) => void;
  login: (userData: User) => void;
  logout: () => void;
}

const CloudContext = createContext<CloudContextType | undefined>(undefined);

export function CloudContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [choosenPlan, setChoosenPlan] = useState<Plan | null>(() => {
    try {
      const storedPlan = localStorage.getItem("choosenPlan");
      return storedPlan ? JSON.parse(storedPlan) : null;
    } catch {
      return null;
    }
  });

  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    try {
      const storedUser = localStorage.getItem("currentUser");
      return storedUser ? JSON.parse(storedUser) : null;
    } catch {
      return null;
    }
  });

  const login = (userData: User) => {
    try {
      setCurrentUser(userData);
      localStorage.setItem("currentUser", JSON.stringify(userData));
    } catch (error) {
      console.error("Failed to save user to localStorage:", error);
    }
  };

  const logout = () => {
    try {
      setCurrentUser(null);
      localStorage.removeItem("currentUser");
      localStorage.removeItem("choosenPlan");
    } catch (error) {
      console.error("Failed to clear localStorage:", error);
    }
  };

  useEffect(() => {
    try {
      if (choosenPlan !== null) {
        localStorage.setItem("choosenPlan", JSON.stringify(choosenPlan));
      }
    } catch (error) {
      console.error("Failed to save plan to localStorage:", error);
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
