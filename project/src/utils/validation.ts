// CPF validation
export const validateCPF = (cpf: string): boolean => {
  // Remove non-numeric characters
  const normalizedCpf = cpf.replace(/\D/g, '');
  
  // Check if it has 11 digits
  if (normalizedCpf.length !== 11) {
    return false;
  }
  
  // Check if all digits are the same (which would be invalid)
  if (/^(\d)\1+$/.test(normalizedCpf)) {
    return false;
  }
  
  // In a real application, we would implement the complete CPF validation algorithm
  // For this simplified version, we'll just check if it has 11 digits
  return true;
};

// Password validation
export const validatePassword = (password: string): boolean => {
  return password.length >= 4;
};

// Format CPF with dots and dash (e.g., 123.456.789-01)
export const formatCPF = (cpf: string): string => {
  const normalizedCpf = cpf.replace(/\D/g, '');
  
  if (normalizedCpf.length !== 11) {
    return normalizedCpf;
  }
  
  return normalizedCpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
};