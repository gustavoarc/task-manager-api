//Realizar CRUD
/*
const { ClientRequest } = require('http');
const mongodb  = require('mongodb');
const MongoClient = mongodb.MongoClient; 
const ObjectId = mongodb.ObjectId;
*/

const {  MongoClient , ObjectId } = require('mongodb');

const conectionURL  = 'mongodb://127.0.0.1:27017';
const databaseName = 'task-manager'; 
/*
const id = new ObjectId();
console.log(id.id);
*/
MongoClient.connect( conectionURL , { useNewUrlParser : true  } , (error , client )=>{

    if (error){
        return console.log('Unable to connect to dababase');
    }

    const db = client.db(databaseName);

    db.collection('tasks').deleteOne({
        description: "Lavar"
    
    }).then ((result)=>{
            console.log(result);
    }).catch((error )=>{
        console.log(error);
    })

    /*
    db.collection('users').deleteMany({
        age : 37
    
    }).then ((result)=>{
            console.log(result);
    }).catch((error )=>{
        console.log(error);
    })
*/


/*
    db.collection('tasks').updateMany({
        completed : true  
    }, {
        $set :{
            completed: false  
        }
    }).then ((result)=>{
            console.log(result.modifiedCount);
    }).catch((error )=>{
        console.log(error);
    })
*/


/*
    const updatePromise = db.collection('users').updateOne({
        _id: new ObjectId("61457ebfbbc0248aafed324c")
    },{
        $set:{
            name:'Pruebas'
        }
    })

    updatePromise.then((result)=>{
            console.log (result)
    }).catch( (error)=>{
        console.log(error);
    })
*/

/*
    db.collection('tasks').findOne({ _id: new ObjectId("6145808e73e8af6d828dc646") },  (error, tasks)=>{
        console.log(tasks);
    })
    db.collection('tasks').find({ completed : false  }).toArray( (error, tasks)=>{
        console.log(tasks);
    })
 
*/
    /*db.collection('users').findOne({name: 'Sebas'}, (error , user )=>{
        if (error){
            return console.log('Unable to fetch')
        }
        console.log(user);
    })*/

   /* db.collection('users').find({ age: 9 }).toArray( (error, user)=>{
        console.log(user);
    })

    db.collection('users').find({ age: 9 }).count( (error, count )=>{
        console.log(count );
    })*/



    /*
   const db = client.db(databaseName);
 
   db.collection('users').insertOne({
       _id : id,
       name: 'Sebas',
       age: 9
   }, ( error , result )=>{
       if ( error   ){
           return console.log('Unable to insert user ')
       }

       console.log(result);
   })
 */
/*
db.collection('users').insertMany([
    {
        name: 'Mary', 
        age : 37
    },{
        name : 'Sebastian', 
        age: 9
    }
],(error, result)=>{
    if (error){
        return console.log('Ubable to insert documents!');
    }
    console.log(result.ops);

})
*/
/*
db.collection('tasks').insertMany([
    {
        description: 'Lavar', 
        completed : true
    },{
        description : 'Limpiar', 
        completed: true
    },{
        description : 'Regar las matas', 
        completed: false
    }
],(error, result)=>{
    if (error){
        return console.log('Ubable to insert documents!');
    }
    console.log(result.ops);

})

*/
} )

