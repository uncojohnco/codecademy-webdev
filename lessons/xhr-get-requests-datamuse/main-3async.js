// Information to reach API
const url = 'https://api.datamuse.com/words?';
const queryParams = 'rel_rhy=';


// Selecting page elements
const inputField = document.querySelector('#input');
const submit = document.querySelector('#submit');
const responseField = document.querySelector('#responseField');

// AJAX function
const getData = async (url) => {

  const response = await fetch(url, { cache: "no-cache" })

  if (!response.ok) {
    throw new Error("Request failed!");
  }

  console.log(response);
  return await response.json();
};


// Clear previous results and display results to webpage
const displaySuggestions = async (event) => {

  event.preventDefault();

  while(responseField.firstChild){
    responseField.removeChild(responseField.firstChild);
  };
  
  const wordQuery = inputField.value;
  const endpoint = url + queryParams + wordQuery;

  try {
    const data = await getData(endpoint);
    renderResponse(responseField, data);
  }
  catch(error) {
    console.log(error);
  }

};

submit.addEventListener('click', displaySuggestions);
