import { SearchOutlined } from '@ant-design/icons';
import { Button, Layout, Typography } from 'antd';
import Footer from './Footer';
import Header from './Header';
import Main from './Main';
import Settings from './Settings';

const { Text } = Typography;

function App() {
  return (
    <Layout className="app" style={{ minHeight: '100vh' }}>
      <Header />
      <Main>
        <Button type="primary" size='large' icon={<SearchOutlined />} disabled>
          Find me a reviewer!
        </Button>
        <Text type="danger">Error message</Text>
        <Settings />
      </Main>
      <Footer />
    </Layout>
  );
}

export default App;
