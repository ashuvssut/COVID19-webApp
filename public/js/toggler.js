//Task Pending
//  1.  Add a functionality that closes the sidebar when you 
//      click and area outside the sidebar

function toggleSidebar(){
     document.querySelector('.main-menu').classList.toggle('show');
}

//toggle filter-div (when input is given to search-bar and when searchButton submit event happens)
const filterDiv = document.querySelector('.filter');
const filterContainer = document.querySelector('.filter-container')

function toggleFilter(){
     
     if(document.getElementById('search-input').value){
          filterContainer.style.visibility= "visible";
          filterDiv.classList.add('expand-filter');
     }else{
          filterContainer.style.visibility= "hidden";
          filterDiv.classList.remove('expand-filter');   
     }

}
//shrink when successful form submission happens
document.querySelector('.search-form').addEventListener('submit', event => {
     event.preventDefault();
     filterContainer.style.visibility= "hidden";
     filterDiv.classList.remove('expand-filter');       
});