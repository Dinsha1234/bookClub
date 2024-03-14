import  express  from "express"
import { Book } from "../models/bookModel.js"
import bodyParser from "body-parser"

const router = express.Router()


var jsonParser = bodyParser.json()
 
var urlencodedParser = bodyParser.urlencoded({ extended: false })

router.post('/books', jsonParser, async (req, res) => {
    try{
    console.log('hey', req)
    const { title, author, publishedYear } = req.body
    if(!title || !author || !publishedYear) return res.status(400).send({message: 'Please send the required details'})
    const bookDetail = {
        title,
        author,
        publishedYear
    }
    const book = await Book.create(bookDetail)
    return res.status(200).send(book)
    }catch (err) {
        console.log('err', err)
        return res.status(500).send({message: err})

    }

})
router.get('/books',async (req, res)=> {
    try{
        const books = await Book.find({})
        return res.status(200).send({
            length: books.length,
            data: books
        })
    }catch (err){
        return res.status(500).send(err)
    }
})

router.get('/books/:bookId', urlencodedParser, async( req, res ) => {
    try{
        const id = req.params.bookId
        console.log('hey', id)
        const book = await Book.findById(id)
        return res.status(200).send(book)
    }catch(err){
        return res.status(500).send(err)
    }
})

router.put('/books/:bookId', jsonParser, urlencodedParser, async( request, res ) => {
    try{
        const id  = request.params.bookId
        console.log('hey', id)
        console.log('body',request.body)
        const book = await Book.findByIdAndUpdate(id, request.body)
        if (!book) return res.status(400).send({Message: 'Result not found'})
        else return res.status(200).send(book)
    }catch(err){
        return res.status(500).send(err)
    }
})

router.delete('/books/:bookId', urlencodedParser, async( request, res ) => {
    try{
        const id  = request.params.bookId
        const book = await Book.findByIdAndDelete(id)
        if (!book) return res.status(400).send({Message: 'Result not found'})
        else return res.status(200).send({Message: 'Book deleted!'})
    }catch(err){
        return res.status(500).send(err)
    }
})

export default router