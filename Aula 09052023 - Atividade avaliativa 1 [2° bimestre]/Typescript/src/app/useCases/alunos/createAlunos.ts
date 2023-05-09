import { Request, Response } from "express";
import { Aluno } from "../../models/Aluno";

export async function createAlunos(req:Request, res: Response) {
    const { id, nome, sobrenome, email, datanascimento, matricula } = req.body;
    const aluno = await Aluno.create({
        id,
        nome,
        sobrenome,
        email,
        datanascimento,
        matricula
    })

    res.json(aluno)
}