import { Space } from 'antd';
import { Content } from 'antd/es/layout/layout';

type MainType = {
  children: React.ReactNode;
};

function Main({ children }: MainType) {
  return (
    <Content>
      <Space className="main" direction="vertical" align="center" size='large'>
        {children}
      </Space>
    </Content>
  );
}

export default Main;
