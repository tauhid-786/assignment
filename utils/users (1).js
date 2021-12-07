const users = []

const userjs = ()=>{
    return users
}

const addUser = ({id, username}) => {
    const existingUser = users.find((user) => {
        return user.name === username
    })

    //validate username
    if(existingUser){
        return {
            error:'Username is in use.'
        }
    }
    //store user
    const user = {id, username}
    users.push(user)
    return {user}
}

const removeUser = (id) => {
    const index = users.findIndex((user)=>{
        return user.id === id
    })

    if(index !== -1){
        return users.splice(index,1)[0]
    }
}

const getUser = (name) => {
    return users.find((user) => {
        return user.username === name
    })
}

module.exports = {
    userjs,
    addUser,
    removeUser,
    getUser
}