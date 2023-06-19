



handleGridItemClick()

handleComments()

loadAllComments()


//on page load, load and display all existing comments for the comment section it belongs to
async function loadAllComments() {
    const commentSections = document.querySelectorAll(`.comment-section`)

    for (const commentSection of commentSections) {
        const index = commentSection.dataset.index
        const typeStory = commentSection.dataset.type

        const comments = await fetchComments(index, typeStory)

        if (comments.length > 0){
            for (const comment of comments) {
                displayComment(comment, commentSection)
            }
        }
    }
}

function handleComments(){
    const commentToggleButtons = document.querySelectorAll(".toggle-comments")


    for (const button of commentToggleButtons){
        button.addEventListener("click", async () => {
            const index = button.dataset.index;

            const commentSection = document.querySelector(`.comment-section[data-index="${index}"]`)
            const commentContainers = commentSection.querySelectorAll('.comment-container')

            const commentsContainer = commentSection.querySelector('.comments-container')
            const commentForm = commentSection.querySelector(`.comment-form`);

            if (commentForm.style.display === "block" && commentsContainer.style.display === "flex"){

                //hide content
                commentForm.style.display = "none"
                commentsContainer.style.display = "none"

                if (commentContainers.length > 0){
                    for (const commentContainer of commentContainers){
                        commentContainer.style.display = "none"
                    }
                }


            }
            else{
                //show content
                commentForm.style.display = "block"
                commentsContainer.style.display = "flex"

                if (commentContainers.length > 0){
                    for (const commentContainer of commentContainers){
                        commentContainer.style.display = "block"
                    }
                }
            }

            //submit button
            commentForm.querySelector("button.submit").addEventListener("click", async (evt) => {
                evt.preventDefault();
                await handleCommentSubmit(commentSection)
            })
        })
    }
}

async function handleCommentSubmit(commentSection) {
    const nameForm = commentSection.querySelector("input.name")
    const messageForm = commentSection.querySelector("textarea.message")

    const name = nameForm.value
    const message = messageForm.value


    const date = new Date();
    const formattedDate = date.toLocaleString('en-US', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
    });

    const [datePart, timePart] = formattedDate.split(', ');
    const [month, day, year] = datePart.split('/');
    const [hour, minute, second] = timePart.split(':');

    const timestamp = `${year}-${month}-${day} ${hour}:${minute}:${second}`;



    const commentSectionId = commentSection.dataset.index
    const typeStory = commentSection.dataset.type

    const data = {
        "name" : name,
        "message" : message,
        "timestamp" : timestamp,
        "comment_section_id" : commentSectionId,
        "type_story" : typeStory
    }

    if (name.trim().length !== 0 && message.trim().length !== 0){
        const result = await insertComment(data)
        if (result){
            nameForm.value = ""
            messageForm.value = ""

            displayComment(data, commentSection)
        }
    }


}

function displayComment(comment, commentSection){
    const commentsContainer = commentSection.querySelector(".comments-container")

        const commentContainer = document.createElement("div")
        commentContainer.classList.add("comment-container")

        const commentHeader = document.createElement("div")
        commentHeader.classList.add("comment-header")

        const nameDiv = document.createElement("div")
        nameDiv.classList.add("comment-name")
        nameDiv.textContent = comment.name

        const timeDiv = document.createElement("div")
        timeDiv.classList.add("comment-time")
        timeDiv.textContent = formatTime(comment.timestamp)

        const commentBody = document.createElement("div")
        commentBody.classList.add("comment-body")
        commentBody.textContent = comment.message


        commentHeader.appendChild(nameDiv)
        commentHeader.appendChild(timeDiv)
        commentContainer.appendChild(commentHeader)
        commentContainer.appendChild(commentBody)

    commentContainer.style.display = "none"

    if (commentsContainer.style.display === "none"){
        commentContainer.style.display = "none"
    }
    else if (commentsContainer.style.display === "flex"){
        commentContainer.style.display = "block"
    }

        commentsContainer.appendChild(commentContainer)

}

async function fetchComments(commentSectionId, typeStory) {
    try {
        const response = await fetch(`http://localhost:3000/comments/${commentSectionId}/${typeStory}`);
        if (!response.ok) {
            throw new Error('Failed to fetch comments');
        }
        return await response.json();
    } catch (error) {
        throw error;
    }
}

async function insertComment(data) {
    try {
        const response = await fetch('http://localhost:3000/comments', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        if (!response.ok) {
            throw new Error('Failed to insert comment');
        }
        return await response.json();
    } catch (error) {
        throw error;
    }
}




function handleGridItemClick(){
    const targetText = sessionStorage.getItem("title")

    const targetElement = Array.from(document.getElementsByTagName('h2')).find(element => element.textContent.includes(targetText))

    if(targetElement){
        targetElement.scrollIntoView({
            behavior: 'smooth'
        })
    }


    sessionStorage.removeItem("title")

    //make logo clickable and redirect to homepage
    document.querySelector(".logo").addEventListener("click", () =>{
        if (!window.location.href.includes('index.html')){
            window.location.href = 'index.html'
        }
    })
}

function formatTime(Date){
    return Date.slice(0, 10).replace('T', ' ');
}