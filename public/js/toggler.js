//Task Pending
//  1.  Add a functionality that closes the sidebar when you 
//      click and area outside the sidebar

function toggleSidebar(){
     document.querySelector('.main-menu').classList.toggle('show');
}

//show filter-div when input is given to search-bar
function toggleFilter(){
     const filterDiv = document.querySelector('.filter');
     const filterContainer = document.querySelector('.filter-container')
     if(document.getElementById('search-input').value){
          filterContainer.style.visibility= "visible";
          filterDiv.classList.add('expand-filter');
     }else{
          filterContainer.style.visibility= "hidden";
          filterDiv.classList.remove('expand-filter');   
     }
}