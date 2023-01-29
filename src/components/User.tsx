import { Avatar, Button, Space } from 'antd';
import { useAppSelector } from '../store';
import { selectContributorByLogin } from '../store/dataSlice';
import { UserOutlined } from '@ant-design/icons';
import { Typography } from 'antd';

const { Text } = Typography;

type UserType = {
  login: string;
};

function User({ login }: UserType) {
  const user = useAppSelector(selectContributorByLogin(login));

  console.log(login);
  if (!user) return null;

  return (
    <Button type="dashed" href={user.html_url}>
      <Space>
        <Avatar size="small" icon={<UserOutlined />} src={user.avatar_url} />
        <Text>{user.login}</Text>
      </Space>
    </Button>
  );
}

export default User;
