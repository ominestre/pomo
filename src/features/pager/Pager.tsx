import {
  Button,
  ButtonGroup,
} from '@mui/material';

import { useAppDispatch, useAppSelector } from '../../state/hooks';
import * as pagerState from './pager.state';
import Tasks from '../tasks/Tasks';

import type { PageName } from './pager.state';

export const Pager = () => {
  const dispatch = useAppDispatch();
  const currentState = useAppSelector(state => state.pager);

  const selectPage = (page: PageName) =>
    () => dispatch(pagerState.setPage(page));

  return (
    <div className="pomodoro-pager">
      <div className="pomodoro-pager__controls">
        <ButtonGroup variant="text" aria-label="page navigation">
          <Button
            onClick={selectPage('tasks')}
            className={currentState.pageName === 'tasks' ? 'active' : ''}
          >
            Tasks
          </Button>

          <Button
            onClick={selectPage('howTo')}
            className={currentState.pageName === 'howTo' ? 'active' : ''}
          >
            How to use
          </Button>

          <Button
            onClick={selectPage('settings')}
            className={currentState.pageName === 'settings' ? 'active' : ''}
          >
            Settings
          </Button>
        </ButtonGroup>
      </div>
      <div className="pomodoro-pager__content">
        { currentState.pageName === 'tasks' && <Tasks /> }
      </div>
    </div>
  );
};

export default Pager;
