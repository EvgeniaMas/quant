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

let combination = [];
function cellClick(event) {
  if(moves>=available_moves){
    notification_modal.style.display = 'block';
    notification_message.innerText = 'Du hast die maximale Anzahl von Zügen erreicht. Drücke auf "Rückgängig", um einen Zug zurückzuziehen oder starte den Level erneut.';
    overlay.style.display = 'block';  
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
// tutorials
let index = 0;
let tutorial1 = document.querySelectorAll('.tutorial_block');
let tutorial2 = document.querySelectorAll('.tutorial_block2');
let index_length = tutorial1.length;
// Info Button
information.addEventListener('click', function(){
	if(level>1){
      second_tutorial_show.style.display = 'block';
	}
	else{
	first_tutorial_show.style.display = 'block';	
	}  
});
close.addEventListener('click', function(){
   first_tutorial_show.style.display = 'none';
});
next_tutorial.addEventListener('click', function(e){
	tutorial1[index].classList.remove('active');
	++index;
	if(index == index_length-1){
		index= index_length-1;
		next_tutorial.classList.add('disabled');
		next_tutorial.innerText = 'Zu Level1 >';
	}
	else if(index==1){
	    back_tutorial.classList.remove('disabled');     
    }
     tutorial1[index].classList.add('active');	
});
back_tutorial.addEventListener('click', function(e){
	tutorial1[index].classList.remove('active');
	--index;
	if(index <= 0){
		index= 0;		
	}
	else if(index<index_length-1){
	next_tutorial.classList.remove('disabled');
     
    }
     tutorial1[index].classList.add('active');
});


back_move.addEventListener('click', function(e){
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
});

window.onload = function() {				
	box = document.getElementById('box');
	solution = document.getElementById('solution');
	createPattern(level);
	buildGame(sequence);	
}
close_modal.addEventListener('click', function(e){
  notification_modal.style.display = 'none';
  overlay.style.display = 'none';
  
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
	else if(level ==4 || level ==5){
		x_gatter.style.display = 'inline-block';
		h_gatter1.style.display = 'none'; 
	    h_gatter2.style.display = 'none'; 
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


function applyGatter(gatter){
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








		if(combination.length<2){
		alert('Пустое!');
		return false;
		}

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
			  working_sequence[i][active_column1] =2; 	
			}
			else if(working_sequence[i][active_column1] ==2){
			working_sequence[i][active_column1] =1;
            }  
         }
       }

   else{
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

	 ++moves;
     current_move.innerText = moves; 
     buildGame(working_sequence);    
     combination = [];

     if(moves >0){
		back_move.classList.add('active');
	}

	    break;
	  case 'h_gatter1':


if(combination.length<2){
alert('Пустое!');
return false;
}
// let active_line1 = combination[0].charAt(0);
// let active_column1 = combination[0].charAt(2);
// let active_line2 = combination[1].charAt(0);
// let active_column2 = combination[1].charAt(2);
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
	 ++moves;
     current_move.innerText = moves; 
     buildGame(working_sequence);    
     combination = [];



	    break;


       	  case 'h_gatter2':



if(combination.length<2){
alert('Пустое!');
return false;
}

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
	 ++moves;
     current_move.innerText = moves; 
     buildGame(working_sequence);    
     combination = [];



	    break;







	  case 'swap_gatter':




// 	  console.log(Number(active_line1));
// console.log(Number(active_line2));

// console.log(Number(active_column1));
// console.log(Number(active_column2));



     working_sequence[active_line1][active_column1] = working_sequence[active_line2][active_column2];
      working_sequence[active_line2][active_column2] = working_sequence[active_line1][active_column1];
 
           	 ++moves;
     current_move.innerText = moves; 
     buildGame(working_sequence);    
     combination = [];

	    
	    break;
	    case 'snot_gatter':

      let control = working_sequence[active_line1][active_column1];
      working_sequence[active_line2][active_column2] = control; 
       

      ++moves;
     current_move.innerText = moves; 
     buildGame(working_sequence);    
     combination = [];


	    
	    break;
	    
	}




  let a =arraysEqual(working_sequence, solution_sequence[level]);


    if(a==true){
    	alert('Выиграл');
    	++level;
    	current_level.innerText = level+1;

    	 moves =0;
         available_moves = max_moves[level];
         current_move.innerText = moves;
         max_moves_text.innerText = available_moves;
         createPattern(level);
         buildGame(sequence);
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
   
// selectGatter(gatter_in_action);

        event.preventDefault();

          }
    });


}