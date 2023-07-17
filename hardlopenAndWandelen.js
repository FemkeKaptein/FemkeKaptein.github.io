window.addEventListener("DOMContentLoaded", () => {
    const targetText = sessionStorage.getItem("title")
    
    const targetElement = Array.from(document.getElementsByTagName('h2')).find(element => element.textContent.includes(targetText))

    console.log(targetElement);
    if(targetElement){
        targetElement.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        })
    }


    sessionStorage.removeItem("title")

    //make logo clickable and redirect to homepage
    document.querySelector(".logo").addEventListener("click", () =>{
        if (!window.location.href.includes('index.html')){
            window.location.href = 'index.html'
        }
    })
})