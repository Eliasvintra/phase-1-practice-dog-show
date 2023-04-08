
    document.addEventListener('DOMContentLoaded', () => {

        const BASE_URL = `http://localhost:3000/dogs`
        const table_body = document.getElementById('table-body')
        document.addEventListener("click", handle_events)
        const dog_form = document.getElementById('dog-form')
        
        fetch(BASE_URL)
        .then(res => res.json())
        .then(dogs => dogs.forEach(get_dog))
        
        function get_dog(dog){
          //console.log(dog)
          table_body.innerHTML += `<tr data-id=${dog.id}>
                <td>${dog.name}</td> 
                <td>${dog.breed}</td> 
                <td>${dog.sex}</td>
                <td><button id="edit-btn" data-id=${dog.id}>Edit</button></td></tr>`
        }
        
        function handle_events(event){
          event.preventDefault()
          if(e.target.id === "edit-btn"){
            edit_dog(event.target.dataset.id)
          } else if(event.target.parentElement.id === 'dog-form'){
            edited_dog(event)
          }
        }
        
        function edit_dog(id){
          fetch(`${BASE_URL}/${id}`)
          .then(res => res.json())
          .then(dog => {
            dog_form.name.value = dog.name,
            dog_form.sex.value = dog.sex,
            dog_form.breed.value = dog.breed,
            dog_form.dataset.id = dog.id
          })
        
        }
        
        function edited_dog(event){
          let dog = {
            name: event.target.parentElement.name.value,
            sex: event.target.parentElement.sex.value,
            breed: event.target.parentElement.breed.value
          }
        
          fetch(`${BASE_URL}/${e.target.parentElement.dataset.id}`, {
            method: 'PATCH',
            headers: {
              "content-type": 'application/json',
            accepts: 'application/json'
            },
            body: JSON.stringify(dog)
          }).then(res => res.json())
          .then(dog => {
            let found_dog = document.querySelector(`tr[data-id="${dog.id}"]`)
            found_dog.children[0].innerText = dog.name
            found_dog.children[1].innerText = dog.breed
            found_dog.children[2].innerText = dog.sex
          })
        }
         
        
        });