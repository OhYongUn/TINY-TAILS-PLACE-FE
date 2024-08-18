import { useState } from 'react';
import useUserStore from '@app/store/userStore';
import {
  ChangePasswordResponse,
  PasswordChangeData,
  UpdateUserData,
  UpdateUserResponse,
} from '@app/interface/user/user';
import { apiRequest, useApiData } from '@app/interface/ApiResponse';

export function useUpdateUser() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { updateUser: updateStoreUser, getAccessToken } = useUserStore();

  const updateUser = async (data: UpdateUserData) => {
    setIsLoading(true);
    setError(null);

    try {
      const token = getAccessToken();
      const response = await apiRequest<UpdateUserResponse>(
        '/api/user/update',
        'PUT',
        data,
        true,
        { headers: { 'Client-Authorization': token } },
      );
      const { data: updateData, error: apiError } = useApiData(response);

      if (updateData) {
        console.log('updateData', updateData);

        //updateStoreUser(updateData);
        return {
          success: true,
          message: '사용자 정보가 성공적으로 업데이트되었습니다.',
        };
      } else {
        const errorMessage =
          response.error?.message || '사용자 정보 업데이트에 실패했습니다.';
        setError(errorMessage);
        return { success: false, error: errorMessage };
      }
    } catch (err) {
      const errorMessage =
        '사용자 정보 업데이트 중 예기치 못한 오류가 발생했습니다.';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setIsLoading(false);
    }
  };

  return { updateUser, isLoading, error };
}

export function useChangePassword() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { getAccessToken } = useUserStore();

  const changePassword = async (data: PasswordChangeData) => {
    setIsLoading(true);
    setError(null);

    try {
      const token = getAccessToken();
      const response = await apiRequest<ChangePasswordResponse>(
        '/api/user/change-password',
        'PUT',
        data,
        true,
        { headers: { 'Client-Authorization': token } },
      );
      console.log('client->>', response);
      const {
        data: changePasswordData,
        error: apiError,
        success,
      } = useApiData(response);
      console.log('changePasswordData', changePasswordData);
      console.log('apiError->', apiError);
      if (success) {
        return {
          success,
          message: '비밀번호가 성공적으로 변경되었습니다.',
        };
      } else {
        const errorMessage =
          apiError?.message || '비밀번호 변경에 실패했습니다.';
        setError(errorMessage);
        return { success, message: errorMessage };
      }
    } catch (err) {
      const errorMessage = '비밀번호 변경 중 예기치 못한 오류가 발생했습니다.';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setIsLoading(false);
    }
  };

  return { changePassword, isLoading, error };
}
