import express from 'express'
import cors from 'cors';


import {getCommentsByCommentsSectionId, createCommentByCommentsSectionId} from "./queries.js"

const app = express()

//accepts json for req.body json
app.use(express.json())
app.use(cors())

const port = 3000;

const HTTP_OK_CODE = 200;
const BAD_REQUEST_CODE = 400;


    /**
     * http request to get all comments that belong to given comment section id
     */
    app.get("/comments/:commentSectionId/:typeStory", async (req, res) => {
            try{
                const commentSectionId = req.params.commentSectionId
                const typeStory = req.params.typeStory
                const comments = await getCommentsByCommentsSectionId(commentSectionId, typeStory)

                res.status(HTTP_OK_CODE).json(comments)
            }catch (e){
                res.status(BAD_REQUEST_CODE).json({reason: e})
            }
        })




    /**
     * http request to insert a new comment
     */
    app.post("/comments", async (req, res) => {
            const {name, message, timestamp, comment_section_id, type_story} = req.body

            try {
                let data = await createCommentByCommentsSectionId(name, message, timestamp, comment_section_id, type_story)

                if(data){
                    res.status(HTTP_OK_CODE).json({data : data})
                }
            } catch(e){
                res.status(BAD_REQUEST_CODE).json({reason: e})
            }
        }
    )


app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).send('iets is kapot!')
})

app.listen(port, () =>{
    console.log(`server runned op port ${port}`)
})
