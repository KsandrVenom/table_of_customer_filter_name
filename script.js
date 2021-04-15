function getDataCustomer() {
  fetch('https://randomuser.me/api/?results=15')
  .then(data => {
    return data.text();
  })
  .then(data => {
    return JSON.parse(data);
  })
  .then(data => {
    console.log(data.results);
    return createTable(data.results);
  })
}

function createTable(data) {
  let loadingBar = document.querySelector('.loading-bar');
  
  data.forEach(element => {
    // длина таблицы
    let countHeadings = document.querySelectorAll('th');
    
    // добавление строки таблицы
    let row = document.createElement('tr');
    let table = document.querySelector('.table');
    table.append(row);

    // добавление ячеек в строки
    function cells() {
      for (let i = 0; i < countHeadings.length; i++) {
        let a = document.createElement('td');
        a.classList.add(countHeadings[i].classList);
        if(a.classList == 'name') {
          a.innerHTML = `${data[i]['name']['first']} ${data[i]['name']['last']}`;
        }
        else if (a.classList == 'picture') {
          a.innerHTML = `<img src="${data[i]['picture']['thumbnail']}"</img>}`;
        }
        else if (a.classList == 'location') {
          a.innerHTML = `${data[i]['location']['state']} ${data[i]['location']['city']}`;
        }
        else if (a.classList == 'email') {
          a.innerHTML = `${data[i]['email']}`;
        }
        else if (a.classList == 'phone') {
          a.innerHTML = `${data[i]['phone']}`;
        }else if (a.classList == 'registered-date') {
          a.innerHTML = `${data[i]['name']['first']} ${data[i]['name']['last']}`;
        }

        row.append(a);
      }
    }
    cells();

  })
}

getDataCustomer();
