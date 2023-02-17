import { createSlice } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

type ColumnName = 'todo' | 'doing' | 'done';

export interface Card {
  uuid: string,
  title: string,
  body: string,
  position: number,
  column: ColumnName,
}

interface AddCardPayload {
  payload: Pick<Card, 'title' | 'body' | 'column'>,
}

interface MoveCardPayload {
  payload: Pick<Card, 'uuid' | 'column' | 'position'>,
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
  },
});

export const {
  addCard,
  removeCard,
  moveCard,
} = tasksSlice.actions;

export default tasksSlice.reducer;
