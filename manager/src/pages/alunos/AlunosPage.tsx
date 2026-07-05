import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Users, Search, RefreshCw, ArrowRight } from 'lucide-react';
import { listUsers } from '../../api/users';
import { User } from '../../stores/auth.store';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { StatusBadge } from '../../components/ui/StatusBadge';

export default function AlunosPage() {
  const navigate = useNavigate();
  const [students, setStudents] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('ALL');

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search);
    }, 300);
    return () => clearTimeout(handler);
  }, [search]);

  const loadStudents = async () => {
    setLoading(true);
    try {
      const data = await listUsers({
        role: 'STUDENT',
        status: statusFilter === 'ALL' ? undefined : statusFilter,
        search: debouncedSearch || undefined,
      });
      setStudents(data);
    } catch (err) {
      // Silenciado
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadStudents();
  }, [debouncedSearch, statusFilter]);

  return (
    <div className="flex flex-col gap-8 relative">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-[#131B2E] tracking-tight font-outfit">Alunos</h1>
          <p className="text-sm font-semibold text-[#434655] mt-1">
            Busque, visualize documentos, histórico e altere a grade horária de prioridade dos alunos.
          </p>
        </div>
        <button
          onClick={loadStudents}
          disabled={loading}
          className="self-end md:self-auto p-2.5 bg-white border border-[#C3C6D7]/40 rounded-[12px] text-[#434655] hover:text-[#131B2E] hover:bg-slate-50 transition-all duration-200 disabled:opacity-50"
        >
          <RefreshCw className={`h-5 w-5 ${loading ? 'animate-spin' : ''}`} />
        </button>
      </div>

      <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center bg-white p-4 rounded-[16px] border border-[#C3C6D7]/20 shadow-sm">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
          <input
            type="text"
            placeholder="Buscar aluno por nome ou CPF..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-11 pr-4 py-2.5 bg-slate-50 border border-[#C3C6D7]/30 rounded-[12px] text-sm text-[#131B2E] outline-none focus:border-[#2563EB] focus:ring-4 focus:ring-[#2563EB]/10 transition-all"
          />
        </div>
        <div className="flex items-center gap-3">
          <label className="text-xs font-bold text-[#434655] whitespace-nowrap">Filtrar por Status:</label>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2.5 bg-slate-50 border border-[#C3C6D7]/30 rounded-[12px] text-sm text-[#131B2E] outline-none focus:border-[#2563EB] focus:ring-4 focus:ring-[#2563EB]/10 transition-all"
          >
            <option value="ALL">Todos os status</option>
            <option value="APPROVED">Ativos / Aprovados</option>
            <option value="PENDING">Pendentes de Cadastro</option>
            <option value="RENEWAL_PENDING">Pendente de Renovação</option>
            <option value="SUSPENDED">Suspensos</option>
            <option value="INACTIVE">Inativos</option>
          </select>
        </div>
      </div>

      {loading ? (
        <div className="flex flex-col gap-4 animate-pulse">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-24 bg-white rounded-[18px]" />
          ))}
        </div>
      ) : students.length === 0 ? (
        <Card className="flex flex-col items-center justify-center p-16 text-center border-dashed border-2">
          <div className="p-4 bg-slate-100 rounded-full text-slate-400 mb-4">
            <Users className="h-8 w-8" />
          </div>
          <h3 className="text-lg font-bold text-[#131B2E]">Nenhum aluno encontrado</h3>
          <p className="text-xs font-semibold text-[#434655] mt-1.5">
            Refine sua pesquisa ou filtro de status.
          </p>
        </Card>
      ) : (
        <div className="flex flex-col gap-4">
          {students.map((student) => (
            <div
              key={student.id}
              onClick={() => navigate(`/alunos/${student.id}`)}
              className="group cursor-pointer"
            >
              <Card className="flex flex-col sm:flex-row sm:items-center justify-between p-5 hover:shadow-lg hover:border-[#2563EB]/30 transition-all duration-200 gap-4">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-full overflow-hidden bg-slate-100 flex-shrink-0 flex items-center justify-center border border-slate-200">
                    {student.photoUrl ? (
                      <img
                        src={student.photoUrl}
                        alt={student.name}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <Users className="h-6 w-6 text-slate-400" />
                    )}
                  </div>
                  <div className="flex flex-col gap-1">
                    <div className="flex flex-wrap items-center gap-3">
                      <h4 className="text-base font-bold text-[#131B2E] group-hover:text-[#2563EB] transition-colors">
                        {student.name}
                      </h4>
                      <StatusBadge status={student.status} />
                      {student.accessibilityStatus === 'APPROVED' && (
                        <span className="px-2 py-0.5 text-[10px] font-black bg-purple-50 text-purple-700 border border-purple-200 rounded-full">
                          PCD/Prioritário
                        </span>
                      )}
                    </div>
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs font-semibold text-[#434655]">
                      <span>CPF: {student.cpf}</span>
                      <span>•</span>
                      <span>Email: {student.email}</span>
                      {student.phone && (
                        <>
                          <span>•</span>
                          <span>Tel: {student.phone}</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-end">
                  <ArrowRight className="h-5 w-5 text-slate-400 group-hover:text-[#2563EB] group-hover:translate-x-1 transition-all" />
                </div>
              </Card>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
