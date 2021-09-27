//614614febee8aeecdb9dfda5

require ('../src/db/mongoose')
const Task = require ('../src/models/task')
/*
Task.findByIdAndDelete('614614febee8aeecdb9dfda5').then ((task)=>{
        console.log(task);
        return Task.countDocuments( { completed : false  })
}).then ((result)=>{
    console.log(result);
}).catch((e)=>{
    console.log(e);
})
*/

const deleteTaskAndcount  = async ( id )=>{
    const task = await Task.findByIdAndDelete(id);
    const count = await Task.countDocuments( { completed : false   }); 
    return count ; 
}

deleteTaskAndcount('6145808e73e8af6d828dc645').then ( (count) => {
    console.log(count);
}).catch( ( e ) =>{
    console.log(e);
})