

window.addEventListener('load',()=>{
    const form =document.querySelector("#task-form");
    const input=document.querySelector('#task-input');
    const list_el= document.querySelector('#tasks');
    const complete_el=document.querySelector('#c-tasks');

   

   // console.log(form);

    form.addEventListener('submit',(e)=>{
        e.preventDefault();
        const task=input.value;
        if(!task){
            alert("Add a task ");
            return;
        }
        /*else{
            console.log("success");
        }*/
        const task_el=document.createElement("div");
        task_el.classList.add('task');



        // const og_task=document.createElement('div');
        // og_task.classList.add('task');

        const task_content_el=document.createElement("div");

        task_content_el.classList.add('content');
        //task_content_el.innerText=task;

        const listItem=document.createElement('li');
        
        listItem.classList.add('content');

        task_el.appendChild(listItem);
        task_el.appendChild(task_content_el);
        //og_task.appendChild(task_el);

        const task_input_el=document.createElement('input');
        task_input_el.classList.add("text"); //add the class text
        task_input_el.type='text';
        task_input_el.value=task;
        task_input_el.setAttribute("readonly","readonly");
        
        task_content_el.appendChild(task_input_el);
        

        const task_actions_el=document.createElement('div');
        task_actions_el.classList.add('action');

        const task_edit_el=document.createElement("image");
        task_edit_el.classList.add('edit');
        task_edit_el.innerHTML= "<input type='image' id='edit' src='pen-to-square-regular.svg' alt='edit' height='30'/></i>";

        const task_save_el=document.createElement("image");
        task_save_el.classList.add('save');
        task_save_el.innerHTML="<input type='image' id='save' src='floppy-disk-regular.svg' alt='save' height='30'/></i>";

        const task_delete_el=document.createElement('image');
        task_delete_el.classList.add('X');
        task_delete_el.innerHTML="<input type='image' id='X' src='eraser-solid.svg' alt='delete' height='30'/></i>"

        task_actions_el.appendChild(task_edit_el);
        task_actions_el.appendChild(task_delete_el);


        

        task_el.appendChild(task_actions_el);
        //og_task.appendChild(task_el);
        list_el.appendChild(task_el);

        input.value='';// it will reset the textbox
        
        
        //now we are making the buttons to work
        task_edit_el.addEventListener('click',()=>{
           taskEditFunction();


            if((task_edit_el.innerHTML="<input type='image' id='save' src='floppy-disk-regular.svg' alt='save' height='30'/></i>")){
                
                task_edit_el.addEventListener('click', ()=>{
                    taskSaveFunction();

                })
            }
            else{   
                    if((task_edit_el.innerHTML="<input type='image' id='save' src='floppy-disk-regular.svg' alt='save' height='30'/></i>")){

                        task_edit_el.addEventListener('click', ()=>{
                            taskSaveFunction();
                            return;
                            
                        })
                        return;
                    }
                }
                    
            })
            
            // task_input_el.removeAttribute('readonly');
            // task_input_el.focus();
            // task_edit_el.innerHTML=task_save_el.innerHTML;
       
        function taskEditFunction(){
            task_input_el.removeAttribute('readonly');
            task_input_el.focus();
            let tempImage=task_edit_el.innerHTML ;
            task_edit_el.innerHTML=task_save_el.innerHTML;
            task_save_el.innerHTML=tempImage;
            // tempImage=task_save_el.innerHTML;
        }
        function taskSaveFunction(){
           
            task_input_el.setAttribute('readonly','readonly');
            task_input_el.focus();
            task_edit_el.innerHTML= "<input type='image' id='edit' src='pen-to-square-regular.svg' alt='edit' height='30'/></i>";
            return;
        }
        

            // task_input_el.removeAttribute('readonly');
            // task_input_el.focus();
            // task_edit_el.innerHTML=task_save_el.innerHTML;
            
              
                
      
        // task_save_el.addEventListener('click',()=>{
        //         task_input_el.setAttribute('readonly','readonly');
        //         task_input_el.focus();
        //         task_save_el.innerHTML=task_edit_el.innerHTML;
                
        //     })
           
      
          task_delete_el.addEventListener('click',()=>{
            list_el.removeChild(task_el);
            
        })

/* making the task to be crossed out and undo it (prob: you can crossout and undo it ONE TIME)*/


        task_input_el.addEventListener('mouseover',()=>{
            task_input_el.style.cursor='pointer';
        })

        task_input_el.addEventListener('click',()=>{
            
            task_input_el.addEventListener('click',()=>{
            if(!(task_input_el.style.textDecoration="line-through")){
                
                (task_input_el.style.textDecoration="line-through");
                
            }
            
            })
            complete_el.append(task_el);
           // complete_task_el.append(task_el);
           
            //task_el.remove(task_edit_el);
            
            
            if((complete_el.style.textDecoration="line-through"))
            {
                task_input_el.addEventListener('click',()=>{
                    complete_el.removeChild(task_el);
                    list_el.append(task_el);
                    return (task_input_el.style.textDecoration="none");
                    
                })

                return;
            }
         
            
        })

        task_delete_el.addEventListener('click',()=>{
            complete_el.removeChild(task_el);
            
        })

       
       
        

       
   
        
       
     })//this is the form of submit

    


})