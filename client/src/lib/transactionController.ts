export async function getExpensesByCategory() {
    try{
        const expenses=await fetch(`${process.env.BACKEND_URL}/transactions/grouped-by-category`,{
            method:'GET',
            headers:{
                'Content-Type':'application/json'
            }
        });
    
        const expensesByCategory=await expenses.json();

        if(!expensesByCategory){
            throw new Error('No expenses by category');
        }
    
        return expensesByCategory;
    }
    catch(err){
        console.log(err);
    }
}

export async function getTransactionsPaginated(pagination:{
    page:number,
    limit:number
 }) {
    try{
        const transactions=await fetch(`${process.env.BACKEND_URL}/transactions/?page=${pagination.page}&limit=${pagination.limit}`,{
            method:'GET',
            headers:{
                'Content-Type':'application/json'
            }
        });
    
        const transactionsPaginated=await transactions.json();

        if(!transactionsPaginated){
            throw new Error('No transactions paginated');
        }
    
        return transactionsPaginated;
    }
    catch(err){
        console.log(err);
    }
}

export async function createTransaction(transaction:any) {
    try{
        const newTransaction=await fetch(`${process.env.BACKEND_URL}/transactions`,{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(transaction)
        });
    
        const createdTransaction=await newTransaction.json();

        if(!createdTransaction){
            throw new Error('No created transaction');
        }
    
        return createdTransaction;
    }
    catch(err){
        console.log(err);
    }
}