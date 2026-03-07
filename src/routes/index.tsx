import { createBrowserRouter } from 'react-router-dom'
import AppLayout from '@/components/layout/AppLayout'
import Splash from '@/pages/Splash'
import Login from '@/pages/Login'
import Cadastro from '@/pages/Cadastro'
import Dashboard from '@/pages/Dashboard'
import Reservar from '@/pages/Reservar'
import Bilhete from '@/pages/Bilhete'
import Perfil from '@/pages/Perfil'
import Historico from '@/pages/Historico'
import Carteirinha from '@/pages/Carteirinha'
import Pagamentos from '@/pages/Pagamentos'
import MeusDados from '@/pages/MeusDados'
import AlterarSenha from '@/pages/AlterarSenha'
import RenovarSemestre from '@/pages/RenovarSemestre'
import Regras from '@/pages/Regras'

import MotoristaSplash from '@/pages/driver/MotoristaSplash'
import SelecionarVeiculo from '@/pages/driver/SelecionarVeiculo'
import CadastroVeiculo from '@/pages/driver/CadastroVeiculo'
import DriverLayout from '@/components/layout/DriverLayout'

import Lider from '@/pages/Lider'

import ManagerLayout from '@/components/layout/ManagerLayout'
import ManagerRoutes from '@/pages/manager/ManagerRoutes'
import ManagerValidations from '@/pages/manager/ManagerValidations'
import ManagerFrota from '@/pages/manager/ManagerFrota'
import ManagerRelatorios from '@/pages/manager/ManagerRelatorios'
import ManagerConfiguracoes from '@/pages/manager/ManagerConfiguracoes'

import ProtectedRoute from '@/components/ProtectedRoute'

export const router = createBrowserRouter([
    { path: '/', element: <Splash /> },
    { path: '/login', element: <Login /> },
    { path: '/cadastro', element: <Cadastro /> },

    { path: '/motorista', element: <MotoristaSplash /> },
    { path: '/selecionar-veiculo', element: <SelecionarVeiculo /> },
    { path: '/cadastro-veiculo', element: <CadastroVeiculo /> },

    { path: '/dashboard', element: <Dashboard /> },

    {
        element: <ProtectedRoute allowedTypes={['aluno']} />,
        children: [
            {
                element: <AppLayout />,
                children: [
                    { path: '/reservar', element: <Reservar /> },
                    { path: '/bilhete', element: <Bilhete /> },
                    { path: '/perfil', element: <Perfil /> },
                    { path: '/historico', element: <Historico /> },
                    { path: '/carteirinha', element: <Carteirinha /> },
                    { path: '/pagamentos', element: <Pagamentos /> },
                    { path: '/lider', element: <Lider /> },
                    { path: '/meus-dados', element: <MeusDados /> },
                    { path: '/alterar-senha', element: <AlterarSenha /> },
                    { path: '/renovar-semestre', element: <RenovarSemestre /> },
                    { path: '/regras', element: <Regras /> },
                ],
            },
        ],
    },

    {
        element: <ProtectedRoute allowedTypes={['motorista']} />,
        children: [
            {
                element: <DriverLayout />,
                children: [
                    { path: '/mapa', element: <div /> },
                    { path: '/avisos', element: <div /> },
                    { path: '/config', element: <div /> },
                ],
            },
        ],
    },

    {
        element: <ProtectedRoute allowedTypes={['gestor']} />,
        children: [
            {
                element: <ManagerLayout />,
                children: [
                    { path: '/rotas', element: <ManagerRoutes /> },
                    { path: '/validacoes', element: <ManagerValidations /> },
                    { path: '/frota', element: <ManagerFrota /> },
                    { path: '/relatorios', element: <ManagerRelatorios /> },
                    { path: '/configuracoes', element: <ManagerConfiguracoes /> },
                ],
            },
        ],
    },
])
