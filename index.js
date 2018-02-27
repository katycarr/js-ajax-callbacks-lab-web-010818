$(document).ready(function (){
  $('#search').on('click',handleClick)
});

function showCommits(el) {


  const url = `https://api.github.com/repos/${el.dataset.owner}/${el.dataset.repository}/commits`

  $.get(url, function(data) {
    console.log(data)
    data.forEach(function(commit) {
      let login;
      if(commit.author) {
        login = commit.author.login
      } else {
        login = ""
      }

      $('#details').append(`<p>${commit.sha}</p>`,`<p>${login}</p>`)
    })

  })

}


function handleClick(event) {
  event.preventDefault();
  searchRepositories()
}

function searchRepositories() {
  let searchTerms = $('#searchTerms').val()
  $('#searchTerms').val('')
  $.get(`https://api.github.com/search/repositories?q=${searchTerms}`, function(data) {
    addToPage(data.items)
  }).fail(displayError)
}

function displayError() {
  $('#errors').append('error')
}

function commitClick(event) {
  const target = event.target

  let el = { dataset: { repository: `${target.dataset.name}`, owner: `${target.dataset.owner}` } }
  showCommits(el)
}


function addToPage(searchResults) {
  console.log(searchResults)
  searchResults.forEach(function(repo) {
    const name = `<h3>${repo.name}</h3>`
    const description = `<p>${repo.description}</p>`
    const url = `<a href='${repo.html_url}'>link</a>`
    const commits = `<br><a href="#" data-name="${repo.name}" data-owner="${repo.owner.login}">show commits</a>`
    let newDiv = $('<div></div>').append(name, description, url, commits)
    $('#results').append(newDiv)
    $(newDiv).find('a')[1].addEventListener('click',commitClick)
    // commits.on('click', showCommits)
  })

}
