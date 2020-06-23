//generate filter table from the data retrieved from https://api.covid19api.com/countries
    
let countryArray = [];

catchCountryData()
    .then(() => console.log('Data fetched successfully!'))
    .catch(error => {
        console.log('error!');
        console.error(error)
    });

async function catchCountryData(){//refer https://www.youtube.com/watch?v=tc8DU14qX6I&list=PLRqwX-V7Uu6YxDKpFzf_2D84p0cyk4T7X&index=3 to understand basics
    const countryUrl = "https://api.covid19api.com/countries";
    const response = await fetch(countryUrl);
    countryArray = await response.json();
    //console.log(countryArray);
    generateFilterTable(countryArray);
    sortTableByColumn(document.querySelector('table'), 0, true);
}

function generateFilterTable(countryArray){
    const filterTable = document.querySelector('.filter-table');

    countryArray.forEach(Object => {
        let tr = document.createElement('tr');

        let td1 = document.createElement('td');
        td1.textContent = Object.Country;

        let td2 = document.createElement('td');
        td2.textContent = Object.ISO2;

        tr.appendChild(td1);
        tr.appendChild(td2);

        filterTable.appendChild(tr);
    });
}

//now time to make th sorting function (by Country name) for the table 
function sortTableByColumn(table, column, asc = true) {
    const dirModifier = asc ? 1 : -1;//this determines if the array is to be sorted in ascending or descending order
    const rows = Array.from(table.querySelectorAll("tr")); //store all TRs in rows array

    // Store the rows in a sorted manner in sortedRows
        //<tr>
        //    <td>Albania</td> ////aCol
        //    <td>AL</td>
        //</tr>
        //<tr>
        //    <td>India</td> ////bCol
        //    <td>IN</td>
        //</tr>
    const sortedRows = rows.sort((aRow, bRow) => {
        const aRowColText = aRow.querySelector(`td:nth-child(${ column + 1 })`).textContent.trim();//The trim() method returns the string stripped of whitespace from both ends. this is not required but still it is done to prevent potential errors
        //column  + 1 is done. its because we want to select the {column+1)th-child of the <td>s inside <tr>. child counting starts from 1, thats why we did column+1
        const bRowColText = bRow.querySelector(`td:nth-child(${ column + 1 })`).textContent.trim();

        return aRowColText > bRowColText ? (1 * dirModifier) : (-1 * dirModifier);
        // Understand the above statement.
        //      every sorting method has a comparator function that is meant to compare only two values
        //      That comparator function returns a boolean value for each comparison. based on the boolean value returned the sort function sorts the array (in asc or desc order)
        //      Likewise here "return aRowColText > bRowColText ? (1 * dirModifier) : (-1 * dirModifier);" is the one that returns boolean value
        //      
        //  if dirModifier is 1 ( set for ascending order sorting)
        //      then "return aRowColText > bRowColText ? (1 * dirModifier) : (-1 * dirModifier);"
        //      can be written as "return aRowColText > bRowColText ? (1) : (-1);" 
        //      i.e if aRowColText > bRowColText is true then return 1 to thw comparator else return false
        //      here the comparator is the anonymous arrow function that is passed to sort function.
        //
        //  likewise understand the case for dirModifier = -1 ( set for descending order sorting)
    });
    //console.log(sortedRows);

    // Remove all existing TRs from the table (because the are unsorted and useless for us. We have all of these stored in array sortedRows)
    while (table.firstChild) {
        table.removeChild(table.firstChild);
    }

    // Re-add the newly sorted rows that are stored in sortedRows array
    table.append(...sortedRows);
}


//FILTER-LIST FUNCTION
function filterList(){
    const searchInput = document.querySelector('#search-input').value.toLowerCase();

    const Rows = document.querySelectorAll('tr');

    Rows.forEach((tr, index) => {
        const td1Text = tr.querySelectorAll('td')[0].textContent.toLowerCase();
        const td2Text = tr.querySelectorAll('td')[1].textContent.toLowerCase();

        if(td1Text.indexOf(searchInput) > -1 || td2Text.indexOf(searchInput) > -1){//if searchInput string is found in td1Text then in indexOf() returns some positive value else it returns -1
            tr.style.display = "";
        }
        else{
            tr.style.display = "none";
        }
    });

}