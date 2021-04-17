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
  console.log(data);
  let counter = 0;
  data.forEach((element, index) => {

    // длина таблицы
    let countHeadings = document.querySelectorAll('th');
    
    // добавление строки таблицы
    let row = document.createElement('tr');
    row.classList.add('row');
    let table = document.querySelector('.table');
    table.append(row);

    // добавление ячеек в строки
    function cells() {
      for (let i = 0; i < countHeadings.length; i++) {
        let a = document.createElement('td');
        a.classList.add(countHeadings[i].classList);
        if(a.classList == 'name') {
          a.innerHTML = `${element['name']['first']} ${element['name']['last']}`;
          a.classList.add('customer');
        }
        else if (a.classList == 'picture') {
          a.innerHTML = `<img src="${element['picture']['thumbnail']}"</img>}`;
          a.setAttribute('data-tooltip', counter);
          counter++;
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
          let b = Date.parse(element['registered']['date']);
          let registeredDate = new Date(b);
          a.innerHTML = `${registeredDate.getDate()}.${registeredDate.getMonth() + 1}.${registeredDate.getFullYear()}`;
        }
        row.append(a);
      }

    // полоса загрузки
    let loadingBar = document.querySelector('.loading-bar');
    loadingBar.value = 100 / (data.length - index);
    } 
    cells();

    // фильтр
    let filter = document.querySelector('.filter');
    let customers = document.querySelectorAll('.row');
    let button = document.querySelector('.button');
    
    filter.oninput = () => {
      console.log(1);
      if (filter.value) {
        for (let item of customers) {
         if (!(filter.value == item.children[0].innerText)) {
            item.classList.add('hidden');
          }
          else {
            item.classList.remove('hidden');            
          } 
        }
      } 
      else  {
        for (let item of customers) {
          item.classList.remove('hidden');
        }
      }
    }

    button.onclick = () => {
      filter.value = '';
      for (let item of customers) {
          item.classList.remove('hidden');
      }
    }

    // тултип
    let tooltip = document.querySelector('.tooltip');
    let customersImage = document.querySelectorAll('.picture');
    for (let item of customersImage) {
      item.onmousemove = () => {
        tooltip.classList.remove('hidden');
        tooltip.innerHTML = `<img src="${data[item.getAttribute('data-tooltip')]['picture']['large']}"</img>}`;
      }
      item.onmouseleave = () => {
        tooltip.classList.add('hidden');
      }
    }
  })
  

}

getDataCustomer();

