module.exports = (app) => {

    const listUsers = async (req,res) => {
        const users = await app.database("users").select("*")

        return res.json(users); 
    }

    const getById = async (req,res) => {
        const idUser = req.params.id;

        const userExists = await app.database("users").where({id: idUser}).first();

        if(!userExists){
            return res.status(400).json({error: "Id invalido!"});
        }

        const user = await app.database("users").where({id: idUser}).first();

        return res.json(user);
    }

    const createUser = async (req,res) => {
        const user = {...req.body};

        if(req.params.id){
            user.id = req.params.id;
        }

        if(!user.name || !user.email || !user.password){
            return res.status(400).json({error: "Algum dado não informado!"});
        }

        const userExists = await app
            .database("users")
            .where({email: user.email})
            .first();

        if(userExists){
            return res.status(400).json({error: "Email já cadastrado!"});
        }

        if(req.params.id){
            await app
                .database("users")
                .update(user)
                .where({id: user.id})
                .then((_) => res.status(200).send())
                .catch((err) => res.status(500).send(err))
        }else{
            await app
            .database("users")
            .insert(user)
            .then((_) => res.status(200).send())
            .catch((err) => res.status(500).send(err))

        }

        

        //  res.json(user)
    }

    const deleteUser = async (req,res) => {
        const idUser = req.params.id;

        if(!idUser){
            return res.status(400).json({error: "Id do usuário não informado!"});
        }

        const userExists = await app.database("users").where({id: idUser}).first();

        if(!userExists){
            return res.status(400).json({error: "Usuário não existe!"});
        }

        await app.database("users").where({id: idUser}).del();

       return res.status(204).send();

    }

    return { listUsers, createUser, deleteUser, getById }
}