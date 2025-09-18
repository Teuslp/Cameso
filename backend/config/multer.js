// backend/config/multer.js (NOVO ARQUIVO)

import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({
  // Define a pasta onde os arquivos serão salvos
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Salva na pasta 'uploads/' na raiz do backend
  },
  // Define o nome do arquivo para evitar conflitos
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

export default upload;