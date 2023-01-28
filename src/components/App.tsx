import { Layout } from 'antd';
import Footer from './Footer';
import Header from './Header';
import Main from './Main';
import Settings from './Settings';

function App() {
  return (
    <Layout className="app" style={{ minHeight: '100vh' }}>
      <Header />
      <Main>
        <Settings />
      </Main>
      <Footer />
    </Layout>
  );
}

export default App;
