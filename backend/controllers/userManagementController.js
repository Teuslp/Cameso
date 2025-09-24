import User from '../models/User.js';
import bcrypt from 'bcrypt';

/**
 * Cria uma nova sub-conta (seja de cliente ou de admin).
 * Apenas contas 'master' podem executar esta ação.
 */
export const createSubAccount = async (req, res) => {
  try {
    const { nome, email, senha, tipoConta, departamento, permissoes } = req.body;
    const masterUser = req.user; // O utilizador 'master' logado

    // Validação de permissão
    if (masterUser.tipoConta !== 'admin_master' && masterUser.tipoConta !== 'cliente_master') {
      return res.status(403).json({ message: 'Apenas contas master podem criar sub-contas.' });
    }

    // Validação para garantir que um admin master só cria sub-contas de admin, e o mesmo para clientes
    if (masterUser.tipoConta === 'admin_master' && tipoConta !== 'admin_departamento') {
        return res.status(400).json({ message: 'Um admin master só pode criar sub-contas de departamento.' });
    }
    if (masterUser.tipoConta === 'cliente_master' && tipoConta !== 'cliente_subconta') {
        return res.status(400).json({ message: 'Um cliente master só pode criar sub-contas de cliente.' });
    }

    // Criptografar a senha
    const salt = await bcrypt.genSalt(10);
    const senhaHash = await bcrypt.hash(senha, salt);

    // Cria o objeto base para o novo utilizador
    const newUserPayload = {
      nome,
      email,
      senha: senhaHash,
      tipoConta,
      empresaMaeId: masterUser.id, // Vínculo com a conta master
      departamento: tipoConta === 'admin_departamento' ? departamento : undefined,
      permissoes: tipoConta === 'cliente_subconta' ? permissoes : [],
    };
    
    // --- CORREÇÃO APLICADA AQUI ---
    // Apenas sub-contas de CLIENTE herdam a Razão Social.
    // Nenhuma sub-conta herda o CNPJ, para evitar o erro de duplicidade.
    if (tipoConta === 'cliente_subconta') {
        newUserPayload.razaoSocial = masterUser.razaoSocial;
    }

    const newUser = new User(newUserPayload);
    await newUser.save();
    
    const userResponse = newUser.toObject();
    delete userResponse.senha;

    res.status(201).json({ message: 'Sub-conta criada com sucesso.', user: userResponse });

  } catch (error) {
    if (error.code === 11000) { // Erro de duplicidade (agora, provavelmente só o email)
        return res.status(400).json({ message: 'O email fornecido já está em uso.' });
    }
    console.error("Erro ao criar sub-conta:", error);
    res.status(500).json({ message: "Erro no servidor ao criar sub-conta." });
  }
};

/**
 * Lista todas as sub-contas de uma conta master.
 */
export const getSubAccounts = async (req, res) => {
    try {
        const masterUser = req.user;
        const subContas = await User.find({ empresaMaeId: masterUser.id }).select('-senha');
        res.status(200).json(subContas);
    } catch (error) {
        console.error("Erro ao listar sub-contas:", error);
        res.status(500).json({ message: "Erro no servidor ao listar sub-contas." });
    }
};

