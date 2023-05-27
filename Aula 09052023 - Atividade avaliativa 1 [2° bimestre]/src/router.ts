import path from 'node:path';
import { Router } from 'express';
import { listAlunos } from './app/useCases/alunos/listAlunos';
import { createAlunos } from './app/useCases/alunos/createAlunos';

export const router = Router();

//List alunos
router.get('/alunos', listAlunos);

//Create alunos
router.post('/alunos', createAlunos);

