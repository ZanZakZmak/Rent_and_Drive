import express from 'express';
import data from './store';
import cors from 'cors';

const app = express(); // instanciranje aplikacije
const port = 3200; // port na kojem će web server slušati

app.use(cors());
app.use(express.json());


// korisnik:
app.get('/korisnici', (req, res) => res.json(data.korisnici)); 
app.get('/korisnici/:oib', (req, res) => res.json(data.jedan_korisnik)); 

// unos novog korisnika:
app.post('/korisnici', (req, res) => {
    res.statusCode = 201;
    res.setHeader('Location', '/korisnici/1234');  
    res.send();
});

// vozilo:
app.get('/vozilo', (req, res) => res.json(data.vozilo)); 
app.get('/vozilo/:sasija', (req, res) => res.json(data.jedno_vozilo)); 

// unos novog vozila: 
app.post('/vozilo', (req, res) => {
    res.statusCode = 201;
    res.setHeader('Location', '/vozilo/12312312312123123');  
    res.send();
});

// povezivanje vozila i korisnika:
app.get('/vozilo/:sasija/korisnik/:oib', (req, res) => res.json(data.najamVozila))
app.put('/vozilo/:sasija/korisnik/:oib', (req, res) => {
    let data = req.body;
    if (!data.najam) { 
        res.statusCode = 400;
        return res.json({
            error: 'There are parameters missing.',
        });
    }
    res.statusCode = 201;
    res.setHeader('Location', '/vozilo/KIK372JFJ204POLL6/korisnik/84887392874'); 
    res.send();
});

// ugovori: 

app.get('/ugovori', (req, res) => res.json(data.ugovori));
app.get('/ugovori/:id', (req, res) => res.json(data.jedan_ugovor));

// stvaranje novog ugovora:

app.post('/ugovori', (req, res) => {
    res.statusCode = 201;
    res.setHeader('Location', '/ugovori/1');
    res.send();
});


app.listen(port, () => console.log(`Slušam na portu ${port}!`));