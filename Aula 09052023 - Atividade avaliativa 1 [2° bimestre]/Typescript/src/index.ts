import express from 'express';
import mongoose from 'mongoose';

import { router } from './router';

mongoose.connect('mongodb://localhost:27017')
	.then(() => {
		const app = express();
		const port = 3000;

		app.use(express.json());
		app.use(router);
		//teclado de emotion tecla win+.
		app.listen(port, () => {
			console.log(`🚗Server is runing on http://localhost:${port}`);
		});
	})
	.catch(() => console.log('Erro ao conectar no mongoDb'));
