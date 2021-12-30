import { useContext } from 'react';
import { ExpenseTrackerContext } from './context/context';

import { incomeCategories, expenseCategories, resetCategories} from './constants/categories';

const useTransaction = (title) => {
    resetCategories();
    //const date_year = 2020;
    const { transactions } = useContext(ExpenseTrackerContext);
    //console.log(transactions);
   // const temp_transactions = transactions.filter((t)=> Number(t.date.split("-")[0]) === date_year);
    //console.log(temp_transactions);
    //const transactionsPerType = temp_transactions.filter((t)=> t.type === title );
    const transactionsPerType = transactions.filter((t)=> t.type === title );
    const total = transactionsPerType.reduce((acc, currVal) => acc += currVal.amount,0);
    const categories = title === 'Income' ? incomeCategories : expenseCategories;
    //const temp_categories = categories.filter((t) => t.date.split("-")[0] === date_year);

    console.log( { transactionsPerType,total,categories});

    // transactionsPerType.forEach((t) => {
    //     const date = new Date(t.date);
    //     console.log(Number(t.date.split("-")[0]) === 2021);
    //     console.log(t.date.split("-")[0]);
    // })

    transactionsPerType.forEach((t) => {
        const category = categories.find((c) => c.type === t.category)

        if(category) category.amount += t.amount;
    });

    const filteredCategories = categories.filter((c) => c.amount>0);

    const chartData = {
        datasets: [{
            data: filteredCategories.map((c) => c.amount),
            backgroundColor:filteredCategories.map((c) => c.color),

        }],
        labels: filteredCategories.map((c) => c.type)
    }

    return {
        filteredCategories, total, chartData
    }

}

export default useTransaction;