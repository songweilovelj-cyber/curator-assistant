import React from 'react'
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import CurationWorkspace from '@/pages/ExhibitionPlanPage/CurationWorkspace'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
      retry: 1
    }
  }
})

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <HashRouter>
        <Routes>
          {/* 首页 - 默认跳转到策展工作台 */}
          <Route path="/" element={<Navigate to="/workspace" replace />} />

          {/* 策展工作台 */}
          <Route path="/workspace" element={<CurationWorkspace />} />
          <Route path="/workspace/:id" element={<CurationWorkspace />} />

          {/* 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </HashRouter>
    </QueryClientProvider>
  )
}

function NotFound() {
  return (
    <div style={{
      minHeight: '100vh',
      background: '#0f0f16',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: '-apple-system, BlinkMacSystemFont, "PingFang SC", "Microsoft YaHei", sans-serif'
    }}>
      <div style={{ textAlign: 'center' }}>
        <div style={{ fontSize: '80px', marginBottom: '16px' }}>404</div>
        <h1 style={{ fontSize: '24px', fontWeight: 'bold', color: '#e8e8ec', marginBottom: '8px' }}>页面不存在</h1>
        <p style={{ color: '#999aaa', marginBottom: '24px' }}>抱歉，你访问的页面不存在</p>
        <a
          href="#/workspace"
          style={{
            padding: '10px 24px',
            background: '#4ECDC4',
            color: '#111',
            borderRadius: '8px',
            fontWeight: 600,
            textDecoration: 'none',
            fontSize: '14px'
          }}
        >
          返回策展工作台
        </a>
      </div>
    </div>
  )
}

export default App
