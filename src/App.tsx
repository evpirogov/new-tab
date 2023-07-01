import Footer from './components/Footer'
import { Cards, TaskManager, TopLinks } from './components/Widgets'
import Layout from './components/_Layout'

const App = () => {
  return (
    <Layout>
      <Footer />
      <TopLinks />
      <Cards />
      <TaskManager />
    </Layout>
  )
}

export default App
