import React, { useState, useEffect } from 'react';
import api from '../../../api/axios';
import './FormSubConta.css'; // Criaremos este ficheiro a seguir

const FormSubConta = ({ onClose, onSubContaAdicionada }) => {
    const [formData, setFormData] = useState({
        nome: '',
        email: '',
        senha: '',
    });
    const [permissoes, setPermissoes] = useState({
        ver_documentos: false,
        ver_colaboradores: false,
        gerir_colaboradores: false,
        ver_asos: false,
        gerir_funcoes: false,
        ver_treinamentos: false,
        ver_agenda: false,
        abrir_chamado: true, // Por defeito, toda a gente pode abrir chamados
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handlePermissionChange = (e) => {
        const { name, checked } = e.target;
        setPermissoes(prev => ({ ...prev, [name]: checked }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            const permissoesArray = Object.keys(permissoes).filter(key => permissoes[key]);

            const payload = {
                ...formData,
                permissoes: permissoesArray,
                tipoConta: 'cliente_subconta'
            };

            const response = await api.post('/management/sub-contas', payload);

            if (response.status === 201) {
                onSubContaAdicionada(response.data.user);
                onClose();
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Ocorreu um erro ao criar a sub-conta.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="modal-backdrop">
            <div className="modal-content">
                <h2>Adicionar Novo Utilizador</h2>
                <form onSubmit={handleSubmit}>
                    {/* Campos de Dados */}
                    <div className="form-group">
                        <label htmlFor="nome">Nome Completo</label>
                        <input type="text" id="nome" name="nome" value={formData.nome} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="senha">Senha Provisória</label>
                        <input type="password" id="senha" name="senha" value={formData.senha} onChange={handleChange} required />
                    </div>

                    {/* Secção de Permissões */}
                    <h4>Permissões de Acesso</h4>
                    <div className="permissions-grid">
                        <div className="permission-item">
                            <input type="checkbox" id="ver_documentos" name="ver_documentos" checked={permissoes.ver_documentos} onChange={handlePermissionChange} />
                            <label htmlFor="ver_documentos">Ver Documentos</label>
                        </div>
                        <div className="permission-item">
                            <input type="checkbox" id="ver_colaboradores" name="ver_colaboradores" checked={permissoes.ver_colaboradores} onChange={handlePermissionChange} />
                            <label htmlFor="ver_colaboradores">Ver Colaboradores</label>
                        </div>
                        <div className="permission-item">
                            <input type="checkbox" id="gerir_colaboradores" name="gerir_colaboradores" checked={permissoes.gerir_colaboradores} onChange={handlePermissionChange} />
                            <label htmlFor="gerir_colaboradores">Gerir Colaboradores</label>
                        </div>
                        {/* Adicione outras permissões aqui conforme necessário */}
                    </div>
                    
                    {error && <p className="error-message">{error}</p>}

                    <div className="form-actions">
                        <button type="button" className="cancel-btn" onClick={onClose} disabled={loading}>Cancelar</button>
                        <button type="submit" className="save-btn" disabled={loading}>
                            {loading ? 'A Criar...' : 'Criar Utilizador'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default FormSubConta;