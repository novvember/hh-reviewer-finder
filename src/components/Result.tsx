import { Badge, Button, Space } from 'antd';
import { SearchOutlined, ArrowDownOutlined } from '@ant-design/icons';
import { useAppSelector } from '../store';
import {
  selectBlacklist,
  selectContributors,
  selectLogin,
} from '../store/dataSlice';
import User from './User';
import { useCallback, useEffect, useState } from 'react';

function Result() {
  const contributors = useAppSelector(selectContributors);
  const blacklist = useAppSelector(selectBlacklist);
  const login = useAppSelector(selectLogin);

  const [isLoading, setIsLoading] = useState(false);
  const [chosenLogin, setChosenLogin] = useState('');

  const isReadyToCalculate = contributors.length !== blacklist.length;
  const message = isReadyToCalculate
    ? 'Find me a reviewer!'
    : 'Enter data in settings :(';

  const getRandomLogin = useCallback((): string => {
    const i = Math.floor(Math.random() * contributors.length);
    const login = contributors[i].login;
    if (blacklist.includes(login)) {
      return getRandomLogin();
    } else {
      return login;
    }
  }, [blacklist, contributors]);

  useEffect(() => {
    let intervalId: NodeJS.Timer;
    if (isLoading) {
      intervalId = setInterval(() => {
        setChosenLogin(getRandomLogin());
      }, 500);
    }

    return () => {
      clearInterval(intervalId);
    };
  }, [getRandomLogin, isLoading]);

  async function handleClick() {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 5000);
  }

  return (
    <Space direction="vertical" align="center" size="large">
      {!!chosenLogin && (
        <Space direction="vertical" align="center">
          <User login={login} />
          <ArrowDownOutlined />
          <User login={chosenLogin} />
        </Space>
      )}

      <Badge count={contributors.length - blacklist.length}>
        <Button
          type="primary"
          size="large"
          icon={<SearchOutlined />}
          disabled={!isReadyToCalculate}
          onClick={handleClick}
          loading={isLoading}
        >
          {message}
        </Button>
      </Badge>
    </Space>
  );
}

export default Result;
