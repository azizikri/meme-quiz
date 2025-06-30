import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Layout } from 'antd'
import Home from './components/Home'
import Quiz from './components/Quiz'
import Result from './components/Result'

const { Content } = Layout

function App() {
  return (
    <Router>
      <Layout style={{ minHeight: '100vh', backgroundColor: '#f5f5f5' }}>
        <Content
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'flex-start',
            padding: '40px 20px',
            minHeight: '100vh'
          }}
        >
          <div style={{ width: '100%' }}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/quiz" element={<Quiz />} />
              <Route path="/result" element={<Result />} />
            </Routes>
          </div>
        </Content>
      </Layout>
    </Router>
  )
}

export default App
