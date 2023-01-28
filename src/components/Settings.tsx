import { Collapse, Input, Select, Space, Tooltip } from 'antd';
import {
  UserOutlined,
  InfoCircleOutlined,
  LinkOutlined,
  CaretRightOutlined,
} from '@ant-design/icons';
import { useState } from 'react';
import { BaseOptionType } from 'antd/es/select';

const { Panel } = Collapse;

function Settings() {
  const [login, setLogin] = useState<string>('');
  const [link, setLink] = useState<string>('');
  const [list, setList] = useState<BaseOptionType[]>([]);

  function handleListChange(value: string[]) {}

  return (
    <Collapse bordered={false} defaultActiveKey={['1']}>
      <Panel header="Settings" key="1">
        <Space direction="vertical">
          <Input
            placeholder="Login"
            prefix={<UserOutlined />}
            suffix={
              <Tooltip title="Current user login">
                <InfoCircleOutlined style={{ color: 'rgba(0,0,0,.45)' }} />
              </Tooltip>
            }
          />

          <Input
            placeholder="Repository"
            prefix={<LinkOutlined />}
            suffix={
              <Tooltip title="Link to github repository">
                <InfoCircleOutlined style={{ color: 'rgba(0,0,0,.45)' }} />
              </Tooltip>
            }
          />

          <Select
            mode="multiple"
            allowClear
            style={{ width: '100%' }}
            placeholder="Blacklist"
            onChange={handleListChange}
            options={list}
            loading
            disabled
          />
        </Space>
      </Panel>
    </Collapse>
  );
}

export default Settings;
