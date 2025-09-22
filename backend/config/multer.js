import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

// Criar o caminho absoluto para a pasta de uploads para garantir que funcione em qualquer ambiente
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const uploadDir = path.join(__dirname, '../uploads/chamados');

// Garantir que o diretório de uploads existe. Se não, cria-o.
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Configuração do armazenamento dos ficheiros
const storage = multer.diskStorage({
  // Define a pasta onde os ficheiros serão guardados
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  // Define como o ficheiro será nomeado
  filename: (req, file, cb) => {
    // Para evitar nomes de ficheiros duplicados, usamos um timestamp + o nome original.
    // Ex: 1678886400000-comprovativo.pdf
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

// Configuração opcional de filtro de ficheiros (exemplo: aceitar apenas imagens e PDFs)
const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|pdf|doc|docx|xls|xlsx/;
  const mimetype = allowedTypes.test(file.mimetype);
  const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());

  if (mimetype && extname) {
    return cb(null, true);
  }
  cb(new Error('Tipo de ficheiro não suportado. Apenas imagens, PDFs e documentos do Office são permitidos.'));
};

const upload = multer({ 
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // Limite de 5MB por ficheiro
  fileFilter: fileFilter
});

// Exportamos o middleware configurado
export default upload;
