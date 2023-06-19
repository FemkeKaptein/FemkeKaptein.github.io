
window.addEventListener("DOMContentLoaded", initialise)


async function initialise() {
    handlGridItemClick();
}

function handlGridItemClick(){
    const gridItems = document.querySelectorAll(".grid-item")


    //all different datasets
    const DATASET_WANDELEN = "wandelen"
    const DATASET_HARDLOPEN = "hardlopen"


    //for all gridItems, add an eventlistener that sets the session with the title of said gridItem, then redirects to the correct page according to the dataset. else trows an error.
    for(const gridItem of gridItems){

        gridItem.addEventListener("click", () => {
            const title = gridItem.querySelector("div.preview-text").textContent

            //als de titel van de gridItem niet leeg is, zet de titel in de session.
            if(title !== null){
                sessionStorage.setItem("title", title)

                if (gridItem.dataset.type === DATASET_HARDLOPEN){
                    window.location.href = 'hardlopen.html'
                }
                else if (gridItem.dataset.type === DATASET_WANDELEN){
                    window.location.href = 'wandelen.html'
                }
                else{
                    throw new Error("wrong or non-existant dataset on gridItem")
                }

            }
        })
    }
}



