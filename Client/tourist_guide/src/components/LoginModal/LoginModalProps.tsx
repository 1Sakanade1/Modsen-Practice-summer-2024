export interface LoginModalProps {
  visible: boolean;
  onCancel: () => void;
  onLogin: (username: string, password: string) => void;
  onRegister: (username: string, password: string) => void;
}
