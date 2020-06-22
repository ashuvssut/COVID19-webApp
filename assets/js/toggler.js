//Task Pending
//  1.  Add a functionality that closes the sidebar when you 
//      click and area outside the sidebar

function toggleSidebar(){
     document.querySelector('.main-menu').classList.toggle('show');
}

//show filter-div when input is given to search-bar
function toggleFilter(){
     const filterDiv = document.querySelector('.search-filter');
     if(document.getElementById('search-input').value){
          filterDiv.classList.add('expand-filter')
     }else{
          filterDiv.classList.remove('expand-filter')      
     }
}