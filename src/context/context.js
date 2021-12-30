import React , {useReducer, createContext} from 'react';

import contextReducer from './contextReducer';

const initialState = JSON.parse(localStorage.getItem('transactions')) || [{"amount":20,"category":"Travel","type":"Expense","date":"2021-10-19","id":"e56da46e-2183-4553-a892-4eec656d4046"},{"amount":10,"category":"Travel","type":"Expense","date":"2021-11-02","id":"08c3604d-1605-4e58-a18b-b38c903aa526"},{"amount":50,"category":"Savings","type":"Income","date":"2021-10-27","id":"1455123c-91ae-47a6-98f0-14a3525c3800"},{"amount":100,"category":"Salary","type":"Income","date":"2021-11-01","id":"03e4c950-6b75-42b1-a7b6-e255b47e3759"}];

export const ExpenseTrackerContext = createContext(initialState);

export const Provider = ({ children }) => {
    const [transactions, dispatch] = useReducer(contextReducer, initialState);

    //Action Creators

    const deleteTransaction = (id) => {
        dispatch({ type: 'DELETE_TRANSACTION', payload: id});
    }

    const addTransaction = (transaction) => {
        dispatch({ type: 'ADD_TRANSACTION', payload: transaction });
    }

    const balance = transactions.reduce((acc,currVal) => currVal.type === 'Expense' ? acc-currVal.amount : acc+currVal.amount,0);

    return (
        <ExpenseTrackerContext.Provider value={{
            deleteTransaction, 
            addTransaction,
            transactions,
            balance
        }}>
            {children}
        </ExpenseTrackerContext.Provider>
    )
}