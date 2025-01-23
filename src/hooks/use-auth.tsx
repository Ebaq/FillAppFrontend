'use client'

import { createContext, ReactNode, useContext, useState } from 'react'
import { Auth } from '../../wailsjs/go/main/App'
import { toast } from './use-toast'

export type AuthContextType = {
	login: (pin: string) => Promise<void>
	isAuthenticated: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const useAuth = () => {
	const context = useContext(AuthContext)
	if (!context) {
		throw new Error('useAuth должен использоваться внутри AuthProvider')
	}
	return context
}

export const AuthProvider = ({ children }: { children: ReactNode }) => {
	const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false)

	const login = async (pin: string) => {
		Auth(pin)
			.then(() => {
				setIsAuthenticated(true)
			})
			.catch(e => {
				setIsAuthenticated(false)
				toast({
					title: 'Неверный пин код!',
					description: '',
				})
			})
	}

	return (
		<AuthContext.Provider value={{ login, isAuthenticated }}>
			{children}
		</AuthContext.Provider>
	)
}
