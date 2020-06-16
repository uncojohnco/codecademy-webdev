

// Formats response to look presentable on webpage

// interface Data {
//   word: string;
//   score: number;
//   numSyllables: number;
// }


const templateSource = `
<p>You might be interested in:</p>
<ol>
  {{#each words}}
  <li>{{this}}</li>
  {{/each}}
</ol>
`;


const renderResponse = (ele, res) => {
    // Handles if res is falsey
    if(!res){
      console.log(res.status);
    }
    // In case res comes back as a blank array
    if(!res.length){
      ele.innerHTML = "<p>Try again!</p><p>There were no suggestions found!</p>";
      return;
    }

    const headLimit = Math.min(res.length, 10);
    const wordList = res.slice(0, headLimit).map(e => e.word)

    const context = {
      words: wordList
    };
   
    // Manipulates responseField to render the modified response
    const template = Handlebars.compile(templateSource);
    ele.innerHTML = template(context);
    return
  }


  // Renders response before it is modified
  const renderRawResponse = (ele, res) => {
    // Takes the first 10 words from res
    let trimmedResponse = res.slice(0, 10);
    // Manipulates responseField to render the unformatted response
    ele.innerHTML = `<text>${JSON.stringify(trimmedResponse)}</text>`;
  }
