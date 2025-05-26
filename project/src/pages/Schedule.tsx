import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Calendar, ArrowLeft } from "lucide-react";
import Card from "../components/Card";
import Button from "../components/Button";

const Schedule: React.FC = () => {
    const navigate = useNavigate();

    const [workoutType, setWorkoutType] = useState("");
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");

    const workoutOptions = ["Peito", "Pernas", "Cardio", "Costas", "Bíceps", "Tríceps"];

    // Gera os horários de 30 em 30 minutos entre 07:00 e 22:00
    const generateTimeOptions = () => {
        const times = [];
        for (let h = 7; h <= 22; h++) {
            for (let m = 0; m < 60; m += 30) {
                if (h === 22 && m > 0) break; // limita até 22:00
                const hourStr = h.toString().padStart(2, "0");
                const minStr = m.toString().padStart(2, "0");
                times.push(`${hourStr}:${minStr}`);
            }
        }
        return times;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!workoutType || !date || !time) {
            alert("Preencha todos os campos!");
            return;
        }

        // Validação extra do horário (entre 07:00 e 22:00)
        const [hour, minute] = time.split(":").map(Number);
        if (hour < 7 || hour > 22 || (hour === 22 && minute > 0)) {
            alert("Horário deve ser entre 07:00 e 22:00.");
            return;
        }

        alert(`Treino agendado: ${workoutType} - ${date} às ${time}`);
        navigate("/dashboard");
    };

    return (
        <div className="min-h-screen bg-gray-100">
            {/* Header */}
            <header className="bg-white shadow-sm">
                <div className="max-w-4xl mx-auto px-4 py-4 flex items-center">
                    <button
                        onClick={() => navigate("/dashboard")}
                        className="text-gray-600 hover:text-gray-900 flex items-center"
                    >
                        <ArrowLeft className="h-5 w-5 mr-2" />
                        Voltar
                    </button>
                </div>
            </header>

            {/* Conteúdo */}
            <main className="max-w-4xl mx-auto px-4 py-8">
                <h2 className="text-2xl font-bold mb-6 text-gray-800">Agendar Treino</h2>

                <Card>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Tipo de treino */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Tipo de Treino</label>
                            <select
                                value={workoutType}
                                onChange={(e) => setWorkoutType(e.target.value)}
                                className="w-full border rounded-md px-3 py-2 shadow-sm focus:ring focus:ring-blue-200 focus:border-blue-400"
                            >
                                <option value="">Selecione</option>
                                {workoutOptions.map((type) => (
                                    <option key={type} value={type}>
                                        {type}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Data */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Data</label>
                            <input
                                type="date"
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                                className="w-full border rounded-md px-3 py-2 shadow-sm focus:ring focus:ring-blue-200 focus:border-blue-400"
                            />
                        </div>

                        {/* Horário */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Horário</label>
                            <select
                                value={time}
                                onChange={(e) => setTime(e.target.value)}
                                className="w-full max-w-xs border rounded-md px-3 py-2 shadow-sm focus:ring focus:ring-blue-200 focus:border-blue-400"
                                size={6} // mostra 6 opções visíveis, tornando dropdown tipo listbox e com scroll automático
                            >
                                {generateTimeOptions().map((t) => (
                                    <option key={t} value={t}>
                                        {t}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Botão de Agendar */}
                        <div className="pt-4">
                            <Button type="submit" className="w-full flex items-center justify-center">
                                <Calendar className="h-4 w-4 mr-2" />
                                Confirmar Agendamento
                            </Button>
                        </div>
                    </form>
                </Card>
            </main>
        </div>
    );
};

export default Schedule;
