export async function getUserInfo() {
    try{
        const user=await fetch(`${process.env.BACKEND_URL}/users/default-user`,{
            method:'GET',
            headers:{
                'Content-Type':'application/json'
            }
        });
    
        const userInfo=await user.json();

        if(!userInfo){
            throw new Error('No user info');
        }
    
        return userInfo;
    }
    catch(err){
        console.log(err);
    }
}