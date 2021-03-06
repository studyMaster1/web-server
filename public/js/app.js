const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

weatherForm.addEventListener('submit', (event) =>{
    event.preventDefault()

    const address = search.value
    const url = '/weather?address=' + address

    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''

    fetchUrl(url)
})

const fetchUrl = (url) =>{
    fetch(url).then((response) =>{
        response.json().then((data) =>{
            if(data.error){
                messageOne.textContent = data.error            
            }
            else{
                messageOne.textContent = 'location: ' + data.location
                messageTwo.textContent = 'forcast: ' + data.forcast
            }
        })
    })
}