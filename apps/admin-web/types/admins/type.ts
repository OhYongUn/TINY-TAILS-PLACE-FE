export type Admin = {
  id: string;
  name: string;
  email: string;
  phone: string;
  departmentId?: string;
  department?: {
    id: string;
    name: string;
  };
  failedLoginAttempts: number;
  isActive: boolean;
  createdAt: string; // ISO 8601 format
  updatedAt: string; // ISO 8601 format
  lastLoginAt?: string; // ISO 8601 format
  currentRefreshToken?: string;
  currentRefreshTokenExp?: string; // ISO 8601 format
};

// 필요에 따라 추가 타입들을 정의할 수 있습니다.
export type AdminRole = {
  id: string;
  adminId: string;
  role: string;
  // 기타 필요한 필드들...
};
export interface Department {
  id: string;
  name: string;
  code: string;
  parentId: string | null;
  children?: Department[];
}
