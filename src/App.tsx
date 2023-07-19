import Footer from './components/Footer'
import { Bookmarks, TaskManager, TopLinks } from './components/Widgets'
import Layout from './components/_Layout'

const App = () => {
  return (
    <Layout>
      <Footer />
      <TopLinks />
      <Bookmarks />
      <TaskManager />
    </Layout>
  )
}

export default App
