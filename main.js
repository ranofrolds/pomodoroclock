function main(){

    let minutes = document.getElementById('time').value-1;
    let seconds=59;
    let buttons = document.querySelector('.botoes')
    let breaks=1;
    let startcount=0;
    let interval1;
    let interval2;
    let paused=0;
    let customMinutes=0;
    let ding = new Audio('ding-sound-effect_1.mp3')
    ding.volume=0.2

    buttons.addEventListener("click", (event)=>{
        if(event.path[1].id=='start' ||event.path[2].id=='start'){ 
            if(startcount==0){
                
                startcount++
                paused=0;   

                interval1 = setInterval(()=>{                        
                    minutes-=1;
                }, 610);

                interval2 = setInterval(()=>{
                    console.log(seconds) 
                    if(seconds>=10){
                        document.getElementById("timer").value = minutes + ':' + seconds
                    }
                    else{
                        document.getElementById("timer").value = minutes + ':' + '0' + seconds
                    }
                    if(seconds==0){
                        if(minutes==0){
                            ding.play()
                            if(breaks%2!=0){
                                

                                alert("Time for a BREAK!!")
                                
                                if(breaks==7){
                                    document.getElementById("timer").value = "10:00"
                                    minutes=9;
                                    seconds=59;
                                }
                                else{
                                    document.getElementById("timer").value = "5:00"
                                    minutes=4;
                                    seconds=59;
                                }
                                breaks++;
                                clearInterval(interval1)
                                clearInterval(interval2)
                                startcount=0;
                            }
                            else{
                                if(breaks==8){

                                    alert("End of the pomodoro you can restart if you want!")
                                    breaks=1;
                                }
                                else{

                                    alert("Back to WORK!!")
                                }
                                
                                customMinutes!=0?minutes=customMinutes:minutes=24;
                                document.getElementById("timer").value = (minutes+1) + ":00"
                                seconds=59;
                                breaks++;
                                clearInterval(interval1)
                                clearInterval(interval2)
                                startcount=0;
                            }
                            
                        }
                        else{
                            seconds=60;
                        }
                    }
                    seconds-=1;
                    
                }, 10);
            
            }

        }

        if(event.path[1].id=='pause' ||event.path[2].id=='pause'){
            startcount=0;
            paused++;
            window.alert("Paused!")
            clearInterval(interval1)
            clearInterval(interval2)
        }

        if(event.target.id=='reset'){
            startcount=0;
            window.alert("Reseted!")
            document.getElementById("timer").value = "25:00"
            document.getElementById('time').value=25
            minutes=24;
            seconds=59;
            breaks=1;
            clearInterval(interval1)
            clearInterval(interval2)
             startcount=0;
        }
        
        
    }, false);

    var customMin = document.querySelector('.minutes');

    customMin.addEventListener("click", (event)=>{
        if(event.target.id=='minus'){
            if(!(breaks%2==0) && paused==0 && startcount==0){
                minutes--;
                customMinutes=minutes;
                document.getElementById("timer").value = (minutes+1) + ':' + "0" + "0"           
                document.getElementById('time').value = minutes+1
            }
            else{
                alert("You can't change the minutes right now!")
            }
        }

        if(event.target.id=='plus'){

            if(!(breaks%2==0) && paused==0 && startcount==0){
                minutes++;
                customMinutes=minutes;
                document.getElementById("timer").value = (minutes+1) + ':' + "0" + "0"
                document.getElementById('time').value = minutes+1
            }
            else{
                alert("You can't change the minutes right now!")
            }
        }
    }, false)

    var darkMode = document.getElementById('mode');
    var background = document.querySelector('.background')
    darkMode.addEventListener("click", (event)=>{
        
        if(event.target.value=="false"){
            document.querySelector('.background').classList.toggle('dark');
            document.querySelector('.menu').classList.toggle('dark');
            document.getElementById('timer').classList.toggle('dark');
            document.getElementById('reset').classList.toggle('dark');
            document.querySelector('.botoes #start svg').classList.toggle('dark');
            document.querySelector('.botoes #pause svg').classList.toggle('dark');
            document.getElementById('time').classList.toggle('dark');
            document.querySelector('.minutes #minus').classList.toggle('dark');
            document.querySelector('.minutes #plus').classList.toggle('dark');
        }
    }, false)
}