import { Avatar, Button, Collapse, Input, Select, Space, Tooltip } from 'antd';
import {
  UserOutlined,
  InfoCircleOutlined,
  LinkOutlined,
} from '@ant-design/icons';
import { ChangeEvent, useCallback, useMemo, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../store';
import {
  blacklistSet,
  fetchContributors,
  selectBlacklist,
  selectContributors,
  selectHasError,
  selectIsLoading,
  selectLogin,
  selectRepo,
} from '../store/dataSlice';
import { MAX_USER_AVATARS_COUNT } from '../config';

const { Panel } = Collapse;

function Settings() {
  const dispatch = useAppDispatch();

  const savedLogin = useAppSelector(selectLogin);
  const savedRepo = useAppSelector(selectRepo);
  const contributors = useAppSelector(selectContributors);
  const isLoading = useAppSelector(selectIsLoading);
  const hasError = useAppSelector(selectHasError);
  const blacklist = useAppSelector(selectBlacklist);

  const [login, setLogin] = useState<string>(savedLogin);
  const [repo, setRepo] = useState<string>(savedRepo);

  const contributorsOptions = useMemo(
    () =>
      contributors.map((user) => ({
        label: user.login,
        value: user.login,
      })),
    [contributors],
  );

  const isReadyToSave = login && repo;
  const hasList = contributors.length > 0;

  function handleLoginChange(evt: ChangeEvent<HTMLInputElement>) {
    setLogin(evt.target.value);
  }

  function handleRepoChange(evt: ChangeEvent<HTMLInputElement>) {
    setRepo(evt.target.value);
  }

  function handleSaveClick() {
    dispatch(fetchContributors({ login, repo }));
  }

  const handleListChange = useCallback(
    (values: string[]) => dispatch(blacklistSet(values)),
    [dispatch]
  )

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
            disabled={!isReadyToSave}
            loading={isLoading}
            danger={hasError}
          >
            Save data
          </Button>

          {hasList && (
            <>
              <Avatar.Group maxCount={MAX_USER_AVATARS_COUNT} size="small">
                {contributors.map((user) => (
                  <Avatar src={user.avatar_url} key={user.login} />
                ))}
              </Avatar.Group>
              <Select
                mode="multiple"
                allowClear
                style={{ width: '100%' }}
                placeholder="Add users to blacklist"
                onChange={handleListChange}
                options={contributorsOptions}
                value={blacklist}
                maxTagCount="responsive"
              />
            </>
          )}
        </Space>
      </Panel>
    </Collapse>
  );
}

export default Settings;
