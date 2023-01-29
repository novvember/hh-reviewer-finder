import { Badge, Button, Space } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { useAppSelector } from '../store';
import { selectBlacklist, selectContributors } from '../store/dataSlice';

function Result() {
  const contributors = useAppSelector(selectContributors);
  const blacklist = useAppSelector(selectBlacklist);

  const isReadyToCalculate = contributors.length !== blacklist.length;
  const message = isReadyToCalculate
    ? 'Find me a reviewer!'
    : 'Enter data in settings :(';

  return (
    <Space direction="vertical" align="center">
      <Badge count={contributors.length - blacklist.length}>
        <Button
          type="primary"
          size="large"
          icon={<SearchOutlined />}
          disabled={!isReadyToCalculate}
        >
          {message}
        </Button>
      </Badge>
    </Space>
  );
}

export default Result;
