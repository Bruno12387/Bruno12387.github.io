const express = require('express');
const app = express();
const PORT = 3000;

/*
Each book has this structure:

{
    "id": "1",
    "title": "To Kill a Mockingbird",
    "details": [
        {
            "id": "1",
            "author": "Harper Lee",
            "genre": "Fiction",
            "publicationYear": 1960
        }
    ]
}
*/
let books=[{id: "1",title: "kill",details:[{id: "1",
            author: "Harper Lee",
            genre: "Fiction",
            publicationYear: 1960}]},
            {id: "2",title: "mock"}];
app.use(express.json());

app.get('/whoami',(req,res)=>{
    res.json("2813088");
});
app.get('/books',(req,res)=>{
    res.json(books);
});
app.get('/books/:id',(req,res)=>{
    let book=books.find(b=>b.id===req.params.id);
    if(!book)
    {
        res.status(404).json({"error":"Book not found"});
        return;
    }
    res.json(book);
});
app.post('/books',(req,res)=>{
    if(!req.body.id || !req.body.title)
    {
        res.status(400).json({"error":"Missing required fields"});
        return;
    }
    let book;
    if(!req.body.details)
    {
        book={id:req.body.id, title:req.body.title};
    }
    else
    {
        book={id:req.body.id, title:req.body.title, details:req.body.details};
    }
    books.push(book);
    res.status(201).json(book);

});
app.put('/books/:id',(req,res)=>{
    let book=books.find(b=>b.id===req.params.id);
    if(!book)
    {
        res.status(404).json({"error":"Book not found"});
        return;
    }
    book.title=req.body.title;
    res.status(200).json(book);
    
});

app.delete('/books/:id',(req,res)=>{
    let book=books.find(b=>b.id===req.params.id);
    if(!book)
    {
        res.status(404).json({"error":"Book not found"});
        return;
    }
    const index=books.indexOf(book);
    books.splice(index,1);
    res.status(200).json();
});
app.post('/books/:id/details',(req,res)=>{
    let book=books.find(b=>b.id===req.params.id);
    if(!book)
    {
        res.status(404).json({"error":"Book not found"});
        return;
    }
    book.details=req.body;
    res.status(201).json(book);
    

});

app.delete('/books/:id/details/:detailId',(req,res)=>{
    let book=books.find(b=>b.id===req.params.id);
    if(!book)
    {
        res.status(404).json({"error":"Book or detail not found"});
        return;
    }
    let index = book.details.findIndex(d => 
        d.id === req.params.detailId);

    if (index === -1) {
        res.status(404).json({"error":"Book or detail not found"});
        return;
    }

    book.details.splice(index, 1);
    res.status(200).json();
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
