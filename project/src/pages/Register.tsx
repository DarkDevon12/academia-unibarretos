import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import FormInput from "../components/FormInput";
import Button from "../components/Button";
import { useAuth } from "../context/AuthContext";
import { validateCPF, validatePassword } from "../utils/validation";

const Register: React.FC = () => {
  const [name, setName] = useState("");
  const [cpf, setCpf] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState<{
    name?: string;
    cpf?: string;
    password?: string;
    confirmPassword?: string;
    form?: string;
  }>({});
  const [isLoading, setIsLoading] = useState(false);

  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Reset errors
    setErrors({});

    // Validate form
    let hasErrors = false;
    const newErrors: {
      name?: string;
      cpf?: string;
      password?: string;
      confirmPassword?: string;
      form?: string;
    } = {};

    // Validate name
    if (!name.trim()) {
      newErrors.name = "Nome é obrigatório";
      hasErrors = true;
    } else if (name.trim().split(" ").length < 2) {
      newErrors.name = "Por favor, informe seu nome completo";
      hasErrors = true;
    }

    // Validate CPF
    if (!cpf) {
      newErrors.cpf = "CPF é obrigatório";
      hasErrors = true;
    } else if (!validateCPF(cpf)) {
      newErrors.cpf = "CPF inválido (deve conter 11 dígitos)";
      hasErrors = true;
    }

    // Validate password
    if (!password) {
      newErrors.password = "Senha é obrigatória";
      hasErrors = true;
    } else if (!validatePassword(password)) {
      newErrors.password = "Senha deve ter pelo menos 4 caracteres";
      hasErrors = true;
    }

    // Validate password confirmation
    if (password !== confirmPassword) {
      newErrors.confirmPassword = "As senhas não coincidem";
      hasErrors = true;
    }

    if (hasErrors) {
      setErrors(newErrors);
      return;
    }

    // Attempt registration
    setIsLoading(true);

    setTimeout(() => {
      const registrationSuccess = register(name, cpf, password);

      setIsLoading(false);

      if (registrationSuccess) {
        navigate("/");
      } else {
        setErrors({
          form: "CPF já cadastrado. Por favor, tente outro CPF ou faça login.",
        });
      }
    }, 800); // Simulate API call
  };

  return (
 <div className="min-h-screen flex items-center justify-center bg-black px-4 py-12">
      <div className="max-w-md w-full space-y-8 bg-gray-800 p-6 sm:p-10 rounded-xl shadow-lg">
        <div className="text-center">
          <div className="flex justify-center">
            <img
              src="./images/icon-academia-faculdade.png"
              alt="Ícone Academia"
              className="h-25 w-25 object-contain mx-auto"
            />
          </div>
          <p className="mt-2 text-sm text-gray-200">
            Faça login para acessar sua conta
          </p>
        </div>

        {errors.form && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg
                  className="h-5 w-5 text-red-500"
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
                <p className="text-sm text-red-700">{errors.form}</p>
              </div>
            </div>
          </div>
        )}

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <FormInput
            id="name"
            label="Nome Completo"
            type="text"
            placeholder="Digite seu nome completo"
            value={name}
            onChange={(e) => setName(e.target.value)}
            error={errors.name}
            required
          />

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
          />

          <FormInput
            id="confirmPassword"
            label="Confirmar Senha"
            type="password"
            placeholder="Confirme sua senha"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            error={errors.confirmPassword}
            required
          />

          <div>
            <Button
              type="submit"
              fullWidth
              isLoading={isLoading}
              className="mt-4"
            >
              Cadastrar
            </Button>
          </div>

          <div className="text-center mt-4">
            <p className="text-sm text-gray-600">
              Já tem uma conta?{" "}
              <Link
                to="/"
                className="font-medium text-blue-700 hover:text-blue-800"
              >
                Faça login
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
