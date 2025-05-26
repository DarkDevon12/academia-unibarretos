import React from "react";
import { useNavigate } from "react-router-dom";
import { Calendar, LogOut, Bell, Award } from "lucide-react";
import Card from "../components/Card";
import Button from "../components/Button";
import { useAuth } from "../context/AuthContext";
import { announcements } from "../data/mockData";
import { formatCPF } from "../utils/validation";

const Dashboard: React.FC = () => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  if (!currentUser) {
    return null; // Should be handled by ProtectedRoute
  }

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const handleScheduleWorkout = () => {
    alert("Funcionalidade de agendamento será implementada em breve!");
  };

return (
  <div className="min-h-screen bg-gray-100">
    {/* Header */}
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <img
              src="images/icon-facul.png"
              alt="Ícone da academia"
              className="h-14 w-14 rounded-full object-cover"
            />
            <h1 className="ml-2 text-2xl font-bold text-gray-900">
              Academia UNIBARRETOS
            </h1>
          </div>
          <button
            onClick={handleLogout}
            className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <LogOut className="h-4 w-4 mr-1" />
            Sair
          </button>
        </div>
      </div>
    </header>


      {/* Main content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome section */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Olá, {currentUser.name.split(" ")[0]}! 👋
          </h2>
          <p className="text-gray-600">
            Bem-vindo de volta à sua área de aluno. Confira seu progresso e
            próximos treinos.
          </p>
        </div>

        {/* Dashboard grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Next workout card */}
          <Card className="bg-gradient-to-br from-blue-600 to-blue-800 text-white">
            <div className="flex items-start">
              <Calendar className="h-8 w-8 mr-3" />
              <div>
                <h3 className="text-lg font-semibold mb-3">Próximo Treino</h3>
                {currentUser.nextWorkout ? (
                  <div className="space-y-1">
                    <p className="text-xl font-bold">
                      {currentUser.nextWorkout.type}
                    </p>
                    <p>
                      {currentUser.nextWorkout.date} às{" "}
                      {currentUser.nextWorkout.time}
                    </p>
                    <Button
                      variant="outline"
                      className="mt-4 bg-white bg-opacity-20 hover:bg-opacity-30 border-white text-white"
                      onClick={handleScheduleWorkout}
                    >
                      Alterar horário
                    </Button>
                  </div>
                ) : (
                  <div>
                    <p>Nenhum treino agendado</p>
                    <Button
                      variant="outline"
                      className="mt-4 bg-white bg-opacity-20 hover:bg-opacity-30 border-white text-white"
                      onClick={handleScheduleWorkout}
                    >
                      Agendar treino
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </Card>

          {/* Weekly summary card */}
          <Card>
            <div className="flex items-start">
              <Award className="h-8 w-8 mr-3 text-green-500" />
              <div>
                <h3 className="text-lg font-semibold mb-3">Resumo da Semana</h3>
                <p className="text-xl font-bold">
                  {currentUser.workoutsCompleted} treinos concluídos 💪
                </p>
                <div className="mt-4 h-2 bg-gray-200 rounded-full">
                  <div
                    className="h-2 bg-green-500 rounded-full"
                    style={{
                      width: `${Math.min(
                        (currentUser.workoutsCompleted / 5) * 100,
                        100
                      )}%`,
                    }}
                  ></div>
                </div>
                <p className="text-sm text-gray-600 mt-2">
                  Meta: 5 treinos por semana
                </p>
              </div>
            </div>
          </Card>

          {/* Profile card */}
          <Card>
            <h3 className="text-lg font-semibold mb-3">Meu Perfil</h3>
            <div className="space-y-2">
              <div>
                <p className="text-sm text-gray-600">Nome</p>
                <p className="font-medium">{currentUser.name}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">CPF</p>
                <p className="font-medium">{formatCPF(currentUser.cpf)}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Membro desde</p>
                <p className="font-medium">
                  {new Date(currentUser.joinedDate).toLocaleDateString("pt-BR")}
                </p>
              </div>
            </div>
          </Card>
        </div>

        {/* Schedule workout button */}
        <div className="mt-8">
          <Button onClick={handleScheduleWorkout} className="flex items-center">
            <Calendar className="h-4 w-4 mr-2" />
            Agendar novo treino
          </Button>
        </div>

        {/* Announcements */}
        <section className="mt-12">
          <div className="flex items-center mb-6">
            <Bell className="h-5 w-5 text-blue-700 mr-2" />
            <h2 className="text-xl font-bold text-gray-900">
              Avisos da Academia
            </h2>
          </div>
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            {announcements.map((announcement) => (
              <div
                key={announcement.id}
                className="p-4 border-b border-gray-200 last:border-b-0 hover:bg-gray-50 transition-colors"
              >
                <h3 className="font-semibold text-gray-900">
                  {announcement.title}
                </h3>
                <p className="mt-1 text-gray-600">{announcement.content}</p>
                <p className="mt-2 text-sm text-gray-500">
                  {announcement.date}
                </p>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default Dashboard;
