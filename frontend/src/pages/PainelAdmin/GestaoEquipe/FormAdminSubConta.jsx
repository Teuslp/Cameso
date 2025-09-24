import React, { useState } from 'react';
import api from '../../../api/axios';
import './FormAdminSubConta.css';

const FormAdminSubConta = ({ onClose, onSubContaAdicionada }) => {
    const [formData, setFormData] = useState({
        nome: '',
        email: '',
        senha: '', // 1. ADICIONAR O CAMPO 'senha' AO ESTADO INICIAL
        departamento: 'Suporte',
    });
    const [permissoes, setPermissoes] = useState({
        gerir_catalogo_exames: false,
        gerir_catalogo_riscos: false,
        gerir_catalogo_treinamentos: false,
        ver_todos_chamados: true,
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
                tipoConta: 'admin_departamento'
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
            <div className="modal-content large">
                <h2>Adicionar Novo Membro à Equipa</h2>
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
                        {/* 2. GARANTIR QUE OS ATRIBUTOS 'name', 'value' E 'onChange' ESTÃO CORRETOS */}
                        <input type="password" id="senha" name="senha" value={formData.senha} onChange={handleChange} required />
                    </div>
                     <div className="form-group">
                        <label htmlFor="departamento">Departamento</label>
                        <select id="departamento" name="departamento" value={formData.departamento} onChange={handleChange}>
                            <option value="Suporte">Suporte Técnico</option>
                            <option value="Financeiro">Financeiro</option>
                            <option value="Comercial">Comercial</option>
                            <option value="Exames">Setor de Exames</option>
                        </select>
                    </div>

                    {/* Secção de Permissões */}
                    <h4>Permissões de Acesso</h4>
                    <div className="permissions-grid">
                        <div className="permission-item">
                            <input type="checkbox" id="ver_todos_chamados" name="ver_todos_chamados" checked={permissoes.ver_todos_chamados} onChange={handlePermissionChange} />
                            <label htmlFor="ver_todos_chamados">Ver Todos os Chamados</label>
                        </div>
                        <div className="permission-item">
                            <input type="checkbox" id="gerir_catalogo_exames" name="gerir_catalogo_exames" checked={permissoes.gerir_catalogo_exames} onChange={handlePermissionChange} />
                            <label htmlFor="gerir_catalogo_exames">Gerir Catálogo de Exames</label>
                        </div>
                         <div className="permission-item">
                            <input type="checkbox" id="gerir_catalogo_riscos" name="gerir_catalogo_riscos" checked={permissoes.gerir_catalogo_riscos} onChange={handlePermissionChange} />
                            <label htmlFor="gerir_catalogo_riscos">Gerir Catálogo de Riscos</label>
                        </div>
                         <div className="permission-item">
                            <input type="checkbox" id="gerir_catalogo_treinamentos" name="gerir_catalogo_treinamentos" checked={permissoes.gerir_catalogo_treinamentos} onChange={handlePermissionChange} />
                            <label htmlFor="gerir_catalogo_treinamentos">Gerir Catálogo de Treinamentos</label>
                        </div>
                    </div>
                    
                    {error && <p className="error-message">{error}</p>}

                    <div className="form-actions">
                        <button type="button" className="cancel-btn" onClick={onClose} disabled={loading}>Cancelar</button>
                        <button type="submit" className="save-btn" disabled={loading}>
                            {loading ? 'A Criar...' : 'Criar Membro'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default FormAdminSubConta;