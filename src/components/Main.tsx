import { Content } from 'antd/es/layout/layout';

type MainType = {
  children: React.ReactNode;
};

function Main({ children }: MainType) {
  return (
    <Content>
      <div className="main">{children}</div>
    </Content>
  );
}

export default Main;
