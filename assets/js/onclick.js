//FILTER LIST ROW CONTENT COPY FEATURE
function addRowEventListener(){
    const searchInput = document.querySelector('#search-input');
    const tableRow = document.querySelectorAll('tr');
    //console.log(tableRow);

    tableRow.forEach( row => {
        row.addEventListener('click', (event) =>{
            console.log(event);
            const td1Text = row.firstElementChild.textContent;
            const td2Text = row.querySelectorAll('td')[1].textContent;
            searchInput.value = `${td1Text} (${td2Text}) `
        })
    });
}