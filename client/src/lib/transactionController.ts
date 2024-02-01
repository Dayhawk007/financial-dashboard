export async function getExpensesByCategory() {
    try{
        const expenses=await fetch(`http://localhost:4000/api/transactions/grouped-by-category`,{
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