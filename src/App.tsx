import { lazy } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { MotionConfig } from 'motion/react'
import { LanguageProvider } from '@/i18n/LanguageContext'
import { ThemeProvider } from '@/theme/ThemeContext'
import { Layout } from '@/components/layout/Layout'
import Home from '@/pages/Home'

const Gallery = lazy(() => import('@/pages/Gallery'))
const ArtworkDetail = lazy(() => import('@/pages/ArtworkDetail'))
const About = lazy(() => import('@/pages/About'))
const Contact = lazy(() => import('@/pages/Contact'))
const NotFound = lazy(() => import('@/pages/NotFound'))

export default function App() {
  return (
    <ThemeProvider>
    <LanguageProvider>
      <MotionConfig reducedMotion="user">
        <BrowserRouter>
          <Routes>
            <Route element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="gallery" element={<Gallery />} />
              <Route path="gallery/:slug" element={<ArtworkDetail />} />
              <Route path="about" element={<About />} />
              <Route path="contact" element={<Contact />} />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </MotionConfig>
    </LanguageProvider>
    </ThemeProvider>
  )
}
