import DevSkeleton from './components/DevSkeleton'
import Footer from './components/Footer'
import { Cards, TopLinks } from './components/Widgets'
import Layout from './components/_Layout'

const App = () => {
  return (
    <Layout>
      <Footer />
      <TopLinks />
      <Cards />
      <DevSkeleton
        name="Task manager / Kanban board"
        style={{ minHeight: '320px', marginTop: '20px' }}
      />
    </Layout>
  )
}

export default App
