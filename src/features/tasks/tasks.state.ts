import { createSlice } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

type ColumnName = 'todo' | 'doing' | 'done';

export interface Card {
  uuid: string,
  title: string,
  body: string,
  position: number,
  column: ColumnName,
  isEditMode: boolean,
}

interface AddCardPayload {
  payload: Pick<Card, 'title' | 'body' | 'column'>,
}

interface MoveCardPayload {
  payload: Pick<Card, 'uuid' | 'column' | 'position'>,
}

interface ChangeCardPayload {
  payload: {
    uuid: string,
    body?: string,
    title?: string,
  },
}

interface EditCardPayload {
  payload: {
    uuid: string,
    isEditMode: boolean,
  }
}

export type CardCollection = Record<string, Card>;

interface TasksState {
  cards: CardCollection,
}

const initialState: TasksState = {
  cards: {},
};

const reindexCards = (
  cards: CardCollection,
  newIndex: number,
  columnFilter: ColumnName,
): CardCollection => {
  Object.values(cards)
    .filter(card => card.column === columnFilter)
    .forEach(({ position, uuid }) => {
      if (position >= newIndex) cards[uuid].position = position + 1;
    });

  return cards;
};

export const tasksSlice = createSlice({
  name: 'tasks',

  initialState,

  reducers: {
    addCard: (state, { payload }: AddCardPayload) => {
      let { cards } = state;
      const uuid = uuidv4();

      cards = reindexCards(cards, 1, payload.column);

      cards[uuid] = {
        uuid,
        title: payload.title,
        body: payload.body,
        position: 1,
        column: payload.column,
        isEditMode: false,
      };
    },

    removeCard: (state, { payload }: { payload: string }) => {
      const cards = { ...state.cards };

      if (cards[payload]) delete cards[payload];

      return {
        ...state,
        cards,
      };
    },

    moveCard: (state, { payload }: MoveCardPayload) => {
      const { cards } = state;
      const indexedCards = reindexCards(cards, payload.position, payload.column);

      indexedCards[payload.uuid].column = payload.column;
      indexedCards[payload.uuid].position = payload.position;
    },

    changeCard: (state, { payload }: ChangeCardPayload) => {
      const target = state.cards[payload.uuid];
      const title = payload.title || target.title;
      const body = payload.body || target.body;

      state.cards[payload.uuid] = {
        ...target,
        title,
        body,
        isEditMode: false,
      };
    },

    editCard: (state, { payload }: EditCardPayload) => {
      state.cards[payload.uuid].isEditMode = payload.isEditMode;
    },
  },
});

export const {
  addCard,
  removeCard,
  moveCard,
  changeCard,
  editCard,
} = tasksSlice.actions;

export default tasksSlice.reducer;
