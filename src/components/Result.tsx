import { Badge, Button, Space } from 'antd';
import { SearchOutlined, ArrowDownOutlined } from '@ant-design/icons';
import { useAppSelector } from '../store';
import {
  selectBlacklist,
  selectContributors,
  selectLogin,
} from '../store/dataSlice';
import User from './User';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { SEARCH_TIME_PER_USER_MS, SEARCH_TOTAL_TIME_MS } from '../config';

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

  const filteredList = useMemo(() => {
    const set = new Set(blacklist);
    return contributors.filter((user) => !set.has(user.login));
  }, [blacklist, contributors]);

  const getRandomLogin = useCallback((): string => {
    const i = Math.floor(Math.random() * filteredList.length);
    return filteredList[i].login;
  }, [filteredList]);

  useEffect(() => {
    let intervalId: NodeJS.Timer;
    if (isLoading) {
      intervalId = setInterval(() => {
        setChosenLogin(getRandomLogin());
      }, SEARCH_TIME_PER_USER_MS);
    }

    return () => {
      clearInterval(intervalId);
    };
  }, [getRandomLogin, isLoading]);

  function handleClick() {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), SEARCH_TOTAL_TIME_MS);
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
