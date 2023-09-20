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



        const og_task=document.createElement('div');
        og_task.classList.add('task');

        const task_content_el=document.createElement("div");

        task_content_el.classList.add('content');
        //task_content_el.innerText=task;

        const listItem=document.createElement('li');
        
        listItem.classList.add('content');

        task_el.appendChild(listItem);
        task_el.appendChild(task_content_el);
        og_task.appendChild(task_el);

        const task_input_el=document.createElement('input');
        task_input_el.classList.add("text"); //add the class text
        task_input_el.type='text';
        task_input_el.value=task;
        task_input_el.setAttribute("readonly","readonly");
        
        task_content_el.appendChild(task_input_el);
        



        
        // task_input_el.addEventListener('click',()=>{
        //     task_input_el.style.textDecoration="line-through";
        // })
        // task_input_el.addEventListener('click',()=>{
        //     if(task_input_el.style.textDecoration!="line-through"){
        //         return task_input_el.style.textDecoration="none";
        //     }
        // })
        

        // list_el.addEventListener('mouseover',()=>{

        //     if(document.getElementById('tasks').style.textDecoration!="line-through"){
        //         task_content_el.addEventListener('click',()=>{
        //             document.getElementById('tasks').style.textDecoration="line-through";
        //     })}
        //     else if(document.getElementById('tasks').style.textDecoration="line-through"){
        //         const complete_content_el=document.createElement('div');
        //         complete_content_el.classList.add('c-content');
        //         complete_el.appendChild(complete_content_el);
        //     }
                    
        // })


        const task_actions_el=document.createElement('div');
        task_actions_el.classList.add('action');

        const task_edit_el=document.createElement("button");
        task_edit_el.classList.add('edit');
        task_edit_el.innerHTML= "edit";

        const task_delete_el=document.createElement('button');
        task_delete_el.classList.add('X');
        task_delete_el.innerHTML='X'

        task_actions_el.appendChild(task_edit_el);
        task_actions_el.appendChild(task_delete_el);


        

        task_el.appendChild(task_actions_el);
        og_task.appendChild(task_el);
        list_el.appendChild(task_el);

        input.value='';// it will reset the textbox
        
        
        //now we are making the buttons to work
        task_edit_el.addEventListener('click',()=>{
            if(task_edit_el.innerText.toLowerCase() =="edit"){
                task_input_el.removeAttribute('readonly');
                task_input_el.focus();
                task_edit_el.innerText="Save";
            }
            else if (task_edit_el.innerText.toLowerCase() =="save"){
                task_input_el.setAttribute('readonly','readonly');
                task_input_el.focus();
                task_edit_el.innerText="Edit";
            }
            // else{
            //     console.log('Saved');
            // }
        })

        task_delete_el.addEventListener('click',()=>{
            list_el.removeChild(task_el);
            
        })

/* making the task to be crossed out and undo it (you can crossout and undo it ONE TIME)*/
        task_input_el.addEventListener('mouseover',()=>{
            task_input_el.style.cursor='pointer';
        })

        task_input_el.addEventListener('click',()=>{
            
            //task_input_el.style.textDecoration="line-through";
            
            task_input_el.addEventListener('click',()=>{
            if(!(task_input_el.style.textDecoration="line-through")){
                
                (task_input_el.style.textDecoration="line-through");
            }
            
            else{
                task_input_el.style.textDecoration="line-through";
                complete_el.append(task_el);
               
            }
            
            })
            
        })
        

        
       
    /* if the task is crossed out, then it will be moved to "complete" table*/
        
     })//this is the form of submit

    


})
