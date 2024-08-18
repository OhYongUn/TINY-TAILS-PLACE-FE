export interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  avatarUrl: string;
  initials: string;
}
export interface UpdateUserData {
  name?: string;
  phone?: string;
  // 필요한 다른 필드들을 여기에 추가하세요
}

export interface UpdateUserResponse {
  success: boolean;
  message?: string;
  error?: string;
}
