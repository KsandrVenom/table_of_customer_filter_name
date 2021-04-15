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
  data.forEach((element, index) => {

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
          a.innerHTML = `${element['name']['first']} ${element['name']['last']}`;
        }
        else if (a.classList == 'picture') {
          a.innerHTML = `<img src="${element['picture']['thumbnail']}"</img>}`;
        }
        else if (a.classList == 'location') {
          a.innerHTML = `${element['location']['state']} ${element['location']['city']}`;
        }
        else if (a.classList == 'email') {
          a.innerHTML = `${element['email']}`;
        }
        else if (a.classList == 'phone') {
          a.innerHTML = `${element['phone']}`;
        }
        else if (a.classList == 'registered-date') {
          a.innerHTML = `${element['name']['first']} ${element['name']['last']}`;
        }
        row.append(a);
      }

    // полоса загрузки
    let loadingBar = document.querySelector('.loading-bar');
    loadingBar.value = 100 / (data.length - index);
    } 

    cells();
  })
}

getDataCustomer();
