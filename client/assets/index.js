
const tacoList = document.getElementById('tacoList');

const tacoDeleter = tacoId => {
  const deleteButton = document.createElement('button');
  deleteButton.id = `delete-${tacoId}`;
  deleteButton.innerHTML = 'DELETE';
  deleteButton.addEventListener('click', e => {
    fetch('/tacos', {
      method: 'DELETE',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({ tacoId })
    })
      .then(success => {
        document.getElementById(`${tacoId}`).remove();
      })
      .catch(err => console.log(err));
  });

  return deleteButton;
}

const tacoUpdater = tacoId => {
  const form = document.createElement('form');
  form.id = `update-form-${tacoId}`;
  const input = document.createElement('input');
  input.id = `update-input-${tacoId}`;
  input.type = 'text';
  const button = document.createElement('button');
  button.id = `update-button-${tacoId}`;
  button.type = 'submit';
  button.innerHTML = 'UPDATE';
  form.addEventListener('submit', e => {
    e.preventDefault();
    e.stopPropagation();

    fetch('/tacos', {
      method: 'PATCH',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({ 
        tacoId,
        ingredient: input.value
      })
    })
      .then(res => res.json())
      .then(taco => {
        document.getElementById(`text-${tacoId}`).innerHTML = `${taco.ingredient} ${taco.create_at}`;
      })
      .catch(err => console.log(err));
    
    input.value = '';
  })

  form.append(input);
  form.append(button);

  return form;
}

const tacoCreator = taco => {
  const ingredient = document.createElement('li');
  ingredient.id = taco._id;
  const text = document.createElement('span');
  text.id = `text-${taco._id}`;
  text.innerHTML = `${taco.ingredient} ${taco.create_at}`
  ingredient.append(text);
  ingredient.append(tacoDeleter(taco._id));
  ingredient.append(tacoUpdater(taco._id));
  tacoList.append(ingredient);
}

// fetch all tacos on load
fetch('/tacos')
  .then(res => res.json())
  .then(({ tacos }) => {
    tacos.forEach(taco => {
      tacoCreator(taco);
    });
  })
  .catch(err => console.log(err));

document.getElementById('tacoForm').addEventListener('submit', e => {
  e.preventDefault();
  e.stopPropagation();
  const ingredient = document.getElementById('newIngredient');
  fetch('/tacos', {
    method: 'POST',
    headers: {
      'Content-type': 'application/json'
    },
    body: JSON.stringify({
      ingredient: ingredient.value,
    })
  })
    .then(res => res.json())
    .then(taco => tacoCreator(taco))
    .catch(err => console.log(err));

  ingredient.value = '';
});



