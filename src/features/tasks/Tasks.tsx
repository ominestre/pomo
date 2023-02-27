import type {
  DragEvent,
  MouseEventHandler,
} from 'react';
import {
  Stack,
  Card as CardElement,
  CardContent,
  Button,
  IconButton,
  Typography,
  Box,
  TextField,
} from '@mui/material';
import {
  Add as AddIcon,
  Remove as RemoveIcon,
  Edit as EditIcon,
  Check as CheckIcon,
  Clear as ClearIcon,
} from '@mui/icons-material';
import { useAppDispatch, useAppSelector } from '../../state/hooks';
import * as tasksState from './tasks.state';

import type { Card, CardCollection } from './tasks.state';

type TaskCardProps = Pick<Card, 'body' | 'position' | 'title' | 'uuid' | 'isEditMode'>
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

  const handleCardEdit: MouseEventHandler<HTMLButtonElement> = (ev) => {
    const cardElement = ev.currentTarget.closest('.pomodoro__task-card');
    const error = new Error('Unable to save card changes');

    if (!(cardElement instanceof HTMLDivElement)) throw error;

    const cardTitleInput = cardElement.querySelector('.card-content-title input');
    const cardBodyInput = cardElement.querySelector('.card-content-body input');

    if (
      !(cardTitleInput instanceof HTMLInputElement)
      || !(cardBodyInput instanceof HTMLInputElement)
    ) {
      throw error;
    }

    dispatch(tasksState.changeCard({
      uuid: props.uuid,
      body: cardBodyInput.value,
      title: cardTitleInput.value,
    }));
  };

  return (
    <CardElement
      className="pomodoro__task-card"
      draggable={!props.isEditMode}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <CardContent className="pomodoro__card-content">
        <div className="card-content-column-data">
          <div className="card-content-title">
            {!props.isEditMode &&
              <Typography className="task-card-header" variant="h5">
                {props.title}
              </Typography>
            }

            {props.isEditMode &&
              <TextField fullWidth variant="outlined" defaultValue={props.title} />
            }
          </div>
          <div className="card-content-body">
            {!props.isEditMode &&
              <Typography variant="body2">
                {props.body}
              </Typography>
            }

            {props.isEditMode &&
              <TextField fullWidth variant="outlined" defaultValue={props.body} />
            }
          </div>
        </div>
        <div className="card-content-column-controls">
          <Button variant="contained" onClick={() => dispatch(tasksState.removeCard(props.uuid))}>
            <RemoveIcon fontSize="small" />
          </Button>

          {!props.isEditMode &&
            <IconButton onClick={
              () => dispatch(tasksState.editCard({ uuid: props.uuid, isEditMode: true }))
            }>
              <EditIcon />
            </IconButton>
          }

          {props.isEditMode &&
            <IconButton onClick={handleCardEdit}>
              <CheckIcon />
            </IconButton>
          }

          {props.isEditMode &&
            <IconButton onClick={
              () => dispatch(tasksState.editCard({ uuid: props.uuid, isEditMode: false }))
            }>
              <ClearIcon />
            </IconButton>
          }
        </div>
      </CardContent>
    </CardElement>
  );
};

const TaskColumn = (props: { name: 'todo' | 'doing' | 'done' }) => {
  const dispatch = useAppDispatch();
  const currentState = useAppSelector(state => state.tasks);

  const columnClassName = `pomodoro__${props.name}-tasks pomodoro__task-column`;

  const getCardsInColumn = (cards: CardCollection) => {
    const arrayOfCards = Object.values(cards);
    const columnCards = arrayOfCards.filter(val => val.column === props.name);
    const sortedColumnCards = columnCards.sort((a, b) => a.position - b.position);

    return sortedColumnCards.map(val => (
      <div className="wrapper" key={val.uuid}>
        <TaskCard
          key={val.uuid}
          body={val.body}
          title={val.title}
          position={val.position}
          uuid={val.uuid}
          isEditMode={val.isEditMode}
        />
        <DropZone
          column={props.name}
          position={val.position + 1}
        />
      </div>
    ));
  };

  const addNewCard = () => {
    dispatch(tasksState.addCard({
      column: props.name,
      title: 'New task...',
      body: 'Edit me!',
    }));
  };

  return (
    <Stack className={columnClassName} spacing={2} onDragOver={event => event.preventDefault()}>
      <div className="pomodoro__tasks-column-header">
        <span>{props.name}</span>
        <div className="pomodoro__task-column-controls">
          <Button variant="contained" onClick={addNewCard}>
            <AddIcon fontSize="small" />
          </Button>
        </div>
      </div>

      <DropZone column={props.name} position={1} />
      {getCardsInColumn(currentState.cards)}
    </Stack>
  );
};

export const Tasks = () => (
  <Box className="pomodoro__task-board">
    <TaskColumn name="todo" />
    <TaskColumn name="doing" />
    <TaskColumn name="done" />
  </Box>
);

export default Tasks;