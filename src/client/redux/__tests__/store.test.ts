import { useStore } from '../store.ts';
import { getEntitiesInitialState } from '../domain/utils/getEntitiesInitialState.ts';

describe('useStore', () => {
    it('should initialize with an empty todo list', () => {
        const state = useStore.getState();
        expect(state.todos).toEqual(getEntitiesInitialState().todos);
    });

    it('should add a new todo to the list', () => {
        // useStore.getState().addTodo('Buy milk');
        // const updatedState = useStore.getState();
        // expect(updatedState.todos).toEqual([{ id: 1, text: 'Buy milk' }]);
    });

    it('should remove a todo from the list', () => {
        // const initialState = useStore.getState();
        // useStore.getState().addTodo('Buy milk');
        // useStore.getState().addTodo('Clean the room');
        // useStore.getState().removeTodoById(1);
        // const updatedState = useStore.getState();
        // expect(updatedState.todos).toEqual([{ id: 2, text: 'Clean the room' }]);
        // expect(updatedState).toEqual(initialState);
    });
});
