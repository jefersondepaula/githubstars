const sel = (e) => document.querySelector(e);
const selAll = (e) => document.querySelectorAll(e);
let runRepo = 0;

// Fetch repositories onload
window.onload = topRepositories();

// Disable enter button
document.addEventListener('keypress', function (e) {
    if (e.keyCode === 13 || e.which === 13) {
        e.preventDefault();
        return false;
    }
});

// Apply title based on menu click
selAll('.nav-link').forEach((e) => {
   e.addEventListener('click', function (e){

      // Get link clicked title
      let title = e.target.innerText;

      selAll('.most-starred-option').forEach((e) => {
         e.innerHTML = title;
      });
   });
});

// Get a user from API and populate the table
function getUser() {
   let name = sel('#name').value;
   fetch('../githubstars/api/github.php?name='+name)
       .then(response => response.json())
       .then(response => {
          if (response != 'user not found') {
              runRepo = 0;
              sel('#col-name').innerHTML = 'Repositories';

              selAll('.username-table').forEach(e => e.remove());
              selAll('.repos-table').forEach(e => e.remove());

              response.map((element, index) => {

                  let table = sel('.table-row').cloneNode(true);
                  table.classList.remove('d-none');
                  table.classList.add('repos-table');
                  table.querySelector('th').innerHTML = ++index;
                  table.querySelector('#table-username p').innerHTML = element.name;
                  table.querySelector('#table-username img').setAttribute('src', element.owner.avatar_url);
                  table.querySelector('#table-stars').innerHTML = element.stargazers_count;
                  table.querySelector('#table-link a').innerHTML = element.html_url;
                  table.querySelector('#table-link a').setAttribute('href', element.html_url);

                  sel('tbody').append(table);
              });
          } else {
              alert('user not found');
          }
   });
}

// Get most starred repositories from API
function topRepositories() {
    if (runRepo <= 0) {
        sel('#col-name').innerHTML = 'Username';
        fetch('../githubstars/api/github.php')
            .then(response => response.json())
            .then(response => {

                selAll('.repos-table').forEach(e => e.remove());

                response.map((element, index) => {
                    let table = sel('.table-row').cloneNode(true);
                    table.classList.remove('d-none');
                    table.classList.add('username-table');
                    table.querySelector('th').innerHTML = ++index;
                    table.querySelector('#table-username p').innerHTML = element.name;
                    table.querySelector('#table-username img').setAttribute('src', element.avatar)
                    table.querySelector('#table-stars').innerHTML = element.stars;
                    table.querySelector('#table-link a').innerHTML = element.link;
                    table.querySelector('#table-link a').setAttribute('href', element.link);

                    sel('tbody').append(table);
            });
        });
    }
    runRepo++;
}





