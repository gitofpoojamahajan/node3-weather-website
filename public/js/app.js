console.log('JavaScript from client side')

// fetch('http://puzzle.mead.io/puzzle').then((response)=>{
//     response.json().then((data) => { console.log(data)})
// })

// fetch('http://localhost:3000/weather?address=boston').then((response)=>{
//     response.json().then((data) => { 
//         if(data.error){
//             console.log(data.error)
//         }else{
//             console.log(data)
//         }
//     })
// })

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')

const msgOne = document.querySelector('#msg-1')
const msgTwo = document.querySelector('#msg-2')



weatherForm.addEventListener('submit', (e) => { 
    e.preventDefault()
    const location = search.value

    msgOne.textContent = 'Loading..'
    //console.log(location)
    //console.log('test!!')
    //fetch('http://localhost:3000/weather?address=' + location).then((response)=>{
    
    fetch('/weather?address=' + location).then((response)=>{    
        response.json().then((data) => { 
            if(data.error){
                msgOne.textContent = data.error
            }else{
                msgOne.textContent = data
            }
        })
    })  
})





