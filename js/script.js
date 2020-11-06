'use strict';
const current_level =document.getElementById('current_level');
const current_move = document.getElementById('current_move');
const back_move = document.getElementById('back_move');
const information = document.getElementById('information');
const back_tutorial = document.getElementById('back_tutorial');
const next_tutorial = document.getElementById('next_tutorial');
const max_moves_text = document.getElementById('max_moves_text');
const first_tutorial_show = document.getElementById('first_tutorial_show');
const close_modal = document.getElementById('close_modal');
const notification_modal = document.getElementById('notification_modal');
const notification_message = document.getElementById('notification_message');
const overlay = document.getElementById('overlay');
const pass_modal = document.getElementById('pass_modal');
const back_move_modal = document.getElementById('back_move_modal');
const level_redone = document.getElementById('level_redone');
const modal_buttons = document.getElementById('modal_buttons');
const to_level = document.getElementById('to_level');
let close =document.getElementById('close');
let sequence = [[3,2,1], [1,1,2], [1,3,3]];
let working_sequence = sequence.map(sub => sub.slice());
let gatter_in_action = 'x_gatter';
const quants_cells = document.getElementsByClassName('quants_cells');
let playerGameState = {};
playerGameState.moves = [];
playerGameState.moves.push(working_sequence);
let solution_sequence = [  [[3,2,2], [2,2,2], [1,3,3]], 
 [[3,1,2], [1,2,1], [2,3,3]], [[2,3,3], [1,2,2], [1,3,3]],
 [[2,1,2], [3,1,2], [2,2,2]],  [[3,2,1], [2,3,1], [1,3,2]], 
 [[1,2,1], [1,1,2], [2,2,2]], [[3,2,1], [1,2,1], [1,3,3]], 
 [[1,1,2], [3,1,2], [3,3,3]]
];
let moves =0;
let level = 6;
let max_moves = [2,3,2,3,2,2,2,3];
let available_moves = max_moves[level];
let box, solution;
function arraysEqual(arr1, arr2) {
    for (var i = 0; i < 3; i++) {
    	 for (var j = 0; j < 3; j++) {
        if (arr1[i][j] !== arr2[i][j]){
            return false;
         }

        }  
     }
    return true;

}

function notifyPlayer(message){
    
    notification_message.innerText = message;
    overlay.style.display = 'block'; 
    fadeIn(notification_modal);
// notification_modal.style.display = 'block';

}

let combination = [];
function cellClick(event) {
  if(moves>=available_moves){
  	let message =  'Du hast die maximale Anzahl von Zügen erreicht. Drücke auf "Rückgängig", um einen Zug zurückzuziehen oder starte den Level erneut.';
    modal_buttons.style.display = 'block';
    notifyPlayer(message);
  }
   else{
		let el = event.target || window.event;   
		if(el.classList.contains('quants')){
		  el = event.target.parentNode;
		}
		if(el.classList.contains('active')){

		  el.classList.remove('active');
		}
		else{
		  el.classList.add('active');	
		}
		let index_in_collection = el.getAttribute('id');	
		combination.unshift(index_in_collection);
		let active_line = el.childNodes[0].id.charAt(0);
		let active_quilbit = el.childNodes[0].id.charAt(2);
		if(combination.length>2){
			document.getElementById(combination[2]).classList.remove('active');
			combination.pop();
		}
     }
}

function createPattern(level){
	let table_solution = document.createElement('table'),
		tbody_solution = document.createElement('tbody');
		table_solution.id = 'game_target';					
	table_solution.appendChild(tbody_solution);
	let quant_solution;
	for(let i = 0; i < 3; ++i){
		let row_solution = document.createElement('tr');
		for(let j = 0; j < 3; ++j){
			let cell_solution = document.createElement('td');

				
				let quant_solution = solution_sequence[level][i][j];
				if(quant_solution==1){
                  quant_solution = '<div class="white_quant mini"></div>';
				}
				else if(quant_solution==2){
				  quant_solution = '<div class="black_quant mini"></div>';	
				}
				else{
				quant_solution = '<div class="sup_quant mini"></div>';	
				}
				cell_solution.innerHTML = quant_solution;
				row_solution.appendChild(cell_solution);
		}


		tbody_solution.appendChild(row_solution);					
	}

	if(solution.childNodes.length == 1){

		solution.removeChild(solution.firstChild);	
	}

solution.appendChild(table_solution);
}

function buildGame(array){	
turnOnGatter();
	let table = document.createElement('table'),
		tbody = document.createElement('tbody');	
		table.id = 'game_field';				
	table.appendChild(tbody);
	let quant;
	for(let i = 0; i < 3; ++i){
		let row = document.createElement('tr');
		for(let j = 0; j < 3; ++j){
			let cell = document.createElement('td');
			cell.setAttribute('id' , i + " " + j);
				
				cell.onclick = cellClick;
				let quant = array[i][j];
				if(quant==1){
                  quant = '<div class="quants white_quant"></div>';
				}
				else if(quant==2){
				  quant = '<div class="quants black_quant"></div>';	
				}
				else{
				quant = '<div class="quants sup_quant"></div>';	
				}
				cell.innerHTML = quant;
				row.appendChild(cell);
		}
		tbody.appendChild(row);	
	}
	 if(box.childNodes.length == 1)
		box.removeChild(box.firstChild);	
	box.appendChild(table);	
}

function backMoveRun(){
	if(moves>0){
		--moves;
		back_move.classList.add('active');
		let last = playerGameState.moves.length;
		working_sequence = playerGameState.moves[0];
		buildGame(working_sequence);
		current_move.innerText = moves;
		playerGameState.moves.splice(0, 1);
	}

	if(moves ==0){
		back_move.classList.remove('active');
	}	
}

function closeModal(){
fadeOut(notification_modal);
overlay.style.display = 'none';
modal_buttons.style.display = 'none';
pass_modal.style.display = 'none';
}

// tutorials
let index = 0;
let tutorial = document.querySelectorAll('.tutorial_block1');
let index_length = tutorial.length;


function checkTutorial(){

	console.log(tutorial);

	alert('Уровень ' +  level);
if(level <=1){
	alert("1");
     tutorial = document.querySelectorAll('.tutorial_block1');	
	}
	else if(level < 3){

		alert("2");
      tutorial = document.querySelectorAll('.tutorial_block2');	
	}
	else if(level < 5){

		alert("3");
      tutorial = document.querySelectorAll('.tutorial_block3');		
	}
	else if(level >5){
		alert("4");
      tutorial = document.querySelectorAll('.tutorial_block4');		
	}
}

function cleanTutorial(){
let tutorials = document.querySelectorAll('.tutorial_section');	
for (var i=0; i<tutorials.length; i++){
	 tutorials[i].classList.remove('active');
 }
  tutorial[0].classList.add('active');
  index = 0; 
  next_tutorial.style.display = 'inline-block';
  to_level.style.display = 'none';
  index_length = tutorial.length;
}

information.addEventListener('click', function(){
	fadeIn(tutorial_show);
});


close.addEventListener('click', function(){
   fadeOut(tutorial_show);
});

next_tutorial.addEventListener('click', function(e){
	tutorial[index].classList.remove('active');
	++index;
	if(index == index_length-1){
		index= index_length-1;
		next_tutorial.style.display = 'none';
		to_level.style.display = 'inline-block';
		let to_current = level +1;
		to_level.innerText = 'Zu Level' + to_current +' >';
	}
	else if(index>0){
	    back_tutorial.classList.remove('disabled'); 	        
    }

    else if(index==0){
    	back_tutorial.classList.add('disabled'); 
    }


     tutorial[index].classList.add('active');	
});
back_tutorial.addEventListener('click', function(e){
	tutorial[index].classList.remove('active');
	--index;
	if(index <= 0){
		index= 0;		
	}
	else if(index<index_length-1){
	next_tutorial.classList.remove('disabled');
     
    }

    if(index==0){
      back_tutorial.classList.add('disabled'); 
    }

     tutorial[index].classList.add('active');
});

window.onload = function() {				
	box = document.getElementById('box');
	solution = document.getElementById('solution');
	createPattern(level);
	buildGame(sequence);	
}
close_modal.addEventListener('click', function(e){
closeModal();
 
});

function turnOnGatter(){
const x_gatter = document.getElementById('x_gatter');
const h_gatter1 = document.getElementById('h_gatter1');
const h_gatter2 = document.getElementById('h_gatter2');
const swap_gatter = document.getElementById('swap_gatter');
const snot_gatter = document.getElementById('snot_gatter');
	if(level ==2 || level ==3){
	x_gatter.style.display = 'inline-block';
	h_gatter1.style.display = 'inline-block'; 
	h_gatter2.style.display = 'inline-block'; 
	swap_gatter.style.display = 'none'; 
	snot_gatter.style.display = 'none'; 	
	}
	else if(level ==4){
		x_gatter.style.display = 'inline-block';
		h_gatter1.style.display = 'none'; 
	    h_gatter2.style.display = 'none'; 
		swap_gatter.style.display = 'inline-block'; 
		snot_gatter.style.display = 'none'; 	
	}
    else if(level ==5){
      x_gatter.style.display = 'none';
		h_gatter1.style.display = 'inline-block'; 
		h_gatter1.classList.add('active');
	    h_gatter2.style.display = 'inline-block'; 
		swap_gatter.style.display = 'inline-block'; 
		snot_gatter.style.display = 'none'; 

    }

	else if(level ==6){
		x_gatter.style.display = 'inline-block';
		h_gatter1.style.display = 'none'; 
	    h_gatter2.style.display = 'none'; 
		swap_gatter.style.display = 'none'; 
		snot_gatter.style.display = 'inline-block'; 	
	}
	else if(level ==7){
		x_gatter.style.display = 'inline-block';
		h_gatter1.style.display = 'inline-block'; 
	    h_gatter2.style.display = 'inline-block'; 
		swap_gatter.style.display = 'none'; 
		snot_gatter.style.display = 'inline-block'; 	
	}
}
function resetGameState(){
	 ++moves;
     current_move.innerText = moves; 
     buildGame(working_sequence);    
     combination = [];

     if(moves >0){
		back_move.classList.add('active');
	}	
}
function applyGatter(gatter){
if(combination.length<2){
	let empty_message = 'Du hast nichts gewählt!';

	notifyPlayer(empty_message);
 
return false;
}
let current_state = working_sequence.map(sub => sub.slice());
playerGameState.moves.unshift(current_state);
let manipulation_line;
let manipulation_column;
let active_line1 = combination[0].charAt(0);
let active_column1 = combination[0].charAt(2);
let active_line2 = combination[1].charAt(0);
let active_column2 = combination[1].charAt(2);
	switch (gatter) {
	  case 'x_gatter':

	  console.log(combination);
	if(active_line1 != active_line2 && active_column1 != active_column2 ){
       	let wrong_message = 'Wähle eine Spalte oder eine Zeile!!';
	notifyPlayer(wrong_message);

	}
  else{
	if(active_line1 == active_line2){

	manipulation_line = true;
	manipulation_column = false;
	}

	else if (active_column1== active_column2) {
	manipulation_column = true;
	manipulation_line = false;
	}



      if(manipulation_column){
		   for(let i=0; i<3; i++){ 
		    if(working_sequence[i][active_column1] ==1){
			  working_sequence[i][active_column1] =2; 	
			}
			else if(working_sequence[i][active_column1] ==2){
			working_sequence[i][active_column1] =1;
            }  
         }
       }

   else{
   			alert(active_line1);
	for(let i=0; i<3; i++){
		if(working_sequence[active_line1][i] ==1){
		  working_sequence[active_line1][i] =2; 	
		}
		else if(working_sequence[active_line1][i] ==2){
		  working_sequence[active_line1][i] = 1; 	
		} 
	  }
   }

}



	    break;
	  case 'h_gatter1':
	if(active_line1 != active_line2 && active_column1 != active_column2 ){
	   alert('Пустое3333');	
	}
  else{
	if(active_line1 == active_line2){
	manipulation_line = true;
	manipulation_column = false;
	}

	else if (active_column1== active_column2) {
	manipulation_column = true;
	manipulation_line = false;
	}
	   if(manipulation_column){
		   for(let i=0; i<3; i++){ 
		    if(working_sequence[i][active_column1] ==1){
			  working_sequence[i][active_column1] =3; 	
			}
			else if(working_sequence[i][active_column1] ==3){
			working_sequence[i][active_column1] =2;
            }  
         }
       }

   else{
	for(let i=0; i<3; i++){
		if(working_sequence[active_line1][i] ==1){
		  working_sequence[active_line1][i] =3; 	
		}
		else if(working_sequence[active_line1][i] ==3){
		  working_sequence[active_line1][i] = 2; 	
		} 
	  }
   }
}
	
	    break;
       	  case 'h_gatter2':
	if(active_line1 != active_line2 && active_column1 != active_column2 ){
	   alert('Пустое3333');	
	}
  else{
	if(active_line1 == active_line2){
	manipulation_line = true;
	manipulation_column = false;
	}

	else if (active_column1== active_column2) {
	manipulation_column = true;
	manipulation_line = false;
	}


	            if(manipulation_column){
		   for(let i=0; i<3; i++){ 
		    if(working_sequence[i][active_column1] ==2){
			  working_sequence[i][active_column1] =3; 	
			}
			else if(working_sequence[i][active_column1] ==3){
			working_sequence[i][active_column1] =1;
            }  
         }
       }

   else{
	for(let i=0; i<3; i++){
		if(working_sequence[active_line1][i] ==2){
		  working_sequence[active_line1][i] =3; 	
		}
		else if(working_sequence[active_line1][i] ==3){
		  working_sequence[active_line1][i] = 1; 	
		} 
	  }
   }
}
      break;
	  case 'swap_gatter':
	  let first_swap = working_sequence[active_line1][active_column1];
	  let second_swap  = working_sequence[active_line2][active_column2];

      working_sequence[active_line1][active_column1] = second_swap;
      working_sequence[active_line2][active_column2] = first_swap;
     
	  break;
	    case 'snot_gatter':
 
       console.log(combination);
      let control = working_sequence[active_line2][active_column2];

      alert(control);

      working_sequence[active_line1][active_column1] = control;       
  
	  break;	    
	}

   resetGameState();
  let a =arraysEqual(working_sequence, solution_sequence[level]);
    if(a==true){

      ++level;  
   
          	current_level.innerText = level+1;
    	 moves =0;
         available_moves = max_moves[level];
         current_move.innerText = moves;
         max_moves_text.innerText = available_moves;
         back_move.classList.remove('active');

         createPattern(level);
         buildGame(sequence);



    	if(level ==2 || level ==4 || level==6){
    		
          checkTutorial();
          cleanTutorial();
          fadeIn(tutorial_show);
          
    	}
    	else{
    	let win = 'Glückwunsch! Du hast diesen Level richtig gelöst!';
    	pass_modal.style.display = 'inline_block'; 
        notifyPlayer(win); 




    	}
    	  	
    	


    }


// }

}
let gatterItems = document.querySelectorAll('.game_gatter'),
    index_gatter, single_gatter;
  for (index_gatter = 0; index_gatter < gatterItems.length; index_gatter++) {
    single_gatter = gatterItems[index_gatter];
    let active_gatter;
    single_gatter.addEventListener('click', function (event) {
    	 active_gatter = event.target; 

          if(active_gatter.classList.contains('active')){
          	applyGatter(gatter_in_action);
          }

          else{

       for (let i = 0; i < gatterItems.length; i++) {
          gatterItems[i].classList.remove('active');
       }
       active_gatter.classList.add('active');

       gatter_in_action = active_gatter.getAttribute('id');

        event.preventDefault();

          }
    });
}
// events handlings
back_move.addEventListener('click', function(e){
	backMoveRun();
});
back_move_modal.addEventListener('click', function(e){
	closeModal();	
	backMoveRun();
});
pass_modal.addEventListener('click', function(e){
   closeModal();	
});
level_redone.addEventListener('click', function(e){
    closeModal();
	moves =0;
	available_moves = max_moves[level];
	current_move.innerText = moves;
	max_moves_text.innerText = available_moves;
	createPattern(level);
	buildGame(sequence);
});
to_level.addEventListener('click', function(e){
  fadeOut(tutorial_show);
  checkTutorial();
  cleanTutorial();
  
});



function fadeOut(el) {
  
	var opacity = 1;
  
	var timer = setInterval(function() {
    
		if(opacity <= 0.1) {
		
			clearInterval(timer);
			
	
		}
	
		el.style.opacity = opacity;
     
		opacity -= opacity * 0.1;
   
	}, 10);
el.style.display = 'none';
}


function fadeIn(el) {
  
	var opacity = 0.01 ;

	el.style.opacity = 0;
  
	el.style.display = 'block';
  
	var timer = setInterval(function() {
    
		if(opacity >= 1) {
			
			clearInterval(timer);
		
		}
		
		el.style.opacity = opacity;
     
		opacity += opacity * 0.1;
   
	}, 10);
	
}