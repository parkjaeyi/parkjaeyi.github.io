

window.addEventListener('load',()=>{
    const form =document.querySelector("#task-form");
    const input=document.querySelector('#task-input');
    const list_el= document.querySelector('#tasks');
    const complete_el=document.querySelector('#c-tasks');

   

// list of tasks
    
    
    form.addEventListener('submit',(e)=>{
        e.preventDefault();
        const task=input.value;
        const valuedate=document.getElementById('date-input').value;

        if(!task){
            alert("Add a task ");
            return;
        }
        
        /*else{
            console.log("success");
        }*/

        if(!valuedate){
            const task_el=document.createElement("div");
            task_el.classList.add('task1');



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

            // const task_date_el=document.createElement("input");
            // task_date_el.classList.add('date');
            // task_date_el.type='date';

            const color_task_el=document.createElement('input');
            color_task_el.classList.add('T1colourbutton');
            color_task_el.type='button';
            const color2_task_el=document.createElement('input');
            color2_task_el.classList.add('T1colourbutton2');
            color2_task_el.type='button';
            const color3_task_el=document.createElement('input');
            color3_task_el.classList.add('T1colourbutton3');
            color3_task_el.type='button';

            const task_edit_el=document.createElement("image");
            task_edit_el.classList.add('edit');
            task_edit_el.innerHTML= "<input type='image' id='edit' src='pen-to-square-regular.svg' alt='edit' height='30'/></i>";

            const task_save_el=document.createElement("image");
            task_save_el.classList.add('save');
            task_save_el.innerHTML="<input type='image' id='save' src='floppy-disk-regular.svg' alt='save' height='30'/></i>";

            const task_delete_el=document.createElement('image');
            task_delete_el.classList.add('X');
            task_delete_el.innerHTML="<input type='image' id='X' src='eraser-solid.svg' alt='delete' height='30'/></i>"

            task_actions_el.appendChild(color_task_el);
            task_actions_el.appendChild(color2_task_el);
            task_actions_el.appendChild(color3_task_el);
            task_actions_el.appendChild(task_edit_el);
            task_actions_el.appendChild(task_delete_el);
            

            

            task_el.appendChild(task_actions_el);
            list_el.appendChild(task_el);

            input.value='';// it will reset the textbox
            
            
    //MAKING BUTTONS TO WORK
            //button red
            
            color_task_el.addEventListener('click',()=>{
               if(task_el.style.backgroundColor='red'){
                    task_el.style.background='none';
                }

                colorRed();

            })
            function colorRed(){
                task_el.style.backgroundColor='red';
                task_input_el.style.color='white';

                color_task_el.addEventListener('click',()=>{
                   button1();
                   return;
                })
                // return task_el.style.backgroundColor='red',task_input_el.style.color='white';
                
            }
           
            function button1(){
                if(task_el.style.backgroundColor='red'){
                    task_el.style.background='none';
                    task_input_el.style.color='grey';
                    
                }
                
                color_task_el.addEventListener('click',()=>{
                    colorRed();
                   
                })
                color2_task_el.addEventListener('click',()=>{
                    colorOrange();
                    
                })
                color3_task_el.addEventListener('click',()=>{
                     colorAqua();
                     
                })
                
            }
            //button orange
            color2_task_el.addEventListener('click',()=>{
                if(task_el.style.backgroundColor='orange'){
                    task_el.style.background='none';
                }
                colorOrange();
            })
            function colorOrange(){
                task_el.style.backgroundColor='orange';
                task_input_el.style.color='black';
                color2_task_el.addEventListener('click',()=>{
                   button2();
                })
                
            }
           
            function button2(){
                if(task_el.style.backgroundColor='orange'){
                    task_el.style.background='none';
                    task_input_el.style.color='grey';
                }
                color_task_el.addEventListener('click',()=>{
                    colorRed();
                    return;
                })
                color2_task_el.addEventListener('click',()=>{
                    colorOrange();
                    return;
                })
                color3_task_el.addEventListener('click',()=>{
                    colorAqua();
                    return;
                })
            }
            //button aqua
            color3_task_el.addEventListener('click',()=>{
                if(task_el.style.backgroundColor='aqua'){
                    task_el.style.background='none';
                }
                colorAqua();
            })
            function colorAqua(){
                task_el.style.backgroundColor='aqua';
                task_input_el.style.color='chocolate';
                color3_task_el.addEventListener('click',()=>{
                   button3();
                })
            }
           
            function button3(){
                if(task_el.style.backgroundColor='aqua'){
                    task_el.style.background='none';
                    task_input_el.style.color='grey';
                }
                color_task_el.addEventListener('click',()=>{
                    colorRed();
                    return;
                })
                color2_task_el.addEventListener('click',()=>{
                    colorOrange();
                    return;
                })
                color3_task_el.addEventListener('click',()=>{
                    colorAqua();
                    return;
                })
                    
           
            }
            //edit button
            task_edit_el.addEventListener('click',()=>{
                taskEditFunction();
            })

            function taskEditFunction(){
                task_input_el.removeAttribute('readonly');
                task_input_el.focus();
                task_edit_el.innerHTML=task_save_el.innerHTML; //task_edit_el.innerHTML has the innerHTML of task_save_el.innerHTML;
                
                task_edit_el.addEventListener('click',()=>{
                taskSaveFunction();
                })
            }
            function taskSaveFunction(){
                task_input_el.setAttribute('readonly','readonly');
                task_input_el.focus();
                task_edit_el.innerHTML= "<input type='image' id='edit' src='pen-to-square-regular.svg' alt='edit' height='30'/></i>"; // back to its og
                task_edit_el.addEventListener('click',()=>{
                    taskEditFunction();
                })
                
            }

            //delete button   
            task_delete_el.addEventListener('click',()=>{
                list_el.removeChild(task_el);
                deleteSound();
                
            })

    /* making the task to be crossed out and undo it */
            task_input_el.addEventListener('mouseover',()=>{
                task_input_el.style.cursor='pointer';
            })

            task_input_el.addEventListener('click',()=>{
                if(task_input_el.style.textDecoration="none"){
                    crossout(); 
                    
                }
                if((complete_el.style.textDecoration="line-through"))//complete_el.style.textDecoration="line-through" 
                {
                    task_input_el.addEventListener('click',()=>{
                        
                        undo();
                        
                        
                    })
                
                }

            })

            function crossout(){
                crossoutSound('pencil_check_mark_1-88805-[AudioTrimmer.com].mp3');
                task_input_el.style.textDecoration="line-through";
                task_actions_el.removeChild(task_edit_el);
                task_actions_el.removeChild(color_task_el);
                task_actions_el.removeChild(color2_task_el);
                task_actions_el.removeChild(color3_task_el);
                task_el.appendChild(task_actions_el);
                complete_el.append(task_el);

                task_input_el.addEventListener('click',()=>{
                    undo();
                })
            }
            function crossoutSound(filename){
                let audio=new Audio(filename);
                audio.loop=false;
                audio.play();
            }
            function undo(){
                complete_el.removeChild(task_el);
                task_actions_el.removeChild(task_delete_el);
                task_actions_el.append(color_task_el);
                task_actions_el.append(color2_task_el);
                task_actions_el.append(color3_task_el);
                task_actions_el.append(task_edit_el);
                task_actions_el.append(task_delete_el);
                task_el.appendChild(task_actions_el);
                list_el.append(task_el);
                task_input_el.style.textDecoration="none";
                task_input_el.addEventListener('click',()=>{
                    crossout();
                })
            }
            function deleteSound(){
                let audio=new Audio('dry-erase-78299-[AudioTrimmer.com].mp3');
                audio.loop=false;
                audio.play();
            }    

            task_delete_el.addEventListener('click',()=>{
                complete_el.removeChild(task_el);
                deleteSound();
                
            })
        }//end of if statement
        else{
            const task_el=document.createElement("div");
            task_el.classList.add('task');

        const task_content_el=document.createElement("div");
        task_content_el.classList.add('content');
   

        const listItem=document.createElement('li');
        listItem.classList.add('content');

       
        task_el.appendChild(listItem);
        task_el.appendChild(task_content_el);
        

        const task_input_el=document.createElement('input');
        task_input_el.classList.add("text"); //add the class text
        task_input_el.type='text';
        task_input_el.value=task;
        task_input_el.setAttribute("readonly","readonly");
        
        task_content_el.appendChild(task_input_el);
        

        const task_actions_el=document.createElement('div');
        task_actions_el.classList.add('action');

        const color_task_el=document.createElement('input');
        color_task_el.classList.add('colourbutton');
        color_task_el.type='button';
        const color2_task_el=document.createElement('input');
        color2_task_el.classList.add('colourbutton2');
        color2_task_el.type='button';
        const color3_task_el=document.createElement('input');
        color3_task_el.classList.add('colourbutton3');
        color3_task_el.type='button';

        const task_date_el=document.createElement("input");
        task_date_el.classList.add('date');
        task_date_el.type='date';
        task_date_el.value=valuedate;

        const task_edit_el=document.createElement("image");
        task_edit_el.classList.add('edit');
        task_edit_el.innerHTML= "<input type='image' id='edit' src='pen-to-square-regular.svg' alt='edit' height='30'/></i>";

        const task_save_el=document.createElement("image");
        task_save_el.classList.add('save');
        task_save_el.innerHTML="<input type='image' id='save' src='floppy-disk-regular.svg' alt='save' height='30'/></i>";

        const task_delete_el=document.createElement('image');
        task_delete_el.classList.add('X');
        task_delete_el.innerHTML="<input type='image' id='X' src='eraser-solid.svg' alt='delete' height='30'/></i>"

        task_actions_el.appendChild(task_date_el);
        task_actions_el.appendChild(color_task_el);
        task_actions_el.appendChild(color2_task_el);
        task_actions_el.appendChild(color3_task_el);
        task_actions_el.appendChild(task_edit_el);
        task_actions_el.appendChild(task_delete_el);
        

        

        task_el.appendChild(task_actions_el);
        //og_task.appendChild(task_el);
        list_el.appendChild(task_el);
        
        
        input.value='';// it will reset the textbox
        document.getElementById('date-input').value='';//resets the date
        
        
//MAKING BUTTONS TO WORK
        //button red
        color_task_el.addEventListener('click',()=>{
            if(task_el.style.backgroundColor='red'){
                 task_el.style.background='none';
             }

             colorRed();

         })
         function colorRed(){
             task_el.style.backgroundColor='red';
             task_input_el.style.color='white';

             color_task_el.addEventListener('click',()=>{
                button1();
                return;
             })
             // return task_el.style.backgroundColor='red',task_input_el.style.color='white';
             
         }
        
         function button1(){
             if(task_el.style.backgroundColor='red'){
                 task_el.style.background='none';
                 task_input_el.style.color='grey';
                 
             }
             
             color_task_el.addEventListener('click',()=>{
                 colorRed();
                
             })
             color2_task_el.addEventListener('click',()=>{
                 colorOrange();
                 
             })
             color3_task_el.addEventListener('click',()=>{
                  colorAqua();
                  
             })
             
         }
         //button orange
         color2_task_el.addEventListener('click',()=>{
             if(task_el.style.backgroundColor='orange'){
                 task_el.style.background='none';
             }
             colorOrange();
         })
         function colorOrange(){
             task_el.style.backgroundColor='orange';
             task_input_el.style.color='black';
             color2_task_el.addEventListener('click',()=>{
                button2();
             })
             
         }
        
         function button2(){
             if(task_el.style.backgroundColor='orange'){
                 task_el.style.background='none';
                 task_input_el.style.color='grey';
             }
             color_task_el.addEventListener('click',()=>{
                 colorRed();
                 return;
             })
             color2_task_el.addEventListener('click',()=>{
                 colorOrange();
                 return;
             })
             color3_task_el.addEventListener('click',()=>{
                 colorAqua();
                 return;
             })
         }
         //button aqua
         color3_task_el.addEventListener('click',()=>{
             if(task_el.style.backgroundColor='aqua'){
                 task_el.style.background='none';
             }
             colorAqua();
         })
         function colorAqua(){
             task_el.style.backgroundColor='aqua';
             task_input_el.style.color='chocolate';
             color3_task_el.addEventListener('click',()=>{
                button3();
             })
         }
        
         function button3(){
             if(task_el.style.backgroundColor='aqua'){
                 task_el.style.background='none';
                 task_input_el.style.color='grey';
             }
             color_task_el.addEventListener('click',()=>{
                 colorRed();
                 return;
             })
             color2_task_el.addEventListener('click',()=>{
                 colorOrange();
                 return;
             })
             color3_task_el.addEventListener('click',()=>{
                 colorAqua();
                 return;
             })
                 
        
         }
        //edit button
        task_edit_el.addEventListener('click',()=>{
            taskEditFunction();
        })

        function taskEditFunction(){
            task_input_el.removeAttribute('readonly');
            task_input_el.focus();
            task_edit_el.innerHTML=task_save_el.innerHTML; //task_edit_el.innerHTML has the innerHTML of task_save_el.innerHTML;
            
            task_edit_el.addEventListener('click',()=>{
            taskSaveFunction();
            })
        }
        function taskSaveFunction(){
            task_input_el.setAttribute('readonly','readonly');
            task_input_el.focus();
            task_edit_el.innerHTML= "<input type='image' id='edit' src='pen-to-square-regular.svg' alt='edit' height='30'/></i>"; // back to its og
            task_edit_el.addEventListener('click',()=>{
                taskEditFunction();
            })
            
        }

        //delete button   
          task_delete_el.addEventListener('click',()=>{
            list_el.removeChild(task_el);
            deleteSound();
            
        })

/* making the task to be crossed out and undo it */
        task_input_el.addEventListener('mouseover',()=>{
            task_input_el.style.cursor='pointer';
        })

        task_input_el.addEventListener('click',()=>{
            if(task_input_el.style.textDecoration="none"){
                crossout(); 
                
            }
            if((complete_el.style.textDecoration="line-through"))//complete_el.style.textDecoration="line-through" 
            {
                task_input_el.addEventListener('click',()=>{
                    
                    undo();
                    
                    
                })
              
            }

        })
    
        function crossout(){
            crossoutSound('pencil_check_mark_1-88805-[AudioTrimmer.com].mp3');
            task_input_el.style.textDecoration="line-through";
            task_actions_el.removeChild(task_edit_el);
            task_actions_el.removeChild(color_task_el);
            task_actions_el.removeChild(color2_task_el);
            task_actions_el.removeChild(color3_task_el);
            task_actions_el.removeChild(task_date_el);
            task_el.appendChild(task_actions_el);
            complete_el.append(task_el);

            task_input_el.addEventListener('click',()=>{
                undo();
            })
        }
        function crossoutSound(filename){
            let audio=new Audio(filename);
            audio.loop=false;
            audio.play();
        }
        function undo(){
            complete_el.removeChild(task_el);
            task_actions_el.removeChild(task_delete_el);
            task_actions_el.append(task_date_el);
            task_actions_el.append(color_task_el);
            task_actions_el.append(color2_task_el);
            task_actions_el.append(color3_task_el);
            task_actions_el.append(task_edit_el);
            task_actions_el.append(task_delete_el);
            task_el.appendChild(task_actions_el);
            list_el.append(task_el);
            task_input_el.style.textDecoration="none";
            task_input_el.addEventListener('click',()=>{
                crossout();
            })
        }
        function deleteSound(){
            let audio=new Audio('dry-erase-78299-[AudioTrimmer.com].mp3');
            audio.loop=false;
            audio.play();
        }    

        task_delete_el.addEventListener('click',()=>{
            complete_el.removeChild(task_el);
            deleteSound();
            
        })
        }// end of the else statement
        

       
       
        

       
   
        
       
     })//this is the form of submit
   
    


})