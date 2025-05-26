import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import FormInput from "../components/FormInput";
import Button from "../components/Button";
import { useAuth } from "../context/AuthContext";
import { validateCPF, validatePassword } from "../utils/validation";

const Login: React.FC = () => {
  const [cpf, setCpf] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{
    cpf?: string;
    password?: string;
    form?: string;
  }>({});
  const [isLoading, setIsLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    setErrors({});

    let hasErrors = false;
    const newErrors: { cpf?: string; password?: string; form?: string } = {};

    if (!cpf) {
      newErrors.cpf = "CPF é obrigatório";
      hasErrors = true;
    } else if (!validateCPF(cpf)) {
      newErrors.cpf = "CPF inválido (deve conter 11 dígitos)";
      hasErrors = true;
    }

    if (!password) {
      newErrors.password = "Senha é obrigatória";
      hasErrors = true;
    } else if (!validatePassword(password)) {
      newErrors.password = "Senha deve ter pelo menos 4 caracteres";
      hasErrors = true;
    }

    if (hasErrors) {
      setErrors(newErrors);
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      const loginSuccess = login(cpf, password);

      setIsLoading(false);

      if (loginSuccess) {
        navigate("/dashboard");
      } else {
        setErrors({ form: "CPF ou senha inválidos" });
      }
    }, 800);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black px-4 py-12">
      <div className="max-w-md w-full space-y-8 bg-gray-800 p-6 sm:p-10 rounded-xl shadow-lg">
        <div className="text-center">
          <div className="flex justify-center">
            <img
              src="./images/icon-academia-faculdade.png"
              alt="Ícone Academia"
              className="h-35 w-35 object-contain mx-auto"
            />
          </div>
          <p className="mt-2 text-sm text-gray-200">
            Faça login para acessar sua conta
          </p>
        </div>

        {errors.form && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-4 bg-red-100 text-red-800">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg
                  className="h-5 w-5 text-red-600"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm">{errors.form}</p>
              </div>
            </div>
          </div>
        )}

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <FormInput
            id="cpf"
            label="CPF"
            type="text"
            maxLength={11}
            placeholder="Digite apenas números"
            value={cpf}
            onChange={(e) => setCpf(e.target.value.replace(/\D/g, ""))}
            error={errors.cpf}
            required
            className="text-white placeholder-gray-400"
          />

          <FormInput
            id="password"
            label="Senha"
            type="password"
            placeholder="Digite sua senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={errors.password}
            required
            className="text-white placeholder-gray-400"
          />

          <div>
            <Button
              type="submit"
              fullWidth
              isLoading={isLoading}
              className="mt-4"
            >
              Entrar
            </Button>
          </div>

          <div className="text-center mt-4">
            <p className="text-sm text-gray-200">
              Não tem uma conta?{" "}
              <Link
                to="/register"
                className="font-medium text-blue-400 hover:text-blue-500"
              >
                Cadastre-se
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
