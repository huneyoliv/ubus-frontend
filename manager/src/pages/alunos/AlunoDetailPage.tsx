import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Save, FileText, Calendar, ShieldAlert, Award, RefreshCw, ChevronLeft, ChevronRight, User as UserIcon } from 'lucide-react';
import { getUserById, getStudentSchedule, updateStudentSchedule, getStudentTrips, StudentSchedule, TripHistoryItem } from '../../api/users';
import { User } from '../../stores/auth.store';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { StatusBadge } from '../../components/ui/StatusBadge';
import { useToast } from '../../hooks/useToast';

const DAYS = [
  { key: 'monday', label: 'Segunda' },
  { key: 'tuesday', label: 'Terça' },
  { key: 'wednesday', label: 'Quarta' },
  { key: 'thursday', label: 'Quinta' },
  { key: 'friday', label: 'Sexta' },
  { key: 'saturday', label: 'Sábado' },
  { key: 'sunday', label: 'Domingo' }
] as const;

const SHIFTS = [
  { key: 'MORNING', label: 'Manhã' },
  { key: 'AFTERNOON', label: 'Tarde' },
  { key: 'NIGHT', label: 'Noite' }
] as const;

export default function AlunoDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { showToast } = useToast();

  const [student, setStudent] = useState<User | null>(null);
  const [schedule, setSchedule] = useState<StudentSchedule | null>(null);
  const [tripsData, setTripsData] = useState<{ data: TripHistoryItem[]; total: number } | null>(null);
  
  const [loading, setLoading] = useState(true);
  const [scheduleLoading, setScheduleLoading] = useState(false);
  const [page, setPage] = useState(1);
  const limit = 5;

  // Estados locais para edição da grade
  const [localSchedule, setLocalSchedule] = useState<Record<string, string[]>>({
    monday: [],
    tuesday: [],
    wednesday: [],
    thursday: [],
    friday: [],
    saturday: [],
    sunday: []
  });

  const loadData = async () => {
    if (!id) return;
    setLoading(true);
    try {
      const user = await getUserById(id);
      setStudent(user);

      try {
        const sched = await getStudentSchedule(id);
        setSchedule(sched);
        setLocalSchedule({
          monday: sched.monday || [],
          tuesday: sched.tuesday || [],
          wednesday: sched.wednesday || [],
          thursday: sched.thursday || [],
          friday: sched.friday || [],
          saturday: sched.saturday || [],
          sunday: sched.sunday || []
        });
      } catch (err) {
        // Grade pode não estar criada ainda
        setSchedule(null);
      }

      try {
        const trips = await getStudentTrips(id, { page, limit });
        setTripsData(trips);
      } catch (err) {
        setTripsData({ data: [], total: 0 });
      }
    } catch (err: any) {
      showToast('Erro ao carregar dados do aluno.', 'error');
    } finally {
      setLoading(false);
    }
  };

  const loadTripsOnly = async () => {
    if (!id) return;
    try {
      const trips = await getStudentTrips(id, { page, limit });
      setTripsData(trips);
    } catch (err) {
      // Silenciado
    }
  };

  useEffect(() => {
    loadData();
  }, [id]);

  useEffect(() => {
    if (id && !loading) {
      loadTripsOnly();
    }
  }, [page]);

  const handleToggleShift = (dayKey: string, shiftKey: 'MORNING' | 'AFTERNOON' | 'NIGHT') => {
    setLocalSchedule(prev => {
      const currentShifts = prev[dayKey] || [];
      const updatedShifts = currentShifts.includes(shiftKey)
        ? currentShifts.filter(s => s !== shiftKey)
        : [...currentShifts, shiftKey];
      return { ...prev, [dayKey]: updatedShifts };
    });
  };

  const handleSaveSchedule = async () => {
    if (!id) return;
    setScheduleLoading(true);
    try {
      const updated = await updateStudentSchedule(id, localSchedule);
      setSchedule(updated);
      showToast('Grade horária salva com sucesso!', 'success');
    } catch (err: any) {
      showToast(err.response?.data?.message || 'Erro ao salvar grade horária.', 'error');
    } finally {
      setScheduleLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col gap-6 animate-pulse">
        <div className="h-10 bg-white rounded-[12px] w-1/4" />
        <div className="h-64 bg-white rounded-[18px]" />
      </div>
    );
  }

  if (!student) {
    return (
      <div className="flex flex-col gap-6">
        <button onClick={() => navigate('/alunos')} className="flex items-center gap-2 text-sm font-bold text-[#2563EB]">
          <ArrowLeft className="h-5 w-5" />
          <span>Voltar para alunos</span>
        </button>
        <Card className="p-8 text-center text-[#BA1A1A]">Aluno não encontrado.</Card>
      </div>
    );
  }

  const totalPages = tripsData ? Math.ceil(tripsData.total / limit) : 0;

  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate('/alunos')}
            className="p-2 bg-white border border-[#C3C6D7]/40 rounded-[12px] text-[#434655] hover:text-[#131B2E] transition-all"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <div>
            <h1 className="text-3xl font-black text-[#131B2E] tracking-tight font-outfit">{student.name}</h1>
            <p className="text-sm font-semibold text-[#434655] mt-1">Detalhes do perfil, documentos e prioridades.</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Coluna 1: Informações de Perfil & Documentos */}
        <div className="lg:col-span-1 flex flex-col gap-6">
          <Card className="flex flex-col items-center p-6 text-center gap-4">
            <div className="h-24 w-24 rounded-full overflow-hidden bg-slate-100 border-2 border-[#2563EB]/20 flex items-center justify-center">
              {student.photoUrl ? (
                <img src={student.photoUrl} alt={student.name} className="h-full w-full object-cover" />
              ) : (
                <UserIcon className="h-12 w-12 text-slate-400" />
              )}
            </div>
            <div>
              <h3 className="text-lg font-bold text-[#131B2E]">{student.name}</h3>
              <p className="text-xs font-semibold text-[#434655] mt-1">Estudante Escolar</p>
            </div>
            <StatusBadge status={student.status} />

            <div className="w-full border-t border-slate-100 pt-4 flex flex-col gap-2.5 text-left">
              <div>
                <label className="text-[10px] font-black text-[#434655] uppercase">CPF</label>
                <p className="text-sm font-bold text-[#131B2E] mt-0.5">{student.cpf}</p>
              </div>
              <div>
                <label className="text-[10px] font-black text-[#434655] uppercase">E-mail</label>
                <p className="text-sm font-bold text-[#131B2E] mt-0.5 break-all">{student.email}</p>
              </div>
              <div>
                <label className="text-[10px] font-black text-[#434655] uppercase">Telefone</label>
                <p className="text-sm font-bold text-[#131B2E] mt-0.5">{student.phone || 'Não informado'}</p>
              </div>
              {student.priorityLevel !== undefined && (
                <div>
                  <label className="text-[10px] font-black text-[#434655] uppercase">Nível de Prioridade</label>
                  <p className="text-sm font-bold text-[#131B2E] mt-0.5">{student.priorityLevel}</p>
                </div>
              )}
            </div>
          </Card>

          {/* Documentos */}
          <Card className="flex flex-col gap-4 p-6">
            <h3 className="text-sm font-black text-[#131B2E] uppercase tracking-wide border-b border-slate-100 pb-3 flex items-center gap-2">
              <FileText className="h-4 w-4 text-[#2563EB]" />
              Documentos do Aluno
            </h3>
            <div className="flex flex-col gap-2.5">
              {student.gradeFileUrl ? (
                <a
                  href={student.gradeFileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3 bg-slate-50 border border-slate-100 rounded-[12px] hover:border-[#2563EB]/40 hover:bg-slate-50/80 transition-all text-xs font-bold text-[#131B2E]"
                >
                  <span>Comprovante de Grade Horária</span>
                  <span className="text-[#2563EB]">Visualizar</span>
                </a>
              ) : (
                <div className="p-3 bg-slate-50 border border-dashed rounded-[12px] text-xs font-semibold text-[#434655]">
                  Sem comprovante de grade
                </div>
              )}

              {student.residenciaFileUrl ? (
                <a
                  href={student.residenciaFileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3 bg-slate-50 border border-slate-100 rounded-[12px] hover:border-[#2563EB]/40 hover:bg-slate-50/80 transition-all text-xs font-bold text-[#131B2E]"
                >
                  <span>Comprovante de Residência</span>
                  <span className="text-[#2563EB]">Visualizar</span>
                </a>
              ) : (
                <div className="p-3 bg-slate-50 border border-dashed rounded-[12px] text-xs font-semibold text-[#434655]">
                  Sem comprovante de residência
                </div>
              )}

              {student.accessibilityDocUrl && (
                <a
                  href={student.accessibilityDocUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3 bg-purple-50/50 border border-purple-100 rounded-[12px] hover:border-purple-300 transition-all text-xs font-bold text-[#131B2E]"
                >
                  <div className="flex items-center gap-1.5 text-purple-800">
                    <Award className="h-4 w-4" />
                    <span>Laudo de Acessibilidade</span>
                  </div>
                  <span className="text-purple-700">Visualizar</span>
                </a>
              )}
            </div>
          </Card>
        </div>

        {/* Colunas 2 e 3: Grade Horária e Histórico */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          {/* Grade Horária de Prioridade */}
          <Card className="flex flex-col gap-6 p-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <h3 className="text-base font-black text-[#131B2E] tracking-tight">Grade Horária de Prioridade</h3>
                <p className="text-xs font-semibold text-[#434655] mt-1">
                  Os dias e turnos selecionados definem a prioridade automática de embarque nas viagens.
                </p>
              </div>
              <Button onClick={handleSaveSchedule} loading={scheduleLoading} className="py-2 px-4 text-xs font-bold flex items-center gap-2">
                <Save className="h-4 w-4" />
                <span>Salvar Grade</span>
              </Button>
            </div>

            {schedule?.universityCity && (
              <div className="flex items-center gap-2 px-3 py-2 bg-blue-50 border border-blue-100 rounded-[12px] text-xs text-[#2563EB] font-bold self-start">
                <Calendar className="h-4 w-4" />
                <span>Cidade da Universidade: {schedule.universityCity}</span>
              </div>
            )}

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-slate-100 text-[#434655] font-black uppercase text-[10px]">
                    <th className="py-3 px-2">Dia da Semana</th>
                    {SHIFTS.map(s => (
                      <th key={s.key} className="py-3 px-2 text-center">{s.label}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {DAYS.map(day => {
                    const activeShifts = localSchedule[day.key] || [];
                    return (
                      <tr key={day.key} className="border-b border-slate-50 hover:bg-slate-50/40">
                        <td className="py-4 px-2 font-bold text-[#131B2E]">{day.label}</td>
                        {SHIFTS.map(shift => {
                          const isChecked = activeShifts.includes(shift.key);
                          return (
                            <td key={shift.key} className="py-4 px-2 text-center">
                              <input
                                type="checkbox"
                                checked={isChecked}
                                onChange={() => handleToggleShift(day.key, shift.key)}
                                className="h-5 w-5 rounded border-[#C3C6D7] text-[#2563EB] focus:ring-[#2563EB]/25 cursor-pointer transition-all"
                              />
                            </td>
                          );
                        })}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </Card>

          {/* Histórico de Viagens */}
          <Card className="flex flex-col gap-6 p-6">
            <h3 className="text-base font-black text-[#131B2E] tracking-tight border-b border-slate-100 pb-4">
              Histórico de Viagens Recentes
            </h3>

            {!tripsData || tripsData.data.length === 0 ? (
              <div className="p-8 text-center text-xs font-semibold text-[#434655] bg-slate-50 border border-dashed rounded-[16px]">
                Nenhuma viagem registrada no histórico.
              </div>
            ) : (
              <div className="flex flex-col gap-4">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="border-b border-slate-100 text-[#434655] font-black uppercase text-[10px]">
                        <th className="py-3 px-2">Data</th>
                        <th className="py-3 px-2">Rota</th>
                        <th className="py-3 px-2">Sentido</th>
                        <th className="py-3 px-2">Embarque / Desembarque</th>
                        <th className="py-3 px-2 text-right">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {tripsData.data.map((trip, idx) => (
                        <tr key={idx} className="border-b border-slate-50 hover:bg-slate-50/40">
                          <td className="py-4 px-2 font-bold text-[#131B2E] whitespace-nowrap">{trip.date}</td>
                          <td className="py-4 px-2 font-bold text-[#131B2E]">{trip.routeName}</td>
                          <td className="py-4 px-2 whitespace-nowrap">
                            <span className={`px-2 py-0.5 rounded-full font-bold text-[10px] ${
                              trip.direction === 'OUTBOUND'
                                ? 'bg-blue-50 text-blue-700 border border-blue-100'
                                : 'bg-slate-50 text-slate-700 border border-slate-200'
                            }`}>
                              {trip.direction === 'OUTBOUND' ? 'Ida' : 'Volta'}
                            </span>
                          </td>
                          <td className="py-4 px-2">
                            <div className="flex flex-col gap-1 text-[11px]">
                              {trip.pickupPoint && (
                                <span className="text-[#131B2E] font-semibold">
                                  🛫 {trip.pickupPoint.name}
                                </span>
                              )}
                              {trip.dropoffPoint && (
                                <span className="text-[#434655]">
                                  🛬 {trip.dropoffPoint.name}
                                </span>
                              )}
                            </div>
                          </td>
                          <td className="py-4 px-2 text-right whitespace-nowrap">
                            <span className={`px-2 py-0.5 rounded-full font-bold text-[10px] ${
                              trip.status === 'COMPLETED'
                                ? 'bg-green-50 text-green-700 border border-green-200'
                                : trip.status === 'ABSENT' || trip.status === 'CANCELLED'
                                ? 'bg-red-50 text-red-700 border border-red-200'
                                : 'bg-orange-50 text-orange-700 border border-orange-200'
                            }`}>
                              {trip.status === 'COMPLETED' ? 'Confirmado' : trip.status === 'ABSENT' ? 'Faltou' : trip.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {totalPages > 1 && (
                  <div className="flex items-center justify-between border-t border-slate-100 pt-4 mt-2">
                    <span className="text-xs font-semibold text-[#434655]">
                      Página {page} de {totalPages} ({tripsData.total} registros)
                    </span>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setPage(p => Math.max(p - 1, 1))}
                        disabled={page === 1}
                        className="p-1.5 border border-[#C3C6D7]/40 rounded-[8px] hover:bg-slate-50 disabled:opacity-40"
                      >
                        <ChevronLeft className="h-4 w-4 text-[#131B2E]" />
                      </button>
                      <button
                        onClick={() => setPage(p => Math.min(p + 1, totalPages))}
                        disabled={page === totalPages}
                        className="p-1.5 border border-[#C3C6D7]/40 rounded-[8px] hover:bg-slate-50 disabled:opacity-40"
                      >
                        <ChevronRight className="h-4 w-4 text-[#131B2E]" />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
}
