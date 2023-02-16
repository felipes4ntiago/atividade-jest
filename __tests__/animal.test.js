const request = require("supertest");
const app = require("../src/app");
const animalsData = require("../src/data/animals.json");
const fs = require("fs");

describe("Inserção de animais", () =>{
    afterAll(() =>{
        while(animalsData.length > 0){
            animalsData.pop();
        }

        fs.writeFileSync("src/data/animals.json", JSON.stringify(animalsData));

    });

    it("Deve cadastrar um animal com sucesso", async () =>{
        const res = await request(app).post("/animais?nome=Spike&especie=Cachorro&idade=3");
        expect(res.status).toBe(201);
    })

    it("Deve falhar o cadastro pois a idade é inválida", async () =>{
        const res = await request(app).post("/animais?nome=Mimi&especie=Gato&idade=jovem");
        expect(res.status).toBe(400);
    })

    it("Deve falhar o cadastro pois o nome deve ter ao menos 2 caracteres", async () =>{
        const res = await request(app).post("/animais?nome=J&especie=Hamster&idade=1");
        expect(res.status).toBe(400);
    })

} )



describe("Testando o GET", () =>{
    beforeAll(() =>{
        while(animalsData.length > 0){
            animalsData.pop();
        }

        fs.writeFileSync("src/data/animals.json", JSON.stringify(animalsData));

    });
    beforeAll(() =>{
       animalsData.push({
        'id' : "idteste1",
        'nome' : "Spike",
        'idade' : 3,
        "especie" : "cachorro"
       });
       animalsData.push({
        'id' : "idteste2",
        'nome' : "tilps",
        'idade' : 9,
        "especie" : "tilápia"
       });
       animalsData.push({
        'id' : "ideteste3",
        'nome' : "Tortuguita",
        'idade' : 98
       });

        fs.writeFileSync("src/data/animals.json", JSON.stringify(animalsData));

    });

    afterAll(() =>{
        while(animalsData.length > 0){
            animalsData.pop();
        }

        fs.writeFileSync("src/data/animals.json", JSON.stringify(animalsData));

    });

    

    it("Usando o GET para receber uma lista com 3 animais", async () =>{
        const res = await request(app).get("/animais");
        expect(res.status).toBe(200);
        expect(res.body.length).toBe(3);

    })



} )