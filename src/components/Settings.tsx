import { Button, Collapse, Input, Select, Space, Tooltip } from 'antd';
import {
  UserOutlined,
  InfoCircleOutlined,
  LinkOutlined,
} from '@ant-design/icons';
import { ChangeEvent, useState } from 'react';
import { SelectProps } from 'antd/es/select';
import { useAppDispatch, useAppSelector } from '../store';
import {
  fetchContributors,
  selectHasError,
  selectIsLoading,
} from '../store/settings';

const { Panel } = Collapse;

function Settings() {
  const dispatch = useAppDispatch();

  const [login, setLogin] = useState<string>('');
  const [repo, setRepo] = useState<string>('');
  const [list, setList] = useState<SelectProps['options']>([]);

  const isLoading = useAppSelector(selectIsLoading);
  const hasError = useAppSelector(selectHasError);

  const isReady = login && repo;

  function handleLoginChange(evt: ChangeEvent<HTMLInputElement>) {
    setLogin(evt.target.value);
  }

  function handleRepoChange(evt: ChangeEvent<HTMLInputElement>) {
    setRepo(evt.target.value);
  }

  function handleSaveClick() {
    dispatch(fetchContributors({ login, repo }));
  }

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
            value={login}
            onChange={handleLoginChange}
          />

          <Input
            placeholder="Repository"
            prefix={<LinkOutlined />}
            suffix={
              <Tooltip title="Name for github repository">
                <InfoCircleOutlined style={{ color: 'rgba(0,0,0,.45)' }} />
              </Tooltip>
            }
            value={repo}
            onChange={handleRepoChange}
          />

          <Button
            onClick={handleSaveClick}
            disabled={!isReady}
            loading={isLoading}
            danger={hasError}
          >
            Save data
          </Button>

          <Select
            mode="multiple"
            allowClear
            style={{ width: '100%' }}
            placeholder="Add users to blacklist"
            onChange={handleListChange}
            options={list}
            disabled={!isReady}
          />
        </Space>
      </Panel>
    </Collapse>
  );
}

export default Settings;
