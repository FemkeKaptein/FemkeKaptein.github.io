window.addEventListener("DOMContentLoaded", () => {
    const targetText = sessionStorage.getItem("title")
    
    const targetElement = Array.from(document.getElementsByTagName('h2')).find(element => element.textContent.includes(targetText))

    console.log(targetElement);
    if(targetElement){
        targetElement.scrollIntoView({
            behavior: 'smooth'
        })
    }


    sessionStorage.removeItem("title")
})