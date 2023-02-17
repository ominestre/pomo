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
        <button className={currentState.pageName === 'tasks' ? 'active' : ''} onClick={selectPage('tasks')}>Tasks</button>
        <button className={currentState.pageName === 'howTo' ? 'active' : ''} onClick={selectPage('howTo')}>How to use</button>
        <button className={currentState.pageName === 'settings' ? 'active' : ''} onClick={selectPage('settings')}>Settings</button>
      </div>
      <div className="pomodoro-pager__content">
        { currentState.pageName === 'tasks'
          && <Tasks />
        }
      </div>
    </div>
  );
};

export default Pager;
