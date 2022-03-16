const generateMessage=(text)=>{
    return {
        text,
        createdAt:new Date().getTime()
    }
}
const generateLocationMessage=(position)=>{

    return{location:`https://google.com/maps?q=${position.lat},${position.long}`,
            createdAt:new Date().getTime()

}


}

module.exports={
    generateMessage,
    generateLocationMessage
}