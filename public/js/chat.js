
const socket=io()

const $messageForm=document.querySelector('form')
const $messageInput=$messageForm.querySelector('input')
const $messageButton=$messageForm.querySelector('button')
const $sendLocation=document.querySelector('#send-location')

const $renderedMessages=document.getElementById('rendered-message')
const $locationMessage=document.getElementById('location-message')
const messageTemplate=document.querySelector('#message-template').innerHTML
const locationTemplate=document.querySelector('#location-template').innerHTML

// socket.on("countUpdated",(count)=>{
//     console.log("pasa amar lal "+count)

// })

// document.querySelector('#increment').addEventListener('click',()=>{
//     socket.emit("increment")
// })


socket.on("Message",(message)=>{
    
    console.log(message)
    const html=Mustache.render(messageTemplate,{message:message.text,createdAt:moment(message.createdAt).format('h:mm:A')})
    $renderedMessages.insertAdjacentHTML('beforeend',html)
})

socket.on('location-message',(location )=>{
    console.log(message)
    const html=Mustache.render(locationTemplate,{location:location.location,createdAt:moment (location.createdAt).format('h:mm:A')})
    $locationMessage.insertAdjacentHTML('beforeend',html)
})




$messageForm.addEventListener("submit",(e)=>{
        e.preventDefault();
        $messageButton.setAttribute('disabled','disabled')
       

    
        const message=e.target.message.value
        $messageInput.value=''
        socket.emit('sentMessage',message,(value)=>{
            $messageButton.removeAttribute('disabled')
            console.log("message was delivered "+value)
           
            $messageInput.focus()
        })
    
    })

    $sendLocation.addEventListener('click',()=>{
        if(!navigator.geolocation){
            return alert('your browser do not support navigator')
        }
        $sendLocation.setAttribute('disabled','disabled')

        navigator.geolocation.getCurrentPosition((position)=>{
            socket.emit('sendLocation',
            {'long':position.coords.longitude,
            'lat':position.coords.latitude
            },()=>{
                console.log("location shared")
                $sendLocation.removeAttribute('disabled')
            })
        })
    })

   


