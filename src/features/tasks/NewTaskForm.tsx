import type { FormEvent } from 'react';
import { useAppDispatch } from '../../state/hooks';
import type { Card } from './tasks.state';
import * as tasksState from './tasks.state';

type NewTaskFormData = Pick<Card, 'title' | 'body' | 'column'>

const isNewTaskFormData = (val: any): val is NewTaskFormData => (
  typeof val.title === 'string'
  && typeof val.body === 'string'
  && typeof val.column === 'string'
);

const NewTaskForm = () => {
  const dispatch = useAppDispatch();

  const handleForm = (event: FormEvent) => {
    event.preventDefault();

    const form = document.querySelector('.pomodoro__add-task-form form');

    if (form === null || !(form instanceof HTMLFormElement)) throw new Error('Create task form not found');

    const rawFormData = new FormData(form);

    const data = {
      title: rawFormData.get('title'),
      body: rawFormData.get('body'),
      column: rawFormData.get('column'),
    };

    if (!isNewTaskFormData(data)) throw new Error('New task form datatype mismatch');

    dispatch(tasksState.addCard(data));

    document
      .querySelector('.pomodoro__add-task-form')
      ?.classList.add('hidden');

    form.reset();
  };

  return (
    <div className="pomodoro__add-task-form hidden">
      <h3>Create a new task <button>X</button></h3>
      <form>
        <h5>Title</h5>
        <input type="text" name="title" />
        <h5>Description</h5>
        <input type="text" name="body" />
        <input className="column-input" type="hidden" name="column" />
        <input onClick={handleForm} type="submit" value="Create" />
      </form>
    </div>
  );
};

export default NewTaskForm;
