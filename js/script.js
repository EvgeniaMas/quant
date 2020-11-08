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
const game_field = document.getElementById('game_field');
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
let level = 0;
let max_moves = [2,3,2,3,2,2,2,3];
let available_moves = max_moves[level];
let box, solution;
// check if level solved;
function solvedLevel(arr1, arr2) {
    for (var i = 0; i < 3; i++) {
    	 for (var j = 0; j < 3; j++) {
        if (arr1[i][j] !== arr2[i][j]){
            return false;
         }

        }  
     }
    return true;
}
// notifications (error, solved)
function notifyPlayer(message){    
    notification_message.innerHTML= message;
    overlay.style.display = 'block'; 
    fadeIn(notification_modal);
}
// hide, show methods of elements
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
// click on game board handlings
let combination = [];
function overMoves(){
  	let message =  '<p class="tutorial_text"> Du hast die maximale Anzahl von Zügen erreicht. Drücke auf "Rückgängig", um einen Zug zurückzuziehen oder starte den Level erneut.</p>';
    modal_buttons.style.display = 'block';
    pass_modal.style.display = 'none';
    notifyPlayer(message);	
}
function cellClick(event) {
  if(moves>=available_moves){
    overMoves();
  }
   else{
		let el = event.target || window.event;   
		if(el.classList.contains('quants')){
		  el = event.target.parentNode;
		}
		if(el.classList.contains('active')){
		  el.classList.remove('active');		 
		  let id = el.getAttribute('id');
		  if(combination.length>1){
		  	
		  	let aсtive_index = combination.indexOf(id);
        
             if(aсtive_index){
		  	  combination.splice(active_index, 1); }
		  }
		  else{
	
		  	combination = [];
		  }    
	
		}
		else{
		  el.classList.add('active');		
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
}
// creat a targert sequence
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
// create a game field
function buildGame(array){
	let table = document.createElement('table'),
		tbody = document.createElement('tbody');	
		table.id = 'game_field';				
	table.appendChild(tbody);
	let quant;
	for(let i = 0; i < 3; ++i){
		let row = document.createElement('tr');
		for(let j = 0; j < 3; ++j){
			let cell = document.createElement('td');
			cell.classList.add('quibits_container');
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
	let quibits_containers = document.querySelectorAll('.quibits_container');
     quibits_containers.forEach(quib_container => {
        quib_container.addEventListener('touchstart', touchStart);
        quib_container.addEventListener('touchmove',touchMove);
        quib_container.addEventListener('touchend', touchEnd);
      });
}
// back move handlings
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
// close game modals
function closeModal(){
fadeOut(notification_modal);
overlay.style.display = 'none';
}
// gates
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

    let game_gatters = document.querySelectorAll('.game_gatter');
	if(game_gatters.length>1){
		for(let a=0; a<game_gatters.length; a++){
			game_gatters[a].classList.remove('active');
		}
	}
   game_gatters[0].classList.add('active');
   gatter_in_action = game_gatters[0].getAttribute('id');

}
function resetGameState(){
	if(moves<available_moves){
	 ++moves;
     current_move.innerText = moves; 
     buildGame(working_sequence);    
     combination = [];
     if(moves >0){
		back_move.classList.add('active');
	}	
 }
}
function applyGatter(gatter){
if(combination.length==0){
	let empty_message = '<p class="tutorial_text">Du hast nichts gewählt!</p>';

	notifyPlayer(empty_message);
	 modal_buttons.style.display = 'none';
    pass_modal.style.display = 'inline-block'; 
    return false;
   }

   else if(combination.length<2){
      let errors_committed;
   	if(gatter_in_action=='swap_gatter' || gatter_in_action == 'snot_gatter'){
   		errors_committed = '<p class="tutorial_text">Wähle zwei Qubits!</p>';
   	}

   	else{
   	errors_committed = '<p class="tutorial_text">Wähle eine Zeile oder eine Spalte!</p>';
   	} 		

	notifyPlayer(errors_committed);
	 modal_buttons.style.display = 'none';
    pass_modal.style.display = 'inline-block'; 
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
	if(active_line1 != active_line2 && active_column1 != active_column2 ){
       	let wrong_message = '<p class="tutorial_text"> Wähle eine Spalte oder eine Zeile!</P>';
	notifyPlayer(wrong_message);
	 modal_buttons.style.display = 'none';
    pass_modal.style.display = 'inline-block';
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
	      applyVerticalGatter(); 
	       }
	       else{
		    applyHorizontalGatter(); 
	 }   
   }
	    break;
	  case 'h_gatter1':

   if(active_line1 != active_line2 && active_column1 != active_column2 ){
	let wrong_message = '<p class="tutorial_text">Wähle eine Spalte oder eine Zeile!</p>';
	notifyPlayer(wrong_message);
	 modal_buttons.style.display = 'none';
    pass_modal.style.display = 'inline-block';
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
	        applyVerticalGatter(); 
	       }
	       else{
		    applyHorizontalGatter(); 
	}  }

      break;
    	case 'h_gatter2':
   if(active_line1 != active_line2 && active_column1 != active_column2 ){
    let wrong_message = '<p class="tutorial_text">Wähle eine Spalte oder eine Zeile!</p>';
	notifyPlayer(wrong_message);
		 modal_buttons.style.display = 'none';
    pass_modal.style.display = 'inline-block';
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
	        applyVerticalGatter(); 
	       }
	       else{
		    applyHorizontalGatter(); 
	        }
      }
	
	    break;

       case 'swap_gatter':
		  swapGatter();
		
  
	  break;
	    case 'snot_gatter':
	      snotGatter();
	    
	   break;

    
	}
   // checkUpSequence();
}
// swap, snot gates
function swapGatter(){
	let active_line1 = combination[0].charAt(0);
	let active_column1 = combination[0].charAt(2);
	let active_line2 = combination[1].charAt(0);
	let active_column2 = combination[1].charAt(2);
	let first_swap = working_sequence[active_line1][active_column1];
	let second_swap  = working_sequence[active_line2][active_column2];
	working_sequence[active_line1][active_column1] = second_swap;
	working_sequence[active_line2][active_column2] = first_swap;
   checkUpSequence();

}
function snotGatter(){
	let active_line1 = combination[0].charAt(0);
	let active_column1 = combination[0].charAt(2);
	let active_line2 = combination[1].charAt(0);
	let active_column2 = combination[1].charAt(2);
	let control = working_sequence[active_line2][active_column2];
	working_sequence[active_line1][active_column1] = control; 
	checkUpSequence();
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

       if(combination.length==2){
               	if(gatter_in_action== 'swap_gatter'){
             		swapGatter();
             	}
             	else if(gatter_in_action == 'snot_gatter'){
             		snotGatter();
             	}


            else if(combination.length==1){
           	let two_message = '<p class="tutorial_text"> Wähle zwei Qubits!</p>'
             	notifyPlayer(two_message);
	            modal_buttons.style.display = 'none';
                pass_modal.style.display = 'inline-block';
                document.getElementById(combination[0]).classList.remove('active');
                combination = [];
             }
           }





        event.preventDefault();

          }
    });
}
// tutorials
let index = 0;
let tutorial = document.querySelectorAll('.tutorial_block1');
let index_length = tutorial.length;
function checkTutorial(){
if(level <=1){
     tutorial = document.querySelectorAll('.tutorial_block1');	
	}
	else if(level < 3){
      tutorial = document.querySelectorAll('.tutorial_block2');	
	}
	else if(level < 5){
      tutorial = document.querySelectorAll('.tutorial_block3');		
	}
	else if(level >5){
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
// checkups changes
function checkUpSequence(){
 resetGameState();
    let a =solvedLevel(working_sequence, solution_sequence[level]);
    if(a==true){
      ++level; 
      if(level==8){
      	const finish = document.getElementById('finish'); 
        finish.style.display = 'block';
          return; 

      }
         working_sequence = sequence.map(sub => sub.slice());  
         turnOnGatter(); 
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
          back_tutorial.classList.add('disabled');
          fadeIn(tutorial_show);          
    	}
    	else{    			    
    	let win = '<p class="tutorial_title_text">Glückwunsch!</p><p class="tutorial_text">Du hast diesen Level richtig gelöst!</p>';    	
        notifyPlayer(win);
        modal_buttons.style.display = 'none';
    	pass_modal.style.display = 'inline_block';  
    	}	
    }	
}
function applyHorizontalGatter(){
   let active_line = combination[0].charAt(0);
   let active_column = combination[0].charAt(2);
   switch (gatter_in_action) {
	  case 'x_gatter':	
	for(let i=0; i<3; i++){
		if(working_sequence[active_line][i] ==1){
		  working_sequence[active_line][i] =2; 	
		}
		else if(working_sequence[active_line][i] ==2){
		  working_sequence[active_line][i] = 1; 	
		} 
	}
    break;
	  case 'h_gatter1':   
	for(let i=0; i<3; i++){
		if(working_sequence[active_line][i] ==1){
		  working_sequence[active_line][i] =3; 	
		}
		else if(working_sequence[active_line][i] ==3){
		  working_sequence[active_line][i] = 1; 	
		} 
	  }
      break;
    	case 'h_gatter2':   
	for(let i=0; i<3; i++){	 		 
		if(working_sequence[active_line][i] ==1 ){	
		  working_sequence[active_line][i] = 3;
		}
		else if(working_sequence[active_line][i] ==3){		
		  working_sequence[active_line][i] = 2; 		  
		}
	}
	
	  break;
    
	}
   checkUpSequence();   
}

function applyVerticalGatter(){
   let active_line = combination[0].charAt(0);
   let active_column = combination[0].charAt(2);

    switch (gatter_in_action) {
	  case 'x_gatter':	

		   for(let i=0; i<3; i++){ 
		    if(working_sequence[i][active_column] ==1){
			  working_sequence[i][active_column] =2; 	
			}
			else if(working_sequence[i][active_column] ==2){
			working_sequence[i][active_column] =1;
            }  
         }

	    break;
	  case 'h_gatter1':

   		   for(let i=0; i<3; i++){ 
		    if(working_sequence[i][active_column] ==1){
			  working_sequence[i][active_column] =3; 	
			}
			else if(working_sequence[i][active_column] ==3){
			working_sequence[i][active_column] =1;
            }  
         }
      break;
    	case 'h_gatter2':  
		   for(let i=0; i<3; i++){ 
		    if(working_sequence[i][active_column] ==1 ){
			  working_sequence[i][active_column] =3; 	
			}
			else if(working_sequence[i][active_column] ==3){
			working_sequence[i][active_column] =2;
            } 
         }       
    
	}
   checkUpSequence();   
}
// events handlings
window.onload = function() {				
	box = document.getElementById('box');
	solution = document.getElementById('solution');
	createPattern(level);
	buildGame(sequence);
}
information.addEventListener('click', function(){
cleanTutorial();

	next_tutorial.style.display = 'inline-block';
	to_level.style.dist_horizontal = 'none';
	back_tutorial.classList.add('disabled');

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

		if(index>0){
		back_tutorial.classList.remove('disabled'); 		
		}
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
	next_tutorial.style.display = 'inline-block';
	to_level.style.display = 'none';
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
close_modal.addEventListener('click', function(e){
   closeModal();
});

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
	back_move.classList.remove('active');
	working_sequence = sequence.map(sub => sub.slice());
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
// touch events handlinhgs
let quibit_startx;
let quibit_starty;
let initial_id;
let initial;
let el;
function touchStart(e){
  if(moves>=available_moves){
    overMoves();
    return;
  }
  else{
	let touchobj = e.changedTouches[0];
	e.preventDefault();
    quibit_startx = parseInt(touchobj.clientX);
    quibit_starty = parseInt(touchobj.clientY);
	el = e.target || window.event;   
	if(el.classList.contains('quants')){
	   initial = e.target.parentNode;
	}
	else{
	   initial = e.target;
	}
	initial_id =initial.getAttribute('id'); 	
  }
}  
function touchMove(e){
    e.preventDefault();
}
function handleLine(active_line){

for(let i=0; i<3; i++){
  	  let id = active_line + ' ' + i; 

      document.getElementById(id).classList.add('active');
      combination.unshift(id); 
    }
    setTimeout('applyHorizontalGatter()', 1000);  	
}
function handleColumn(active_column){
for(let i=0; i<3; i++){                
       let id = i + ' ' + active_column;
        combination.unshift(id);
        document.getElementById(id).classList.add('active');
      } 
      setTimeout('applyVerticalGatter()', 1000); 	
}
function touchEnd(e){
  if(moves>=available_moves){

    return;
  }
else{
let touchobj = e.changedTouches[0];
let dist_horizontal = parseInt(touchobj.clientX);
let dist_vertical = parseInt(touchobj.clientY);
let active_line = initial_id.charAt(0);
let active_column = initial_id.charAt(2);
let current_state = working_sequence.map(sub => sub.slice());
playerGameState.moves.unshift(current_state);

  if(Math.abs(dist_horizontal-quibit_startx) <30 ){

  	if(initial.classList.contains('active')){
		  initial.classList.remove('active');		 
		  let id_index = initial.getAttribute('id');
				  if(combination.length>1){	
				  	let active_index = combination.indexOf(id_index);
				  	  combination.splice(active_index, 1);			  	   
				  	  }
					  else{		
					  	combination = [];
					  }      	
		           }
		else{

			if(combination.length<2){			
  	         initial.classList.add('active');	
  	          combination.unshift(initial_id);

  	        if(combination.length==2){
               	if(gatter_in_action== 'swap_gatter'){
             		swapGatter();
             	}
             	else if(gatter_in_action == 'snot_gatter'){
             		snotGatter();
             	}
           }




             return;
             }


      


         else{
		    let message =  '<p class="tutorial_text"> Wähle eine Zeile, eine Spalte oder nicht mehr als zwei Qubits!</p>';
		    modal_buttons.style.display = 'none';
		    pass_modal.style.display = 'inline-block';
		    notifyPlayer(message);

		    for(let i=0; i<combination.length; i++){
		    	document.getElementById(combination[i].classList.remove('active'));
		    }

		    combination = [];		
         }
  	
       }
   }



 else{

		if(dist_horizontal<=quibit_startx && dist_vertical <=quibit_starty){
		handleLine(active_line); 
		}
		else if(dist_horizontal>=quibit_startx && dist_vertical >= quibit_starty){
			
		handleLine(active_line); 
		}
		else if (dist_horizontal<=quibit_startx && dist_vertical >=quibit_starty) {
			
		handleColumn(active_column);
		}
		else if(dist_horizontal>=quibit_startx && dist_vertical <=quibit_starty){
		
		handleColumn(active_column);  
		}
     }

   }	
}

