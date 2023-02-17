import type { DragEvent } from 'react';
import { useAppDispatch, useAppSelector } from '../../state/hooks';
import * as tasksState from './tasks.state';
import NewTaskForm from './NewTaskForm';

import type { Card, CardCollection } from './tasks.state';

type TaskCardProps = Pick<Card, 'body' | 'position' | 'title' | 'uuid'>
type DropZoneProps = Pick<Card, 'column' | 'position'>

const DropZone = (props: DropZoneProps) => {
  const dispatch = useAppDispatch();

  const handleDrop = (event: DragEvent) => {
    const uuid = event.dataTransfer.getData('text');

    if (!uuid || typeof uuid !== 'string') throw new Error('Unexpected drag and drop data type');

    dispatch(tasksState.moveCard({
      column: props.column,
      position: props.position,
      uuid,
    }));

    document
      .querySelectorAll('.pomodoro__drop-zone')
      .forEach(el => {
        el.classList.remove('expanded');
        el.classList.add('hidden');
      });
  };

  return (
    <div
      className="pomodoro__drop-zone highlight hidden"
      onDragEnter={e => e.currentTarget.classList.add('expanded')}
      onDragLeave={e => e.currentTarget.classList.remove('expanded')}
      onDrop={handleDrop}
    ></div>
  );
};

const TaskCard = (props: TaskCardProps) => {
  const dispatch = useAppDispatch();

  const handleDragStart = (event: DragEvent<HTMLDivElement>) => {
    event.dataTransfer.setData('text', props.uuid);

    document
      .querySelectorAll('.pomodoro__drop-zone')
      .forEach(el => el.classList.remove('hidden'));
  };

  const handleDragEnd = () => {
    document
      .querySelectorAll('.pomodoro__drop-zone')
      .forEach(el => el.classList.add('hidden'));
  };

  return (
    <div
      className="pomodoro__task-card"
      draggable="true"
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <h4>
        <span>{props.title}</span>
        <button onClick={() => dispatch(tasksState.removeCard(props.uuid))}>( - )</button>
      </h4>
      <p>{props.body}</p>
    </div>
  );
};

const TaskColumn = (props: { name: 'todo' | 'doing' | 'done' }) => {
  const currentState = useAppSelector(state => state.tasks);

  const columnClassName = `pomodoro__${props.name}-tasks`;

  const getCardsInColumn = (cards: CardCollection) => {
    const arrayOfCards = Object.values(cards);
    const columnCards = arrayOfCards.filter(val => val.column === props.name);
    const sortedColumnCards = columnCards.sort((a, b) => a.position - b.position);

    return sortedColumnCards.map(val => (
      <div className="wrapper">
        <TaskCard
          key={val.uuid}
          body={val.body}
          title={val.title}
          position={val.position}
          uuid={val.uuid}
        />
        <DropZone
          column={props.name}
          position={val.position + 1}
        />
      </div>
    ));
  };

  const addNewCard = () => {
    const container = document.querySelector('.pomodoro__add-task-form');
    container?.classList.remove('hidden');
    container?.querySelector('.column-input')?.setAttribute('value', props.name);
  };

  return (
    <div className={columnClassName}>
      <div className="pomodoro__tasks-column-header">
        <span>{props.name}</span>
        <div className="pomodoro__task-column-controls">
          <button onClick={addNewCard}>( + )</button>
        </div>
      </div>

      <div
        className="pomodoro__tasks-card-box"
        onDragOver={event => event.preventDefault()}
      >
        <DropZone column={props.name} position={1} />
        {getCardsInColumn(currentState.cards)}
      </div>
    </div>
  );
};

export const Tasks = () => (
  <div className="pomodoro__task-board">
    <NewTaskForm />
    <div className="pomodoro__task-columns">
      <TaskColumn name="todo" />
      <TaskColumn name="doing" />
      <TaskColumn name="done" />
    </div>
  </div>
);

export default Tasks;
