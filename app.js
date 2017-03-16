
const element = document.getElementById('new');
const ls = localStorage
let count=0;

//ls.clear();

element.addEventListener('submit',(e) => {
  e.preventDefault();
  
  let listItem = document.getElementById('newItem').value;

  if( listItem !=='')
  {
  	let newItem = [];
  	newItem.push(listItem);
  	newItem.push('incomplete');

    ls.setItem(count, JSON.stringify(newItem));
    count = count + 1;
    document.getElementById('newItem').value='';
   }

  display();
})


function display () {
   
   const ol = document.querySelector('ol');
   ol.innerHTML="";

   for(let i=0 ; i<ls.length ; i++)
   {
      let key = ls.key(i)
      let item = JSON.parse(ls.getItem(key));

      const li = document.createElement('li');
      li.textContent = item[0];
      li.className = item[1];
      li.setAttribute('id',key);
      li.addEventListener('click', mark)

      const btn = document.createElement('button')
      btn.textContent = "Delete";
      btn.className = "delete";
      btn.setAttribute('id', key);
      btn.addEventListener('click' , remove)

      li.append(btn);
      ol.appendChild(li); 

   }
   
   console.log(ls);
}

function mark() {
	let key = this.getAttribute('id');

 	if(this.className==='complete'){

 		this.className = 'incomplete';
 		let item = JSON.parse(ls.getItem(key));
 		item[1] = 'incomplete';
 		ls.setItem(key,JSON.stringify(item));

 	}
 	else {
 		this.className = 'complete';
 		let item = JSON.parse(ls.getItem(key));
 		item[1] = 'complete';
 		ls.setItem(key,JSON.stringify(item));
 	}
 	console.log(ls);	
 }


function remove(e) {
	e.stopPropagation();
	let item = this.getAttribute('id');
 	this.parentNode.remove();
 	ls.removeItem(item);

 	display();
  }

 display();