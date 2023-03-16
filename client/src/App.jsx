import { CssBaseline, ThemeProvider } from '@mui/material'
import { createTheme } from '@mui/material/styles'
import { useMemo } from 'react'
import { useSelector } from 'react-redux'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'

import { HomePage, LoginPage, ProfilePage } from './scenes'
import { themeSettings } from './theme'

function App() {
   const mode = useSelector((store) => store.mode)
   const theme = useMemo(() => createTheme(themeSettings(mode)), [mode])
   const isAuth = Boolean(useSelector((store) => store.token))

   return (
      <div className="app">
         <BrowserRouter>
            <ThemeProvider theme={theme}>
               <CssBaseline />
               <Routes>
                  <Route path="/" element={<LoginPage />} />
                  <Route
                     path="/home"
                     element={isAuth ? <HomePage /> : <Navigate to="/" />}
                  />
                  <Route
                     path="/profile/:userId"
                     element={isAuth ? <ProfilePage /> : <Navigate to="/" />}
                  />
               </Routes>
            </ThemeProvider>
         </BrowserRouter>
      </div>
   )
}

export default App
